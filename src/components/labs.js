import { icons } from "./icons.js";

/**
 * Laboratórios Interativos e Campos de Prática ("Playgrounds")
 * Demonstrações visuais interativas em tempo real dos padrões de projeto
 */

export const labs = {
  // 1. Observer Lab
  "observer-lab": {
    name: "Laboratório Interativo: Observer Pattern",
    patternId: "observer",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Observer</span>
            <h4>Simulador de Mercado de Ações (Publish-Subscribe)</h4>
            <p>O <strong>StockMarket</strong> (Subject) notifica múltiplos observadores desacoplados sempre que a cotação muda.</p>
          </div>

          <div class="lab-controls">
            <div class="control-group">
              <label for="stock-ticker">Ativo:</label>
              <select id="stock-ticker" class="form-select">
                <option value="GOOGL">GOOGL (Alphabet)</option>
                <option value="AAPL">AAPL (Apple Inc.)</option>
                <option value="PETR4">PETR4 (Petrobras)</option>
                <option value="VALE3">VALE3 (Vale)</option>
              </select>
            </div>

            <div class="control-group">
              <label for="stock-price">Novo Preço (R$):</label>
              <input type="range" id="stock-price-slider" min="10" max="250" value="120" class="form-range" />
              <span id="price-display" class="price-tag">R$ 120.00</span>
            </div>

            <div class="control-group buttons-row">
              <button id="btn-update-price" class="btn btn-primary">Notificar Mudança (notify())</button>
              <button id="btn-auto-simulate" class="btn btn-secondary">Flutuação Automática</button>
            </div>
          </div>

          <div class="observers-selection">
            <strong>Observadores Inscritos (Attach / Detach):</strong>
            <div class="checkbox-row">
              <label><input type="checkbox" id="obs-dashboard" checked /> Painel de Cotação ao Vivo</label>
              <label><input type="checkbox" id="obs-email" checked /> Alerta por E-mail (&gt; R$ 150)</label>
              <label><input type="checkbox" id="obs-bot" checked /> Trade Bot de Compra/Venda</label>
              <label><input type="checkbox" id="obs-audit" checked /> Log de Auditoria</label>
            </div>
          </div>

          <div class="observers-grid">
            <div class="observer-box" id="box-dashboard">
              <h5>Painel Visual</h5>
              <div class="obs-content" id="dashboard-content">Última cotação: R$ 120.00</div>
            </div>

            <div class="observer-box" id="box-email">
              <h5>Notificador de E-mail</h5>
              <div class="obs-content" id="email-content">Aguardando gatilho de preço...</div>
            </div>

            <div class="observer-box" id="box-bot">
              <h5>Algoritmo de Trading</h5>
              <div class="obs-content" id="bot-content">Estratégia neutra</div>
            </div>

            <div class="observer-box" id="box-audit">
              <h5>Log de Eventos</h5>
              <div class="obs-log" id="audit-log"></div>
            </div>
          </div>
        </div>
      `;

      // Lógica do Lab
      const slider = container.querySelector("#stock-price-slider");
      const priceDisplay = container.querySelector("#price-display");
      const tickerSelect = container.querySelector("#stock-ticker");
      const btnNotify = container.querySelector("#btn-update-price");
      const btnAuto = container.querySelector("#btn-auto-simulate");

      const chkDashboard = container.querySelector("#obs-dashboard");
      const chkEmail = container.querySelector("#obs-email");
      const chkBot = container.querySelector("#obs-bot");
      const chkAudit = container.querySelector("#obs-audit");

      const elDashboard = container.querySelector("#dashboard-content");
      const elEmail = container.querySelector("#email-content");
      const elBot = container.querySelector("#bot-content");
      const elAudit = container.querySelector("#audit-log");

      let autoInterval = null;

      function updatePriceDisplay() {
        priceDisplay.textContent = `R$ ${parseFloat(slider.value).toFixed(2)}`;
      }

      function logEvent(msg) {
        const time = new Date().toLocaleTimeString();
        const p = document.createElement("div");
        p.className = "log-line";
        p.textContent = `[${time}] ${msg}`;
        elAudit.prepend(p);
        if (elAudit.children.length > 8) elAudit.lastChild.remove();
      }

      function triggerNotify() {
        const price = parseFloat(slider.value);
        const ticker = tickerSelect.value;

        // Subject dispara broadcast para os observers ativos:
        if (chkDashboard.checked) {
          elDashboard.innerHTML = `
            <div class="price-huge">R$ ${price.toFixed(2)}</div>
            <div class="ticker-badge">${ticker}</div>
          `;
          flashBox("box-dashboard");
        }

        if (chkEmail.checked) {
          if (price > 150) {
            elEmail.innerHTML = `<span class="alert-text">Alerta: E-mail enviado! Preço de ${ticker} excedeu R$ 150 (R$ ${price.toFixed(2)})</span>`;
            flashBox("box-email");
          } else {
            elEmail.innerHTML = `<span class="text-muted">Cotação R$ ${price.toFixed(2)} dentro da normalidade (sem alerta).</span>`;
          }
        }

        if (chkBot.checked) {
          if (price < 50) {
            elBot.innerHTML = `<span class="text-success">[COMPRA FORTE] Preço baixo: R$ ${price.toFixed(2)}</span>`;
          } else if (price > 180) {
            elBot.innerHTML = `<span class="text-danger">[VENDA DE LUCRO] Preço alto: R$ ${price.toFixed(2)}</span>`;
          } else {
            elBot.innerHTML = `<span class="text-muted">[MANTER POSIÇÃO]</span>`;
          }
          flashBox("box-bot");
        }

        if (chkAudit.checked) {
          logEvent(`Subject notificou: ${ticker} = R$ ${price.toFixed(2)}`);
        }
      }

      function flashBox(id) {
        const box = container.querySelector(`#${id}`);
        if (!box) return;
        box.classList.add("flash-active");
        setTimeout(() => box.classList.remove("flash-active"), 400);
      }

      slider.addEventListener("input", () => {
        updatePriceDisplay();
      });

      btnNotify.addEventListener("click", () => {
        triggerNotify();
      });

      btnAuto.addEventListener("click", () => {
        if (autoInterval) {
          clearInterval(autoInterval);
          autoInterval = null;
          btnAuto.textContent = "Flutuação Automática";
          btnAuto.classList.remove("btn-danger");
          btnAuto.classList.add("btn-secondary");
        } else {
          btnAuto.textContent = "Parar Simulação";
          btnAuto.classList.remove("btn-secondary");
          btnAuto.classList.add("btn-danger");
          autoInterval = setInterval(() => {
            const current = parseFloat(slider.value);
            const delta = (Math.random() - 0.48) * 15;
            let next = Math.max(15, Math.min(240, current + delta));
            slider.value = next;
            updatePriceDisplay();
            triggerNotify();
          }, 1200);
        }
      });

      // Executa estado inicial
      updatePriceDisplay();
      triggerNotify();
    }
  },

  // 2. Strategy Lab
  "strategy-lab": {
    name: "Laboratório Interativo: Strategy Pattern",
    patternId: "strategy",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Strategy</span>
            <h4>Calculadora de Checkout & Estratégias de Frete</h4>
            <p>O <strong>CheckoutContext</strong> delega o cálculo para a <strong>ShippingStrategy</strong> selecionada em tempo de execução sem nenhum <code>switch-case</code> no contexto.</p>
          </div>

          <div class="lab-grid-2col">
            <div class="controls-panel">
              <div class="control-group">
                <label>Selecione a Estratégia de Frete (Strategy):</label>
                <div class="strategy-options">
                  <label class="radio-card">
                    <input type="radio" name="strategy" value="sedex" checked />
                    <div>
                      <strong>Sedex Expresso</strong>
                      <small>Entrega em 24-48h • R$ 25 base + R$ 2.50/kg + R$ 0.10/km</small>
                    </div>
                  </label>
                  <label class="radio-card">
                    <input type="radio" name="strategy" value="pac" />
                    <div>
                      <strong>PAC Econômico</strong>
                      <small>Entrega em 5-8 dias • R$ 12 base + R$ 1.20/kg + R$ 0.05/km</small>
                    </div>
                  </label>
                  <label class="radio-card">
                    <input type="radio" name="strategy" value="motoboy" />
                    <div>
                      <strong>Loggi / Motoboy Flash</strong>
                      <small>Mesmo dia • R$ 18 base + R$ 3.00/kg (raio máx 60km)</small>
                    </div>
                  </label>
                  <label class="radio-card">
                    <input type="radio" name="strategy" value="free" />
                    <div>
                      <strong>Cupom FRETEGRATIS</strong>
                      <small>Promoção • Custo R$ 0.00</small>
                    </div>
                  </label>
                </div>
              </div>

              <div class="control-group">
                <label for="weight-input">Peso da Encomenda (kg):</label>
                <input type="range" id="weight-input" min="0.5" max="30" step="0.5" value="4.5" class="form-range" />
                <span id="weight-val" class="price-tag">4.5 kg</span>
              </div>

              <div class="control-group">
                <label for="dist-input">Distância de Entrega (km):</label>
                <input type="range" id="dist-input" min="5" max="1500" step="10" value="280" class="form-range" />
                <span id="dist-val" class="price-tag">280 km</span>
              </div>
            </div>

            <div class="result-panel">
              <div class="receipt-card">
                <h5>Resumo do Contexto (OrderContext)</h5>
                <div class="receipt-row">
                  <span>Valor do Pedido:</span>
                  <span>R$ 299.90</span>
                </div>
                <div class="receipt-row">
                  <span>Estratégia Ativa:</span>
                  <span id="active-strategy-name" class="badge-strategy">SedexStrategy</span>
                </div>
                <div class="receipt-row">
                  <span>Custo do Frete Calculado:</span>
                  <span id="shipping-cost" class="highlight-price">R$ 64.25</span>
                </div>
                <hr />
                <div class="receipt-row total">
                  <span>Total Final da Compra:</span>
                  <span id="total-order">R$ 364.15</span>
                </div>

                <div class="code-preview-box">
                  <code>
                    <span class="kw">const</span> context = <span class="kw">new</span> ShippingCalculator();<br />
                    context.setStrategy(<span class="kw">new</span> <span id="code-strategy-class">SedexStrategy</span>());<br />
                    <span class="kw">const</span> frete = context.calculate(peso, distancia);
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const weightInput = container.querySelector("#weight-input");
      const distInput = container.querySelector("#dist-input");
      const weightVal = container.querySelector("#weight-val");
      const distVal = container.querySelector("#dist-val");
      const strategyRadios = container.querySelectorAll("input[name='strategy']");
      const activeStrategyName = container.querySelector("#active-strategy-name");
      const shippingCost = container.querySelector("#shipping-cost");
      const totalOrder = container.querySelector("#total-order");
      const codeStrategyClass = container.querySelector("#code-strategy-class");

      const baseCartValue = 299.90;

      function calculate() {
        const weight = parseFloat(weightInput.value);
        const dist = parseFloat(distInput.value);
        weightVal.textContent = `${weight.toFixed(1)} kg`;
        distVal.textContent = `${dist} km`;

        let selected = "sedex";
        strategyRadios.forEach(r => { if (r.checked) selected = r.value; });

        let cost = 0;
        let className = "SedexStrategy";

        if (selected === "sedex") {
          cost = 25.0 + (weight * 2.5) + (dist * 0.1);
          className = "SedexStrategy";
        } else if (selected === "pac") {
          cost = 12.0 + (weight * 1.2) + (dist * 0.05);
          className = "PacStrategy";
        } else if (selected === "motoboy") {
          if (dist > 60) {
            cost = 18.0 + (weight * 3.0) + ((dist - 60) * 0.8);
          } else {
            cost = 18.0 + (weight * 3.0);
          }
          className = "MotoboyFlashStrategy";
        } else if (selected === "free") {
          cost = 0.0;
          className = "FreeShippingStrategy";
        }

        activeStrategyName.textContent = className;
        codeStrategyClass.textContent = className;
        shippingCost.textContent = `R$ ${cost.toFixed(2)}`;
        totalOrder.textContent = `R$ ${(baseCartValue + cost).toFixed(2)}`;
      }

      weightInput.addEventListener("input", calculate);
      distInput.addEventListener("input", calculate);
      strategyRadios.forEach(r => r.addEventListener("change", calculate));
      calculate();
    }
  },

  // 3. Decorator Lab
  "decorator-lab": {
    name: "Laboratório Interativo: Decorator Pattern",
    patternId: "decorator",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Decorator</span>
            <h4>Customizador de Café Gourmet (Envoltório / Wrapper)</h4>
            <p>Cada adicional é um <strong>Decorator</strong> que envolve o café base e calcula recursivamente o preço e a descrição sem alterar a classe original.</p>
          </div>

          <div class="lab-grid-2col">
            <div class="controls-panel">
              <div class="control-group">
                <label>1. Escolha o Componente Base (ConcreteComponent):</label>
                <div class="radio-pill-group">
                  <label><input type="radio" name="coffee-base" value="espresso" checked /> Espresso Italiano (R$ 6,00)</label>
                  <label><input type="radio" name="coffee-base" value="coldbrew" /> Cold Brew Gelado (R$ 8,00)</label>
                </div>
              </div>

              <div class="control-group">
                <label>2. Adicione os Decorators em Tempo de Execução:</label>
                <div class="decorator-toggle-list">
                  <label class="toggle-card">
                    <input type="checkbox" id="dec-milk" />
                    <span>Leite Vaporizado (+ R$ 2,50)</span>
                  </label>
                  <label class="toggle-card">
                    <input type="checkbox" id="dec-chantilly" />
                    <span>Chantilly Artesanal (+ R$ 3,50)</span>
                  </label>
                  <label class="toggle-card">
                    <input type="checkbox" id="dec-caramel" />
                    <span>Calda de Caramelo (+ R$ 2,00)</span>
                  </label>
                  <label class="toggle-card">
                    <input type="checkbox" id="dec-cinnamon" />
                    <span>Canela de Ceilão (+ R$ 1,20)</span>
                  </label>
                  <label class="toggle-card">
                    <input type="checkbox" id="dec-shot" />
                    <span>Extra Shot de Espresso (+ R$ 4,00)</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="result-panel">
              <div class="coffee-cup-visual">
                <div class="cup-icon text-primary" style="display:flex; justify-content:center; align-items:center;">${icons.coffee}</div>
                <div class="cup-order-desc" id="cup-desc">Espresso Italiano</div>
                <div class="cup-price" id="cup-price">R$ 6,00</div>
              </div>

              <div class="decorator-chain-box">
                <h6>Estrutura da Composição Encadeada:</h6>
                <div id="chain-visual" class="chain-visual-code">
                  Espresso
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const baseRadios = container.querySelectorAll("input[name='coffee-base']");
      const decMilk = container.querySelector("#dec-milk");
      const decChantilly = container.querySelector("#dec-chantilly");
      const decCaramel = container.querySelector("#dec-caramel");
      const decCinnamon = container.querySelector("#dec-cinnamon");
      const decShot = container.querySelector("#dec-shot");

      const cupDesc = container.querySelector("#cup-desc");
      const cupPrice = container.querySelector("#cup-price");
      const chainVisual = container.querySelector("#chain-visual");

      function updateCoffee() {
        let isCold = false;
        baseRadios.forEach(r => { if (r.checked && r.value === "coldbrew") isCold = true; });

        let price = isCold ? 8.0 : 6.0;
        let desc = isCold ? "Cold Brew Gelado" : "Espresso Italiano";
        let chain = isCold ? "new ColdBrew()" : "new Espresso()";

        if (decMilk.checked) {
          price += 2.5;
          desc += " + Leite Vaporizado";
          chain = `new MilkDecorator(${chain})`;
        }
        if (decChantilly.checked) {
          price += 3.5;
          desc += " + Chantilly Artesanal";
          chain = `new WhippedCreamDecorator(${chain})`;
        }
        if (decCaramel.checked) {
          price += 2.0;
          desc += " + Calda de Caramelo";
          chain = `new CaramelDecorator(${chain})`;
        }
        if (decCinnamon.checked) {
          price += 1.2;
          desc += " + Canela de Ceilão";
          chain = `new CinnamonDecorator(${chain})`;
        }
        if (decShot.checked) {
          price += 4.0;
          desc += " + Extra Shot";
          chain = `new ExtraShotDecorator(${chain})`;
        }

        cupDesc.textContent = desc;
        cupPrice.textContent = `R$ ${price.toFixed(2)}`;
        chainVisual.textContent = chain;
      }

      baseRadios.forEach(r => r.addEventListener("change", updateCoffee));
      [decMilk, decChantilly, decCaramel, decCinnamon, decShot].forEach(c => c.addEventListener("change", updateCoffee));
      updateCoffee();
    }
  },

  // 4. Command Lab
  "command-lab": {
    name: "Laboratório Interativo: Command Pattern",
    patternId: "command",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Command</span>
            <h4>Mini Editor de Texto com Histórico Desfazer / Refazer</h4>
            <p>Conforme explicado no GoF (pág. 74), os comandos são armazenados em uma lista com a <strong>Linha do Presente</strong> separando ações passadas e futuras.</p>
          </div>

          <div class="editor-area-wrapper">
            <div class="editor-toolbar">
              <button class="btn btn-sm btn-tool" id="cmd-add-word">Adicionar "Design Patterns"</button>
              <button class="btn btn-sm btn-tool" id="cmd-uppercase">Caixa Alta</button>
              <button class="btn btn-sm btn-tool" id="cmd-lowercase">Caixa Baixa</button>
              <button class="btn btn-sm btn-tool" id="cmd-reverse">Inverter Texto</button>
              <button class="btn btn-sm btn-tool" id="cmd-delete-last">Deletar Última Palavra</button>
              <button class="btn btn-sm btn-secondary" id="cmd-macro">Macro (3 Ações)</button>
              <div class="divider"></div>
              <button class="btn btn-sm btn-outline" id="btn-undo" title="Desfazer">Desfazer (Undo)</button>
              <button class="btn btn-sm btn-outline" id="btn-redo" title="Refazer">Refazer (Redo)</button>
            </div>

            <div class="editor-canvas" id="editor-display" contenteditable="false">
              O livro Design Patterns foi publicado em 1994.
            </div>

            <div class="command-history-visual">
              <div class="history-title">
                <strong>Pilha de Histórico de Comandos:</strong>
                <small>Passado ← [ Linha do Presente ] → Futuro</small>
              </div>
              <div class="history-timeline" id="history-timeline">
                <span class="empty-hint">Nenhum comando executado ainda.</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const display = container.querySelector("#editor-display");
      const timeline = container.querySelector("#history-timeline");
      const btnUndo = container.querySelector("#btn-undo");
      const btnRedo = container.querySelector("#btn-redo");

      // Estado do Editor
      let pastCommands = [];
      let futureCommands = [];

      class BaseCommand {
        constructor(name) { this.name = name; this.previousText = ""; }
      }

      function executeCommand(name, mutateFn) {
        const prev = display.textContent;
        mutateFn();
        const cmd = {
          name,
          prevText: prev,
          newText: display.textContent
        };
        pastCommands.push(cmd);
        futureCommands = []; // limpa o futuro
        renderHistory();
      }

      function undo() {
        if (pastCommands.length === 0) return;
        const cmd = pastCommands.pop();
        futureCommands.unshift(cmd);
        display.textContent = cmd.prevText;
        renderHistory();
      }

      function redo() {
        if (futureCommands.length === 0) return;
        const cmd = futureCommands.shift();
        pastCommands.push(cmd);
        display.textContent = cmd.newText;
        renderHistory();
      }

      function renderHistory() {
        btnUndo.disabled = pastCommands.length === 0;
        btnRedo.disabled = futureCommands.length === 0;

        timeline.innerHTML = "";
        if (pastCommands.length === 0 && futureCommands.length === 0) {
          timeline.innerHTML = "<span class='empty-hint'>Histórico vazio.</span>";
          return;
        }

        // Passado
        pastCommands.forEach((cmd, idx) => {
          const pill = document.createElement("span");
          pill.className = "cmd-pill past";
          pill.textContent = `${idx + 1}. ${cmd.name}`;
          timeline.appendChild(pill);
        });

        // Linha do presente
        const line = document.createElement("span");
        line.className = "present-line";
        line.textContent = "PRESENTE";
        timeline.appendChild(line);

        // Futuro
        futureCommands.forEach((cmd, idx) => {
          const pill = document.createElement("span");
          pill.className = "cmd-pill future";
          pill.textContent = `${cmd.name}`;
          timeline.appendChild(pill);
        });
      }

      // Eventos
      container.querySelector("#cmd-add-word").addEventListener("click", () => {
        executeCommand('Inserir "Design Patterns"', () => {
          display.textContent += " Design Patterns";
        });
      });

      container.querySelector("#cmd-uppercase").addEventListener("click", () => {
        executeCommand("Caixa Alta", () => {
          display.textContent = display.textContent.toUpperCase();
        });
      });

      container.querySelector("#cmd-lowercase").addEventListener("click", () => {
        executeCommand("Caixa Baixa", () => {
          display.textContent = display.textContent.toLowerCase();
        });
      });

      container.querySelector("#cmd-reverse").addEventListener("click", () => {
        executeCommand("Inverter", () => {
          display.textContent = display.textContent.split("").reverse().join("");
        });
      });

      container.querySelector("#cmd-delete-last").addEventListener("click", () => {
        executeCommand("Deletar Palavra", () => {
          const words = display.textContent.trim().split(" ");
          words.pop();
          display.textContent = words.join(" ");
        });
      });

      container.querySelector("#cmd-macro").addEventListener("click", () => {
        executeCommand("MacroCommand (3 em 1)", () => {
          display.textContent = display.textContent + " [MACRO_APLICADA]";
          display.textContent = display.textContent.toUpperCase();
        });
      });

      btnUndo.addEventListener("click", undo);
      btnRedo.addEventListener("click", redo);
      renderHistory();
    }
  },

  // 5. State Lab
  "state-lab": {
    name: "Laboratório Interativo: State Pattern",
    patternId: "state",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • State</span>
            <h4>Máquina de Estados de Conexão TCP (Exemplo Clássico GoF pág. 284)</h4>
            <p>O objeto <strong>TCPConnection</strong> delega chamadas para seu objeto <strong>TCPState</strong>. As transições ocorrem de forma atômica e explícita.</p>
          </div>

          <div class="state-machine-wrapper">
            <div class="state-diagram-view">
              <div class="state-bubble" id="state-closed">Closed (Fechada)</div>
              <div class="state-arrow">⇄</div>
              <div class="state-bubble" id="state-listen">Listen (Escutando)</div>
              <div class="state-arrow">⇄</div>
              <div class="state-bubble" id="state-established">Established (Estabelecida)</div>
            </div>

            <div class="state-controls">
              <strong>Ações Disponíveis no Contexto:</strong>
              <div class="btn-group-state">
                <button class="btn btn-outline" id="act-open-active">activeOpen()</button>
                <button class="btn btn-outline" id="act-open-passive">passiveOpen()</button>
                <button class="btn btn-outline" id="act-send">sendData("SYN/ACK")</button>
                <button class="btn btn-outline" id="act-close">close()</button>
              </div>
            </div>

            <div class="state-status-box">
              <div class="status-badge" id="current-state-badge">Estado Atual: TCPClosed</div>
              <div class="state-console" id="state-log"></div>
            </div>
          </div>
        </div>
      `;

      let currentState = "Closed";
      const logEl = container.querySelector("#state-log");
      const badge = container.querySelector("#current-state-badge");

      function updateVisual() {
        container.querySelectorAll(".state-bubble").forEach(b => b.classList.remove("active-state"));
        if (currentState === "Closed") {
          container.querySelector("#state-closed").classList.add("active-state");
        } else if (currentState === "Listen") {
          container.querySelector("#state-listen").classList.add("active-state");
        } else if (currentState === "Established") {
          container.querySelector("#state-established").classList.add("active-state");
        }
        badge.textContent = `Estado Atual: TCP${currentState}`;
      }

      function logMsg(msg, isSuccess = true) {
        const div = document.createElement("div");
        div.className = isSuccess ? "log-ok" : "log-err";
        div.textContent = `[TCP] ${msg}`;
        logEl.prepend(div);
      }

      container.querySelector("#act-open-active").addEventListener("click", () => {
        if (currentState === "Closed") {
          currentState = "Established";
          logMsg("activeOpen(): Enviando SYN... Conexão Estabelecida com sucesso!");
        } else {
          logMsg(`Ação activeOpen() rejeitada no estado TCP${currentState}.`, false);
        }
        updateVisual();
      });

      container.querySelector("#act-open-passive").addEventListener("click", () => {
        if (currentState === "Closed") {
          currentState = "Listen";
          logMsg("passiveOpen(): Servidor agora aguardando conexões na porta (Listen).");
        } else {
          logMsg(`passiveOpen() inválido no estado atual TCP${currentState}.`, false);
        }
        updateVisual();
      });

      container.querySelector("#act-send").addEventListener("click", () => {
        if (currentState === "Established") {
          logMsg("send(): Pacote de dados TCP transmitido com sucesso através do socket.");
        } else if (currentState === "Listen") {
          currentState = "Established";
          logMsg("send(): Conexão recebida em Listen -> Handshake completado -> Estabelecida!");
        } else {
          logMsg("Erro: Impossível enviar dados com conexão TCP fechada!", false);
        }
        updateVisual();
      });

      container.querySelector("#act-close").addEventListener("click", () => {
        if (currentState !== "Closed") {
          currentState = "Closed";
          logMsg("close(): Enviado FIN/ACK. Conexão TCP encerrada e liberada.");
        } else {
          logMsg("A conexão já está fechada.", false);
        }
        updateVisual();
      });

      updateVisual();
      logMsg("Sistema TCP inicializado no estado TCPClosed.");
    }
  },

  // 6. Factory Lab
  "factory-lab": {
    name: "Laboratório Interativo: Abstract Factory",
    patternId: "abstract-factory",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Abstract Factory</span>
            <h4>Renderizador de Famílias de Interface (Lexi GUIFactory)</h4>
            <p>Selecione a <strong>Fábrica Concreta</strong> e veja todos os widgets mudarem instantaneamente para a respectiva família visual de forma 100% harmoniosa.</p>
          </div>

          <div class="control-group">
            <label>Selecione a Fábrica Concreta (GUIFactory):</label>
            <div class="factory-selector-tabs">
              <button class="btn btn-tab active" data-factory="win">Windows 11 Fluent</button>
              <button class="btn btn-tab" data-factory="mac">macOS Sonoma</button>
              <button class="btn btn-tab" data-factory="linux">Linux Adwaita</button>
              <button class="btn btn-tab" data-factory="retro">Retrô Motif (1995 GoF)</button>
            </div>
          </div>

          <div class="preview-os-window" id="os-window">
            <div class="os-titlebar" id="os-titlebar">
              <span id="window-title">Janela do Documento - Windows 11</span>
              <div class="window-controls" id="win-controls"></div>
            </div>
            <div class="os-content-body">
              <div class="widget-row">
                <button class="sample-btn" id="sample-button">Clique em Mim</button>
                <label class="sample-checkbox-label">
                  <input type="checkbox" id="sample-checkbox" checked />
                  <span>Opção Habilitada</span>
                </label>
              </div>
              <div class="widget-row">
                <label>Barra de Rolagem / Slider:</label>
                <input type="range" class="sample-slider" id="sample-slider" min="0" max="100" value="70" />
              </div>
            </div>
          </div>
        </div>
      `;

      const tabs = container.querySelectorAll(".btn-tab");
      const osWindow = container.querySelector("#os-window");
      const titlebar = container.querySelector("#os-titlebar");
      const winTitle = container.querySelector("#window-title");
      const sampleBtn = container.querySelector("#sample-button");

      function applyFactory(factoryKey) {
        osWindow.className = `preview-os-window theme-${factoryKey}`;
        if (factoryKey === "win") {
          winTitle.textContent = "Editor Lexi - Windows 11 Fluent";
          sampleBtn.textContent = "Botão Fluent";
        } else if (factoryKey === "mac") {
          winTitle.textContent = "Editor Lexi - macOS Aqua";
          sampleBtn.textContent = "Botão Aqua";
        } else if (factoryKey === "linux") {
          winTitle.textContent = "Editor Lexi - GNOME Adwaita";
          sampleBtn.textContent = "Botão Adwaita";
        } else if (factoryKey === "retro") {
          winTitle.textContent = "Editor Lexi - Motif X-Windows (1995)";
          sampleBtn.textContent = "Botão Motif";
        }
      }

      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          tabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          applyFactory(tab.getAttribute("data-factory"));
        });
      });

      applyFactory("win");
    }
  },

  // 7. Composite Lab
  "composite-lab": {
    name: "Laboratório Interativo: Composite Pattern",
    patternId: "composite",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Composite</span>
            <h4>Explorador de Arquivos e Pastas com Cálculo Recursivo</h4>
            <p>Tratamento uniforme de nós primitivos (<strong>Arquivos</strong>) e nós compostos (<strong>Pastas</strong>) ao chamar <code>getSize()</code>.</p>
          </div>

          <div class="composite-builder-panel">
            <div class="add-node-bar">
              <input type="text" id="node-name" placeholder="Nome do arquivo ou pasta" class="form-input" value="novo-modulo" />
              <select id="node-type" class="form-select">
                <option value="file">Arquivo (.ts)</option>
                <option value="folder">Pasta</option>
              </select>
              <input type="number" id="file-size" placeholder="Tamanho (KB)" value="15" class="form-input size-input" />
              <button id="btn-add-node" class="btn btn-primary">Adicionar Nó</button>
            </div>

            <div class="tree-display-container" id="tree-container">
              <!-- Renderizado dinamicamente -->
            </div>

            <div class="tree-summary-card">
              <span>Espaço Total Utilizado na Árvore:</span>
              <strong id="tree-total-size" class="highlight-price">0 KB</strong>
            </div>
          </div>
        </div>
      `;

      // Modelo Composite
      const treeData = {
        name: "projeto-gof",
        type: "folder",
        children: [
          { name: "README.md", type: "file", size: 4 },
          {
            name: "src",
            type: "folder",
            children: [
              { name: "index.ts", type: "file", size: 12 },
              { name: "types.ts", type: "file", size: 8 },
              {
                name: "patterns",
                type: "folder",
                children: [
                  { name: "Observer.ts", type: "file", size: 18 },
                  { name: "Strategy.ts", type: "file", size: 14 }
                ]
              }
            ]
          }
        ]
      };

      function calculateSize(node) {
        if (node.type === "file") return node.size;
        return (node.children || []).reduce((acc, c) => acc + calculateSize(c), 0);
      }

      function renderTreeHtml(node, depth = 0) {
        const indent = depth * 24;
        if (node.type === "file") {
          return `
            <div class="tree-row" style="padding-left: ${indent}px">
              <span class="icon" style="display:inline-flex; align-items:center; color:var(--text-muted);">${icons.file}</span>
              <span class="name">${node.name}</span>
              <span class="size-badge">${node.size} KB</span>
            </div>
          `;
        } else {
          const total = calculateSize(node);
          const childrenHtml = (node.children || []).map(c => renderTreeHtml(c, depth + 1)).join("");
          return `
            <div class="tree-folder-group">
              <div class="tree-row folder-row" style="padding-left: ${indent}px">
                <span class="icon" style="display:inline-flex; align-items:center; color:var(--accent-primary);">${icons.folder}</span>
                <span class="name">${node.name}/</span>
                <span class="size-badge folder-badge">${total} KB (soma dos filhos)</span>
              </div>
              <div class="folder-children">${childrenHtml}</div>
            </div>
          `;
        }
      }

      const treeContainer = container.querySelector("#tree-container");
      const totalSizeEl = container.querySelector("#tree-total-size");

      function refresh() {
        treeContainer.innerHTML = renderTreeHtml(treeData);
        totalSizeEl.textContent = `${calculateSize(treeData)} KB`;
      }

      container.querySelector("#btn-add-node").addEventListener("click", () => {
        const name = container.querySelector("#node-name").value.trim() || "item";
        const type = container.querySelector("#node-type").value;
        const size = parseInt(container.querySelector("#file-size").value, 10) || 5;

        if (type === "file") {
          treeData.children.push({ name: `${name}.ts`, type: "file", size });
        } else {
          treeData.children.push({ name, type: "folder", children: [] });
        }
        refresh();
      });

      refresh();
    }
  },

  // 8. Chain of Responsibility Lab
  "chain-lab": {
    name: "Laboratório Interativo: Chain of Responsibility",
    patternId: "chain-of-responsibility",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Chain of Responsibility</span>
            <h4>Esteira de Aprovação Hierárquica de Compras Corporativas</h4>
            <p>O pedido trafega ao longo dos sucessores até que um manipulador com autoridade suficiente assuma e aprove.</p>
          </div>

          <div class="chain-input-box">
            <label for="expense-amount">Valor da Solicitação de Compra:</label>
            <div class="input-with-button">
              <span class="currency-prefix">R$</span>
              <input type="number" id="expense-amount" value="3800" min="10" max="200000" class="form-input" />
              <button id="btn-run-chain" class="btn btn-primary">Disparar Solicitação na Cadeia</button>
            </div>
          </div>

          <div class="chain-visual-steps">
            <div class="chain-step-node" id="step-lead">
              <div class="step-icon" style="display:flex; justify-content:center; align-items:center;">${icons.user}</div>
              <div class="step-role">Líder Técnico</div>
              <div class="step-limit">Teto: até R$ 500</div>
              <div class="step-status" id="status-lead">Aguardando...</div>
            </div>

            <div class="chain-connector">&rarr;</div>

            <div class="chain-step-node" id="step-manager">
              <div class="step-icon" style="display:flex; justify-content:center; align-items:center;">${icons.briefcase}</div>
              <div class="step-role">Gerente de Área</div>
              <div class="step-limit">Teto: até R$ 5.000</div>
              <div class="step-status" id="status-manager">Aguardando...</div>
            </div>

            <div class="chain-connector">&rarr;</div>

            <div class="chain-step-node" id="step-director">
              <div class="step-icon" style="display:flex; justify-content:center; align-items:center;">${icons.shield}</div>
              <div class="step-role">Diretor Financeiro</div>
              <div class="step-limit">Teto: até R$ 50.000</div>
              <div class="step-status" id="status-director">Aguardando...</div>
            </div>

            <div class="chain-connector">&rarr;</div>

            <div class="chain-step-node" id="step-board">
              <div class="step-icon" style="display:flex; justify-content:center; align-items:center;">${icons.users}</div>
              <div class="step-role">Conselho de Administração</div>
              <div class="step-limit">Teto: Ilimitado</div>
              <div class="step-status" id="status-board">Aguardando...</div>
            </div>
          </div>

          <div class="chain-result-box" id="chain-result">
            Clique no botão acima para submeter a despesa pela cadeia.
          </div>
        </div>
      `;

      const inputVal = container.querySelector("#expense-amount");
      const btnRun = container.querySelector("#btn-run-chain");
      const resultBox = container.querySelector("#chain-result");

      const steps = [
        { id: "step-lead", statusId: "status-lead", limit: 500, title: "Líder Técnico" },
        { id: "step-manager", statusId: "status-manager", limit: 5000, title: "Gerente de Área" },
        { id: "step-director", statusId: "status-director", limit: 50000, title: "Diretor Financeiro" },
        { id: "step-board", statusId: "status-board", limit: Infinity, title: "Conselho de Administração" }
      ];

      btnRun.addEventListener("click", () => {
        const amount = parseFloat(inputVal.value);
        if (isNaN(amount) || amount <= 0) return;

        // Reset
        steps.forEach(s => {
          container.querySelector(`#${s.id}`).className = "chain-step-node";
          container.querySelector(`#${s.statusId}`).textContent = "Avaliando...";
        });

        let currentIdx = 0;

        function stepThrough() {
          if (currentIdx >= steps.length) return;
          const s = steps[currentIdx];
          const nodeEl = container.querySelector(`#${s.id}`);
          const statusEl = container.querySelector(`#${s.statusId}`);

          nodeEl.classList.add("evaluating");

          setTimeout(() => {
            nodeEl.classList.remove("evaluating");
            if (amount <= s.limit) {
              nodeEl.classList.add("approved");
              statusEl.textContent = "APROVADO";
              resultBox.innerHTML = `<strong>Sucesso:</strong> Solicitação de <strong>R$ ${amount.toFixed(2)}</strong> foi tratada e APROVADA por <em>${s.title}</em>. A cadeia parou com sucesso!`;
            } else {
              nodeEl.classList.add("passed");
              statusEl.textContent = "Repassado ao sucessor";
              currentIdx++;
              stepThrough();
            }
          }, 500);
        }

        stepThrough();
      });
    }
  },

  // 9. Adapter Lab
  "adapter-lab": {
    name: "Laboratório Interativo: Adapter Pattern",
    patternId: "adapter",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Adapter</span>
            <h4>Adaptador de API de Pagamentos (JSON Moderno &rarr; XML Legado)</h4>
            <p>O cliente envia uma requisição moderna em JSON. O <strong>BankAdapter</strong> intercepta, faz conversão de moeda/centavos e traduz para o protocolo SOAP/XML antigo.</p>
          </div>

          <div class="adapter-comparison-grid">
            <div class="flow-card">
              <h6>1. Código Cliente (Target)</h6>
              <div class="code-box">
                <code>
                  processor.pay({<br />
                  &nbsp;&nbsp;amount: <span id="adapter-input-val">150.00</span>,<br />
                  &nbsp;&nbsp;currency: "BRL"<br />
                  });
                </code>
              </div>
              <input type="number" id="adapter-amount" value="150" class="form-input mt-2" />
              <button id="btn-run-adapter" class="btn btn-primary mt-2">Transacionar</button>
            </div>

            <div class="flow-arrow">&rarr;<br /><small>Adapter</small></div>

            <div class="flow-card">
              <h6>2. O que o Legado (Adaptee) recebe:</h6>
              <div class="xml-box" id="xml-output">
                &lt;soap:Envelope&gt;<br />
                &nbsp;&nbsp;&lt;cents&gt;15000&lt;/cents&gt;<br />
                &nbsp;&nbsp;&lt;curr&gt;BRL&lt;/curr&gt;<br />
                &lt;/soap:Envelope&gt;
              </div>
            </div>
          </div>
        </div>
      `;

      const inputVal = container.querySelector("#adapter-amount");
      const clientVal = container.querySelector("#adapter-input-val");
      const xmlOutput = container.querySelector("#xml-output");
      const btn = container.querySelector("#btn-run-adapter");

      function update() {
        const val = parseFloat(inputVal.value) || 0;
        clientVal.textContent = val.toFixed(2);
        const cents = Math.round(val * 100);
        xmlOutput.innerHTML = `
          &lt;soap:Envelope xmlns:bank="http://oldbank.com"&gt;<br />
          &nbsp;&nbsp;&lt;bank:TransferRequest&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;bank:Cents&gt;<strong>${cents}</strong>&lt;/bank:Cents&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;bank:CurrencyCode&gt;BRL&lt;/bank:CurrencyCode&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;bank:Timestamp&gt;${Date.now()}&lt;/bank:Timestamp&gt;<br />
          &nbsp;&nbsp;&lt;/bank:TransferRequest&gt;<br />
          &lt;/soap:Envelope&gt;
        `;
      }

      inputVal.addEventListener("input", update);
      btn.addEventListener("click", () => {
        update();
        xmlOutput.classList.add("flash-active");
        setTimeout(() => xmlOutput.classList.remove("flash-active"), 400);
      });
      update();
    }
  }
};
