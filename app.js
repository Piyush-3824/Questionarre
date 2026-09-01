// ════════════════════════════════════════════════════════════════
//  JavaPractice – app.js
//  Real Java compiler via local Node.js server (server.js)
//  The local server uses your installed JDK (javac + java)
// ════════════════════════════════════════════════════════════════

function getCompilerBaseUrl() {
  const saved = localStorage.getItem('jp_compiler_url');
  if (saved) return saved.replace(/\/+$/, '');
  
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' || 
                  window.location.protocol === 'file:';
  
  return isLocal ? 'http://localhost:7654' : 'https://questionarre.onrender.com';
}

function getCompilerUrl() { return `${getCompilerBaseUrl()}/run`; }
function getPingUrl()     { return `${getCompilerBaseUrl()}/ping`; }

// ── State ──
let currentIdx = 0;
let solved     = new Set(JSON.parse(localStorage.getItem('jp_solved')   || '[]'));
let attempted  = new Set(JSON.parse(localStorage.getItem('jp_attempted')|| '[]'));
let userCode   = JSON.parse(localStorage.getItem('jp_code') || '{}');
let termCollapsed = false;
let cmEditor   = null;           // CodeMirror instance
let errorMarks = [];             // line decorations for compiler errors
let isRunning  = false;

// ── Java keywords + common Collection class names for hints ──
const JAVA_KEYWORDS = [
  'public','private','protected','static','void','int','double','float',
  'long','char','boolean','byte','short','String','return','new','if','else',
  'for','while','do','switch','case','break','continue','class','interface',
  'extends','implements','import','package','this','super','null','true','false',
  'final','abstract','try','catch','finally','throw','throws','instanceof',
  'ArrayList','LinkedList','HashSet','HashMap','LinkedHashSet','TreeSet','TreeMap',
  'Scanner','System','Math','Collections','Arrays','Integer','Double','Character',
  'Map','List','Set','Queue','Stack','Deque','Iterator',
  'getOrDefault','containsKey','contains','add','remove','get','put','size',
  'entrySet','keySet','values','next','hasNext','sort','println','print',
  'nextInt','nextLine','nextDouble','valueOf','parseInt','toString',
  'Map.Entry','entry.getKey','entry.getValue',
];

// ── Quick-insert keyword chips shown in the bar ──
const KEYWORD_CHIPS = [
  { label: 'ArrayList<>',    code: 'ArrayList<Integer> list = new ArrayList<>();' },
  { label: 'LinkedList<>',   code: 'LinkedList<Integer> list = new LinkedList<>();' },
  { label: 'HashSet<>',      code: 'HashSet<Integer> set = new HashSet<>();' },
  { label: 'HashMap<>',      code: 'HashMap<Integer, Integer> map = new HashMap<>();' },
  { label: 'LinkedHashSet<>',code: 'LinkedHashSet<String> lhs = new LinkedHashSet<>();' },
  { label: 'getOrDefault',   code: 'map.getOrDefault(key, 0) + 1' },
  { label: 'for-each',       code: 'for (int val : list) {\n    \n}' },
  { label: 'Map.Entry',      code: 'for (Map.Entry<Integer,Integer> e : map.entrySet()) {\n    System.out.println(e.getKey() + " " + e.getValue());\n}' },
  { label: 'Integer.valueOf', code: 'Integer.valueOf(id)' },
  { label: 'Collections.sort',code: 'Collections.sort(list);' },
  { label: 'Scanner',        code: 'Scanner sc = new Scanner(System.in);' },
  { label: 'remove(val)',    code: '.remove(Integer.valueOf(id));' },
];

// ════════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initCodeMirror();
  buildKeywordBar();
  buildSidebar();
  loadProblem(0);
  updateHeader();
  checkPistonStatus();
  const apiStatusEl = document.getElementById('apiStatus');
  if (apiStatusEl) {
    apiStatusEl.style.cursor = 'pointer';
    apiStatusEl.title = 'Click to configure Compiler URL (Localhost or Cloud/Render)';
    apiStatusEl.onclick = configureCompilerUrl;
  }
  document.getElementById('sidebarToggle').onclick = () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  };
});

function configureCompilerUrl() {
  const current = getCompilerBaseUrl();
  const next = prompt(
    'Enter Java Compiler Backend URL:\n(e.g., https://my-java-compiler.onrender.com or http://localhost:7654)',
    current
  );
  if (next !== null && next.trim()) {
    localStorage.setItem('jp_compiler_url', next.trim());
    showToast('Compiler URL updated', 'success');
    checkPistonStatus();
  }
}

// ════════════════════════════════════════════════════════════════
//  CODEMIRROR SETUP
// ════════════════════════════════════════════════════════════════
function initCodeMirror() {
  const host = document.getElementById('cmHost');
  cmEditor = CodeMirror(host, {
    mode: 'text/x-java',
    theme: 'default',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    extraKeys: {
      'Tab': (cm) => {
        if (cm.somethingSelected()) cm.indentSelection('add');
        else cm.execCommand('insertSoftTab');
      },
      'Shift-Tab': (cm) => cm.indentSelection('subtract'),
      'Ctrl-/': (cm) => cm.execCommand('toggleComment'),
      'Ctrl-Enter': () => runTests(),
      'Ctrl-Space': (cm) => {
        CodeMirror.showHint(cm, CodeMirror.hint.anyword, {
          completeSingle: false,
          words: JAVA_KEYWORDS,
        });
      },
    },
  });

  // Auto-hint after typing
  cmEditor.on('inputRead', (cm, change) => {
    if (change.text[0].match(/[\w.]/)) {
      CodeMirror.showHint(cm, javaHint, { completeSingle: false });
    }
    autoSaveCode();
  });
  cmEditor.on('change', autoSaveCode);

  // Make CM fill its container
  cmEditor.setSize('100%', '100%');
}

// Custom hint function that merges CM anyword + our keyword list
function javaHint(cm) {
  const cur = cm.getCursor();
  const token = cm.getTokenAt(cur);
  const word = token.string.replace(/[^a-zA-Z0-9_<>.]/g, '');
  if (!word) return;

  const start = token.start;
  const end   = cur.ch;
  const matches = JAVA_KEYWORDS
    .filter(k => k.toLowerCase().startsWith(word.toLowerCase()))
    .slice(0, 20);

  return { list: matches, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end) };
}

// ════════════════════════════════════════════════════════════════
//  KEYWORD BAR
// ════════════════════════════════════════════════════════════════
function buildKeywordBar() {
  const bar = document.getElementById('keywordBar');
  KEYWORD_CHIPS.forEach(chip => {
    const btn = document.createElement('button');
    btn.className = 'kw-chip';
    btn.textContent = chip.label;
    btn.title = 'Insert: ' + chip.code;
    btn.onclick = () => {
      const doc = cmEditor.getDoc();
      const cur = doc.getCursor();
      doc.replaceRange(chip.code, cur);
      cmEditor.focus();
    };
    bar.appendChild(btn);
  });
}

// ════════════════════════════════════════════════════════════════
//  SIDEBAR
// ════════════════════════════════════════════════════════════════
function buildSidebar() {
  const list = document.getElementById('problemList');
  list.innerHTML = '';
  PROBLEMS.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = `problem-item ${solved.has(i) ? 'solved' : ''} ${i === currentIdx ? 'active' : ''}`;
    el.id = `pi-${i}`;
    el.onclick = () => loadProblem(i);
    el.innerHTML = `
      <span class="problem-item-num">${p.id}</span>
      <span class="problem-item-title">${p.title}</span>
      <span class="problem-item-diff diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
      <span class="problem-item-check">&#10003;</span>`;
    list.appendChild(el);
  });
}

function refreshSidebarSelection() {
  PROBLEMS.forEach((_, i) => {
    const el = document.getElementById(`pi-${i}`);
    if (!el) return;
    el.className = `problem-item ${solved.has(i) ? 'solved' : ''} ${i === currentIdx ? 'active' : ''}`;
  });
}

function prevProblem() {
  if (currentIdx > 0) loadProblem(currentIdx - 1);
  else showToast('Already on first problem', 'error');
}
function nextProblem() {
  if (currentIdx < PROBLEMS.length - 1) loadProblem(currentIdx + 1);
  else showToast('Already on last problem', 'error');
}

// ════════════════════════════════════════════════════════════════
//  LOAD PROBLEM
// ════════════════════════════════════════════════════════════════
function loadProblem(idx) {
  currentIdx = idx;
  const p = PROBLEMS[idx];

  // Description
  document.getElementById('problemNumber').textContent = `#${p.id}`;
  document.getElementById('problemTitle').textContent  = p.title;
  const badge = document.getElementById('difficultyBadge');
  badge.textContent = p.difficulty;
  badge.className   = `difficulty-badge ${p.difficulty.toLowerCase()}`;

  const tagsHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('problemBody').innerHTML = `
    <div class="collection-type">&#x1F4E6; ${p.collection}</div>
    <div class="tag-list">${tagsHtml}</div>
    ${p.description}`;

  document.getElementById('hintBox').innerHTML      = p.hint;
  document.getElementById('solutionCode').innerHTML = `<pre>${escHtml(p.solution)}</pre>`;

  // Editor
  clearErrorHighlights();
  const saved = userCode[idx];
  cmEditor.setValue(saved !== undefined ? saved : p.starterCode);
  cmEditor.clearHistory();
  cmEditor.focus();

  // Reset terminal
  switchTermTab('results');
  renderPendingCards();
  clearConsole();
  appendConsole('info', `Loaded: ${p.title}`);
  appendConsole('info', 'Write your solution above, then click "Run & Compile" (Ctrl+Enter).');
  document.getElementById('terminalPanel').classList.remove('collapsed');
  termCollapsed = false;

  switchTab('desc');
  refreshSidebarSelection();
  document.getElementById(`pi-${idx}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  updateProgressBar();
}

// ════════════════════════════════════════════════════════════════
//  TABS
// ════════════════════════════════════════════════════════════════
function switchTab(tab) {
  ['desc','hint','solution'].forEach(t => {
    document.getElementById(`panel${cap(t)}`).classList.toggle('hidden', t !== tab);
    document.getElementById(`tab${cap(t)}`).classList.toggle('active', t === tab);
  });
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function switchTermTab(tab) {
  ['results','console'].forEach(t => {
    document.getElementById(`tab${cap(t)}`).classList.toggle('hidden', t !== tab);
    document.getElementById(`tt${cap(t)}`).classList.toggle('active', t === tab);
  });
}

function toggleTerminal() {
  termCollapsed = !termCollapsed;
  document.getElementById('terminalPanel').classList.toggle('collapsed', termCollapsed);
}

// ════════════════════════════════════════════════════════════════
//  EDITOR HELPERS
// ════════════════════════════════════════════════════════════════
function resetCode() {
  clearErrorHighlights();
  cmEditor.setValue(PROBLEMS[currentIdx].starterCode);
  cmEditor.clearHistory();
  delete userCode[currentIdx];
  localStorage.setItem('jp_code', JSON.stringify(userCode));
  showToast('Code reset to starter template', '');
}

function autoSaveCode() {
  if (!cmEditor) return;
  userCode[currentIdx] = cmEditor.getValue();
  localStorage.setItem('jp_code', JSON.stringify(userCode));
}

function formatCode() {
  if (!cmEditor) return;
  const lines = cmEditor.getValue().split('\n');
  let level = 0;
  const formatted = lines.map(raw => {
    const line = raw.trim();
    if (!line) return '';
    if (line.startsWith('}')) level = Math.max(0, level - 1);
    const out = '    '.repeat(level) + line;
    if (line.endsWith('{')) level++;
    return out;
  }).join('\n');
  cmEditor.setValue(formatted);
  showToast('Code formatted', '');
}

function clearErrorHighlights() {
  errorMarks.forEach(m => m.clear());
  errorMarks = [];
}

function highlightErrorLine(lineNum) {
  // lineNum is 1-based from javac
  const line = lineNum - 1;
  if (line < 0 || line >= cmEditor.lineCount()) return;
  const mark = cmEditor.addLineClass(line, 'background', 'error-line');
  errorMarks.push(mark);
  cmEditor.scrollIntoView({ line, ch: 0 }, 80);
}

// ════════════════════════════════════════════════════════════════
//  CONSOLE HELPERS
// ════════════════════════════════════════════════════════════════
function clearConsole() {
  document.getElementById('consoleOutput').innerHTML = '';
}

function clearTerminal() {
  clearConsole();
  renderPendingCards();
}

function appendConsole(type, text) {
  const out = document.getElementById('consoleOutput');
  const lines = String(text).split('\n');
  lines.forEach(line => {
    const span = document.createElement('span');
    span.className = `console-line ${type}`;
    span.textContent = line;
    out.appendChild(span);
  });
  out.scrollTop = out.scrollHeight;
}

// ════════════════════════════════════════════════════════════════
//  API STATUS CHECK
// ════════════════════════════════════════════════════════════════
async function checkPistonStatus() {
  const dot  = document.querySelector('.api-dot');
  const text = document.getElementById('apiStatusText');
  const baseUrl = getCompilerBaseUrl();
  const isLocal = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

  try {
    const res = await fetch(getPingUrl(), { signal: AbortSignal.timeout(15000) });
    if (res.ok) {
      const data = await res.json();
      dot.classList.add('online');
      dot.classList.remove('offline');
      text.textContent = isLocal ? 'Local JDK Ready' : 'Cloud Compiler Online';
      appendConsole('success', `✓ Java compiler ready (${data.javaVersion ? 'JDK ' + data.javaVersion : 'Online'})`);
      appendConsole('info', `Connected to: ${baseUrl}`);
    } else throw new Error();
  } catch {
    dot.classList.add('offline');
    dot.classList.remove('online');
    text.textContent = 'Server Offline';
    appendConsole('error', `✗ Compiler server not responding at: ${baseUrl}`);
    if (isLocal) {
      appendConsole('warn', 'To run locally: Open a terminal and run: node server.js');
    } else {
      appendConsole('warn', 'Cloud server is waking up or URL is incorrect. Click status badge to change.');
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  MAIN: RUN TESTS
// ════════════════════════════════════════════════════════════════
async function runTests() {
  if (isRunning) return;
  const code = cmEditor.getValue().trim();

  // ── Guard: empty code or skeleton with no implementation ──
  const isStarter = code === PROBLEMS[currentIdx].starterCode.trim();
  const hasTodo = code.includes('// TODO');
  const hasReturn = code.includes('return ') || code.includes('System.out');

  if (!code || !code.includes('class')) {
    showToast('Please write Java code first!', 'error');
    appendConsole('error', '✗ No Java code found. Your editor is empty or missing a class definition.');
    switchTermTab('console');
    document.getElementById('terminalPanel').classList.remove('collapsed');
    return;
  }

  if (isStarter || (hasTodo && !hasReturn)) {
    showToast('Add your solution in the TODO sections!', 'error');
    appendConsole('error', '✗ The code still has unimplemented TODO sections.');
    appendConsole('warn',  '  Fill in the TODO comments with your logic before running.');
    switchTermTab('console');
    document.getElementById('terminalPanel').classList.remove('collapsed');
    return;
  }

  isRunning = true;
  clearErrorHighlights();

  const btn = document.getElementById('btnRun');
  btn.classList.add('running');
  btn.disabled = true;

  attempted.add(currentIdx);
  localStorage.setItem('jp_attempted', JSON.stringify([...attempted]));
  updateHeader();

  // Open terminal
  document.getElementById('terminalPanel').classList.remove('collapsed');
  termCollapsed = false;

  clearConsole();
  appendConsole('prompt', `$ javac Main.java && java Main`);
  appendConsole('info', 'Compiling and running with local JDK...');

  const p = PROBLEMS[currentIdx];

  // ── Render all cards as "running" ──
  renderRunningCards(p);
  switchTermTab('results');

  const results = [];
  let passCount = 0;
  let firstCompileError = null;
  const t0 = Date.now();

  for (let i = 0; i < p.testCases.length; i++) {
    const tc = p.testCases[i];
    setCardRunning(i);

    let result;
    try {
      result = await runSingleTest(code, tc.input, i);
    } catch (err) {
      result = { pass: false, got: '', stderr: err.message, timedOut: false, compileError: true };
    }

    results.push({ ...result, tc });

    if (result.compileError && !firstCompileError) {
      firstCompileError = result.stderr;
    }

    const pass = judgeResult(result, tc);
    result.pass = pass;
    if (pass) passCount++;

    renderCard(i, result, tc);

    // If compile error, fail remaining cards immediately (same error)
    if (result.compileError) {
      for (let j = i + 1; j < p.testCases.length; j++) {
        results.push({ pass: false, got: '', stderr: firstCompileError, compileError: true, tc: p.testCases[j] });
        renderCard(j, results[results.length - 1], p.testCases[j]);
      }
      break;
    }
  }

  const elapsed = Date.now() - t0;
  const allPass = passCount === p.testCases.length;

  // ── Console output ──
  appendConsole('sep', '─'.repeat(56));

  if (firstCompileError) {
    appendConsole('error', '✗ COMPILATION FAILED');
    appendConsole('sep', '');
    renderCompileErrors(firstCompileError, code);
  } else {
    if (allPass) {
      appendConsole('success', `✓ ALL ${passCount}/${p.testCases.length} TESTS PASSED  (${elapsed}ms)`);
    } else {
      appendConsole('warn', `✗ ${passCount}/${p.testCases.length} TESTS PASSED  (${elapsed}ms)`);
      // Show first failure detail
      const fail = results.find(r => !r.pass);
      if (fail && fail.stderr) {
        appendConsole('sep', '');
        appendConsole('error', 'Runtime error:');
        appendConsole('compile-err', fail.stderr.trim().slice(0, 500));
      }
    }
  }

  // ── Mark solved ──
  if (allPass) {
    solved.add(currentIdx);
    localStorage.setItem('jp_solved', JSON.stringify([...solved]));
    refreshSidebarSelection();
    updateHeader();
    updateProgressBar();
    showToast(`🎉 All tests passed! Problem solved!`, 'success');
    launchConfetti();
  } else if (!firstCompileError) {
    showToast(`${passCount}/${p.testCases.length} tests passed`, passCount > 0 ? '' : 'error');
  } else {
    showToast('Compilation Error — check the console', 'error');
    switchTermTab('console');
  }

  btn.classList.remove('running');
  btn.disabled = false;
  isRunning = false;
}

// ════════════════════════════════════════════════════════════════
//  LOCAL JAVA COMPILER CALL (via server.js)
// ════════════════════════════════════════════════════════════════
async function runSingleTest(code, stdin, testIndex) {
  let resp;
  const compilerUrl = getCompilerUrl();
  try {
    resp = await fetch(compilerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, stdin }),
      signal: AbortSignal.timeout(20000),
    });
  } catch (fetchErr) {
    throw new Error(
      `Cannot reach compiler server at ${compilerUrl}.\n` +
      `Make sure the server is running (locally or on Render/cloud).\n` +
      `(${fetchErr.message})`
    );
  }

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`Compiler server error (HTTP ${resp.status}): ${txt}`);
  }

  const data = await resp.json();

  if (data.error) throw new Error(data.error);

  return {
    compileError: data.compileError === true,
    got: (data.stdout || '').trim(),
    stderr: data.stderr || '',
    stdout: data.stdout || '',
    exitCode: data.exitCode ?? 0,
    timedOut: data.timedOut === true,
  };
}

// ════════════════════════════════════════════════════════════════
//  JUDGE RESULT
// ════════════════════════════════════════════════════════════════
function judgeResult(result, tc) {
  if (result.compileError || result.timedOut || result.exitCode !== 0) return false;

  const got      = normalizeOutput(result.got);
  const expected = normalizeOutput(tc.expected);

  if (tc.checkCount) {
    // For HashSet-based problems, order is not guaranteed
    // Compare sorted token arrays
    const gotTokens = got.split(/\s+/).filter(Boolean).map(Number).sort((a,b)=>a-b);
    const expCount  = parseInt(tc.expected);
    return gotTokens.length === expCount;
  }

  if (tc.anyOrder) {
    // Compare sorted tokens
    const a = got.split(/\s+/).filter(Boolean).sort().join(' ');
    const b = expected.split(/\s+/).filter(Boolean).sort().join(' ');
    return a === b;
  }

  return got === expected;
}

function normalizeOutput(s) {
  return String(s || '').trim().replace(/\r\n/g, '\n').replace(/ +\n/g, '\n').replace(/\n +/g, '\n');
}

// ════════════════════════════════════════════════════════════════
//  COMPILE ERROR PARSER
// ════════════════════════════════════════════════════════════════
function renderCompileErrors(stderr, code) {
  if (!stderr) return;
  const lines = stderr.split('\n');
  const lineRe = /Main\.java:(\d+):\s*(error|warning):\s*(.+)/;

  lines.forEach(line => {
    const m = line.match(lineRe);
    if (m) {
      const lineNum = parseInt(m[1]);
      const kind    = m[2];
      const msg     = m[3];
      highlightErrorLine(lineNum);
      appendConsole('compile-err', `  Line ${lineNum}: [${kind.toUpperCase()}] ${msg}`);
    } else if (line.trim().startsWith('^')) {
      appendConsole('line-pointer', line);
    } else if (line.trim()) {
      appendConsole('error', '  ' + line);
    }
  });

  appendConsole('sep', '');
  appendConsole('info', 'Tip: Check the highlighted lines in your editor (marked in red).');
  appendConsole('info', 'Common fixes: missing semicolons, wrong type, unclosed brackets, import missing.');
}

// ════════════════════════════════════════════════════════════════
//  TEST CARD RENDERING
// ════════════════════════════════════════════════════════════════
function renderPendingCards() {
  const list = document.getElementById('testcaseList');
  list.innerHTML = '';
  PROBLEMS[currentIdx].testCases.forEach((tc, i) => {
    list.appendChild(buildCard(i, 'pending', 'PENDING', tc, null));
  });
}

function renderRunningCards(p) {
  const list = document.getElementById('testcaseList');
  list.innerHTML = '';
  p.testCases.forEach((tc, i) => {
    list.appendChild(buildCard(i, 'running', 'RUNNING', tc, null));
  });
}

function setCardRunning(i) {
  const card = document.getElementById(`tc-${i}`);
  if (!card) return;
  card.className = 'tc-card running';
  card.querySelector('.tc-badge').textContent = '⟳ RUNNING';
}

function renderCard(i, result, tc) {
  const card = document.getElementById(`tc-${i}`);
  if (!card) return;

  if (result.compileError) {
    card.className = 'tc-card fail';
    card.innerHTML = cardHTML(i, 'COMPILE ERR', 'fail', tc, null, null,
      result.stderr?.split('\n').find(l => l.includes('error:')) || 'Compilation failed'
    );
    return;
  }
  if (result.timedOut) {
    card.className = 'tc-card fail';
    card.innerHTML = cardHTML(i, 'TIME LIMIT', 'fail', tc, null, null, 'Code took too long (>8s)');
    return;
  }
  if (result.exitCode !== 0 && !result.pass) {
    card.className = 'tc-card fail';
    card.innerHTML = cardHTML(i, 'RUNTIME ERR', 'fail', tc, result.got, null, result.stderr?.split('\n')[0] || 'Runtime exception');
    return;
  }

  card.className = `tc-card ${result.pass ? 'pass' : 'fail'}`;
  card.innerHTML = cardHTML(i, result.pass ? '✓ PASS' : '✗ FAIL',
    result.pass ? 'pass' : 'fail', tc, result.got, tc.expected, null
  );
}

function buildCard(i, statusClass, statusText, tc, result) {
  const div = document.createElement('div');
  div.className = `tc-card ${statusClass}`;
  div.id = `tc-${i}`;
  div.innerHTML = cardHTML(i, statusText, statusClass, tc, null, null, null);
  return div;
}

function cardHTML(i, statusText, statusClass, tc, got, expected, errMsg) {
  const showGot  = got  !== null && got  !== undefined;
  const showExp  = expected !== null && expected !== undefined;
  const showErr  = errMsg !== null && errMsg !== undefined;

  const inputSnip = tc.input.replace(/\n/g, ' ↵ ').slice(0, 55) + (tc.input.length > 55 ? '…' : '');

  return `
    <div class="tc-head">
      <span class="tc-num">Test ${i + 1}</span>
      <span class="tc-badge">${statusText}</span>
    </div>
    <div class="tc-row">
      <span class="tc-key">Case</span>
      <span class="tc-val">${escHtml(tc.description)}</span>
    </div>
    <div class="tc-row">
      <span class="tc-key">Input</span>
      <span class="tc-val">${escHtml(inputSnip)}</span>
    </div>
    ${showExp ? `<div class="tc-row">
      <span class="tc-key">Expected</span>
      <span class="tc-val exp">${escHtml(expected)}</span>
    </div>` : ''}
    ${showGot ? `<div class="tc-row">
      <span class="tc-key">Got</span>
      <span class="tc-val ${statusClass === 'pass' ? 'ok' : 'wrong'}">${escHtml(got || '(empty)')}</span>
    </div>` : ''}
    ${showErr ? `<div class="tc-row">
      <span class="tc-key">Error</span>
      <span class="tc-val wrong">${escHtml(errMsg)}</span>
    </div>` : ''}
  `;
}

// ════════════════════════════════════════════════════════════════
//  HEADER / PROGRESS
// ════════════════════════════════════════════════════════════════
function updateHeader() {
  document.getElementById('solvedCount').textContent = solved.size;
}

function updateProgressBar() {
  const fill = document.getElementById('progressBarFill');
  if (fill) fill.style.width = `${(solved.size / PROBLEMS.length) * 100}%`;
}

// ════════════════════════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════════════════════════
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type || ''}`;
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => { t.className = 'toast'; }, 3000);
}

// ════════════════════════════════════════════════════════════════
//  CONFETTI
// ════════════════════════════════════════════════════════════════
function launchConfetti() {
  const c = document.getElementById('confettiCanvas');
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  const ctx = c.getContext('2d');
  const colors = ['#00d4ff','#7c3aed','#10d48e','#f59e0b','#ec4899','#ffffff'];
  const pieces = Array.from({ length: 130 }, () => ({
    x: Math.random() * c.width, y: -10 - Math.random() * 120,
    vx: (Math.random() - .5) * 5, vy: 2.5 + Math.random() * 3.5,
    r: 4 + Math.random() * 6, rot: Math.random() * Math.PI * 2,
    rs: (Math.random() - .5) * .18,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  let f = 0;
  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of pieces) {
      p.x += p.vx; p.y += p.vy; p.rot += p.rs; p.vy += .06;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - p.y / c.height * 1.4);
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .55);
      ctx.restore();
    }
    if (++f < 200) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, c.width, c.height);
  };
  draw();
}

// ════════════════════════════════════════════════════════════════
//  UTILITY
// ════════════════════════════════════════════════════════════════
function escHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
