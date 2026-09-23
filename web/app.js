const documentSections = window.ROC_DOCUMENT_SECTIONS || [];
const state = {
  documents: [],
  activePath: "",
  searchText: "",
  searchActiveIndex: -1,
  contentIndexReady: false,
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
const content = document.querySelector("#document-content");
const documentTitle = document.querySelector("#document-title");
const documentSection = document.querySelector("#document-section");
const themeToggle = document.querySelector("#theme-toggle");
const navToggle = document.querySelector("#nav-toggle");
const navBackdrop = document.querySelector("#nav-backdrop");
const homeLink = document.querySelector("#home-link");
const searchForm = document.querySelector("#site-search-form");
const searchInput = document.querySelector("#site-search");
const searchClear = document.querySelector("#search-clear");
const searchResults = document.querySelector("#search-results");
const searchStatus = document.querySelector("#search-status");
const markdownRequests = new Map();

const SECTION_ICONS = {
  start:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  strategy:
    '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4l2.5 2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  goals:
    '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  organization:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M8 17v-4h8v4M12 13V9M6 20h4v-6H6zm8 0h4v-6h-4zM10 9h4V4h-4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  procedures:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M7 4h10v16H7z" stroke="currentColor" stroke-width="1.7"/><path d="M10 8h4M10 12h4M10 16h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  quality:
    '<svg viewBox="0 0 24 24" fill="none"><path d="m7.5 12.5 3 3 6-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.7"/></svg>',
  migration:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  templates:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M7 4h7l5 5v11H7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 4v5h5M9 13h6M9 16h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
};

const THEME_ICONS = {
  dark: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  light:
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16.5 13.2A6 6 0 0 1 10.8 7.5 6.2 6.2 0 1 0 16.5 13.2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
};

function repositoryRootUrl() {
  return new URL("../", window.location.href);
}

function documentFileUrl(path) {
  return new URL(`${path}?v=31`, repositoryRootUrl()).toString();
}

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

function parseVisualFields(source) {
  const fields = {};
  source.split("\n").forEach((line) => {
    const match = line.match(/^\s*([^:#]+):\s*(.+?)\s*$/);
    if (match) {
      fields[match[1].trim()] = match[2].trim();
    }
  });
  return fields;
}

function renderRocVisual(source) {
  const fields = parseVisualFields(source);
  const type = fields.type || "ratio";

  if (type === "ratio") {
    const today = fields.today || "1.0";
    const target = fields.target || "0.80";
    const saved = fields.saved || "20%";
    const stretch = fields.stretch || "";
    const todayNum = Number.parseFloat(today) || 1;
    const targetNum = Number.parseFloat(target) || 0.8;
    const barWidth = Math.max(8, Math.min(100, Math.round((targetNum / todayNum) * 100)));
    const stretchNote = stretch
      ? ` Stretch is <strong>${escapeHtml(stretch)} : 1</strong> if knowledge, problem management, and assist tools are funded.`
      : "";
    return `
      <div class="goal-visual" aria-label="Time per completed task today versus year-one committed target">
        <div class="goal-visual-head">
          <p class="goal-kicker">Highest priority</p>
          <h3>Time per completed task</h3>
          <p>Lower is better. Today absorbed teams run at <strong>${escapeHtml(today)} : 1</strong>. Year-one <strong>commit</strong> is <strong>${escapeHtml(target)} : 1</strong>.${stretchNote}</p>
        </div>
        <div class="ratio-grid">
          <article class="ratio-card">
            <span class="ratio-label">Today</span>
            <strong class="ratio-value">${escapeHtml(today)}</strong>
            <span class="ratio-unit">time : task conclusion</span>
            <div class="ratio-bar" aria-hidden="true"><span style="width:100%"></span></div>
            <p>Information Technology (IT), Support, C-Comm, and other teams being absorbed by ROC.</p>
          </article>
          <div class="ratio-arrow" aria-hidden="true">→</div>
          <article class="ratio-card target">
            <span class="ratio-label">Year-one commit</span>
            <strong class="ratio-value">${escapeHtml(target)}</strong>
            <span class="ratio-unit">time : task conclusion</span>
            <div class="ratio-bar" aria-hidden="true"><span style="width:${barWidth}%"></span></div>
            <p><strong>${escapeHtml(saved)}</strong> less time per completed task.</p>
          </article>
        </div>
      </div>`;
  }

  if (type === "allocation") {
    const fix = fields.fix || "85";
    const prevent = fields.prevent || "15";
    return `
      <div class="goal-visual" aria-label="How saved time is used">
        <div class="goal-visual-head">
          <p class="goal-kicker">Where the saved time goes</p>
          <h3>Do not just finish faster — prevent the next problem</h3>
          <p>Year-one committed mix: keep most time on delivery, and lock <strong>${escapeHtml(prevent)}%</strong> into planning and prevention — not idle time and not only more break-fix work. A 70 / 30 mix is the year-two stretch.</p>
        </div>
        <div class="split-legend">
          <span><i class="swatch fix"></i> Fixing problems ${escapeHtml(fix)}%</span>
          <span><i class="swatch prevent"></i> Planning and prevention ${escapeHtml(prevent)}%</span>
        </div>
        <div class="split-bar" role="img" aria-label="After the gain, ${escapeHtml(fix)} percent fixing problems and ${escapeHtml(prevent)} percent planning and prevention">
          <span class="split-fix" style="flex:${escapeHtml(fix)}">Fix ${escapeHtml(fix)}%</span>
          <span class="split-prevent" style="flex:${escapeHtml(prevent)}">Prevent ${escapeHtml(prevent)}%</span>
        </div>
      </div>`;
  }

  if (type === "steps") {
    const steps = ["q1", "q2", "q3", "q4"]
      .filter((key) => fields[key])
      .map((key) => {
        const [label, value] = fields[key].split("|").map((part) => part.trim());
        return { label: label || key.toUpperCase(), value: value || "" };
      });
    const items = steps
      .map(
        (step, index) => `
        <li>
          <span class="step-label">${escapeHtml(step.label)}</span>
          <strong>${escapeHtml(step.value)}</strong>
          ${index < steps.length - 1 ? '<span class="step-join" aria-hidden="true">→</span>' : ""}
        </li>`
      )
      .join("");
    return `
      <div class="goal-visual" aria-label="Gradual efficiency path">
        <div class="goal-visual-head">
          <p class="goal-kicker">Gradual path</p>
          <h3>Reduce time per task in steps, then lock the gain into prevention</h3>
        </div>
        <ol class="step-path">${items}</ol>
      </div>`;
  }

  return `<pre><code>${escapeHtml(source)}</code></pre>`;
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
    const code = codeLines.join("\n");
    if (codeLanguage === "mermaid") {
      return `<div class="diagram-card"><div class="mermaid">${escapeHtml(code)}</div></div>`;
    }

    if (codeLanguage === "roc-visual") {
      return renderRocVisual(code);
    }

    return `<pre><code>${escapeHtml(code)}</code></pre>`;
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

function documentViewerUrl(path) {
  const url = new URL(window.location.href);
  url.hash = encodeURIComponent(path);
  return url.toString();
}

function findDocumentPathFromChartLabel(label) {
  const compact = label.replace(/\s+/g, " ").trim();
  if (!compact) return "";

  const sopMatch = compact.match(/SOP-(?:ROC-)?0*(\d{1,3})\b/i);
  if (sopMatch) {
    const number = sopMatch[1].padStart(3, "0");
    const sop = state.documents.find((document) => document.path.includes(`SOP-ROC-${number}`));
    if (sop) return sop.path;
  }

  const normalized = compact.toLowerCase();
  const exactTitle = state.documents.find((document) => document.title.toLowerCase() === normalized);
  if (exactTitle) return exactTitle.path;

  return "";
}

function wireMermaidDocumentLinks() {
  document.querySelectorAll(".mermaid .node").forEach((node) => {
    const path = findDocumentPathFromChartLabel(node.textContent || "");
    if (!path || !findDocument(path)) return;

    const documentMeta = findDocument(path);
    node.classList.add("is-doc-link");
    node.setAttribute("role", "link");
    node.setAttribute("tabindex", "0");
    node.setAttribute("aria-label", `Open ${documentMeta.title} in a new tab`);
    node.style.cursor = "pointer";

    const openDocument = (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.open(documentViewerUrl(path), "_blank", "noopener,noreferrer");
    };

    node.addEventListener("click", openDocument);
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        openDocument(event);
      }
    });
  });
}

function mermaidTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  return {
    startOnLoad: false,
    securityLevel: "strict",
    theme: dark ? "dark" : "base",
    themeVariables: dark
      ? {
          primaryColor: "#16324f",
          primaryTextColor: "#e6edf5",
          primaryBorderColor: "#5aa2ff",
          lineColor: "#8ea0b6",
          secondaryColor: "#101b2b",
          tertiaryColor: "#0c1624",
          background: "#101b2b",
          mainBkg: "#16324f",
          nodeBorder: "#5aa2ff",
          clusterBkg: "#0c1624",
          titleColor: "#e6edf5",
          fontFamily: "IBM Plex Sans, Segoe UI, sans-serif",
        }
      : {
          primaryColor: "#dce9f8",
          primaryTextColor: "#122033",
          primaryBorderColor: "#0b63ce",
          lineColor: "#5c6b7c",
          secondaryColor: "#f7f9fc",
          tertiaryColor: "#eef2f6",
          background: "#ffffff",
          mainBkg: "#dce9f8",
          nodeBorder: "#0b63ce",
          clusterBkg: "#f7f9fc",
          titleColor: "#122033",
          fontFamily: "IBM Plex Sans, Segoe UI, sans-serif",
        },
  };
}

async function renderDiagrams() {
  if (!window.mermaid) return;

  try {
    document.querySelectorAll(".mermaid").forEach((el) => {
      if (!el.dataset.source) {
        el.dataset.source = el.textContent.trim();
      } else {
        el.removeAttribute("data-processed");
        el.innerHTML = el.dataset.source;
      }
    });

    window.mermaid.initialize(mermaidTheme());
    await window.mermaid.run({ querySelector: ".mermaid" });
    wireMermaidDocumentLinks();
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

function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  navBackdrop.hidden = !open;
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close document library" : "Open document library");
}

function buildNavigation() {
  sectionNav.innerHTML = documentSections
    .map((section) => {
      const links = section.documents
        .map(
          (document) =>
            `<a class="doc-link" href="#${encodeURIComponent(document.path)}" data-doc-path="${escapeHtml(document.path)}">${escapeHtml(document.title)}</a>`
        )
        .join("");

      return `
        <section class="nav-group" data-section-id="${escapeHtml(section.id)}">
          <button class="nav-group-toggle" type="button" aria-expanded="false">
            <span class="nav-group-icon">${SECTION_ICONS[section.id] || SECTION_ICONS.templates}</span>
            <span>${escapeHtml(section.label)}</span>
            <span class="nav-group-count">${section.documents.length}</span>
            <span class="nav-chevron" aria-hidden="true"></span>
          </button>
          <div class="nav-group-panel">${links}</div>
        </section>`;
    })
    .join("");

  sectionNav.querySelectorAll(".nav-group-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".nav-group");
      const willOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  sectionNav.querySelectorAll(".doc-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      loadDocument(link.dataset.docPath);
      setNavOpen(false);
    });
  });
}

function searchTokens(query) {
  return (query.toLowerCase().match(/[a-z0-9]{2,}/g) || []).filter((token, index, tokens) => tokens.indexOf(token) === index);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function plainTextFromMarkdown(markdown) {
  return markdown
    .split("\n")
    .filter((line) => !/^\s*\|?[:|\-\s]+\|?\s*$/.test(line))
    .join("\n")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[a-z0-9-]*/gi, " "))
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[()]/g, "")
    .replace(/[#>*_`~|[\]]/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchableText(documentMeta) {
  return [documentMeta.title, documentMeta.sectionLabel, documentMeta.plainText || ""].join("\n").toLowerCase();
}

function matchesTokens(documentMeta, tokens) {
  if (!tokens.length) return true;
  const text = searchableText(documentMeta);
  return tokens.every((token) => text.includes(token));
}

function matchScore(documentMeta, tokens) {
  const title = documentMeta.title.toLowerCase();
  const section = documentMeta.sectionLabel.toLowerCase();
  const body = (documentMeta.plainText || "").toLowerCase();
  return tokens.reduce((score, token) => {
    let next = score;
    if (title.includes(token)) next += 8;
    if (section.includes(token)) next += 3;
    if (body.includes(token)) next += 1;
    return next;
  }, 0);
}

function matchingDocuments(tokens) {
  return state.documents
    .filter((documentMeta) => matchesTokens(documentMeta, tokens))
    .sort((left, right) => matchScore(right, tokens) - matchScore(left, tokens) || left.title.localeCompare(right.title));
}

function snippetFor(documentMeta, tokens) {
  const plain = documentMeta.plainText || "";
  if (!plain || !tokens.length) return "";

  const lower = plain.toLowerCase();
  const positions = tokens.map((token) => lower.indexOf(token)).filter((index) => index !== -1);
  if (!positions.length) return "";

  const best = Math.min(...positions);
  const start = Math.max(0, plain.lastIndexOf(" ", Math.max(0, best - 50)));
  const end = Math.min(plain.length, best + 150);
  let text = plain.slice(start, end).trim();
  if (start > 0) text = `…${text}`;
  if (end < plain.length) text = `${text}…`;
  return text;
}

function highlightText(text, tokens) {
  const escaped = escapeHtml(text);
  if (!tokens.length) return escaped;
  const pattern = tokens
    .slice()
    .sort((left, right) => right.length - left.length)
    .map(escapeRegExp)
    .join("|");
  return escaped.replace(new RegExp(`(${pattern})`, "gi"), "<mark>$1</mark>");
}

function highlightContentMatches(root, tokens) {
  if (!tokens.length) return;
  const pattern = new RegExp(
    `(${tokens
      .slice()
      .sort((left, right) => right.length - left.length)
      .map(escapeRegExp)
      .join("|")})`,
    "gi"
  );
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, pre, code, .mermaid, svg, mark")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const text = node.nodeValue;
    pattern.lastIndex = 0;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let last = 0;
    let match = pattern.exec(text);
    while (match) {
      if (match.index > last) fragment.appendChild(document.createTextNode(text.slice(last, match.index)));
      const mark = document.createElement("mark");
      mark.className = "search-hit";
      mark.textContent = match[0];
      fragment.appendChild(mark);
      last = match.index + match[0].length;
      if (!match[0]) pattern.lastIndex += 1;
      match = pattern.exec(text);
    }
    if (last < text.length) fragment.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(fragment, node);
  });
}

function fetchDocumentMarkdown(path) {
  if (markdownRequests.has(path)) return markdownRequests.get(path);

  const request = (async () => {
    try {
      const response = await fetch(documentFileUrl(path));
      if (!response.ok) {
        throw new Error(`Unable to load ${path}`);
      }
      const markdown = await response.text();
      const documentMeta = findDocument(path);
      if (documentMeta) {
        documentMeta.markdown = markdown;
        documentMeta.plainText = plainTextFromMarkdown(markdown);
      }
      return markdown;
    } catch (error) {
      markdownRequests.delete(path);
      throw error;
    }
  })();

  markdownRequests.set(path, request);
  return request;
}

async function indexDocuments() {
  await Promise.all(
    state.documents.map(async (documentMeta) => {
      try {
        await fetchDocumentMarkdown(documentMeta.path);
      } catch (error) {
        documentMeta.plainText = documentMeta.plainText || "";
        console.warn("Could not index document", documentMeta.path, error);
      }
    })
  );
  state.contentIndexReady = true;
  if (state.searchText.trim()) {
    renderNavigation();
    if (document.activeElement === searchInput || !searchResults.hidden) {
      renderSearchResults();
    }
  }
}

function hideSearchResults() {
  searchResults.hidden = true;
  searchInput.setAttribute("aria-expanded", "false");
  state.searchActiveIndex = -1;
}

function setActiveSearchResult(options) {
  options.forEach((option, index) => {
    const selected = index === state.searchActiveIndex;
    option.classList.toggle("is-active", selected);
    option.setAttribute("aria-selected", String(selected));
    if (selected) {
      searchInput.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  });
  if (state.searchActiveIndex < 0) {
    searchInput.removeAttribute("aria-activedescendant");
  }
}

function openSearchResult(path) {
  hideSearchResults();
  loadDocument(path, true, { scrollToMatch: true });
  setNavOpen(false);
}

function renderSearchResults() {
  const tokens = searchTokens(state.searchText);
  searchClear.hidden = !state.searchText;
  if (!state.searchText.trim()) {
    hideSearchResults();
    searchStatus.textContent = "";
    return;
  }

  if (!tokens.length) {
    searchResults.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    searchResults.innerHTML = `<p class="search-results-note">Type at least two letters or numbers to search.</p>`;
    searchStatus.textContent = "Type at least two letters or numbers to search.";
    return;
  }

  const matches = matchingDocuments(tokens);
  const visible = matches.slice(0, 8);
  const indexingNote = state.contentIndexReady ? "" : `<p class="search-results-note">Still reading document text. Results will update when that finishes.</p>`;
  const extraNote =
    matches.length > visible.length
      ? `<p class="search-results-note">Showing ${visible.length} of ${matches.length}. Every match stays listed in the library.</p>`
      : "";

  searchResults.innerHTML = visible.length
    ? `${visible
        .map((documentMeta, index) => {
          const snippet = snippetFor(documentMeta, tokens);
          return `
            <button class="search-result" id="search-option-${index}" type="button" role="option" aria-selected="false" data-doc-path="${escapeHtml(documentMeta.path)}">
              <span class="search-result-meta">${escapeHtml(documentMeta.sectionLabel)}</span>
              <span class="search-result-title">${highlightText(documentMeta.title, tokens)}</span>
              ${snippet ? `<span class="search-result-snippet">${highlightText(snippet, tokens)}</span>` : ""}
            </button>`;
        })
        .join("")}${extraNote}${indexingNote}`
    : `<p class="search-results-note">${
        state.contentIndexReady
          ? "No documents contain all of these words."
          : "No titles match yet. Still reading document text."
      }</p>`;

  searchResults.hidden = false;
  searchInput.setAttribute("aria-expanded", "true");
  const status = matches.length === 1 ? "1 document matches." : `${matches.length} documents match.`;
  searchStatus.textContent = state.contentIndexReady ? status : `${status} Still reading document text.`;

  const options = [...searchResults.querySelectorAll(".search-result")];
  if (state.searchActiveIndex >= options.length) state.searchActiveIndex = options.length - 1;
  setActiveSearchResult(options);
  options.forEach((option) => {
    option.addEventListener("click", () => openSearchResult(option.dataset.docPath));
  });
}

function renderNavigation() {
  const tokens = searchTokens(state.searchText);
  let visibleSections = 0;

  sectionNav.querySelectorAll(".nav-group").forEach((group) => {
    let visibleDocuments = 0;
    let hasActive = false;

    group.querySelectorAll(".doc-link").forEach((link) => {
      const documentMeta = findDocument(link.dataset.docPath);
      const matches = !tokens.length || (documentMeta && matchesTokens(documentMeta, tokens));
      const isActive = link.dataset.docPath === state.activePath;
      link.hidden = !matches;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

      if (matches) {
        visibleDocuments += 1;
      }
      if (isActive) {
        hasActive = true;
      }
    });

    group.hidden = visibleDocuments === 0;
    group.classList.toggle("has-active", hasActive);

    const toggle = group.querySelector(".nav-group-toggle");
    if (tokens.length) {
      group.classList.toggle("is-open", visibleDocuments > 0);
      toggle?.setAttribute("aria-expanded", String(visibleDocuments > 0));
    } else if (hasActive) {
      group.classList.add("is-open");
      toggle?.setAttribute("aria-expanded", "true");
    }

    if (visibleDocuments > 0) {
      visibleSections += 1;
    }
  });

  let emptyState = sectionNav.querySelector(".nav-empty-state");
  if (!emptyState) {
    emptyState = document.createElement("div");
    emptyState.className = "empty-state nav-empty-state";
    emptyState.textContent = "No documents match these words.";
    sectionNav.appendChild(emptyState);
  }

  emptyState.hidden = visibleSections > 0;
}

async function loadDocument(path, updateHash = true, options = {}) {
  const documentMeta = findDocument(path) || state.documents[0];
  state.activePath = documentMeta.path;
  renderNavigation();

  documentTitle.textContent = documentMeta.title;
  documentSection.textContent = documentMeta.sectionLabel;
  document.title = `${documentMeta.title} · ROC`;
  content.innerHTML = `<div class="empty-state">Loading ${escapeHtml(documentMeta.title)}...</div>`;

  if (updateHash) {
    history.replaceState(null, "", `#${encodeURIComponent(documentMeta.path)}`);
  }

  try {
    const markdown = documentMeta.markdown || (await fetchDocumentMarkdown(documentMeta.path));
    content.innerHTML = renderMarkdown(markdown, documentMeta.path);
    wireDocumentLinks();
    await renderDiagrams();
    const tokens = searchTokens(state.searchText);
    if (tokens.length) highlightContentMatches(content, tokens);
    content.focus({ preventScroll: true });
    if (options.scrollToMatch) {
      content.querySelector(".search-hit")?.scrollIntoView({ block: "center" });
    }
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

function loadInitialDocument() {
  const hashPath = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  loadDocument(findDocument(hashPath) ? hashPath : state.documents[0].path, false);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.innerHTML = THEME_ICONS[theme];
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to day mode" : "Switch to night mode");
  themeToggle.title = theme === "dark" ? "Switch to day mode" : "Switch to night mode";
}

function configureTheme() {
  const storedTheme = localStorage.getItem("rocPortalTheme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("rocPortalTheme", nextTheme);
    applyTheme(nextTheme);
    renderDiagrams();
  });
}

function configureSearch() {
  if (!searchForm || !searchInput) return;

  const applyQuery = () => {
    state.searchText = searchInput.value;
    state.searchActiveIndex = -1;
    renderNavigation();
    renderSearchResults();
  };

  searchInput.addEventListener("input", applyQuery);
  searchInput.addEventListener("focus", () => {
    if (state.searchText.trim()) renderSearchResults();
  });

  searchInput.addEventListener("keydown", (event) => {
    const options = [...searchResults.querySelectorAll(".search-result")];
    if (event.key === "ArrowDown" && options.length) {
      event.preventDefault();
      state.searchActiveIndex = Math.min(state.searchActiveIndex + 1, options.length - 1);
      if (state.searchActiveIndex < 0) state.searchActiveIndex = 0;
      setActiveSearchResult(options);
    } else if (event.key === "ArrowUp" && options.length) {
      event.preventDefault();
      state.searchActiveIndex = Math.max(state.searchActiveIndex - 1, 0);
      setActiveSearchResult(options);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const chosen = options[state.searchActiveIndex] || options[0];
      if (chosen) openSearchResult(chosen.dataset.docPath);
    }
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const chosen = searchResults.querySelector(".search-result.is-active") || searchResults.querySelector(".search-result");
    if (chosen) openSearchResult(chosen.dataset.docPath);
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    applyQuery();
    searchInput.focus();
  });

  document.addEventListener("click", (event) => {
    if (!searchForm.contains(event.target)) hideSearchResults();
  });
}

function configureChrome() {
  navToggle.addEventListener("click", () => {
    setNavOpen(!document.body.classList.contains("nav-open"));
  });

  navBackdrop.addEventListener("click", () => setNavOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (searchResults && !searchResults.hidden) {
      hideSearchResults();
      return;
    }
    setNavOpen(false);
  });

  homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (state.documents[0]) {
      loadDocument(state.documents[0].path);
      setNavOpen(false);
    }
  });

  window.addEventListener("hashchange", () => {
    const hashPath = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (findDocument(hashPath) && hashPath !== state.activePath) {
      loadDocument(hashPath, false);
    }
  });
}

if (!state.documents.length) {
  sectionNav.innerHTML = `<div class="empty-state nav-empty-state">No documents are listed in the library.</div>`;
} else {
  buildNavigation();
  renderNavigation();
  configureTheme();
  configureSearch();
  configureChrome();
  loadInitialDocument();
  indexDocuments();
}
