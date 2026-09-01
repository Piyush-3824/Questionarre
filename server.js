// server.js - Local Java Compiler Backend
// Run with: node server.js
// This uses your installed JDK to compile and run Java code locally.

const http    = require('http');
const fs      = require('fs');
const path    = require('path');
const os      = require('os');
const { exec } = require('child_process');

const PORT    = process.env.PORT || 7654;
const HOST    = '0.0.0.0';
const TIMEOUT = 10000; // 10 seconds max per run

// CORS + response helper
function reply(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  res.end(JSON.stringify(data));
}

// Run shell command with timeout
function runCmd(cmd, options = {}) {
  return new Promise((resolve) => {
    const proc = exec(cmd, { timeout: TIMEOUT, ...options }, (err, stdout, stderr) => {
      resolve({
        stdout: stdout || '',
        stderr: stderr || '',
        exitCode: err ? (err.code || 1) : 0,
        timedOut: err && err.killed,
      });
    });
  });
}

http.createServer(async (req, res) => {
  // Handle preflight (CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    });
    return res.end();
  }

  // Health check - detect actual Java version
  if (req.url === '/ping' && req.method === 'GET') {
    runCmd('javac -version').then(r => {
      const ver = (r.stderr || r.stdout || '').match(/javac\s+([\d.]+)/)?.[1] || 'detected';
      return reply(res, 200, { status: 'ok', javaVersion: ver });
    }).catch(() => reply(res, 200, { status: 'ok', javaVersion: 'detected' }));
    return;
  }

  // Compile+run endpoint
  if (req.url === '/run' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      let payload;
      try { payload = JSON.parse(body); }
      catch { return reply(res, 400, { error: 'Invalid JSON' }); }

      const { code, stdin = '' } = payload;
      if (!code) return reply(res, 400, { error: 'No code provided' });

      // Create temp directory for this run
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'javapractice-'));
      const srcFile = path.join(tmpDir, 'Main.java');
      const stdinFile = path.join(tmpDir, 'stdin.txt');

      try {
        fs.writeFileSync(srcFile, code, 'utf8');
        fs.writeFileSync(stdinFile, stdin, 'utf8');

        // Step 1: Compile
        const compileResult = await runCmd(`javac "${srcFile}"`, { cwd: tmpDir });

        if (compileResult.exitCode !== 0) {
          // Clean up temp dir
          fs.rmSync(tmpDir, { recursive: true, force: true });

          // Sanitize stderr to remove full temp path
          const sanitized = compileResult.stderr
            .replace(new RegExp(tmpDir.replace(/\\/g, '\\\\'), 'g'), '')
            .replace(/\\Main\.java/g, 'Main.java')
            .replace(/\/Main\.java/g, 'Main.java')
            .trim();

          return reply(res, 200, {
            compileError: true,
            stderr: sanitized,
            stdout: '',
            exitCode: compileResult.exitCode,
          });
        }

        // Step 2: Run with proper stdin piping
        const runWithStdin = await runWithStdinPipe(tmpDir, stdin);

        fs.rmSync(tmpDir, { recursive: true, force: true });

        return reply(res, 200, {
          compileError: false,
          stdout: runWithStdin.stdout.trim(),
          stderr: runWithStdin.stderr.replace(/^Picked up.*\n?/m, '').trim(),
          exitCode: runWithStdin.exitCode,
          timedOut: runWithStdin.timedOut,
        });

      } catch (e) {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
        return reply(res, 500, { error: e.message });
      }
    });
    return;
  }

  reply(res, 404, { error: 'Not found' });

}).listen(PORT, HOST, () => {
  console.log(`\n  JavaPractice Compiler Server running on http://${HOST}:${PORT}`);
  console.log(`  Using Java: javac / java from PATH`);
  console.log(`  Ready for compilation requests!\n`);
});

// Run Java with proper stdin piping using child_process.spawn
function runWithStdinPipe(tmpDir, stdinData) {
  return new Promise((resolve) => {
    const { spawn } = require('child_process');
    let stdout = '';
    let stderr = '';
    let done = false;

    const proc = spawn('java', ['-cp', tmpDir, 'Main'], {
      cwd: tmpDir,
      env: { ...process.env, JAVA_TOOL_OPTIONS: '' },
    });

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        proc.kill('SIGTERM');
        resolve({ stdout, stderr, exitCode: 124, timedOut: true });
      }
    }, TIMEOUT);

    proc.stdout.on('data', d => { stdout += d.toString(); });
    proc.stderr.on('data', d => { stderr += d.toString(); });

    proc.on('close', (code) => {
      if (!done) {
        done = true;
        clearTimeout(timer);
        resolve({ stdout, stderr, exitCode: code ?? 0, timedOut: false });
      }
    });

    // Write stdin then close it
    if (stdinData) {
      proc.stdin.write(stdinData + '\n');
    }
    proc.stdin.end();
  });
}
