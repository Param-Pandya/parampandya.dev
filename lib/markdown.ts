import fs from "fs";
import path from "path";

export interface Frontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  published: string;
  readingTime?: string;
  featured?: boolean;
  coverImage?: string;
  slug: string;
}

export interface BlogPostParsed {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML format
  rawMarkdown: string; // Raw body content
  category: string;
  coverImage: string;
  publishedDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function parseFrontmatter(fileContent: string): { data: Partial<Frontmatter>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: fileContent };
  }
  
  const yamlContent = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  
  const data: Record<string, any> = {};
  yamlContent.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join(":").trim();
      
      // Remove surrounding quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      
      // Parse arrays
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          const jsonVal = value.replace(/'/g, '"');
          data[key] = JSON.parse(jsonVal);
        } catch {
          data[key] = value.substring(1, value.length - 1).split(",").map((s) => s.trim());
        }
      } else if (value === "true") {
        data[key] = true;
      } else if (value === "false") {
        data[key] = false;
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content };
}

export function getBlogPosts(): BlogPostParsed[] {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const posts: BlogPostParsed[] = [];
  
  function walkDir(currentPath: string) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith(".md") && file !== "README.md" && !file.startsWith(".")) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = parseFrontmatter(fileContent);
        
        if (data.slug) {
          // Compute reading time dynamically
          const wordCount = content.split(/\s+/).filter(Boolean).length;
          const calculatedReadingTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;
          
          posts.push({
            id: `post-${data.slug}`,
            slug: data.slug,
            title: data.title || "Untitled",
            excerpt: data.description || "",
            content: renderMarkdownToHtml(content),
            rawMarkdown: content,
            category: data.category || "All",
            coverImage: data.coverImage || "/projects/deepfake.png",
            publishedDate: data.published || "Unknown Date",
            readingTime: data.readingTime || calculatedReadingTime,
            author: {
              name: data.author || "Param Pandya",
              role: "Senior AI & ML Research Engineer",
              avatar: "https://github.com/Param-Pandya.png",
            },
            tags: data.tags || [],
            featured: data.featured || false,
          });
        }
      }
    }
  }
  
  walkDir(contentDir);
  
  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getPostBySlug(slug: string): BlogPostParsed | null {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split(/\r?\n/);
  const toc: TocItem[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const level = trimmed.startsWith("## ") ? 2 : 3;
      const text = trimmed.replace(/^#{2,3}\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      toc.push({ id, text, level });
    }
  }
  
  return toc;
}

function highlightSyntax(code: string, language: string): string {
  if (language !== "python" && language !== "javascript" && language !== "typescript" && language !== "js" && language !== "ts") {
    return code;
  }
  
  let html = code;
  html = html.replace(/(\/\/.*|#.*)/g, '<span class="text-slate-400 dark:text-slate-500 italic">$1</span>');
  html = html.replace(/(".*?"|'.*?')/g, '<span class="text-emerald-600 dark:text-emerald-400 font-semibold">$1</span>');
  
  const keywords = /\b(def|class|import|from|return|if|else|elif|for|in|while|try|except|raise|const|let|var|function|async|await|default|export)\b/g;
  html = html.replace(keywords, '<span class="text-indigo-600 dark:text-indigo-400 font-bold">$1</span>');
  
  const builtins = /\b(print|str|int|float|list|dict|set|type|range|json|self|this|console|log)\b/g;
  html = html.replace(builtins, '<span class="text-cyan-600 dark:text-cyan-400 font-semibold">$1</span>');

  return html;
}

function renderInlineStyles(text: string): string {
  let html = text;
  
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  html = html
    .replace(/&lt;span class="math-inline font-serif(.*?)&gt;([\s\S]*?)&lt;\/span&gt;/g, '<span class="math-inline font-serif$1>$2</span>')
    .replace(/&lt;div class="math-block font-serif(.*?)&gt;([\s\S]*?)&lt;\/div&gt;/g, '<div class="math-block font-serif$1>$2</div>');

  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    return `<div class="my-6 text-center"><img src="${src}" alt="${alt}" class="rounded-2xl max-w-full border border-slate-200 dark:border-white/10 shadow-lg mx-auto" /><p class="text-xs text-slate-500 font-mono mt-2">${alt}</p></div>`;
  });

  // Inline Code
  html = html.replace(/`([^`\n]+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/5 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">$1</code>');

  // Bold
  html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*([\s\S]*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-emerald-600 dark:text-emerald-400 hover:underline hover:text-emerald-500 font-semibold transition-colors">$1</a>');

  // Footnote Reference
  html = html.replace(/\[\^(.*?)\]/g, '<sup class="text-emerald-600 dark:text-emerald-400 font-mono font-bold"><a href="#fn-$1" id="fnref-$1">$1</a></sup>');

  return html;
}

function renderListItem(content: string): string {
  const taskMatch = content.match(/^\[([ xX])\]\s+(.*)/);
  if (taskMatch) {
    const checked = taskMatch[1].toLowerCase() === "x";
    return `<li class="list-none flex items-start gap-2.5">
      <input type="checkbox" disabled class="mt-1 rounded border-slate-300 dark:border-white/10 text-emerald-600 focus:ring-emerald-500 cursor-not-allowed" ${checked ? "checked" : ""} />
      <span>${renderInlineStyles(taskMatch[2])}</span>
    </li>`;
  }
  return `<li>${renderInlineStyles(content)}</li>`;
}

function renderBlockquote(quote: string): string {
  const lines = quote.split("\n");
  const firstLine = lines[0].trim();
  
  const admonitionMatch = firstLine.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
  
  if (admonitionMatch) {
    const type = admonitionMatch[1].toUpperCase();
    const body = lines.slice(1).join("<br />");
    
    const config: Record<string, { border: string; bg: string; text: string; label: string }> = {
      NOTE: { border: "border-blue-500", bg: "bg-blue-500/5", text: "text-blue-500", label: "Note" },
      TIP: { border: "border-emerald-500", bg: "bg-emerald-500/5", text: "text-emerald-500", label: "Tip" },
      IMPORTANT: { border: "border-indigo-500", bg: "bg-indigo-500/5", text: "text-indigo-500", label: "Important" },
      WARNING: { border: "border-amber-500", bg: "bg-amber-500/5", text: "text-amber-500", label: "Warning" },
      CAUTION: { border: "border-rose-500", bg: "bg-rose-500/5", text: "text-rose-500", label: "Caution" },
    };
    
    const theme = config[type] || config.NOTE;
    
    return `<div class="border-l-4 ${theme.border} ${theme.bg} p-4 rounded-r-2xl my-6 text-sm">
      <div class="font-mono font-bold uppercase tracking-wider text-xs ${theme.text} mb-1">
        ${theme.label}
      </div>
      <div class="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">${renderInlineStyles(body)}</div>
    </div>`;
  }
  
  const formattedBody = lines.join("<br />");
  return `<blockquote class="border-l-4 border-slate-300 dark:border-white/10 pl-4 py-1.5 my-6 text-slate-500 dark:text-slate-400 italic text-[17px] leading-relaxed font-medium">
    ${renderInlineStyles(formattedBody)}
  </blockquote>`;
}

function renderTable(headers: string[], rows: string[][]): string {
  const headCells = headers.map(h => `<th class="px-4 py-3 text-left font-mono text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.02]">${renderInlineStyles(h)}</th>`).join("");
  const rowHtml = rows.map(r => {
    const cells = r.map(c => `<td class="px-4 py-3 text-sm text-slate-650 dark:text-slate-200 border-b border-slate-200 dark:border-white/5">${renderInlineStyles(c)}</td>`).join("");
    return `<tr>${cells}</tr>`;
  }).join("");
  
  return `<div class="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-950/40 shadow-xl">
    <table class="w-full border-collapse">
      <thead>
        <tr>${headCells}</tr>
      </thead>
      <tbody>
        ${rowHtml}
      </tbody>
    </table>
  </div>`;
}

export function renderMarkdownToHtml(markdown: string): string {
  // Pre-process footnotes and math to make sure they compile nicely
  let processed = markdown.replace(/\$\$\r?\n([\s\S]*?)\r?\n\$\$/g, (match, math) => {
    return `<div class="math-block font-serif text-lg text-indigo-600 dark:text-indigo-400 my-6 text-center bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10">${math.trim()}</div>`;
  });
  
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    return `<span class="math-inline font-serif text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10 font-semibold">${math.trim()}</span>`;
  });

  const lines = processed.split(/\r?\n/);
  const result: string[] = [];
  let inCode = false;
  let codeLanguage = "";
  let codeBuffer: string[] = [];
  
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  
  let inBlockquote = false;
  let blockquoteBuffer: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // --- Code Block handling ---
    if (trimmed.startsWith("```")) {
      if (inCode) {
        inCode = false;
        const codeContent = codeBuffer.join("\n");
        if (codeLanguage === "mermaid") {
          result.push(`<div class="mermaid bg-slate-100 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-white/5 my-6 text-center select-none font-mono text-xs overflow-x-auto">${codeContent}</div>`);
        } else {
          const highlighted = highlightSyntax(codeContent, codeLanguage);
          result.push(`<pre class="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 overflow-x-auto font-mono text-sm leading-relaxed my-6 text-slate-800 dark:text-slate-200"><code>${highlighted}</code></pre>`);
        }
        codeBuffer = [];
        codeLanguage = "";
      } else {
        inCode = true;
        codeLanguage = trimmed.substring(3).trim().toLowerCase();
      }
      continue;
    }
    
    if (inCode) {
      codeBuffer.push(line);
      continue;
    }
    
    // --- Blockquote / Admonition handling ---
    if (trimmed.startsWith(">")) {
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteBuffer = [];
      }
      const quoteText = line.substring(line.indexOf(">") + 1).trim();
      blockquoteBuffer.push(quoteText);
      continue;
    } else if (inBlockquote && !trimmed.startsWith(">") && trimmed !== "") {
      const quoteText = line.trim();
      blockquoteBuffer.push(quoteText);
      continue;
    } else if (inBlockquote && (trimmed === "" || i === lines.length - 1)) {
      inBlockquote = false;
      const fullQuote = blockquoteBuffer.join("\n");
      result.push(renderBlockquote(fullQuote));
      blockquoteBuffer = [];
      if (trimmed === "") continue;
    }
    
    // --- Table handling ---
    const isTableRow = line.startsWith("|") && line.endsWith("|");
    if (isTableRow) {
      const cells = line.split("|").map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
        tableRows = [];
      } else {
        const isSeparator = cells.every(c => c.startsWith("-"));
        if (!isSeparator) {
          tableRows.push(cells);
        }
      }
      continue;
    } else if (inTable && !isTableRow) {
      inTable = false;
      result.push(renderTable(tableHeaders, tableRows));
      tableHeaders = [];
      tableRows = [];
    }
    
    // --- Blank line handles list closure or spacing ---
    if (trimmed === "") {
      if (inList) {
        result.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
        listType = null;
      }
      continue;
    }
    
    // --- List handling ---
    const matchUnordered = line.match(/^(\s*)([-\*]|\+)\s+(.*)/);
    const matchOrdered = line.match(/^(\s*)(\d+)\.\s+(.*)/);
    
    if (matchUnordered) {
      const content = matchUnordered[3];
      if (!inList || listType !== "ul") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push(`<ul class="list-disc pl-6 my-4 space-y-2 text-[17px] leading-relaxed text-slate-700 dark:text-slate-100 font-medium">`);
        inList = true;
        listType = "ul";
      }
      result.push(renderListItem(content));
      continue;
    }
    
    if (matchOrdered) {
      const content = matchOrdered[3];
      if (!inList || listType !== "ol") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push(`<ol class="list-decimal pl-6 my-4 space-y-2 text-[17px] leading-relaxed text-slate-700 dark:text-slate-100 font-medium">`);
        inList = true;
        listType = "ol";
      }
      result.push(renderListItem(content));
      continue;
    }
    
    // --- Headings ---
    if (trimmed.startsWith("# ")) {
      result.push(`<h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-12 mb-6 scroll-mt-24 font-mono">${renderInlineStyles(trimmed.substring(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      const headingText = trimmed.substring(3);
      const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      result.push(`<h2 id="${headingId}" class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-10 mb-5 scroll-mt-24 font-mono border-b border-slate-200 dark:border-white/5 pb-2">${renderInlineStyles(headingText)}</h2>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      const headingText = trimmed.substring(4);
      const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      result.push(`<h3 id="${headingId}" class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-8 mb-4 scroll-mt-24 font-mono">${renderInlineStyles(headingText)}</h3>`);
      continue;
    }
    
    // --- Standard Paragraph ---
    result.push(`<p class="text-[17px] leading-relaxed text-slate-750 dark:text-slate-200 font-medium my-4">${renderInlineStyles(trimmed)}</p>`);
  }
  
  if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
  if (inTable) result.push(renderTable(tableHeaders, tableRows));
  if (inBlockquote) result.push(renderBlockquote(blockquoteBuffer.join("\n")));
  
  return result.join("\n");
}
