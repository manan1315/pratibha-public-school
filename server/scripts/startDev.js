/**
 * One-command local dev launcher.
 *
 *   npm run go        (from the server folder)
 *
 * Starts:
 *   1. embedded MongoDB + seed data + Express API on a FIXED port (5080)
 *   2. Vite dev server on a FIXED port (5180), proxied to the API
 *
 * Ports are fixed so the URL never changes between restarts.
 * Ctrl+C stops everything.
 */
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');
const fs = require('fs');

const API_PORT = Number(process.env.PORT) || 5080;
const WEB_PORT = 5180;

const SERVER_DIR = __dirname === path.join(process.cwd(), 'scripts')
  ? process.cwd()
  : path.join(__dirname, '..');
const CLIENT_DIR = path.join(SERVER_DIR, '..', 'client');

// Resolve the vite binary directly — avoids spawning a shell, which is
// unreliable under git-bash / MSYS on Windows (cmd.exe ENOENT).
function viteBin() {
  const candidates = [
    path.join(CLIENT_DIR, 'node_modules', 'vite', 'bin', 'vite.js'),
    path.join(SERVER_DIR, '..', 'node_modules', 'vite', 'bin', 'vite.js'),
  ];
  return candidates.find((p) => fs.existsSync(p));
}

/**
 * A port only counts as free if it can be bound the same way Node's
 * default server binds it (all interfaces / IPv6 dual-stack). Checking
 * only 127.0.0.1 gives false positives when a stale process holds `::`.
 */
function portFree(port) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.once('error', () => resolve(false));
    s.once('listening', () => s.close(() => resolve(true)));
    s.listen(port); // no host -> same binding Express/Vite use
  });
}

/** Return the first free port at or after `start`. */
async function findPort(start, label) {
  for (let p = start; p < start + 40; p += 1) {
    if (await portFree(p)) {
      if (p !== start) console.log(`${label} port ${start} busy — using ${p}`);
      return p;
    }
  }
  throw new Error(`No free ${label} port near ${start}`);
}

const children = [];

function run(label, args, cwd, env) {
  // Always launch with the SAME node binary that is running this script.
  const child = spawn(process.execPath, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  children.push(child);

  const tag = `[${label}]`;
  const pipe = (stream) =>
    stream.on('data', (d) =>
      String(d).split(/\r?\n/).filter(Boolean).forEach((l) => console.log(tag, l))
    );
  pipe(child.stdout);
  pipe(child.stderr);

  child.on('error', (err) => console.log(tag, 'failed to start:', err.message));
  child.on('exit', (code) => console.log(tag, `exited (code ${code})`));
  return child;
}

(async () => {
  const vite = viteBin();
  if (!vite) {
    console.error('\nVite not found. Run:  cd client && npm install\n');
    process.exit(1);
  }

  const apiPort = await findPort(API_PORT, 'API');

  console.log('Starting Pratibha Public School — local development\n');

  // 1. API + embedded MongoDB + seed
  run('api', [path.join(SERVER_DIR, 'devServer.js')], SERVER_DIR, {
    PORT: String(apiPort),
  });

  // 2. Vite — let Vite itself pick the port (no --strictPort) and read the
  //    real URL back out of its output, so a stale listener can never
  //    leave us printing a wrong link.
  setTimeout(() => {
    const web = run('web', [vite, '--port', String(WEB_PORT)], CLIENT_DIR, {
      VITE_API_TARGET: `http://localhost:${apiPort}`,
    });

    let announced = false;
    const watch = (chunk) => {
      const m = String(chunk).match(/localhost:(\d+)/);
      if (m && !announced) {
        announced = true;
        const url = `http://localhost:${m[1]}`;
        const line = '='.repeat(60);
        setTimeout(() => {
          console.log(`\n${line}`);
          console.log(`  Website      :  ${url}`);
          console.log(`  Admin login  :  ${url}/admin/login`);
          console.log(`  API          :  http://localhost:${apiPort}`);
          console.log('  Credentials  :  admin@ppsbasna.com / PPS@admin2025');
          console.log(`${line}\n`);
        }, 400);
      }
    };
    web.stdout.on('data', watch);
    web.stderr.on('data', watch);
  }, 6000);
})();

function shutdown() {
  console.log('\nStopping...');
  children.forEach((c) => { try { c.kill(); } catch {} });
  setTimeout(() => process.exit(0), 800);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
