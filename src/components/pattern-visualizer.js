import { patternAnimations, buildMemoryFrame } from "../data/pattern-animations.js";
import { getLang, t } from "../data/i18n.js";
import { icons } from "./icons.js";

let activeTimer = null;

export function stopActiveVisualizerTimer() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
}

export function renderPatternVisualizer(container, pattern) {
  stopActiveVisualizerTimer();

  const anim = patternAnimations[pattern.id];
  if (!anim) {
    container.innerHTML = "";
    return;
  }

  let currentStepIndex = 0;
  let isPlaying = false;
  let speedMs = 2600;
  let selectedFieldIndex = 2; // Default highlight: VTable / Method Selector

  const nodesMap = {};
  anim.nodes.forEach(n => {
    nodesMap[n.id] = n;
  });

  function getLoc(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    const lang = getLang();
    return obj[lang] || obj.pt || obj.en || "";
  }

  function render() {
    const lang = getLang();
    const step = anim.steps[currentStepIndex];
    const totalSteps = anim.steps.length;
    const memoryFields = buildMemoryFrame(anim.code, step.id, step.packet, nodesMap);
    const activeField = memoryFields[selectedFieldIndex] || memoryFields[0];

    const fromNode = nodesMap[step.packet.from] || anim.nodes[0];
    const toNode = nodesMap[step.packet.to] || anim.nodes[1] || anim.nodes[0];

    const isSelfCall = fromNode.id === toNode.id;
    const midX = isSelfCall ? fromNode.x : (fromNode.x + toNode.x) / 2;
    const midY = isSelfCall ? Math.max(38, fromNode.y - 58) : (fromNode.y + toNode.y) / 2;

    container.innerHTML = `
      <section class="pe-visualizer-shell" aria-label="${t("vizTitle")}">
        <!-- Top Protocol-Explorer Telemetry Strip -->
        <div class="pe-telemetry-bar">
          <div class="pe-telemetry-left">
            <span class="pe-status-pill">
              <span class="pe-status-dot"></span>
              ${t("nowLearning")}
            </span>
            <span class="pe-pattern-code-badge">${anim.code}</span>
            <strong class="pe-telemetry-name">${pattern.name}</strong>
            <span class="pe-step-count-pill">${totalSteps} ${t("stepsLabel")}</span>
          </div>

          <div class="pe-telemetry-right">
            <div class="pe-layer-indicator" title="${t("gofLayerLabel")}">
              <span class="pe-layer-label">${t("gofLayerLabel")}</span>
              <div class="pe-layer-blocks" role="group" aria-label="${t("gofLayerLabel")}">
                <span class="pe-layer-block ${anim.layerIndex === 1 ? "active creational" : ""}" title="${t("catCreational")}">1:C</span>
                <span class="pe-layer-block ${anim.layerIndex === 2 ? "active structural" : ""}" title="${t("catStructural")}">2:S</span>
                <span class="pe-layer-block ${anim.layerIndex === 3 ? "active behavioral" : ""}" title="${t("catBehavioral")}">3:B</span>
              </div>
            </div>

            <div class="pe-scope-indicator" title="${t("scopeLabel")}">
              <span class="pe-layer-label">${t("scopeLabel")}</span>
              <div class="pe-layer-blocks">
                <span class="pe-layer-block ${anim.scopeType === "CLASS" ? "active" : ""}">${t("scopeClass")}</span>
                <span class="pe-layer-block ${anim.scopeType === "OBJECT" ? "active" : ""}">${t("scopeObject")}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step-by-Step Interactive Timeline Scrubber -->
        <div class="pe-timeline-bar" role="tablist" aria-label="${t("stepsLabel")}">
          ${anim.steps.map((s, idx) => {
            const stateClass = idx === currentStepIndex ? "active" : (idx < currentStepIndex ? "completed" : "");
            return `
              <button
                type="button"
                role="tab"
                aria-selected="${idx === currentStepIndex}"
                class="pe-step-pill ${stateClass}"
                data-step-idx="${idx}"
              >
                <span class="pe-step-num">${idx < currentStepIndex ? "✓" : `0${s.id}`}</span>
                <span class="pe-step-tag">${getLoc(s.tag)}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Main SVG Topology & Animated Message Flow Canvas -->
        <div class="pe-canvas-container">
          <svg class="pe-topology-svg" viewBox="0 0 740 300" role="img" aria-label="${pattern.name} runtime topology">
            <defs>
              <marker id="pe-arrow-muted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text-muted)" opacity="0.55" />
              </marker>
              <marker id="pe-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent-primary)" />
              </marker>
            </defs>

            <!-- Structural Connection Edges -->
            ${anim.links.map(link => {
              const n1 = nodesMap[link.from];
              const n2 = nodesMap[link.to];
              if (!n1 || !n2) return "";
              const isCurrentEdge =
                (step.packet.from === link.from && step.packet.to === link.to) ||
                (step.packet.from === link.to && step.packet.to === link.from);
              const lMidX = (n1.x + n2.x) / 2;
              const lMidY = (n1.y + n2.y) / 2 - 8;
              return `
                <g class="pe-edge-group ${isCurrentEdge ? "is-active" : ""}">
                  <line
                    x1="${n1.x}" y1="${n1.y}"
                    x2="${n2.x}" y2="${n2.y}"
                    class="pe-edge-line ${link.dashed ? "dashed" : ""} ${isCurrentEdge ? "active" : ""}"
                    marker-end="url(#${isCurrentEdge ? "pe-arrow-active" : "pe-arrow-muted"})"
                  />
                  <text x="${lMidX}" y="${lMidY}" text-anchor="middle" class="pe-edge-label">${link.label}</text>
                </g>
              `;
            }).join("")}

            <!-- Active Animated Packet Path & Gliding Capsule -->
            ${!isSelfCall ? `
              <line
                x1="${fromNode.x}" y1="${fromNode.y}"
                x2="${toNode.x}" y2="${toNode.y}"
                class="pe-active-flight-line"
                marker-end="url(#pe-arrow-active)"
              />
              <circle r="7" class="pe-packet-dot">
                <animateMotion
                  dur="${Math.max(0.9, speedMs / 1800)}s"
                  repeatCount="indefinite"
                  path="M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}"
                />
              </circle>
            ` : `
              <circle cx="${fromNode.x}" cy="${fromNode.y - 44}" r="18" class="pe-self-loop-path" fill="none" />
            `}

            <!-- Participant Nodes -->
            ${anim.nodes.map((node, nIdx) => {
              const isNodeActive = step.activeNodes && step.activeNodes.includes(node.id);
              const isSender = step.packet.from === node.id;
              const isReceiver = step.packet.to === node.id;
              const stateText = (step.nodeStates && step.nodeStates[node.id]) || "IDLE";
              const w = 156;
              const h = 68;
              const rx = node.x - w / 2;
              const ry = node.y - h / 2;
              return `
                <g
                  class="pe-node-group ${isNodeActive ? "active" : ""} ${isSender ? "is-sender" : ""} ${isReceiver ? "is-receiver" : ""} color-${node.color}"
                  data-node-idx="${nIdx}"
                  tabindex="0"
                  role="button"
                  aria-label="${node.label} ${node.stereotype} ${stateText}"
                >
                  <rect x="${rx}" y="${ry}" width="${w}" height="${h}" rx="8" class="pe-node-box" />
                  <text x="${node.x}" y="${ry + 16}" text-anchor="middle" class="pe-node-stereotype">${node.stereotype}</text>
                  <text x="${node.x}" y="${ry + 34}" text-anchor="middle" class="pe-node-title">${node.label}</text>
                  <text x="${rx + 10}" y="${ry + 55}" class="pe-node-addr">${node.addr}</text>
                  <text x="${rx + w - 10}" y="${ry + 55}" text-anchor="end" class="pe-node-state-badge">${stateText}</text>
                </g>
              `;
            }).join("")}

            <!-- Floating Call Packet Pill -->
            <g class="pe-floating-packet-pill" transform="translate(${midX}, ${midY})">
              <rect x="-92" y="-15" width="184" height="30" rx="6" class="pe-packet-pill-bg" />
              <text x="0" y="4" text-anchor="middle" class="pe-packet-pill-text">${step.packet.call}</text>
            </g>
          </svg>
        </div>

        <!-- Playback Controls & Step Narration Deck -->
        <div class="pe-controls-deck">
          <div class="pe-playback-buttons">
            <button type="button" class="pe-ctrl-btn primary" id="pe-btn-play" aria-label="${isPlaying ? t("btnPause") : t("btnPlay")}">
              ${isPlaying ? icons.pause || "❚❚" : icons.play || "▶"}
              <span>${isPlaying ? t("btnPause") : t("btnPlay")}</span>
            </button>
            <button type="button" class="pe-ctrl-btn" id="pe-btn-prev" ${currentStepIndex === 0 ? "disabled" : ""} aria-label="${t("btnPrevStep")}">
              ← <span>${t("btnPrevStep")}</span>
            </button>
            <button type="button" class="pe-ctrl-btn" id="pe-btn-next" ${currentStepIndex === totalSteps - 1 ? "disabled" : ""} aria-label="${t("btnNextStep")}">
              <span>${t("btnNextStep")}</span> →
            </button>
            <button type="button" class="pe-ctrl-btn" id="pe-btn-reset" aria-label="${t("btnReset")}">
              ↺ <span>${t("btnReset")}</span>
            </button>
          </div>

          <div class="pe-speed-selector" role="group" aria-label="${t("speedLabel")}">
            <span class="pe-speed-label">${t("speedLabel")}:</span>
            <button type="button" class="pe-speed-btn ${speedMs === 3800 ? "active" : ""}" data-speed="3800">0.5x</button>
            <button type="button" class="pe-speed-btn ${speedMs === 2600 ? "active" : ""}" data-speed="2600">1x</button>
            <button type="button" class="pe-speed-btn ${speedMs === 1400 ? "active" : ""}" data-speed="1400">2x</button>
          </div>
        </div>

        <!-- Step Explanation Callout -->
        <div class="pe-step-narration-box">
          <div class="pe-step-narration-header">
            <span class="pe-step-badge">${t("stepPrefix")} 0${step.id}/0${totalSteps} • ${getLoc(step.tag)}</span>
            <code class="pe-inflight-code">${fromNode.label} → ${toNode.label} : ${step.packet.call} ⇒ ${step.packet.returnVal}</code>
          </div>
          <h3 class="pe-step-title">${getLoc(step.title)}</h3>
          <p class="pe-step-desc">${getLoc(step.desc)}</p>
        </div>

        <!-- Deep Packet / Memory Frame Split Inspector -->
        <div class="pe-inspector-grid">
          <!-- Left: Layer & Call Stack Breakdown -->
          <div class="pe-inspector-panel">
            <div class="pe-inspector-header">
              <span>${t("inspectorCallStackTitle")}</span>
              <span class="pe-inspector-sub">4 FRAMES • 32 BYTES</span>
            </div>
            <div class="pe-layer-list" role="listbox" aria-label="${t("inspectorCallStackTitle")}">
              ${memoryFields.map((field, fIdx) => `
                <div
                  class="pe-layer-row ${selectedFieldIndex === fIdx ? "selected" : ""} color-${field.color}"
                  data-field-idx="${fIdx}"
                  tabindex="0"
                  role="option"
                  aria-selected="${selectedFieldIndex === fIdx}"
                >
                  <div class="pe-layer-row-top">
                    <span class="pe-layer-byte-range">[0x${field.byteStart.toString(16).padStart(2, "0").toUpperCase()}..0x${field.byteEnd.toString(16).padStart(2, "0").toUpperCase()}]</span>
                    <strong class="pe-layer-name">${field.name}</strong>
                  </div>
                  <div class="pe-layer-value"><code>${field.value}</code></div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Right: Byte-by-Byte Hex & ASCII Memory Dump -->
          <div class="pe-inspector-panel">
            <div class="pe-inspector-header">
              <span>${t("inspectorByteTitle")}</span>
              <span class="pe-inspector-sub">HEAP @ ${toNode.addr}</span>
            </div>
            <div class="pe-hexdump-table" role="region" aria-label="${t("inspectorByteTitle")}">
              <div class="pe-hexdump-head">
                <span>${t("offsetCol")}</span>
                <span>${t("hexCol")}</span>
                <span>${t("asciiCol")}</span>
              </div>
              ${memoryFields.map((field, fIdx) => `
                <div
                  class="pe-hexdump-row ${selectedFieldIndex === fIdx ? "selected" : ""} color-${field.color}"
                  data-field-idx="${fIdx}"
                >
                  <span class="pe-hex-offset">${field.offset}</span>
                  <span class="pe-hex-bytes">
                    ${field.bytes.map(b => `<span class="pe-byte-cell">${b}</span>`).join("")}
                  </span>
                  <span class="pe-hex-ascii">|${field.ascii}|</span>
                </div>
              `).join("")}
            </div>

            <div class="pe-decoded-tooltip">
              <div class="pe-decoded-title">
                <span class="pe-decoded-tag">${t("hoveredFieldLabel")}: ${activeField.name}</span>
                <code>0x${activeField.byteStart.toString(16).padStart(2, "0").toUpperCase()} - 0x${activeField.byteEnd.toString(16).padStart(2, "0").toUpperCase()} (8 bytes)</code>
              </div>
              <p class="pe-decoded-desc">${getLoc(activeField.desc)}</p>
            </div>
          </div>
        </div>
      </section>
    `;

    bindEvents();
  }

  function startTimer() {
    stopActiveVisualizerTimer();
    activeTimer = setInterval(() => {
      if (currentStepIndex < anim.steps.length - 1) {
        currentStepIndex++;
        render();
      } else {
        isPlaying = false;
        stopActiveVisualizerTimer();
        render();
      }
    }, speedMs);
  }

  function bindEvents() {
    // Step timeline clicks
    container.querySelectorAll(".pe-step-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        isPlaying = false;
        stopActiveVisualizerTimer();
        currentStepIndex = parseInt(btn.getAttribute("data-step-idx"), 10) || 0;
        render();
      });
    });

    // Play / Pause
    const btnPlay = container.querySelector("#pe-btn-play");
    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          if (currentStepIndex >= anim.steps.length - 1) {
            currentStepIndex = 0;
          }
          startTimer();
        } else {
          stopActiveVisualizerTimer();
        }
        render();
      });
    }

    // Prev
    const btnPrev = container.querySelector("#pe-btn-prev");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (currentStepIndex > 0) {
          isPlaying = false;
          stopActiveVisualizerTimer();
          currentStepIndex--;
          render();
        }
      });
    }

    // Next
    const btnNext = container.querySelector("#pe-btn-next");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentStepIndex < anim.steps.length - 1) {
          isPlaying = false;
          stopActiveVisualizerTimer();
          currentStepIndex++;
          render();
        }
      });
    }

    // Reset
    const btnReset = container.querySelector("#pe-btn-reset");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        isPlaying = false;
        stopActiveVisualizerTimer();
        currentStepIndex = 0;
        render();
      });
    }

    // Speed buttons
    container.querySelectorAll(".pe-speed-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        speedMs = parseInt(btn.getAttribute("data-speed"), 10) || 2600;
        if (isPlaying) {
          startTimer();
        }
        render();
      });
    });

    // Inspector field selection (click & hover & keyboard)
    container.querySelectorAll("[data-field-idx]").forEach(row => {
      const selectField = () => {
        const idx = parseInt(row.getAttribute("data-field-idx"), 10);
        if (!Number.isNaN(idx) && idx !== selectedFieldIndex) {
          selectedFieldIndex = idx;
          render();
        }
      };
      row.addEventListener("click", selectField);
      row.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectField();
        }
      });
    });

    // SVG node interaction
    container.querySelectorAll(".pe-node-group").forEach(nodeEl => {
      const selectPointerField = () => {
        selectedFieldIndex = 1; // Focus Heap Pointers field
        render();
      };
      nodeEl.addEventListener("click", selectPointerField);
      nodeEl.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectPointerField();
        }
      });
    });
  }

  render();
}

