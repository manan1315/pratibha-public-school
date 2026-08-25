"""Crop a PNG to its non-transparent bounding box (plus optional margin).

Usage: python croppng.py in.png out.png [margin]

Pure standard library — no Pillow needed.
"""
import struct, zlib, sys

src, dst = sys.argv[1], sys.argv[2]
margin = int(sys.argv[3]) if len(sys.argv) > 3 else 0

raw = open(src, 'rb').read()
assert raw[:8] == b'\x89PNG\r\n\x1a\n', 'not a PNG'

pos, idat = 8, b''
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

assert ct == 6 and bd == 8, f'need 8-bit RGBA, got colortype={ct} depth={bd}'

buf = zlib.decompress(idat)
bpp, stride = 4, w * 4


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    return a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)


# --- un-filter every scanline ---
prev = bytearray(stride)
rows, i = [], 0
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

# --- tight bbox over alpha ---
minx, miny, maxx, maxy = w, h, -1, -1
for y in range(h):
    r = rows[y]
    for x in range(w):
        if r[x*4+3] > 8:
            if x < minx: minx = x
            if x > maxx: maxx = x
            if y < miny: miny = y
            if y > maxy: maxy = y

minx = max(0, minx - margin); miny = max(0, miny - margin)
maxx = min(w-1, maxx + margin); maxy = min(h-1, maxy + margin)
nw, nh = maxx - minx + 1, maxy - miny + 1

# --- rebuild ---
out = bytearray()
for y in range(miny, maxy + 1):
    out.append(0)  # filter type: none
    out += rows[y][minx*4:(maxx+1)*4]


def chunk(tag, payload):
    return (struct.pack('>I', len(payload)) + tag + payload
            + struct.pack('>I', zlib.crc32(tag + payload) & 0xFFFFFFFF))


png = b'\x89PNG\r\n\x1a\n'
png += chunk(b'IHDR', struct.pack('>IIBBBBB', nw, nh, 8, 6, 0, 0, 0))
png += chunk(b'IDAT', zlib.compress(bytes(out), 9))
png += chunk(b'IEND', b'')
open(dst, 'wb').write(png)

print(f'{w}x{h}  ->  {nw}x{nh}   (cropped {minx}L {w-1-maxx}R {miny}T {h-1-maxy}B, margin {margin})')
print(f'wrote {dst}  ({len(png):,} bytes)')
