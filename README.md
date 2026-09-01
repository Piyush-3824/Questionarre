# JavaPractice – Java Collections Practice Platform

A **LeetCode-style interactive coding platform** built from your professor's Java Collections notes.

## Features
- ✅ **Real Java compiler** (uses your local JDK via `server.js`)
- ✅ **15 practice problems** from the PDF notes
- ✅ **CodeMirror editor** with Java syntax highlighting + autocomplete
- ✅ **Terminal console** showing exact compile errors with line numbers
- ✅ **5 test cases per problem** — graded automatically
- ✅ **Hint & Solution tabs** for guided learning
- ✅ **Progress tracking** saved in browser localStorage

## Problems Covered
| # | Problem | Collection |
|---|---------|-----------|
| 1 | Add New Product Codes | ArrayList |
| 2 | Count a Requested Item | ArrayList |
| 3 | Select High-Priority Tasks | ArrayList |
| 4 | Remove Cancelled IDs | ArrayList |
| 5 | Maintain an Updated Queue | ArrayList |
| 6 | Detect Increasing Temperatures | LinkedList |
| 7 | Find Increasing Scores | LinkedList |
| 8 | Find Repeated Visit IDs | LinkedList + HashMap |
| 9 | Remove Duplicate Employee IDs | HashSet |
| 10 | Find Common Product Codes | HashSet |
| 11 | Find the Second Distinct Lowest Value | HashSet |
| 12 | Count Product Frequencies | HashMap |
| 13 | Find the First Unique Character | HashMap |
| 14 | Preserve Unique Notification Types | LinkedHashSet |
| 15 | Analyze Repeated Student Activity | HashMap + ArrayList |

## How to Run

### Prerequisites
- Java JDK installed (`java` and `javac` in PATH)
- Node.js installed

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/Piyush-3824/Questionarre.git
cd Questionarre

# 2. Start the compiler server (keep this terminal open)
node server.js

# 3. Open index.html in your browser
# (double-click index.html or use Live Server)
```

The header will show **"Local JDK Ready"** when the compiler is connected.

## Project Structure
```
├── index.html      # Main UI (LeetCode-style layout)
├── style.css       # Dark theme with neon accents
├── problems.js     # All 15 problems + test cases + solutions
├── app.js          # Frontend logic + CodeMirror + test runner
├── server.js       # Node.js backend — real Java compiler (javac + java)
```

## Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Run & Compile |
| `Tab` | Insert 4 spaces |
| `Ctrl + /` | Toggle comment |
| `Ctrl + Space` | Autocomplete |
