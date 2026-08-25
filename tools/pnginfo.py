"""Inspect a PNG's alpha channel without Pillow: report transparency + tight bbox."""
import struct, zlib, sys

path = sys.argv[1]
raw = open(path, 'rb').read()
assert raw[:8] == b'\x89PNG\r\n\x1a\n'

pos = 8
idat = b''
w = h = bd = ct = None
while pos < len(raw):
    (ln,) = struct.unpack('>I', raw[pos:pos+4])
    typ = raw[pos+4:pos+8]
    data = raw[pos+8:pos+8+ln]
    if typ == b'IHDR':
        w, h, bd, ct = struct.unpack('>IIBB', data[:10])
    elif typ == b'IDAT':
        idat += data
    elif typ == b'IEND':
        break
    pos += 12 + ln

assert ct == 6 and bd == 8, f'expected 8-bit RGBA, got ct={ct} bd={bd}'
buf = zlib.decompress(idat)
bpp = 4
stride = w * bpp

def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p-a), abs(p-b), abs(p-c)
    return a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)

prev = bytearray(stride)
rows = []
i = 0
for _ in range(h):
    ft = buf[i]; i += 1
    line = bytearray(buf[i:i+stride]); i += stride
    if ft == 1:
        for x in range(bpp, stride):
            line[x] = (line[x] + line[x-bpp]) & 0xFF
    elif ft == 2:
        for x in range(stride):
            line[x] = (line[x] + prev[x]) & 0xFF
    elif ft == 3:
        for x in range(stride):
            a = line[x-bpp] if x >= bpp else 0
            line[x] = (line[x] + ((a + prev[x]) >> 1)) & 0xFF
    elif ft == 4:
        for x in range(stride):
            a = line[x-bpp] if x >= bpp else 0
            c = prev[x-bpp] if x >= bpp else 0
            line[x] = (line[x] + paeth(a, prev[x], c)) & 0xFF
    rows.append(line)
    prev = line

# alpha stats + bbox of pixels with alpha > 8
amin, amax = 255, 0
minx, miny, maxx, maxy = w, h, -1, -1
opaque = 0
for y in range(h):
    r = rows[y]
    for x in range(w):
        a = r[x*4+3]
        if a < amin: amin = a
        if a > amax: amax = a
        if a > 8:
            opaque += 1
            if x < minx: minx = x
            if x > maxx: maxx = x
            if y < miny: miny = y
            if y > maxy: maxy = y

print(f'size            : {w} x {h}')
print(f'alpha min/max   : {amin} / {amax}')
print(f'transparent bg  : {"YES" if amin < 250 else "NO (solid)"}')
print(f'visible pixels  : {opaque} ({opaque*100//(w*h)}%)')
print(f'content bbox    : x {minx}-{maxx}, y {miny}-{maxy}  -> {maxx-minx+1} x {maxy-miny+1}')
print(f'padding  L/R/T/B: {minx} / {w-1-maxx} / {miny} / {h-1-maxy}')
c = rows[h//2]
print(f'centre pixel    : RGBA {tuple(c[(w//2)*4:(w//2)*4+4])}')
print(f'corner TL       : RGBA {tuple(rows[0][0:4])}')
