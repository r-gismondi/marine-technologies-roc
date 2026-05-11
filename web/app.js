const documentSections = window.UROC_DOCUMENT_SECTIONS || [];
const state = {
  documents: [],
  activePath: "",
  searchText: "",
};

documentSections.forEach((section) => {
  section.documents.forEach((document) => {
    state.documents.push({
      title: document.title,
      path: document.path,
      audience: document.audience,
      sectionId: section.id,
      sectionLabel: section.label,
    });
  });
});

const sectionNav = document.querySelector("#section-nav");
const searchInput = document.querySelector("#document-search");
const content = document.querySelector("#document-content");
const documentTitle = document.querySelector("#document-title");
const themeToggle = document.querySelector("#theme-toggle");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function inlineMarkdown(value, currentPath) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const resolved = resolveDocumentPath(href, currentPath);
      if (resolved && findDocument(resolved)) {
        return `<a href="#${encodeURIComponent(resolved)}" data-doc-path="${escapeHtml(resolved)}">${label}</a>`;
      }

      return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${label}</a>`;
    });
}

function renderMarkdown(markdown, currentPath) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCode = false;
  let codeLanguage = "";
  let codeLines = [];
  let inList = false;
  let inTable = false;

  const renderCodeBlock = () => {
    const code = escapeHtml(codeLines.join("\n"));
    if (codeLanguage === "mermaid") {
      return `<div class="diagram-card"><div class="mermaid">${code}</div></div>`;
    }

    return `<pre><code>${code}</code></pre>`;
  };

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  const closeTable = () => {
    if (inTable) {
      html.push("</tbody></table>");
      inTable = false;
    }
  };

  const renderTableRow = (line, isHeader = false) => {
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
    const tag = isHeader ? "th" : "td";
    return `<tr>${cells.map((cell) => `<${tag}>${inlineMarkdown(cell, currentPath)}</${tag}>`).join("")}</tr>`;
  };

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(renderCodeBlock());
        codeLines = [];
        codeLanguage = "";
        inCode = false;
      } else {
        closeList();
        closeTable();
        codeLanguage = line.replace(/^```/, "").trim().toLowerCase();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (/^\|.+\|$/.test(line) && /^\|?[-:\s|]+\|?$/.test(lines[index + 1] || "")) {
      closeList();
      html.push(`<table><thead>${renderTableRow(line, true)}</thead><tbody>`);
      inTable = true;
      return;
    }

    if (inTable && /^\|?[-:\s|]+\|?$/.test(line)) {
      return;
    }

    if (inTable && /^\|.+\|$/.test(line)) {
      html.push(renderTableRow(line));
      return;
    }

    closeTable();

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length, 3);
      html.push(`<h${level}>${inlineMarkdown(heading[2], currentPath)}</h${level}>`);
      return;
    }

    const listItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (listItem) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(listItem[1], currentPath)}</li>`);
      return;
    }

    if (!line.trim()) {
      closeList();
      html.push("");
      return;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line, currentPath)}</p>`);
  });

  closeList();
  closeTable();

  if (inCode) {
    html.push(renderCodeBlock());
  }

  return html.join("\n");
}

async function renderDiagrams() {
  if (!window.mermaid) return;

  try {
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: document.documentElement.dataset.theme === "dark" ? "dark" : "default",
    });
    await window.mermaid.run({ querySelector: ".mermaid" });
  } catch (error) {
    console.warn("Diagram rendering failed", error);
  }
}

function findDocument(path) {
  return state.documents.find((document) => document.path === path);
}

function resolveDocumentPath(href, currentPath) {
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) {
    return "";
  }

  const cleanHref = href.split("#")[0];
  if (!cleanHref.endsWith(".md")) {
    return "";
  }

  const currentParts = currentPath.split("/");
  currentParts.pop();
  const combined = [...currentParts, ...cleanHref.split("/")];
  const normalized = [];

  combined.forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") {
      normalized.pop();
    } else {
      normalized.push(part);
    }
  });

  return normalized.join("/");
}

function renderNavigation() {
  const query = state.searchText.toLowerCase();
  let visibleSections = 0;

  sectionNav.querySelectorAll(".section").forEach((section) => {
    let visibleDocuments = 0;

    section.querySelectorAll(".doc-link").forEach((link) => {
      const linkPath = link.dataset.docPath || pathFromLink(link);
      const matches = link.textContent.toLowerCase().includes(query);

      link.hidden = !matches;
      link.classList.toggle("active", linkPath === state.activePath);

      if (matches) {
        visibleDocuments += 1;
      }
    });

    section.hidden = visibleDocuments === 0;
    if (visibleDocuments > 0) {
      visibleSections += 1;
    }
  });

  let emptyState = sectionNav.querySelector(".nav-empty-state");
  if (!emptyState) {
    emptyState = document.createElement("div");
    emptyState.className = "empty-state nav-empty-state";
    emptyState.textContent = "No document titles match this search.";
    sectionNav.appendChild(emptyState);
  }

  emptyState.hidden = visibleSections > 0;
}

async function loadDocument(path, updateHash = true) {
  const documentMeta = findDocument(path) || state.documents[0];
  state.activePath = documentMeta.path;
  renderNavigation();

  documentTitle.textContent = documentMeta.title;
  content.innerHTML = `<div class="empty-state">Loading ${escapeHtml(documentMeta.title)}...</div>`;

  if (updateHash) {
    history.replaceState(null, "", `#${encodeURIComponent(documentMeta.path)}`);
  }

  try {
    const response = await fetch(`../${documentMeta.path}`);
    if (!response.ok) {
      throw new Error(`Unable to load ${documentMeta.path}`);
    }

    const markdown = await response.text();
    content.innerHTML = renderMarkdown(markdown, documentMeta.path);
    wireDocumentLinks();
    renderDiagrams();
    content.focus();
  } catch (error) {
    content.innerHTML = `<div class="error-state"><strong>Could not load document.</strong><br>${escapeHtml(error.message)}</div>`;
  }
}

function wireDocumentLinks() {
  content.querySelectorAll("[data-doc-path]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      loadDocument(link.dataset.docPath);
    });
  });
}

function pathFromLink(link) {
  const href = link.getAttribute("href") || "";
  return href.replace(/^\.\.\//, "").split("#")[0];
}

function wireNavigationLinks() {
  sectionNav.querySelectorAll(".doc-link").forEach((link) => {
    const linkPath = pathFromLink(link);
    const documentMeta = findDocument(linkPath);

    if (!documentMeta) return;

    link.dataset.docPath = documentMeta.path;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      loadDocument(documentMeta.path);
    });
  });
}

function loadInitialDocument() {
  const hashPath = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  loadDocument(findDocument(hashPath) ? hashPath : state.documents[0].path, false);
}

function configureSearch() {
  searchInput.addEventListener("input", () => {
    state.searchText = searchInput.value.trim();
    renderNavigation();
  });
}

function configureTheme() {
  const storedTheme = localStorage.getItem("urocPortalTheme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.textContent = theme === "dark" ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to day mode" : "Switch to night mode");
    themeToggle.title = theme === "dark" ? "Switch to day mode" : "Switch to night mode";
  };

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("urocPortalTheme", nextTheme);
    applyTheme(nextTheme);
  });
}

if (!state.documents.length) {
  renderNavigation();
} else {
  wireNavigationLinks();
  renderNavigation();
  configureSearch();
  configureTheme();
  loadInitialDocument();
}
