# JavaPractice – Java Collections Practice Platform

A **LeetCode-style interactive coding platform** with real Java compilation, test case grading, and detailed compiler diagnostics.

---

## 🚀 Live Cloud Deployment Guide (Free)

### 1. Deploy Frontend on Vercel
1. Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your GitHub repository: `https://github.com/Piyush-3824/Questionarre`.
3. Keep default settings and click **Deploy**.
4. Your frontend will be live at `https://your-project.vercel.app`!

### 2. Deploy Java Compiler Backend on Render (Free)
1. Go to [Render.com](https://render.com) and sign in with GitHub.
2. Click **New +** → **Web Service**.
3. Select your `Questionarre` repository.
4. Render will automatically detect the **Dockerfile**!
5. Select the **Free** instance type and click **Create Web Service**.
6. Once deployed, Render gives you a public URL (e.g. `https://java-compiler-xyz.onrender.com`).

### 3. Connect Frontend to your Cloud Backend
1. Open your Vercel website in the browser.
2. Click on the **API Status badge** (top right) in the header.
3. Paste your Render backend URL (e.g. `https://java-compiler-xyz.onrender.com`).
4. You're all set! Anyone worldwide can now compile and run Java code directly from your site.

---

## 💻 Local Development Setup

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
```

The header badge will show **"Local JDK Ready"** when the compiler is connected.

---

## 📚 Problems Covered
| # | Problem | Collection | Difficulty |
|---|---------|-----------|------------|
| 1 | Add New Product Codes | ArrayList | Easy |
| 2 | Count a Requested Item | ArrayList | Easy |
| 3 | Select High-Priority Tasks | ArrayList | Easy |
| 4 | Remove Cancelled IDs | ArrayList | Easy |
| 5 | Maintain an Updated Queue | ArrayList | Medium |
| 6 | Detect Increasing Temperatures | LinkedList | Easy |
| 7 | Find Increasing Scores | LinkedList | Easy |
| 8 | Find Repeated Visit IDs | LinkedList + HashMap | Medium |
| 9 | Remove Duplicate Employee IDs | HashSet | Easy |
| 10 | Find Common Product Codes | HashSet | Medium |
| 11 | Find the Second Distinct Lowest Value | HashSet | Medium |
| 12 | Count Product Frequencies | HashMap | Medium |
| 13 | Find the First Unique Character | HashMap | Medium |
| 14 | Preserve Unique Notification Types | LinkedHashSet | Easy |
| 15 | Analyze Repeated Student Activity | HashMap + ArrayList | Hard |

---

## 📂 Project Structure
```
├── index.html      # Main UI (LeetCode-style 3-pane layout)
├── style.css       # Dark theme, neon accents & CodeMirror styles
├── problems.js     # All 15 problems with 5 test cases each & solutions
├── app.js          # CodeMirror editor, state, and test runner
├── server.js       # Node.js backend — runs local/cloud javac & java
├── Dockerfile      # Alpine Linux + OpenJDK 17 container for cloud hosting
├── render.yaml     # Render cloud blueprint
└── vercel.json     # Vercel deployment config
```

---

## ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Run & Compile |
| `Tab` | Insert 4 spaces |
| `Ctrl + /` | Toggle comment |
| `Ctrl + Space` | Java Autocomplete hints |
