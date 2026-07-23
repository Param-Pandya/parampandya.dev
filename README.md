# AI & ML Engineering Portfolio & Technical Blog 🚀

A high-performance, documentation-style developer portfolio and technical blog. Built on top of **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, this workspace features a custom-built, zero-dependency Markdown compilation engine that serves dynamic articles entirely from markdown files with custom syntax highlighting, LaTeX math, admonitions, and auto-generated outlines.

---

## 📸 Screenshots

### Dark Mode - Hero Landing Page
![Dark Mode Hero Landing Page](/public/assets/home_dark.png)

### Light Mode - Research & Publications Details
![Light Mode Research and Publications](/public/assets/research_light.png)

---

## 🛠 Tech Stack

*   **Framework**: Next.js 16 (App Router, static site pre-generation)
*   **Language**: TypeScript
*   **Styling**: Vanilla Tailwind CSS
*   **Markdown Engine**: Custom Zero-Dependency Parser (in `lib/markdown.ts`)
*   **Aesthetics**: Glassmorphism UI cards, dark/light theme toggle, custom text selection highlighting.
*   **Icons**: Lucide React
*   **Analytics**: Vercel Analytics

---

## ✨ Features

### 1. Dynamic Markdown Blog Engine
*   **Zero-Dependency Parsing**: Scans and reads files recursively from category subfolders (e.g. `content/rag/`). Extracts YAML frontmatter headers dynamically.
*   **LaTeX Math Equations**: Renders inline mathematical symbols ($...$) and block-level center equations ($$...$$) in clean serif typography.
*   **Syntax Highlighting**: Real-time syntax parser for code blocks (Python, JS, TS, etc.) with custom highlight rules.
*   **Admonitions/Callouts**: Renders GitHub-style warning, note, important, caution, and tip callouts (`[!NOTE]`, `[!WARNING]`, etc.) with responsive color bounds and custom borders.
*   **Table of Contents (TOC)**: Automatically extracts `h2` and `h3` tags, assigning matching anchor IDs to render a sticky sidebar outline linking to page headings.
*   **Task Lists & Tables**: Parses markdown checkboxes (`- [ ]`, `- [x]`) and database tables with clean border alignments.

### 2. Research Interests & Timeline
*   Accurate publications references (e.g., IEEE AESPC 2024 abstract and meta keys).
*   Interactive interests sections detailing LLMs, RAG, Healthcare AI, and Computer Vision.
*   Filterable chronology timeline listing academic research and engineering milestones.

### 3. "What I'm Doing Now" Snap Log
*   DERIVED snapshot of what the developer is currently building (CareerAI, GMSAC, AI Blog), learning (LangGraph, MCP, vector search), reading, and focusing on.
*   Keeps target milestones and status indicators up-to-date in one centralized place.

### 4. Open Source Page
*   Dedicated planned contributions checklist detailing target AI engineering libraries, LLM tooling, and Python packages in development.

---

## ⚡ Development Setup

To run this portfolio locally:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Param-Pandya/Portfolio-web.git
    cd Portfolio-web
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) inside your web browser.

4.  **Production Compilation**:
    To compile and verify all static page generation targets:
    ```bash
    npm run build
    npm run start
    ```

---

## 🚚 Deployment

Deploys automatically via **Vercel** with complete integration across GitHub branch triggers. Every pull request receives an isolated staging deployment.

---

## 🏛 License

© Copyright 2026 Param Pandya.
Feel free to fork, experiment, and remix! Please preserve original copyright attributes.
