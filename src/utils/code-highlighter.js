function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Tokenize and highlight code with the VS Code / Atom One Dark theme palette:
 * - Keywords: #c678dd (Purple)
 * - Functions/Methods: #61afef (Blue)
 * - Types/Classes: #e5c07b (Gold/Yellow)
 * - Strings: #98c379 (Green)
 * - Constants/Numbers/Booleans: #d19a66 (Orange)
 * - Properties/Keys: #e06c75 (Coral Red)
 * - Comments: #5c6370 (Italic Muted Gray)
 * - Operators: #56b6c2 (Cyan)
 * - Punctuation/Default: #abb2bf
 */
export function highlightCode(code, lang = "typescript") {
  if (!code) return "";

  const rules = [
    { type: "comment", regex: /(?:\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/ },
    { type: "string", regex: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/ },
    { type: "keyword", regex: /\b(?:class|interface|enum|extends|implements|public|private|protected|static|abstract|final|override|const|let|var|function|def|return|if|else|for|while|do|switch|case|break|continue|default|new|this|super|self|import|from|export|package|try|catch|finally|throw|throws|async|await|yield|typedef|struct|virtual|template|typename|operator|namespace|using|auto)\b/ },
    { type: "constant", regex: /\b(?:true|false|null|undefined|None|True|False|nullptr)\b|\b\d+(?:\.\d+)?\b/ },
    { type: "type", regex: /\b(?:string|number|boolean|any|void|never|unknown|int|float|double|char|long|short|byte|bool|size_t|std)\b|\b[A-Z][a-zA-Z0-9_]*\b/ },
    { type: "function", regex: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/ },
    { type: "property", regex: /(?<=\.)[a-zA-Z_$][a-zA-Z0-9_$]*/ },
    { type: "operator", regex: /(?:=>|===|==|=|!=|!==|\+=|-=|\*=|\/=|&&|\|\||!|\+|-|\*|\/|<=|>=|->|::)/ }
  ];

  const masterRegex = new RegExp(rules.map(r => `(${r.regex.source})`).join("|"), "gm");

  let html = "";
  let lastIndex = 0;
  let match;

  while ((match = masterRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      html += escapeHtml(code.slice(lastIndex, match.index));
    }

    const tokenStr = match[0];
    let matchedType = "text";
    for (let i = 0; i < rules.length; i++) {
      if (match[i + 1] !== undefined) {
        matchedType = rules[i].type;
        break;
      }
    }

    html += `<span class="od-${matchedType}">${escapeHtml(tokenStr)}</span>`;
    lastIndex = masterRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    html += escapeHtml(code.slice(lastIndex));
  }

  return html;
}

/**
 * Formats and syntax-highlights JSON objects using One Dark theme palette.
 */
export function highlightJson(obj) {
  let json = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
  json = escapeHtml(json);

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "od-constant";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "od-property"; // One Dark Coral Red for object keys
        } else {
          cls = "od-string"; // One Dark Green for string values
        }
      } else if (/true|false/.test(match)) {
        cls = "od-constant"; // One Dark Orange for booleans
      } else if (/null/.test(match)) {
        cls = "od-constant"; // One Dark Orange for null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

