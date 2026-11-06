/**
 * Topologias interativas passo a passo e quadros de memória (Hex/ASCII)
 * para todos os 23 Padrões de Projeto GoF, inspirado no Protocol Explorer.
 */

function toHexBytes(str, targetLen = 8) {
  const clean = (str || "").slice(0, targetLen).padEnd(targetLen, ".");
  const bytes = [];
  for (let i = 0; i < targetLen; i++) {
    bytes.push(clean.charCodeAt(i).toString(16).padStart(2, "0").toUpperCase());
  }
  return { bytes, ascii: clean };
}

export function buildObjectInspectorState(patternCode, step, nodesMap, selectedNodeId = null) {
  const fromNode = nodesMap[step.packet.from] || { id: "caller", label: "Client", addr: "0x1000", stereotype: "«caller»", color: "blue" };
  const toNode = nodesMap[step.packet.to] || { id: "target", label: "Target", addr: "0x2000", stereotype: "«target»", color: "emerald" };
  const activeId = selectedNodeId || toNode.id;
  const isSnapshot = selectedNodeId === "snapshot";
  const inspectedNode = nodesMap[activeId] || toNode;

  const currentRole = inspectedNode.stereotype ? inspectedNode.stereotype.replace(/[«»]/g, "") : "participant";
  const rawState = (step.nodeStates && step.nodeStates[inspectedNode.id]) || "ACTIVE";

  if (isSnapshot) {
    const scopeData = {
      stepIndex: `0${step.id}`,
      patternCode: patternCode,
      activeTransaction: `${fromNode.label} -> ${toNode.label}`,
      dispatchedCall: step.packet.call,
      returnContract: step.packet.returnVal,
      messageType: step.packet.type || "DISPATCH",
      participants: Object.values(nodesMap).map(n => ({
        id: n.id,
        class: n.label,
        role: n.stereotype,
        address: n.addr,
        status: (step.nodeStates && step.nodeStates[n.id]) || "IDLE"
      }))
    };
    return {
      selectedNode: { id: "snapshot", label: "Scope Snapshot", addr: "STACK_FRAME", stereotype: "«context»", color: "cyan" },
      data: scopeData,
      explanation: {
        pt: "Visão global de todos os participantes do padrão e seus estados instantâneos durante esta etapa.",
        en: "Global snapshot of all pattern participants and their active states during this step.",
        es: "Instantánea global de todos los participantes del patrón y sus estados activos en este paso."
      }
    };
  }

  const attributes = {
    status: rawState,
    inMemoryAt: inspectedNode.addr,
    role: currentRole
  };

  if (inspectedNode.id === toNode.id) {
    attributes.receivedCall = step.packet.call;
    attributes.invokedBy = `${fromNode.label} (${fromNode.addr})`;
    attributes.returnPayload = step.packet.returnVal;
  } else if (inspectedNode.id === fromNode.id) {
    attributes.outgoingCall = step.packet.call;
    attributes.targetRecipient = `${toNode.label} (${toNode.addr})`;
    attributes.expectedReturn = step.packet.returnVal;
  }

  const code = (patternCode || "").toUpperCase();
  if (code === "AF") {
    attributes.family = "Aqua / CrossPlatform";
    attributes.contract = "GUIFactory";
    attributes.guarantee = "Cohesive Product Family";
  } else if (code === "BL") {
    attributes.assemblyStep = `Step ${step.id} of 5`;
    attributes.fluentMethod = step.packet.call;
    attributes.mutatedPart = step.packet.returnVal;
  } else if (code === "FM") {
    attributes.creatorHook = "createTransport()";
    attributes.polymorphicType = inspectedNode.label;
    attributes.decoupled = true;
  } else if (code === "PR") {
    attributes.cloneMethod = "deepClone()";
    attributes.prototypeRegistry = "PrototypeRegistry @ 0x2300";
    attributes.clonedReference = step.packet.returnVal;
  } else if (code === "SI") {
    attributes.instancePointer = "0x6150";
    attributes.threadLock = "MUTEX_LOCKED";
    attributes.singletonGuarantee = "Single Instance Per Process";
  } else if (code === "AD") {
    attributes.adaptedInterface = "PaymentProcessor";
    attributes.adapteeWrapped = "LegacyBillingSDK (0x3500)";
    attributes.formatTranslation = "JSON -> XML_SOAP";
  } else if (code === "BR") {
    attributes.abstraction = "RemoteControl";
    attributes.implementor = "DeviceDriver";
    attributes.decoupling = "Independent Class Hierarchies";
  } else if (code === "CP") {
    attributes.compositeType = inspectedNode.stereotype.includes("leaf") ? "LeafNode" : "CompositeContainer";
    attributes.uniformOperation = "getSize()";
    attributes.recursionDepth = step.id;
  } else if (code === "DE") {
    attributes.decoratorType = inspectedNode.label;
    attributes.forwardedTo = "wrappedComponent";
    attributes.addedBehavior = step.packet.call;
  } else if (code === "FA") {
    attributes.facadeBoundary = "VideoConverterFacade";
    attributes.shieldedSubsystems = ["CodecEngine", "AudioExtractor", "BitrateMuxer"];
    attributes.highLevelApi = step.packet.call;
  } else if (code === "FL") {
    attributes.intrinsicState = "GlyphMetrics + FontFace ('Inter-Bold')";
    attributes.extrinsicContext = "{ x: 380, y: 75, color: '#38bdf8' }";
    attributes.sharedInstance = "0x4300";
  } else if (code === "PX") {
    attributes.proxyType = "Virtual Lazy + Auth Guard";
    attributes.realSubject = "DatabaseQueryService @ 0x6050";
    attributes.cachedResult = step.packet.returnVal;
  } else if (code === "CR") {
    attributes.handlerPosition = currentRole;
    attributes.handled = step.id >= 4;
    attributes.forwardTarget = step.id < 4 ? "next.handle(request)" : "haltChain()";
  } else if (code === "CM") {
    attributes.commandEncapsulated = step.packet.call;
    attributes.historyStackDepth = Math.max(1, step.id);
    attributes.isUndoable = true;
  } else if (code === "IN") {
    attributes.grammarRule = "Expression::interpret(context)";
    attributes.terminalEvaluation = step.packet.returnVal;
  } else if (code === "IT") {
    attributes.cursor = `Index [${Math.min(3, step.id - 1)}]`;
    attributes.hasNext = step.id < 5;
    attributes.currentYield = step.packet.returnVal;
  } else if (code === "ME") {
    attributes.centralRouter = "AirTrafficControlMediator (0x3750)";
    attributes.colleaguesDecoupled = true;
    attributes.dispatchedAction = step.packet.call;
  } else if (code === "MM") {
    attributes.mementoSnapshot = "Snapshot#v" + step.id;
    attributes.encapsulatedState = "{ stateCode: 0x44B0, version: 1 }";
    attributes.caretakerOnlyStores = true;
  } else if (code === "OB") {
    attributes.broadcastEvent = "ON_PRICE_UPDATE";
    attributes.observersNotified = ["CandlestickChart", "AlertNotifier", "AuditLogger"];
    attributes.eventPayload = step.packet.call;
  } else if (code === "ST") {
    attributes.activeFSMState = inspectedNode.label;
    attributes.transitionTrigger = step.packet.call;
    attributes.stateEncapsulated = true;
  } else if (code === "SY") {
    attributes.selectedAlgorithm = inspectedNode.label;
    attributes.strategyContract = "ShippingStrategy";
    attributes.calculatedOutput = step.packet.returnVal;
  } else if (code === "TM") {
    attributes.templateMethod = "processDocument()";
    attributes.invariantStep = step.id === 1 || step.id === 5;
    attributes.primitiveHook = step.id === 2 || step.id === 3;
  } else if (code === "VI") {
    attributes.doubleDispatch = "visitor.visitConcreteElement(this)";
    attributes.dynamicResolvedMethod = step.packet.call;
    attributes.astNodeUnchanged = true;
  }

  const resultData = {
    class: inspectedNode.label,
    address: inspectedNode.addr,
    role: inspectedNode.stereotype,
    stepStatus: rawState,
    attributes: attributes
  };

  return {
    selectedNode: inspectedNode,
    data: resultData,
    explanation: {
      pt: `Estado do objeto ${inspectedNode.label} durante a etapa 0${step.id}: reflete a responsabilidade do papel '${currentRole}'.`,
      en: `State of object ${inspectedNode.label} during step 0${step.id}: reflects the responsibility of role '${currentRole}'.`,
      es: `Estado del objeto ${inspectedNode.label} en el paso 0${step.id}: refleja la responsabilidad del rol '${currentRole}'.`
    }
  };
}

export function buildMemoryFrame(patternCode, stepIdx, packet, nodesMap) {
  const fromNode = nodesMap[packet.from] || { addr: "0x1000", label: packet.from };
  const toNode = nodesMap[packet.to] || { addr: "0x2000", label: packet.to };

  const headerAscii = `${patternCode}:S${stepIdx}:OK`;
  const addrAscii = `${fromNode.addr.replace("0x", "")}>${toNode.addr.replace("0x", "")}`.slice(0, 8).padEnd(8, "0");
  const callAscii = (packet.call || "invoke()").replace(/[^a-zA-Z0-9_()]/g, "").slice(0, 8).padEnd(8, ".");
  const retAscii = (packet.returnVal || "0x00A1").replace(/[^a-zA-Z0-9_:]/g, "").slice(0, 8).padEnd(8, ".");

  const f0 = toHexBytes(headerAscii, 8);
  const f1 = toHexBytes(addrAscii, 8);
  const f2 = toHexBytes(callAscii, 8);
  const f3 = toHexBytes(retAscii, 8);

  return [
    {
      id: "field-header",
      name: "Frame Header & Step ID",
      offset: "00000000",
      byteStart: 0,
      byteEnd: 7,
      bytes: f0.bytes,
      ascii: f0.ascii,
      color: "cyan",
      value: `${patternCode} · Step 0${stepIdx} (${packet.type || "DISPATCH"})`,
      desc: {
        pt: "Assinatura do protocolo arquitetural GoF e índice sequencial da mensagem.",
        en: "GoF architectural frame signature and sequence step index.",
        es: "Firma de trama arquitectónica GoF e índice secuencial del paso."
      }
    },
    {
      id: "field-pointers",
      name: "Heap Pointers (Src -> Dst)",
      offset: "00000008",
      byteStart: 8,
      byteEnd: 15,
      bytes: f1.bytes,
      ascii: f1.ascii,
      color: "emerald",
      value: `${fromNode.label} (${fromNode.addr}) -> ${toNode.label} (${toNode.addr})`,
      desc: {
        pt: "Ponteiros de origem e destino na heap mostrando o desacoplamento entre objetos.",
        en: "Source and destination heap pointers showing runtime object decoupling.",
        es: "Punteros de origen y destino en el heap mostrando el desacoplamiento."
      }
    },
    {
      id: "field-vtable",
      name: "VTable / Method Selector",
      offset: "00000010",
      byteStart: 16,
      byteEnd: 23,
      bytes: f2.bytes,
      ascii: f2.ascii,
      color: "violet",
      value: packet.call,
      desc: {
        pt: "Seletor polimórfico despachado na tabela virtual (vtable) da interface.",
        en: "Polymorphic method selector dispatched via the interface vtable.",
        es: "Selector polimórfico despachado en la tabla virtual (vtable)."
      }
    },
    {
      id: "field-payload",
      name: "Return / State Payload",
      offset: "00000018",
      byteStart: 24,
      byteEnd: 31,
      bytes: f3.bytes,
      ascii: f3.ascii,
      color: "amber",
      value: packet.returnVal,
      desc: {
        pt: "Resultado retornado ou mutação de estado produzida pelo participante concreto.",
        en: "Returned reference or state mutation produced by the concrete participant.",
        es: "Referencia devuelta o mutación de estado producida por el participante."
      }
    }
  ];
}

export const patternAnimations = {
  "abstract-factory": {
    code: "AF",
    layerIndex: 1,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "ApplicationClient", stereotype: "«client»", addr: "0x10A0", x: 110, y: 165, color: "blue" },
      { id: "abFactory", label: "GUIFactory", stereotype: "«interface»", addr: "0x20B0", x: 410, y: 75, color: "emerald" },
      { id: "macFactory", label: "MacFactory", stereotype: "«concrete»", addr: "0x20C4", x: 410, y: 255, color: "emerald" },
      { id: "button", label: "MacButton", stereotype: "«product A»", addr: "0x40D8", x: 740, y: 75, color: "cyan" },
      { id: "checkbox", label: "MacCheckbox", stereotype: "«product B»", addr: "0x40F2", x: 740, y: 255, color: "cyan" }
    ],
    links: [
      { from: "client", to: "abFactory", label: "uses contract" },
      { from: "abFactory", to: "macFactory", label: "vtable dispatch", dashed: true },
      { from: "macFactory", to: "button", label: "instantiates" },
      { from: "macFactory", to: "checkbox", label: "instantiates" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "INJEÇÃO DA FÁBRICA", en: "FACTORY INJECTION", es: "INYECCIÓN DE FÁBRICA" },
        title: {
          pt: "Cliente solicita criação via interface GUIFactory",
          en: "Client requests widget creation via GUIFactory interface",
          es: "El cliente solicita controles mediante la interfaz GUIFactory"
        },
        desc: {
          pt: "O ApplicationClient invoca factory.createButton() conhecendo apenas a abstração GUIFactory, sem qualquer acoplamento com macOS ou Windows.",
          en: "ApplicationClient invokes factory.createButton() knowing only the abstract GUIFactory contract, with zero coupling to macOS or Windows classes.",
          es: "ApplicationClient invoca factory.createButton() conociendo solo el contrato abstracto GUIFactory."
        },
        packet: { from: "client", to: "abFactory", call: "createButton()", returnVal: "vtable#01", type: "REQUEST" },
        activeNodes: ["client", "abFactory"],
        nodeStates: { client: "CALLING", abFactory: "CONTRACT ACTIVE" }
      },
      {
        id: 2,
        tag: { pt: "DESPACHO POLIMÓRFICO", en: "POLYMORPHIC DISPATCH", es: "DESPACHO POLIMÓRFICO" },
        title: {
          pt: "VTable redireciona chamada para MacFactory concreta",
          en: "VTable routes call to injected MacFactory instance",
          es: "VTable redirige la llamada a la instancia MacFactory"
        },
        desc: {
          pt: "Em tempo de execução, a tabela de métodos virtuais resolve a chamada da interface para a fábrica concreta ativa (MacFactory @ 0x20C4).",
          en: "At runtime, the virtual method table resolves the interface call to the active concrete factory (MacFactory @ 0x20C4).",
          es: "En tiempo de ejecución, la tabla virtual resuelve la llamada hacia MacFactory (@ 0x20C4)."
        },
        packet: { from: "abFactory", to: "macFactory", call: "MacFactory::createButton()", returnVal: "alloc()", type: "DISPATCH" },
        activeNodes: ["abFactory", "macFactory"],
        nodeStates: { abFactory: "RESOLVED", macFactory: "EXECUTING" }
      },
      {
        id: 3,
        tag: { pt: "INSTANCIAÇÃO PRODUTO A", en: "PRODUCT A ALLOCATION", es: "INSTANCIACIÓN PRODUCTO A" },
        title: {
          pt: "MacFactory instancia MacButton compatível",
          en: "MacFactory allocates cohesive MacButton product",
          es: "MacFactory instancia un MacButton compatible"
        },
        desc: {
          pt: "MacFactory aloca um novo MacButton na heap (0x40D8) e retorna a referência tipada apenas como a interface abstrata Button.",
          en: "MacFactory allocates a new MacButton on the heap (0x40D8) and returns the reference typed strictly as the abstract Button interface.",
          es: "MacFactory reserva un nuevo MacButton en el heap (0x40D8) devolviendo la interfaz abstracta Button."
        },
        packet: { from: "macFactory", to: "button", call: "new MacButton()", returnVal: "ref:0x40D8", type: "ALLOC" },
        activeNodes: ["macFactory", "button"],
        nodeStates: { macFactory: "ALLOCATING", button: "READY 0x40D8" }
      },
      {
        id: 4,
        tag: { pt: "FAMÍLIA CONSISTENTE", en: "COHESIVE FAMILY", es: "FAMILIA CONSISTENTE" },
        title: {
          pt: "MacFactory instancia MacCheckbox da mesma família",
          en: "MacFactory creates matching MacCheckbox from same family",
          es: "MacFactory crea MacCheckbox de la misma familia visual"
        },
        desc: {
          pt: "Ao chamar createCheckbox(), a mesma fábrica garante que o checkbox criado pertence exatamente à mesma família visual Aqua do botão.",
          en: "Calling createCheckbox() on the same factory guarantees the checkbox belongs to the exact same macOS Aqua visual family.",
          es: "Al llamar a createCheckbox(), la misma fábrica garantiza compatibilidad total con la familia macOS."
        },
        packet: { from: "macFactory", to: "checkbox", call: "new MacCheckbox()", returnVal: "ref:0x40F2", type: "ALLOC" },
        activeNodes: ["macFactory", "checkbox", "button"],
        nodeStates: { button: "READY 0x40D8", checkbox: "READY 0x40F2", macFactory: "FAMILY SYNCED" }
      },
      {
        id: 5,
        tag: { pt: "USO DESACOPLADO", en: "DECOUPLED RENDER", es: "RENDERIZADO DESACOPLADO" },
        title: {
          pt: "Cliente opera a família de produtos sem conhecer classes concretas",
          en: "Client renders widget family without knowing concrete classes",
          es: "El cliente opera la familia de controles sin conocer clases concretas"
        },
        desc: {
          pt: "O ApplicationClient recebe os ponteiros de interface e renderiza a UI completa. Trocar para Windows exige mudar apenas 1 linha na inicialização.",
          en: "ApplicationClient receives interface pointers and renders the UI. Switching to Windows requires changing only 1 initialization line.",
          es: "ApplicationClient recibe punteros de interfaz y renderiza la interfaz completa con acoplamiento cero."
        },
        packet: { from: "abFactory", to: "client", call: "return {btn, chk}", returnVal: "UI_RENDERED", type: "RESPONSE" },
        activeNodes: ["client", "button", "checkbox"],
        nodeStates: { client: "RENDERED OK", button: "PAINTED", checkbox: "PAINTED" }
      }
    ]
  },

  "builder": {
    code: "BL",
    layerIndex: 1,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "Director / Client", stereotype: "«director»", addr: "0x1100", x: 110, y: 165, color: "blue" },
      { id: "builderIf", label: "QueryBuilder", stereotype: "«interface»", addr: "0x2100", x: 420, y: 75, color: "emerald" },
      { id: "pgBuilder", label: "PostgresSQLBuilder", stereotype: "«concrete»", addr: "0x2180", x: 420, y: 255, color: "emerald" },
      { id: "product", label: "SQLQueryProduct", stereotype: "«complex obj»", addr: "0x5200", x: 740, y: 165, color: "cyan" }
    ],
    links: [
      { from: "client", to: "builderIf", label: "orchestrates steps" },
      { from: "builderIf", to: "pgBuilder", label: "delegates", dashed: true },
      { from: "pgBuilder", to: "product", label: "mutates parts" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "INÍCIO DO PIPELINE", en: "PIPELINE RESET", es: "INICIO DEL PIPELINE" },
        title: { pt: "Director inicia a construção passo a passo", en: "Director initiates step-by-step construction", es: "Director inicia la construcción paso a paso" },
        desc: { pt: "O Director reinicia o estado interno do Builder (reset()) para montar um novo objeto complexo do zero.", en: "Director resets the Builder internal buffer to assemble a fresh complex product.", es: "El Director reinicia el buffer interno del Builder para ensamblar un nuevo objeto." },
        packet: { from: "client", to: "builderIf", call: "reset()", returnVal: "STATE_EMPTY", type: "INIT" },
        activeNodes: ["client", "builderIf", "pgBuilder"],
        nodeStates: { client: "STEP 1/4", pgBuilder: "BUFFER CLEAR" }
      },
      {
        id: 2,
        tag: { pt: "PARTE 1: SELECT", en: "PART 1: SELECT CLAUSE", es: "PARTE 1: CLÁUSULA SELECT" },
        title: { pt: "Montagem da cláusula SELECT e projeção", en: "Assembling SELECT projection clause", es: "Ensamblando la cláusula SELECT" },
        desc: { pt: "O ConcreteBuilder adiciona a primeira parte estrutural (colunas e tabela alvo) no produto em construção.", en: "ConcreteBuilder appends the table and column projection into the product under construction.", es: "ConcreteBuilder agrega las columnas y la tabla al producto en construcción." },
        packet: { from: "pgBuilder", to: "product", call: "select('users')", returnVal: "PART_1_OK", type: "MUTATE" },
        activeNodes: ["pgBuilder", "product"],
        nodeStates: { pgBuilder: "APPENDING", product: "SELECT *" }
      },
      {
        id: 3,
        tag: { pt: "PARTE 2: FILTROS", en: "PART 2: WHERE PREDICATES", es: "PARTE 2: FILTROS WHERE" },
        title: { pt: "Adição fluente de predicados parametrizados", en: "Appending parameterized WHERE predicates", es: "Añadiendo predicados parametrizados WHERE" },
        desc: { pt: "Sem construtores telescópicos: apenas as cláusulas necessárias são encadeadas no buffer interno do Builder.", en: "No telescopic constructors: only needed clauses are chained onto the Builder buffer.", es: "Sin constructores telescópicos: solo las cláusulas necesarias se encadenan." },
        packet: { from: "pgBuilder", to: "product", call: "where('active=true')", returnVal: "PART_2_OK", type: "MUTATE" },
        activeNodes: ["pgBuilder", "product"],
        nodeStates: { pgBuilder: "FILTERING", product: "+ WHERE" }
      },
      {
        id: 4,
        tag: { pt: "PARTE 3: LIMIT/ORDER", en: "PART 3: ORDER & LIMIT", es: "PARTE 3: ORDEN Y LÍMITE" },
        title: { pt: "Configuração opcional de ordenação e paginação", en: "Applying optional ordering and pagination", es: "Aplicando ordenación y paginación opcional" },
        desc: { pt: "O mesmo processo no Director pode produzir dialetos SQL totalmente diferentes trocando apenas o Builder concreto.", en: "The exact same Director steps can emit Postgres, MySQL, or Mongo ASTs by swapping the Builder.", es: "El mismo proceso puede emitir distintos dialectos cambiando el Builder concreto." },
        packet: { from: "pgBuilder", to: "product", call: "limit(25)", returnVal: "PART_3_OK", type: "MUTATE" },
        activeNodes: ["pgBuilder", "product"],
        nodeStates: { pgBuilder: "VALIDATING", product: "+ LIMIT 25" }
      },
      {
        id: 5,
        tag: { pt: "ENTREGA DO PRODUTO", en: "FINAL BUILD() SEAL", es: "ENTREGA DEL PRODUCTO" },
        title: { pt: "Método build() sela e retorna o objeto imutável", en: "build() seals and returns the immutable product", es: "build() sella y devuelve el objeto final" },
        desc: { pt: "O cliente invoca build() e recebe a instância SQLQueryProduct completa e validada (0x5200).", en: "Client invokes build() and receives the validated, immutable SQLQueryProduct instance (0x5200).", es: "El cliente invoca build() y recibe la instancia final validada (0x5200)." },
        packet: { from: "pgBuilder", to: "client", call: "build()", returnVal: "Query@0x5200", type: "RETURN" },
        activeNodes: ["client", "product"],
        nodeStates: { client: "RECEIVED", product: "SEALED 0x5200" }
      }
    ]
  },

  "factory-method": {
    code: "FM",
    layerIndex: 1,
    scopeType: "CLASS",
    nodes: [
      { id: "creator", label: "LogisticsCreator", stereotype: "«abstract class»", addr: "0x1200", x: 170, y: 75, color: "emerald" },
      { id: "subCreator", label: "SeaLogistics", stereotype: "«subclass»", addr: "0x1280", x: 170, y: 255, color: "emerald" },
      { id: "productIf", label: "Transport", stereotype: "«interface»", addr: "0x3100", x: 670, y: 75, color: "cyan" },
      { id: "ship", label: "CargoShip", stereotype: "«concrete»", addr: "0x3190", x: 670, y: 255, color: "cyan" }
    ],
    links: [
      { from: "creator", to: "subCreator", label: "overrides createTransport()", dashed: true },
      { from: "subCreator", to: "ship", label: "new CargoShip()" },
      { from: "ship", to: "productIf", label: "implements", dashed: true },
      { from: "creator", to: "productIf", label: "planDelivery() uses" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "FLUXO DA SUPERCLASSE", en: "BASE WORKFLOW CALL", es: "FLUJO DE SUPERCLASE" },
        title: { pt: "Cliente invoca planDelivery() na classe base", en: "Caller invokes planDelivery() on base Creator", es: "El cliente invoca planDelivery() en la clase base" },
        desc: { pt: "LogisticsCreator possui a lógica de negócio de roteamento, mas não sabe qual veículo concreto será instanciado.", en: "LogisticsCreator holds the delivery workflow logic, but defers vehicle instantiation to its subclass.", es: "LogisticsCreator contiene la lógica de negocio pero delega la instanciación a la subclase." },
        packet: { from: "creator", to: "subCreator", call: "this.createTransport()", returnVal: "virtual_hook", type: "DISPATCH" },
        activeNodes: ["creator", "subCreator"],
        nodeStates: { creator: "TEMPLATE RUN", subCreator: "HOOK INVOKED" }
      },
      {
        id: 2,
        tag: { pt: "DECISÃO DA SUBCLASSE", en: "SUBCLASS DECISION", es: "DECISIÓN DE SUBCLASE" },
        title: { pt: "Subclasse SeaLogistics sobrescreve o método fábrica", en: "SeaLogistics subclass overrides the factory method", es: "SeaLogistics sobrescribe el método fábrica" },
        desc: { pt: "A subclasse SeaLogistics decide instanciar CargoShip em vez de Truck, mantendo a superclasse aberta para extensão.", en: "SeaLogistics decides to instantiate CargoShip instead of Truck, keeping the base class open for extension.", es: "SeaLogistics decide instanciar CargoShip manteniendo la clase base desacoplada." },
        packet: { from: "subCreator", to: "ship", call: "new CargoShip()", returnVal: "Ship@0x3190", type: "ALLOC" },
        activeNodes: ["subCreator", "ship"],
        nodeStates: { subCreator: "INSTANTIATING", ship: "ALLOCATED" }
      },
      {
        id: 3,
        tag: { pt: "UPCAST PARA INTERFACE", en: "INTERFACE UPCAST", es: "UPCAST A INTERFAZ" },
        title: { pt: "CargoShip é retornado como interface Transport", en: "CargoShip is upcast to abstract Transport contract", es: "CargoShip se devuelve como interfaz Transport" },
        desc: { pt: "O objeto criado cumpre o contrato Transport (deliver()), ocultando detalhes específicos de navegação marítima.", en: "The created instance fulfills the Transport contract (deliver()), hiding maritime specifics.", es: "La instancia creada cumple el contrato Transport ocultando detalles concretos." },
        packet: { from: "ship", to: "productIf", call: "as Transport", returnVal: "Transport*", type: "BIND" },
        activeNodes: ["ship", "productIf"],
        nodeStates: { ship: "BOUND", productIf: "CONTRACT OK" }
      },
      {
        id: 4,
        tag: { pt: "OPERAÇÃO POLIMÓRFICA", en: "POLYMORPHIC OPERATION", es: "OPERACIÓN POLIMÓRFICA" },
        title: { pt: "Superclasse executa transport.deliver() no produto", en: "Base Creator executes transport.deliver() polymorphically", es: "La superclase ejecuta transport.deliver()" },
        desc: { pt: "planDelivery() continua sua execução invocando transport.deliver() sem saber se é navio, caminhão ou drone.", en: "planDelivery() continues execution by calling transport.deliver() without knowing if it is a ship or truck.", es: "planDelivery() continúa invocando transport.deliver() sin conocer el tipo concreto." },
        packet: { from: "creator", to: "productIf", call: "transport.deliver()", returnVal: "CARGO_SENT", type: "EXEC" },
        activeNodes: ["creator", "productIf", "ship"],
        nodeStates: { creator: "DISPATCHING", ship: "SAILING" }
      },
      {
        id: 5,
        tag: { pt: "CICLO CONCLUÍDO", en: "DELIVERY CONFIRMED", es: "CICLO COMPLETADO" },
        title: { pt: "Entrega concluída com desacoplamento total", en: "Delivery completed with zero concrete coupling", es: "Entrega completada sin acoplamiento concreto" },
        desc: { pt: "O método fábrica permitiu variar a classe instanciada via herança (escopo de Classe na matriz GoF).", en: "Factory Method varied the instantiated product via subclassing (Class scope in the GoF matrix).", es: "Factory Method permitió variar la clase instanciada mediante herencia." },
        packet: { from: "productIf", to: "creator", call: "return receipt", returnVal: "STATUS_200", type: "RETURN" },
        activeNodes: ["creator", "ship"],
        nodeStates: { creator: "COMPLETED", ship: "DOCKED" }
      }
    ]
  },

  "prototype": {
    code: "PR",
    layerIndex: 1,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "EditorClient", stereotype: "«client»", addr: "0x1300", x: 110, y: 165, color: "blue" },
      { id: "registry", label: "PrototypeRegistry", stereotype: "«registry»", addr: "0x2300", x: 420, y: 75, color: "emerald" },
      { id: "master", label: "MasterCellProto", stereotype: "«prototype»", addr: "0x4100", x: 420, y: 255, color: "violet" },
      { id: "cloneObj", label: "ClonedCellInstance", stereotype: "«deep copy»", addr: "0x68A0", x: 740, y: 165, color: "cyan" }
    ],
    links: [
      { from: "client", to: "registry", label: "get('enemy-elite')" },
      { from: "registry", to: "master", label: "lookup template" },
      { from: "master", to: "cloneObj", label: "clone() deep copy", dashed: true },
      { from: "cloneObj", to: "client", label: "returns new heap ref" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CONSULTA AO REGISTRO", en: "REGISTRY LOOKUP", es: "CONSULTA AL REGISTRO" },
        title: { pt: "Cliente solicita protótipo pré-configurado pelo identificador", en: "Client requests pre-configured prototype by key", es: "El cliente solicita un prototipo por su clave" },
        desc: { pt: "Em vez de executar queries pesadas de inicialização, o cliente pede ao PrototypeRegistry uma cópia de 'enemy-elite'.", en: "Instead of running expensive initialization queries, the client asks PrototypeRegistry for 'enemy-elite'.", es: "En lugar de inicializar desde cero, el cliente solicita 'enemy-elite' al registro." },
        packet: { from: "client", to: "registry", call: "create('enemy-elite')", returnVal: "lookup_ok", type: "Lookup" },
        activeNodes: ["client", "registry"],
        nodeStates: { client: "REQUESTING", registry: "KEY FOUND" }
      },
      {
        id: 2,
        tag: { pt: "SELEÇÃO DA MATRIZ", en: "MASTER TEMPLATE HIT", es: "SELECCIÓN DE PLANTILLA" },
        title: { pt: "Registro localiza instância prototípica em memória (0x4100)", en: "Registry locates master prototype in memory (0x4100)", es: "El registro localiza el prototipo maestro (0x4100)" },
        desc: { pt: "O objeto MasterCellProto já contém malhas 3D, texturas e árvores de IA carregadas na memória.", en: "MasterCellProto already holds parsed 3D meshes, textures, and AI state trees in memory.", es: "MasterCellProto ya contiene mallas y configuración cargadas en memoria." },
        packet: { from: "registry", to: "master", call: "proto.clone()", returnVal: "mem_copy", type: "DISPATCH" },
        activeNodes: ["registry", "master"],
        nodeStates: { master: "CLONING STATE" }
      },
      {
        id: 3,
        tag: { pt: "CÓPIA PROFUNDA (DEEP COPY)", en: "DEEP HEAP CLONE", es: "COPIA PROFUNDA" },
        title: { pt: "Método clone() duplica o grafo de objetos em novo endereço", en: "clone() duplicates object graph into new heap address", es: "clone() duplica el grafo de objetos en nueva dirección" },
        desc: { pt: "Um novo bloco de memória (0x68A0) é alocado copiando os atributos internos de 0x4100 sem acoplar à classe concreta.", en: "A new memory block (0x68A0) is allocated by copying internal fields from 0x4100 without concrete class coupling.", es: "Se reserva un nuevo bloque de memoria (0x68A0) copiando los atributos internos." },
        packet: { from: "master", to: "cloneObj", call: "memcpy + deepClone()", returnVal: "Clone@0x68A0", type: "CLONE" },
        activeNodes: ["master", "cloneObj"],
        nodeStates: { master: "UNCHANGED 0x4100", cloneObj: "NEW REF 0x68A0" }
      },
      {
        id: 4,
        tag: { pt: "ENTREGA DO CLONE", en: "CLONE HANDOFF", es: "ENTREGA DEL CLON" },
        title: { pt: "Nova instância independente é entregue ao cliente", en: "Independent cloned instance is returned to client", es: "La instancia clonada independiente vuelve al cliente" },
        desc: { pt: "O cliente recebe o ponteiro 0x68A0. O protótipo original 0x4100 permanece intacto para futuras clonagens.", en: "Client receives pointer 0x68A0. Master prototype 0x4100 remains untouched for future clones.", es: "El cliente recibe el puntero 0x68A0 mientras el prototipo original permanece intacto." },
        packet: { from: "cloneObj", to: "client", call: "return clone", returnVal: "0x68A0 != 0x4100", type: "RETURN" },
        activeNodes: ["cloneObj", "client"],
        nodeStates: { client: "OWNER OF 0x68A0", cloneObj: "ISOLATED" }
      },
      {
        id: 5,
        tag: { pt: "MUTAÇÃO ISOLADA", en: "ISOLATED MUTATION", es: "MUTACIÓN AISLADA" },
        title: { pt: "Cliente customiza coordenadas do clone sem afetar o protótipo", en: "Client mutates clone coordinates without affecting master", es: "El cliente modifica el clon sin afectar al prototipo" },
        desc: { pt: "Alterar clone.setPosition(120, 45) modifica apenas a memória em 0x68A0, comprovando o isolamento da cópia profunda.", en: "Mutating clone.setPosition(120, 45) modifies only 0x68A0, confirming deep-copy isolation.", es: "Modificar clone.setPosition(120, 45) altera solo 0x68A0, confirmando el aislamiento." },
        packet: { from: "client", to: "cloneObj", call: "setPos(120, 45)", returnVal: "MUTATED_OK", type: "MUTATE" },
        activeNodes: ["client", "cloneObj", "master"],
        nodeStates: { master: "POS(0,0) SAFE", cloneObj: "POS(120,45)" }
      }
    ]
  },

  "singleton": {
    code: "SG",
    layerIndex: 1,
    scopeType: "OBJECT",
    nodes: [
      { id: "clientA", label: "WorkerThread A", stereotype: "«caller 1»", addr: "0x1400", x: 130, y: 80, color: "blue" },
      { id: "clientB", label: "WorkerThread B", stereotype: "«caller 2»", addr: "0x1450", x: 130, y: 250, color: "blue" },
      { id: "guard", label: "Singleton::getInstance()", stereotype: "«static guard»", addr: "0x2400", x: 440, y: 165, color: "emerald" },
      { id: "instance", label: "DatabasePool", stereotype: "«sole instance»", addr: "0x7777", x: 750, y: 165, color: "amber" }
    ],
    links: [
      { from: "clientA", to: "guard", label: "getInstance()" },
      { from: "clientB", to: "guard", label: "getInstance()" },
      { from: "guard", to: "instance", label: "lazy init / cached ref" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "PRIMEIRA CHAMADA", en: "FIRST ACCESS", es: "PRIMER ACCESO" },
        title: { pt: "WorkerThread A solicita getInstance() pela primeira vez", en: "WorkerThread A calls getInstance() for the first time", es: "WorkerThread A invoca getInstance() por primera vez" },
        desc: { pt: "O construtor privado impede 'new DatabasePool()'. O cliente precisa passar pelo método estático controlado.", en: "The private constructor blocks 'new DatabasePool()'. Callers must use the static accessor.", es: "El constructor privado impide 'new DatabasePool()'. El acceso pasa por el método estático." },
        packet: { from: "clientA", to: "guard", call: "getInstance()", returnVal: "instance == null", type: "CHECK" },
        activeNodes: ["clientA", "guard"],
        nodeStates: { clientA: "CALLING", guard: "CACHE MISS" }
      },
      {
        id: 2,
        tag: { pt: "INICIALIZAÇÃO PEREZOSA", en: "LAZY ALLOCATION", es: "INICIALIZACIÓN PEREZOSA" },
        title: { pt: "Guarda estática instancia o único objeto em 0x7777", en: "Static guard allocates the sole instance at 0x7777", es: "El guardián estático crea la única instancia en 0x7777" },
        desc: { pt: "Verificando que staticInstance é nulo (com lock de sincronização), o método aloca a instância única na heap.", en: "Seeing staticInstance is null (under mutex lock), the guard allocates the single instance on the heap.", es: "Al detectar que staticInstance es nulo, reserva la única instancia en el heap." },
        packet: { from: "guard", to: "instance", call: "new DatabasePool()", returnVal: "Singleton@0x7777", type: "ALLOC" },
        activeNodes: ["guard", "instance"],
        nodeStates: { guard: "LOCKED INIT", instance: "BORN AT 0x7777" }
      },
      {
        id: 3,
        tag: { pt: "RETORNO AO CALLER A", en: "RETURN TO CALLER A", es: "RETORNO AL EMISOR A" },
        title: { pt: "WorkerThread A recebe a referência 0x7777", en: "WorkerThread A receives reference 0x7777", es: "WorkerThread A recibe la referencia 0x7777" },
        desc: { pt: "O ponteiro 0x7777 fica salvo no atributo estático privado da classe e é devolvido para a Thread A.", en: "Pointer 0x7777 is cached in the private static field and returned to WorkerThread A.", es: "El puntero 0x7777 queda en caché estática y se devuelve a WorkerThread A." },
        packet: { from: "guard", to: "clientA", call: "return instance", returnVal: "ref:0x7777", type: "RETURN" },
        activeNodes: ["guard", "clientA", "instance"],
        nodeStates: { clientA: "REF = 0x7777", instance: "ACTIVE" }
      },
      {
        id: 4,
        tag: { pt: "SEGUNDA CHAMADA CONCORRENTE", en: "SECOND CONCURRENT CALL", es: "SEGUNDA LLAMADA" },
        title: { pt: "WorkerThread B invoca getInstance() posteriormente", en: "WorkerThread B invokes getInstance() afterwards", es: "WorkerThread B invoca getInstance() posteriormente" },
        desc: { pt: "Outro módulo do sistema solicita acesso ao gerenciador de conexões através de getInstance().", en: "Another module requests access to the connection pool via getInstance().", es: "Otro módulo del sistema solicita acceso mediante getInstance()." },
        packet: { from: "clientB", to: "guard", call: "getInstance()", returnVal: "CACHE_HIT", type: "CHECK" },
        activeNodes: ["clientB", "guard"],
        nodeStates: { clientB: "CALLING", guard: "CACHE HIT 0x7777" }
      },
      {
        id: 5,
        tag: { pt: "IDENTIDADE GARANTIDA", en: "IDENTITY GUARANTEED", es: "IDENTIDAD GARANTIZADA" },
        title: { pt: "Ambas as threads compartilham exatamente o mesmo endereço 0x7777", en: "Both threads share the exact same heap address 0x7777", es: "Ambos hilos comparten exactamente la dirección 0x7777" },
        desc: { pt: "Nenhuma nova alocação ocorre: clientA === clientB (0x7777 === 0x7777), garantindo unicidade rigorosa.", en: "Zero new allocation occurs: clientA === clientB (0x7777 === 0x7777), enforcing strict uniqueness.", es: "No ocurre nueva reserva de memoria: clientA === clientB (0x7777 === 0x7777)." },
        packet: { from: "guard", to: "clientB", call: "return cached", returnVal: "ref:0x7777", type: "RETURN" },
        activeNodes: ["clientA", "clientB", "instance"],
        nodeStates: { clientA: "REF 0x7777", clientB: "REF 0x7777", instance: "SHARED SINGLETON" }
      }
    ]
  },

  "adapter": {
    code: "AD",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "CheckoutService", stereotype: "«client»", addr: "0x1500", x: 110, y: 165, color: "blue" },
      { id: "target", label: "PaymentProcessor", stereotype: "«target if»", addr: "0x2500", x: 380, y: 75, color: "cyan" },
      { id: "adapter", label: "SoapToRestAdapter", stereotype: "«adapter»", addr: "0x3500", x: 470, y: 255, color: "emerald" },
      { id: "adaptee", label: "LegacySoapBank", stereotype: "«adaptee»", addr: "0x8900", x: 750, y: 165, color: "amber" }
    ],
    links: [
      { from: "client", to: "target", label: "payJson(amount)" },
      { from: "target", to: "adapter", label: "implements", dashed: true },
      { from: "adapter", to: "adaptee", label: "sendXmlEnvelope()" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CHAMADA NO CONTRATO ALVO", en: "TARGET INTERFACE CALL", es: "LLAMADA A INTERFAZ OBJETIVO" },
        title: { pt: "CheckoutService envia payload JSON para PaymentProcessor", en: "CheckoutService sends JSON payload to PaymentProcessor", es: "CheckoutService envía JSON a PaymentProcessor" },
        desc: { pt: "O cliente moderno espera chamar pay({ amount: 250, currency: 'BRL' }) em formato JSON limpo.", en: "The modern client expects to call pay({ amount: 250, currency: 'BRL' }) using clean JSON.", es: "El cliente moderno espera invocar pay({ amount: 250 }) usando formato JSON." },
        packet: { from: "client", to: "target", call: "pay({amt:250})", returnVal: "JSON_FRAME", type: "REQUEST" },
        activeNodes: ["client", "target"],
        nodeStates: { client: "JSON SENDER", target: "TARGET CONTRACT" }
      },
      {
        id: 2,
        tag: { pt: "INTERCEPTAÇÃO PELO ADAPTER", en: "ADAPTER INTERCEPTION", es: "INTERCEPCIÓN DEL ADAPTADOR" },
        title: { pt: "SoapToRestAdapter recebe a requisição através da interface Target", en: "SoapToRestAdapter receives request via Target interface", es: "SoapToRestAdapter recibe la petición vía interfaz Target" },
        desc: { pt: "O Adapter implementa PaymentProcessor por fora, mas mantém internamente uma referência ao sistema legado.", en: "The Adapter implements PaymentProcessor externally while holding a wrapped reference to the legacy bank SDK.", es: "El Adapter implementa PaymentProcessor por fuera y envuelve al sistema legado por dentro." },
        packet: { from: "target", to: "adapter", call: "Adapter::pay()", returnVal: "converting...", type: "CONVERT" },
        activeNodes: ["target", "adapter"],
        nodeStates: { adapter: "TRANSLATING JSON->XML" }
      },
      {
        id: 3,
        tag: { pt: "TRADUÇÃO DE PROTOCOLO", en: "PAYLOAD TRANSLATION", es: "TRADUCCIÓN DE FORMATO" },
        title: { pt: "Adapter converte JSON em envelope XML SOAP e invoca o Adaptee", en: "Adapter marshals JSON into SOAP XML and calls Adaptee", es: "Adapter convierte JSON en XML SOAP e invoca al Adaptee" },
        desc: { pt: "O Adapter transforma os argumentos e chama legacyBank.executeSoapTransaction('<soap:Amt>250</soap:Amt>').", en: "Adapter transforms the payload and invokes legacyBank.executeSoapTransaction('<soap:Amt>250</soap:Amt>').", es: "Adapter transforma los datos e invoca legacyBank.executeSoapTransaction('<XML>')." },
        packet: { from: "adapter", to: "adaptee", call: "execSoap('<Amt>250')", returnVal: "SOAP_200_XML", type: "ADAPTED" },
        activeNodes: ["adapter", "adaptee"],
        nodeStates: { adapter: "MARSHALING", adaptee: "PROCESSING XML" }
      },
      {
        id: 4,
        tag: { pt: "RESPOSTA LEGADA", en: "LEGACY XML RESPONSE", es: "RESPUESTA XML LEGADA" },
        title: { pt: "LegacySoapBank processa e devolve XML para o Adapter", en: "LegacySoapBank returns raw XML response to Adapter", es: "LegacySoapBank devuelve XML crudo al Adapter" },
        desc: { pt: "O sistema bancário legado responde em XML sem nunca saber que foi chamado por um microsserviço moderno.", en: "The legacy bank responds with raw XML without ever knowing a modern microservice called it.", es: "El banco legado responde en XML sin saber que lo llamó un cliente moderno." },
        packet: { from: "adaptee", to: "adapter", call: "<Status>AUTH_OK</Status>", returnVal: "UNMARSHAL", type: "RESPONSE" },
        activeNodes: ["adaptee", "adapter"],
        nodeStates: { adaptee: "XML SENT", adapter: "PARSING XML" }
      },
      {
        id: 5,
        tag: { pt: "RETORNO NORMALIZADO", en: "NORMALIZED JSON RETURN", es: "RETORNO JSON NORMALIZADO" },
        title: { pt: "Adapter devolve objeto JSON padronizado ao CheckoutService", en: "Adapter returns normalized JSON receipt to CheckoutService", es: "Adapter devuelve respuesta JSON normalizada al cliente" },
        desc: { pt: "Duas interfaces incompatíveis trabalharam juntas sem alterar uma única linha do cliente nem do banco legado.", en: "Two incompatible interfaces worked together without modifying a single line of client or legacy code.", es: "Dos interfaces incompatibles colaboraron sin modificar el código cliente ni el legado." },
        packet: { from: "adapter", to: "client", call: "{status:'APPROVED'}", returnVal: "200_OK", type: "RETURN" },
        activeNodes: ["adapter", "client"],
        nodeStates: { client: "JSON RECEIVED", adapter: "IDLE" }
      }
    ]
  },

  "bridge": {
    code: "BR",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "abstraction", label: "RemoteControl", stereotype: "«abstraction»", addr: "0x1600", x: 170, y: 75, color: "blue" },
      { id: "refined", label: "AdvancedRemote", stereotype: "«refined»", addr: "0x1680", x: 170, y: 255, color: "blue" },
      { id: "implIf", label: "DeviceImpl", stereotype: "«implementor»", addr: "0x3600", x: 620, y: 75, color: "cyan" },
      { id: "concreteImpl", label: "SmartTVDevice", stereotype: "«concrete impl»", addr: "0x3690", x: 740, y: 255, color: "emerald" }
    ],
    links: [
      { from: "refined", to: "abstraction", label: "extends", dashed: true },
      { from: "abstraction", to: "implIf", label: "bridge ref (device)" },
      { from: "implIf", to: "concreteImpl", label: "implements", dashed: true }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "ACIONAMENTO NA ABSTRAÇÃO", en: "ABSTRACTION TRIGGER", es: "ACTIVACIÓN EN ABSTRACCIÓN" },
        title: { pt: "Usuário aciona mute() no controle AdvancedRemote", en: "User triggers mute() on AdvancedRemote abstraction", es: "El usuario activa mute() en AdvancedRemote" },
        desc: { pt: "AdvancedRemote pertence à hierarquia de Abstração e pode evoluir independentemente dos aparelhos físicos.", en: "AdvancedRemote belongs to the Abstraction hierarchy and evolves independently of hardware devices.", es: "AdvancedRemote pertenece a la jerarquía de Abstracción y evoluciona de forma independiente." },
        packet: { from: "refined", to: "abstraction", call: "mute()", returnVal: "delegate_bridge", type: "CALL" },
        activeNodes: ["refined", "abstraction"],
        nodeStates: { refined: "MUTE PRESSED", abstraction: "BRIDGE READY" }
      },
      {
        id: 2,
        tag: { pt: "TRAVESSIA DA PONTE (BRIDGE)", en: "CROSSING THE BRIDGE", es: "CRUZANDO EL PUENTE" },
        title: { pt: "Abstração delega operação primitiva através do ponteiro Bridge", en: "Abstraction delegates primitive operation across the Bridge pointer", es: "La abstracción delega la operación a través del puente" },
        desc: { pt: "Em vez de usar herança (AdvancedSmartTVRemote), RemoteControl delega para this.device.setVolume(0).", en: "Instead of subclassing (AdvancedSmartTVRemote), RemoteControl delegates to this.device.setVolume(0).", es: "En vez de usar herencia estática, RemoteControl delega en this.device.setVolume(0)." },
        packet: { from: "abstraction", to: "implIf", call: "device.setVolume(0)", returnVal: "vtable_impl", type: "BRIDGE" },
        activeNodes: ["abstraction", "implIf"],
        nodeStates: { abstraction: "DELEGATING", implIf: "CONTRACT HIT" }
      },
      {
        id: 3,
        tag: { pt: "EXECUÇÃO NO IMPLEMENTOR", en: "IMPLEMENTOR EXECUTION", es: "EJECUCIÓN EN IMPLEMENTADOR" },
        title: { pt: "SmartTVDevice executa o comando específico da plataforma", en: "SmartTVDevice executes platform-specific hardware routine", es: "SmartTVDevice ejecuta la rutina de hardware específica" },
        desc: { pt: "O Implementor concreto traduz setVolume(0) para o driver HDMI-CEC da SmartTV em 0x3690.", en: "The concrete Implementor translates setVolume(0) into the SmartTV HDMI-CEC hardware driver at 0x3690.", es: "El implementador concreto traduce setVolume(0) al controlador de la SmartTV." },
        packet: { from: "implIf", to: "concreteImpl", call: "HDMI_CEC::setAudio(0)", returnVal: "VOL_0_OK", type: "EXEC" },
        activeNodes: ["implIf", "concreteImpl"],
        nodeStates: { concreteImpl: "VOLUME = 0" }
      },
      {
        id: 4,
        tag: { pt: "CONFIRMAÇÃO DE ESTADO", en: "STATE CONFIRMATION", es: "CONFIRMACIÓN DE ESTADO" },
        title: { pt: "Implementor retorna status atualizado através da ponte", en: "Implementor returns updated hardware status across the bridge", es: "El implementador devuelve el estado a través del puente" },
        desc: { pt: "O resultado retorna para a camada de Abstração sem expor detalhes de baixo nível da TV.", en: "The status returns to the Abstraction layer without leaking low-level TV hardware details.", es: "El estado regresa a la Abstracción sin exponer detalles internos del hardware." },
        packet: { from: "concreteImpl", to: "abstraction", call: "ack(MUTED)", returnVal: "STATE_SYNCED", type: "ACK" },
        activeNodes: ["concreteImpl", "abstraction"],
        nodeStates: { abstraction: "SYNCED", concreteImpl: "MUTED" }
      },
      {
        id: 5,
        tag: { pt: "EVOLUÇÃO ORTOGONAL", en: "ORTHOGONAL EVOLUTION", es: "EVOLUCIÓN ORTOGONAL" },
        title: { pt: "Abstração e Implementação permanecem 100% independentes", en: "Abstraction and Implementation can swap at runtime", es: "Abstracción e Implementación pueden cambiarse en vivo" },
        desc: { pt: "O mesmo controle pode ser conectado a um RadioDevice ou ProjectorDevice em tempo de execução sem recompilar.", en: "The same remote instance can bind to a RadioDevice or ProjectorDevice at runtime without recompilation.", es: "El mismo control puede conectarse a otro dispositivo en tiempo de ejecución." },
        packet: { from: "abstraction", to: "refined", call: "renderMuteLED()", returnVal: "BRIDGE_OK", type: "DONE" },
        activeNodes: ["refined", "abstraction", "concreteImpl"],
        nodeStates: { refined: "LED ON", concreteImpl: "AUDIO 0%" }
      }
    ]
  },

  "composite": {
    code: "CP",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "StorageAnalyzer", stereotype: "«client»", addr: "0x1700", x: 100, y: 165, color: "blue" },
      { id: "rootDir", label: "Folder('/src')", stereotype: "«composite»", addr: "0x2700", x: 390, y: 165, color: "cyan" },
      { id: "leafA", label: "File('main.ts')", stereotype: "«leaf 12KB»", addr: "0x4710", x: 720, y: 75, color: "emerald" },
      { id: "subDir", label: "Folder('/core')", stereotype: "«composite»", addr: "0x2790", x: 720, y: 255, color: "cyan" }
    ],
    links: [
      { from: "client", to: "rootDir", label: "getSize() uniform" },
      { from: "rootDir", to: "leafA", label: "child[0].getSize()" },
      { from: "rootDir", to: "subDir", label: "child[1].getSize()" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CHAMADA UNIFORME", en: "UNIFORM COMPONENT CALL", es: "LLAMADA UNIFORME" },
        title: { pt: "Cliente invoca getSize() no nó raiz sem verificar se é pasta ou arquivo", en: "Client calls getSize() on root node without type-checking", es: "El cliente invoca getSize() en la raíz sin comprobar tipos" },
        desc: { pt: "Tanto File (Leaf) quanto Folder (Composite) implementam a mesma interface FileSystemNode.", en: "Both File (Leaf) and Folder (Composite) implement the exact same FileSystemNode interface.", es: "Tanto File (Hoja) como Folder (Compuesto) implementan la misma interfaz." },
        packet: { from: "client", to: "rootDir", call: "node.getSize()", returnVal: "recurse_tree", type: "CALL" },
        activeNodes: ["client", "rootDir"],
        nodeStates: { client: "AWAITING SUM", rootDir: "ITERATING CHILDREN" }
      },
      {
        id: 2,
        tag: { pt: "DELEGAÇÃO PARA FOLHA", en: "LEAF DELEGATION", es: "DELEGACIÓN A HOJA" },
        title: { pt: "Folder('/src') consulta seu primeiro filho: File('main.ts')", en: "Folder('/src') queries its first child: File('main.ts')", es: "Folder('/src') consulta a su primer hijo: File('main.ts')" },
        desc: { pt: "Como 'main.ts' é um nó Folha (Leaf), ele não possui filhos e retorna imediatamente seu tamanho base (12 KB).", en: "Because 'main.ts' is a Leaf node, it has no children and immediately returns its byte size (12 KB).", es: "Como 'main.ts' es un nodo Hoja, devuelve de inmediato su tamaño (12 KB)." },
        packet: { from: "rootDir", to: "leafA", call: "child[0].getSize()", returnVal: "12 KB", type: "LEAF" },
        activeNodes: ["rootDir", "leafA"],
        nodeStates: { rootDir: "ACCUM = 12KB", leafA: "RETURNED 12KB" }
      },
      {
        id: 3,
        tag: { pt: "RECURSÃO EM SUB-ÁRVORE", en: "SUBTREE RECURSION", es: "RECURSIÓN EN SUBÁRBOL" },
        title: { pt: "Folder('/src') delega recursivamente para a subpasta Folder('/core')", en: "Folder('/src') delegates recursively to child Folder('/core')", es: "Folder('/src') delega recursivamente en Folder('/core')" },
        desc: { pt: "O segundo filho é outro Composite! Ele executa exatamente o mesmo loop interno somando seus próprios arquivos (48 KB).", en: "The second child is another Composite! It runs the exact same loop over its own children (48 KB).", es: "El segundo hijo es otro Composite que suma recursivamente sus propios archivos (48 KB)." },
        packet: { from: "rootDir", to: "subDir", call: "child[1].getSize()", returnVal: "48 KB", type: "RECURSE" },
        activeNodes: ["rootDir", "subDir"],
        nodeStates: { rootDir: "ACCUMULATING", subDir: "SUMMING 48KB" }
      },
      {
        id: 4,
        tag: { pt: "AGREGAÇÃO NA RAIZ", en: "ROOT AGGREGATION", es: "AGREGACIÓN EN RAÍZ" },
        title: { pt: "Sub-árvore retorna soma parcial (48 KB) para o Composite pai", en: "Subtree returns partial sum (48 KB) to parent Composite", es: "El subárbol devuelve la suma parcial (48 KB) al padre" },
        desc: { pt: "Folder('/src') soma 12 KB + 48 KB = 60 KB de forma transparente.", en: "Folder('/src') aggregates 12 KB + 48 KB = 60 KB transparently.", es: "Folder('/src') suma 12 KB + 48 KB = 60 KB de forma transparente." },
        packet: { from: "subDir", to: "rootDir", call: "return 48 KB", returnVal: "TOTAL=60KB", type: "AGGREGATE" },
        activeNodes: ["subDir", "rootDir"],
        nodeStates: { rootDir: "TOTAL = 60KB", subDir: "DONE" }
      },
      {
        id: 5,
        tag: { pt: "RESULTADO TRANSPARENTE", en: "UNIFORM RESULT", es: "RESULTADO UNIFORME" },
        title: { pt: "Cliente recebe o total (60 KB) através da interface única Component", en: "Client receives 60 KB total via the single Component interface", es: "El cliente recibe el total (60 KB) mediante la interfaz común" },
        desc: { pt: "O cliente tratou uma árvore inteira exatamente como trataria um único arquivo isolado.", en: "The client treated an entire recursive hierarchy exactly like a single primitive file.", es: "El cliente trató todo un árbol recursivo igual que a un archivo individual." },
        packet: { from: "rootDir", to: "client", call: "return 60 KB", returnVal: "60_KB_OK", type: "RETURN" },
        activeNodes: ["rootDir", "client"],
        nodeStates: { client: "RESULT: 60KB", rootDir: "COMPLETE" }
      }
    ]
  },

  "decorator": {
    code: "DC",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "BackupService", stereotype: "«client»", addr: "0x1800", x: 95, y: 165, color: "blue" },
      { id: "encDec", label: "AESEncryptDecorator", stereotype: "«decorator 2»", addr: "0x2810", x: 325, y: 165, color: "violet" },
      { id: "zipDec", label: "GzipCompressDecorator", stereotype: "«decorator 1»", addr: "0x2850", x: 555, y: 165, color: "cyan" },
      { id: "core", label: "FileDataSource", stereotype: "«core component»", addr: "0x5800", x: 785, y: 165, color: "emerald" }
    ],
    links: [
      { from: "client", to: "encDec", label: "write(raw)" },
      { from: "encDec", to: "zipDec", label: "wrappee.write(cipher)" },
      { from: "zipDec", to: "core", label: "wrappee.write(gzip)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CHAMADA NO ENVOLTÓRIO EXTERNO", en: "OUTER WRAPPER CALL", es: "LLAMADA AL ENVOLTORIO EXTERNO" },
        title: { pt: "Cliente chama write(data) no Decorator externo de forma transparente", en: "Client calls write(data) on outer Decorator transparently", es: "El cliente invoca write(data) en el Decorador externo" },
        desc: { pt: "Como todos os Decorators implementam a interface DataSource, o cliente não sabe quantas camadas envolvem o objeto real.", en: "Because every Decorator implements DataSource, the client is agnostic to how many wrappers surround the core object.", es: "Como cada Decorador implementa DataSource, el cliente ignora cuántas capas envuelven al objeto." },
        packet: { from: "client", to: "encDec", call: "write('SECRET_LOG')", returnVal: "10_BYTES", type: "WRITE" },
        activeNodes: ["client", "encDec"],
        nodeStates: { client: "SENDING RAW", encDec: "INTERCEPTED" }
      },
      {
        id: 2,
        tag: { pt: "RESPONSABILIDADE EXTRA 1", en: "ADDED BEHAVIOR 1 (AES)", es: "COMPORTAMIENTO EXTRA 1" },
        title: { pt: "AESEncryptDecorator cifra o payload e delega para o próximo envoltório", en: "AESEncryptDecorator encrypts payload and delegates inward", es: "AESEncryptDecorator cifra los datos y delega hacia adentro" },
        desc: { pt: "O primeiro Decorator aplica criptografia AES-256 nos dados antes de repassar para this.wrappee.write().", en: "The outer Decorator applies AES-256 encryption before forwarding the buffer to this.wrappee.write().", es: "El primer Decorador aplica cifrado AES-256 antes de delegar en this.wrappee.write()." },
        packet: { from: "encDec", to: "zipDec", call: "write('0x9F8A_AES')", returnVal: "CIPHER_BUF", type: "DECORATE" },
        activeNodes: ["encDec", "zipDec"],
        nodeStates: { encDec: "AES-256 APPLIED", zipDec: "COMPRESSING" }
      },
      {
        id: 3,
        tag: { pt: "RESPONSABILIDADE EXTRA 2", en: "ADDED BEHAVIOR 2 (GZIP)", es: "COMPORTAMIENTO EXTRA 2" },
        title: { pt: "GzipCompressDecorator comprime os bytes e repassa ao componente núcleo", en: "GzipCompressDecorator compresses bytes and forwards to core", es: "GzipCompressDecorator comprime los bytes y delega al núcleo" },
        desc: { pt: "O segundo envoltório comprime o buffer usando Deflate/Gzip e invoca write() no FileDataSource original.", en: "The inner wrapper compresses the buffer via Gzip and invokes write() on the core FileDataSource.", es: "El segundo envoltorio comprime el buffer e invoca write() en FileDataSource." },
        packet: { from: "zipDec", to: "core", call: "write('GZ_0x9F')", returnVal: "DISK_FLUSH", type: "DECORATE" },
        activeNodes: ["zipDec", "core"],
        nodeStates: { zipDec: "GZIP RATIO 62%", core: "WRITING DISK" }
      },
      {
        id: 4,
        tag: { pt: "PERSISTÊNCIA NO NÚCLEO", en: "CORE PERSISTENCE", es: "PERSISTENCIA EN NÚCLEO" },
        title: { pt: "FileDataSource grava os bytes processados no disco", en: "FileDataSource persists transformed bytes to disk", es: "FileDataSource graba los bytes procesados en disco" },
        desc: { pt: "FileDataSource faz apenas seu trabalho simples de I/O em arquivo, sem conter nenhuma lógica de criptografia ou compressão.", en: "FileDataSource performs pure file I/O without containing a single line of encryption or compression logic.", es: "FileDataSource realiza solo E/S de disco sin conocer cifrado ni compresión." },
        packet: { from: "core", to: "zipDec", call: "ack(bytesWritten)", returnVal: "IO_OK", type: "ACK" },
        activeNodes: ["core", "zipDec"],
        nodeStates: { core: "FLUSHED OK", zipDec: "UNWINDING" }
      },
      {
        id: 5,
        tag: { pt: "RETORNO DA PILHA", en: "STACK UNWIND", es: "RETORNO DE PILA" },
        title: { pt: "Confirmação retorna pela cadeia de envoltórios até o cliente", en: "Confirmation unwinds through the wrapper stack to client", es: "La confirmación regresa por la pila de envoltorios al cliente" },
        desc: { pt: "Comportamentos foram empilhados dinamicamente em tempo de execução via composição recursiva.", en: "Behaviors were dynamically stacked at runtime via recursive object composition.", es: "Los comportamientos se apilaron dinámicamente en tiempo de ejecución." },
        packet: { from: "encDec", to: "client", call: "return true", returnVal: "DECORATED_OK", type: "RETURN" },
        activeNodes: ["encDec", "zipDec", "core", "client"],
        nodeStates: { client: "WRITE COMPLETE", core: "SAVED" }
      }
    ]
  },

  "facade": {
    code: "FC",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "MobileAppClient", stereotype: "«client»", addr: "0x1900", x: 105, y: 175, color: "blue" },
      { id: "facade", label: "VideoConverterFacade", stereotype: "«facade»", addr: "0x2900", x: 400, y: 175, color: "cyan" },
      { id: "codec", label: "H264CodecEngine", stereotype: "«subsystem A»", addr: "0x4910", x: 730, y: 55, color: "emerald" },
      { id: "audio", label: "AudioMixerDSP", stereotype: "«subsystem B»", addr: "0x4950", x: 730, y: 175, color: "emerald" },
      { id: "muxer", label: "MP4BitrateMuxer", stereotype: "«subsystem C»", addr: "0x4990", x: 730, y: 295, color: "emerald" }
    ],
    links: [
      { from: "client", to: "facade", label: "convert('clip.mov','mp4')" },
      { from: "facade", to: "codec", label: "1. decodeFrames()" },
      { from: "facade", to: "audio", label: "2. normalizeTracks()" },
      { from: "facade", to: "muxer", label: "3. muxStream()" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CHAMADA SIMPLIFICADA", en: "SINGLE ENTRY CALL", es: "LLAMADA UNIFICADA" },
        title: { pt: "Cliente invoca um único método de alto nível na Facade", en: "Client invokes a single high-level method on the Facade", es: "El cliente invoca un único método de alto nivel en la Fachada" },
        desc: { pt: "Em vez de configurar 15 classes de codecs, buffers e muxers, o cliente chama apenas converter.convert('clip.mov', 'mp4').", en: "Instead of wiring 15 codec, buffer, and muxer classes, the client simply calls converter.convert('clip.mov', 'mp4').", es: "En vez de coordinar múltiples clases internas, el cliente llama a converter.convert()." },
        packet: { from: "client", to: "facade", call: "convert('clip.mov')", returnVal: "JOB_STARTED", type: "CALL" },
        activeNodes: ["client", "facade"],
        nodeStates: { client: "DECOUPLED", facade: "ORCHESTRATING" }
      },
      {
        id: 2,
        tag: { pt: "SUBSISTEMA 1: VÍDEO", en: "SUBSYSTEM 1: CODEC", es: "SUBSISTEMA 1: CÓDEC" },
        title: { pt: "Facade inicializa H264CodecEngine e decodifica quadros", en: "Facade initializes H264CodecEngine and decodes frames", es: "La Fachada inicializa H264CodecEngine y decodifica cuadros" },
        desc: { pt: "A Facade conhece a ordem correta de inicialização do subsistema de vídeo e extrai o stream de frames.", en: "The Facade knows the exact initialization sequence of the video subsystem and extracts the frame buffer.", es: "La Fachada conoce el orden interno del subsistema de video." },
        packet: { from: "facade", to: "codec", call: "decodeH264(stream)", returnVal: "FRAMES_OK", type: "SUBSYS" },
        activeNodes: ["facade", "codec"],
        nodeStates: { codec: "DECODING 60FPS" }
      },
      {
        id: 3,
        tag: { pt: "SUBSISTEMA 2: ÁUDIO", en: "SUBSYSTEM 2: AUDIO DSP", es: "SUBSISTEMA 2: AUDIO DSP" },
        title: { pt: "Facade coordena AudioMixerDSP para sincronizar faixas de áudio", en: "Facade coordinates AudioMixerDSP to normalize audio tracks", es: "La Fachada coordina AudioMixerDSP para sincronizar el audio" },
        desc: { pt: "A Facade encaminha as trilhas sonoras para o processador DSP de áudio sem envolver o cliente.", en: "The Facade routes audio tracks to the DSP mixer without exposing internal buffers to the client.", es: "La Fachada encamina las pistas de audio al procesador DSP." },
        packet: { from: "facade", to: "audio", call: "syncAAC(48000)", returnVal: "AUDIO_SYNCED", type: "SUBSYS" },
        activeNodes: ["facade", "audio"],
        nodeStates: { codec: "DONE", audio: "MIXING AAC" }
      },
      {
        id: 4,
        tag: { pt: "SUBSISTEMA 3: MUXER", en: "SUBSYSTEM 3: MP4 MUXER", es: "SUBSISTEMA 3: MUXER MP4" },
        title: { pt: "Facade aciona MP4BitrateMuxer para unir vídeo e áudio", en: "Facade triggers MP4BitrateMuxer to interleave video and audio", es: "La Fachada activa MP4BitrateMuxer para empaquetar el MP4" },
        desc: { pt: "O muxer combina os buffers de vídeo e áudio em um container MP4 final pronto para uso.", en: "The muxer interleaves the video and audio buffers into a final MP4 container.", es: "El muxer combina video y audio en el contenedor MP4 final." },
        packet: { from: "facade", to: "muxer", call: "muxContainer()", returnVal: "MP4_FILE", type: "SUBSYS" },
        activeNodes: ["facade", "muxer"],
        nodeStates: { audio: "DONE", muxer: "MUXING MP4" }
      },
      {
        id: 5,
        tag: { pt: "ENTREGA LIMPA", en: "CLEAN FILE RETURN", es: "ENTREGA SIMPLIFICADA" },
        title: { pt: "Facade devolve o arquivo MP4 finalizado ao cliente", en: "Facade returns the completed MP4 file to the client", es: "La Fachada devuelve el archivo MP4 terminado al cliente" },
        desc: { pt: "O acoplamento entre o cliente e os 3 subsistemas internos permaneceu zero durante toda a operação.", en: "Coupling between the client and the 3 internal subsystems remained zero throughout the entire operation.", es: "El acoplamiento entre el cliente y los 3 subsistemas internos se mantuvo en cero." },
        packet: { from: "facade", to: "client", call: "return 'clip.mp4'", returnVal: "SUCCESS", type: "RETURN" },
        activeNodes: ["facade", "client"],
        nodeStates: { client: "RECEIVED MP4", facade: "IDLE" }
      }
    ]
  },

  "flyweight": {
    code: "FW",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "doc", label: "LexiDocumentRow", stereotype: "«client context»", addr: "0x1A00", x: 110, y: 165, color: "blue" },
      { id: "factory", label: "GlyphFlyweightPool", stereotype: "«flyweight factory»", addr: "0x2A00", x: 430, y: 80, color: "cyan" },
      { id: "charA", label: "CharGlyph('a')", stereotype: "«intrinsic 0x9001»", addr: "0x9001", x: 740, y: 80, color: "emerald" },
      { id: "screen", label: "WindowCanvas", stereotype: "«extrinsic target»", addr: "0x7A00", x: 740, y: 255, color: "amber" }
    ],
    links: [
      { from: "doc", to: "factory", label: "getGlyph('a')" },
      { from: "factory", to: "charA", label: "shared pool ref" },
      { from: "doc", to: "charA", label: "draw(x, y, font)" },
      { from: "charA", to: "screen", label: "renders at (x,y)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "REQUISIÇÃO AO POOL", en: "POOL LOOKUP", es: "CONSULTA AL POOL" },
        title: { pt: "Documento solicita glifo da letra 'a' ao FlyweightPool", en: "Document requests glyph 'a' from GlyphFlyweightPool", es: "El documento solicita el glifo 'a' al FlyweightPool" },
        desc: { pt: "Uma página contém 4.000 ocorrências da letra 'a'. Criar 4.000 objetos idênticos desperdiçaria megabytes de RAM.", en: "A page contains 4,000 occurrences of letter 'a'. Allocating 4,000 identical objects would waste megabytes of RAM.", es: "Una página contiene 4.000 letras 'a'. Crear 4.000 objetos agotaría la memoria." },
        packet: { from: "doc", to: "factory", call: "getGlyph('a')", returnVal: "POOL_HIT", type: "LOOKUP" },
        activeNodes: ["doc", "factory"],
        nodeStates: { doc: "CHAR #1 ('a')", factory: "CHECKING MAP" }
      },
      {
        id: 2,
        tag: { pt: "ESTADO INTRÍNSECO COMPARTILHADO", en: "SHARED INTRINSIC STATE", es: "ESTADO INTRÍNSECO COMPARTIDO" },
        title: { pt: "Pool retorna referência única compartilhada CharGlyph('a') @ 0x9001", en: "Pool returns shared singleton flyweight CharGlyph('a') @ 0x9001", es: "El Pool devuelve la instancia compartida CharGlyph('a') @ 0x9001" },
        desc: { pt: "O estado intrínseco (código ASCII 97 e curvas vetoriais do caractere 'a') é imutável e compartilhado por todo o documento.", en: "Intrinsic state (ASCII code 97 and bezier outline for 'a') is immutable and shared across the entire document.", es: "El estado intrínseco (curvas vectoriales de 'a') es inmutable y compartido." },
        packet: { from: "factory", to: "charA", call: "return pool['a']", returnVal: "ref:0x9001", type: "SHARE" },
        activeNodes: ["factory", "charA"],
        nodeStates: { factory: "1 INSTANCE IN RAM", charA: "INTRINSIC 'a'" }
      },
      {
        id: 3,
        tag: { pt: "INJEÇÃO DO ESTADO EXTRÍNSECO 1", en: "EXTRINSIC CALL #1", es: "ESTADO EXTRÍNSECO #1" },
        title: { pt: "Documento passa coordenadas extrínsecas (x:12, y:40) no momento do draw()", en: "Document passes extrinsic coordinates (x:12, y:40) into draw()", es: "El documento pasa coordenadas extrínsecas (x:12, y:40) a draw()" },
        desc: { pt: "A posição na tela não fica guardada dentro do Flyweight: ela é passada como argumento extrínseco.", en: "Screen position is never stored inside the Flyweight; it is supplied as an extrinsic argument at render time.", es: "La posición en pantalla no se guarda en el Flyweight; se pasa como argumento extrínseco." },
        packet: { from: "doc", to: "charA", call: "draw(x:12, y:40)", returnVal: "BLIT_1", type: "RENDER" },
        activeNodes: ["doc", "charA", "screen"],
        nodeStates: { charA: "DRAWING @ (12,40)", screen: "GLYPH #1 PAINTED" }
      },
      {
        id: 4,
        tag: { pt: "REUSO NA OCORRÊNCIA #2.500", en: "REUSE ON OCCURRENCE #2500", es: "REÚSO EN OCURRENCIA #2500" },
        title: { pt: "Mesma instância 0x9001 é reutilizada com novo contexto (x:380, y:190)", en: "Exact same instance 0x9001 is reused with new context (x:380, y:190)", es: "La misma instancia 0x9001 se reutiliza en (x:380, y:190)" },
        desc: { pt: "Na 2.500ª letra 'a' do texto, o mesmo endereço 0x9001 é invocado apenas com novas coordenadas extrínsecas.", en: "On the 2,500th letter 'a' in the text, the exact same 0x9001 address is invoked with new extrinsic coordinates.", es: "En la aparición #2500 de 'a', se invoca el mismo objeto 0x9001 con nuevas coordenadas." },
        packet: { from: "doc", to: "charA", call: "draw(x:380, y:190)", returnVal: "BLIT_2500", type: "RENDER" },
        activeNodes: ["doc", "charA", "screen"],
        nodeStates: { charA: "REUSED 0x9001", screen: "GLYPH #2500 PAINTED" }
      },
      {
        id: 5,
        tag: { pt: "ECONOMIA DE RAM", en: "MEMORY TELEMETRY", es: "AHORRO DE MEMORIA" },
        title: { pt: "400.000 caracteres renderizados usando apenas 26 objetos Flyweight", en: "400,000 characters rendered using only 26 Flyweight instances", es: "400.000 caracteres renderizados con solo 26 objetos Flyweight" },
        desc: { pt: "O consumo de heap cai em mais de 99%, mantendo performance de renderização em tempo real.", en: "Heap consumption drops by over 99% while maintaining real-time rendering throughput.", es: "El consumo de memoria en el heap se reduce en más del 99%." },
        packet: { from: "charA", to: "screen", call: "flushFrameBuffer()", returnVal: "RAM_SAVED_99%", type: "DONE" },
        activeNodes: ["factory", "charA", "screen"],
        nodeStates: { factory: "POOL SIZE: 26", screen: "400K CHARS OK" }
      }
    ]
  },

  "proxy": {
    code: "PX",
    layerIndex: 2,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "DashboardView", stereotype: "«client»", addr: "0x1B00", x: 110, y: 165, color: "blue" },
      { id: "subjectIf", label: "ReportService", stereotype: "«subject if»", addr: "0x2B00", x: 390, y: 75, color: "cyan" },
      { id: "proxy", label: "CachingSecurityProxy", stereotype: "«proxy»", addr: "0x3B00", x: 440, y: 255, color: "violet" },
      { id: "real", label: "HeavyBigQueryService", stereotype: "«real subject»", addr: "0x8B00", x: 745, y: 165, color: "emerald" }
    ],
    links: [
      { from: "client", to: "subjectIf", label: "getAnnualReport()" },
      { from: "subjectIf", to: "proxy", label: "intercepts", dashed: true },
      { from: "proxy", to: "real", label: "lazy init & forward" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "INTERCEPTAÇÃO TRANSPARENTE", en: "TRANSPARENT INTERCEPT", es: "INTERCEPCIÓN TRANSPARENTE" },
        title: { pt: "Cliente chama getAnnualReport() pensando falar com o serviço real", en: "Client calls getAnnualReport() via Subject interface", es: "El cliente invoca getAnnualReport() a través de la interfaz" },
        desc: { pt: "O CachingSecurityProxy implementa a mesma interface ReportService, posicionando-se como substituto (surrogate).", en: "CachingSecurityProxy implements ReportService, acting as a transparent surrogate in front of the heavy service.", es: "CachingSecurityProxy implementa ReportService actuando como representante transparente." },
        packet: { from: "client", to: "proxy", call: "getReport(jwt)", returnVal: "INTERCEPTED", type: "REQUEST" },
        activeNodes: ["client", "subjectIf", "proxy"],
        nodeStates: { client: "CALLING", proxy: "VERIFYING ACL", real: "NOT ALLOCATED" }
      },
      {
        id: 2,
        tag: { pt: "PROTEÇÃO & CACHE MISS", en: "ACL CHECK & CACHE MISS", es: "CONTROL DE ACCESO Y CACHÉ" },
        title: { pt: "Proxy valida token JWT e verifica se o relatório já está em cache", en: "Proxy validates JWT role and checks local memory cache", es: "El Proxy valida permisos JWT y revisa la caché local" },
        desc: { pt: "O Proxy aprova a permissão de leitura e detecta Cache Miss na primeira chamada. O RealSubject ainda não existe na RAM.", en: "Proxy approves RBAC permission and detects a Cache Miss on the first call. RealSubject is not yet allocated.", es: "El Proxy aprueba permisos y detecta Cache Miss en la primera llamada." },
        packet: { from: "proxy", to: "real", call: "lazyInit() + fetch()", returnVal: "ALLOC_0x8B00", type: "LAZY_INIT" },
        activeNodes: ["proxy", "real"],
        nodeStates: { proxy: "ACL OK / MISS", real: "LAZY ALLOCATING" }
      },
      {
        id: 3,
        tag: { pt: "DELEGAÇÃO AO REAL SUBJECT", en: "REAL SUBJECT EXECUTION", es: "EJECUCIÓN EN SUJETO REAL" },
        title: { pt: "HeavyBigQueryService é instanciado sob demanda e processa a consulta", en: "HeavyBigQueryService is lazily allocated and runs heavy query", es: "HeavyBigQueryService se instancia bajo demanda y ejecuta la consulta" },
        desc: { pt: "Apenas após passar pela segurança e pelo cache o objeto pesado (0x8B00) é inicializado e consultado.", en: "Only after passing security and cache checks is the expensive service (0x8B00) allocated and queried.", es: "Solo tras superar seguridad y caché se inicializa el objeto pesado (0x8B00)." },
        packet: { from: "real", to: "proxy", call: "return Dataset(4MB)", returnVal: "CACHE_STORED", type: "DATA" },
        activeNodes: ["real", "proxy"],
        nodeStates: { real: "QUERY DONE", proxy: "CACHING TTL=60s" }
      },
      {
        id: 4,
        tag: { pt: "CHAMADA SUBSEQUENTE (CACHE HIT)", en: "SUBSEQUENT CALL (HIT)", es: "LLAMADA SUBSIGUIENTE (HIT)" },
        title: { pt: "Segunda requisição do cliente atinge o Proxy", en: "Second client request hits the Proxy", es: "Una segunda petición del cliente llega al Proxy" },
        desc: { pt: "Instantes depois, o painel solicita novamente o mesmo relatório anual.", en: "Moments later, the dashboard requests the same annual report again.", es: "Instantes después, el panel vuelve a solicitar el mismo informe." },
        packet: { from: "client", to: "proxy", call: "getReport(jwt)", returnVal: "CACHE_HIT_0ms", type: "REQUEST" },
        activeNodes: ["client", "proxy"],
        nodeStates: { proxy: "CACHE HIT (0.1ms)", real: "IDLE (BYPASSED)" }
      },
      {
        id: 5,
        tag: { pt: "RESPOSTA INSTANTÂNEA", en: "INSTANT CACHED RESPONSE", es: "RESPUESTA INSTANTÁNEA" },
        title: { pt: "Proxy responde imediatamente da memória sem acionar o RealSubject", en: "Proxy serves cached response immediately without touching RealSubject", es: "El Proxy responde desde caché sin tocar el RealSubject" },
        desc: { pt: "O Proxy combinou Protection Proxy, Virtual Proxy (lazy init) e Caching Proxy de forma invisível para o cliente.", en: "The Proxy combined Protection, Virtual (lazy init), and Caching capabilities invisibly to the client.", es: "El Proxy combinó protección, carga perezosa y caché de forma transparente." },
        packet: { from: "proxy", to: "client", call: "return CachedDataset", returnVal: "200_FAST", type: "RETURN" },
        activeNodes: ["proxy", "client"],
        nodeStates: { client: "RENDERED 0.1ms", proxy: "SERVED FROM RAM" }
      }
    ]
  },

  "chain-of-responsibility": {
    code: "CR",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "APIGatewayClient", stereotype: "«sender»", addr: "0x1C00", x: 95, y: 165, color: "blue" },
      { id: "h1", label: "RateLimitHandler", stereotype: "«handler 1»", addr: "0x2C10", x: 325, y: 165, color: "violet" },
      { id: "h2", label: "JWTAuthHandler", stereotype: "«handler 2»", addr: "0x2C50", x: 555, y: 165, color: "violet" },
      { id: "h3", label: "OrderController", stereotype: "«final handler»", addr: "0x2C90", x: 785, y: 165, color: "emerald" }
    ],
    links: [
      { from: "client", to: "h1", label: "handle(req)" },
      { from: "h1", to: "h2", label: "next.handle(req)" },
      { from: "h2", to: "h3", label: "next.handle(req)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "ENTRADA NA CADEIA", en: "CHAIN ENTRY", es: "ENTRADA EN LA CADENA" },
        title: { pt: "Cliente envia requisição ao primeiro elo sem conhecer os demais", en: "Sender dispatches request to first link in the chain", es: "El emisor envía la petición al primer eslabón de la cadena" },
        desc: { pt: "O emissor conhece apenas a interface abstrata Handler do primeiro objeto (RateLimitHandler).", en: "The sender only holds a reference to the first Handler interface (RateLimitHandler).", es: "El emisor solo conoce la interfaz Handler del primer eslabón." },
        packet: { from: "client", to: "h1", call: "handle(POST /orders)", returnVal: "QUOTA_42/100", type: "PASS" },
        activeNodes: ["client", "h1"],
        nodeStates: { client: "SENT", h1: "INSPECTING IP" }
      },
      {
        id: 2,
        tag: { pt: "ELO 1 APROVA E REPASSA", en: "LINK 1 APPROVES & FORWARDS", es: "ESLABÓN 1 APRUEBA Y DELEGA" },
        title: { pt: "RateLimitHandler valida cota de IP e chama this.next.handle(req)", en: "RateLimitHandler validates quota and calls this.next.handle(req)", es: "RateLimitHandler valida la cuota e invoca this.next.handle(req)" },
        desc: { pt: "Como o limite de requisições não foi excedido, o elo 1 delega a requisição para o próximo elo configurado.", en: "Because the rate limit is not exceeded, link 1 forwards the request to its successor.", es: "Como no se superó el límite, el primer eslabón pasa la solicitud al siguiente." },
        packet: { from: "h1", to: "h2", call: "next.handle(req)", returnVal: "TOKEN_VALID", type: "PASS" },
        activeNodes: ["h1", "h2"],
        nodeStates: { h1: "PASSED ->", h2: "CHECKING JWT" }
      },
      {
        id: 3,
        tag: { pt: "ELO 2 AUTENTICA E REPASSA", en: "LINK 2 AUTHENTICATES", es: "ESLABÓN 2 AUTENTICA" },
        title: { pt: "JWTAuthHandler valida assinatura criptográfica e avança na cadeia", en: "JWTAuthHandler verifies signature and forwards along chain", es: "JWTAuthHandler verifica la firma y avanza en la cadena" },
        desc: { pt: "Se o token fosse inválido, JWTAuthHandler interromperia a cadeia aqui mesmo (short-circuit). Como é válido, avança.", en: "If the token were invalid, JWTAuthHandler would short-circuit here. Since it is valid, it forwards to next.", es: "Si el token fuera inválido, cortaría la cadena aquí. Al ser válido, avanza." },
        packet: { from: "h2", to: "h3", call: "next.handle(req+user)", returnVal: "ORDER_CREATED", type: "PASS" },
        activeNodes: ["h2", "h3"],
        nodeStates: { h2: "AUTH OK ->", h3: "HANDLING REQUEST" }
      },
      {
        id: 4,
        tag: { pt: "CONSUMO PELO RECEPTOR FINAL", en: "FINAL HANDLER CONSUMPTION", es: "PROCESAMIENTO FINAL" },
        title: { pt: "OrderController processa a regra de negócio e encerra a propagação", en: "OrderController processes business command and halts propagation", es: "OrderController procesa la petición y detiene la propagación" },
        desc: { pt: "O elo final assume a responsabilidade definitiva pela requisição, criando o pedido #9042.", en: "The terminal handler takes full responsibility for the request, creating order #9042.", es: "El manejador final asume la responsabilidad y crea el pedido #9042." },
        packet: { from: "h3", to: "h2", call: "return 201 Created", returnVal: "ORDER_#9042", type: "HANDLED" },
        activeNodes: ["h3", "h2"],
        nodeStates: { h3: "HANDLED #9042", h2: "RETURNING" }
      },
      {
        id: 5,
        tag: { pt: "RESPOSTA AO EMISSOR", en: "RESPONSE UNWIND", es: "RESPUESTA AL EMISSOR" },
        title: { pt: "Resposta retorna ao APIGatewayClient com pipeline desacoplado", en: "Response returns to APIGatewayClient through decoupled pipeline", es: "La respuesta regresa al cliente a través de la cadena desacoplada" },
        desc: { pt: "Novos middlewares (CORS, Compressão, Auditoria) podem ser inseridos na cadeia em tempo de execução.", en: "New handlers (CORS, Compression, Audit) can be spliced into the chain at runtime without touching existing links.", es: "Nuevos eslabones pueden insertarse dinámicamente sin alterar los demás." },
        packet: { from: "h1", to: "client", call: "HTTP 201 {#9042}", returnVal: "CHAIN_DONE", type: "RETURN" },
        activeNodes: ["h1", "client"],
        nodeStates: { client: "201 RECEIVED", h3: "DONE" }
      }
    ]
  },

  "command": {
    code: "CM",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "invoker", label: "ToolbarInvoker", stereotype: "«invoker + stack»", addr: "0x1D00", x: 110, y: 165, color: "blue" },
      { id: "cmd", label: "InsertTextCommand", stereotype: "«command obj»", addr: "0x3D40", x: 430, y: 75, color: "violet" },
      { id: "history", label: "UndoHistoryStack", stereotype: "«LIFO stack»", addr: "0x3D90", x: 430, y: 255, color: "amber" },
      { id: "receiver", label: "DocumentBuffer", stereotype: "«receiver»", addr: "0x6D00", x: 745, y: 165, color: "emerald" }
    ],
    links: [
      { from: "invoker", to: "cmd", label: "execute() / undo()" },
      { from: "invoker", to: "history", label: "push / pop" },
      { from: "cmd", to: "receiver", label: "insert('GoF', pos:0)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "ENCAPSULAMENTO DO PEDIDO", en: "REQUEST REIFICATION", es: "ENCAPSULAMIENTO DE ACCIÓN" },
        title: { pt: "Ação de edição é encapsulada no objeto InsertTextCommand", en: "Edit action is encapsulated as an InsertTextCommand object", es: "La acción de edición se encapsula en InsertTextCommand" },
        desc: { pt: "Em vez do botão alterar o texto diretamente, ele dispara executeCommand(cmd) no ToolbarInvoker.", en: "Instead of a button mutating text directly, it passes an encapsulated Command object to ToolbarInvoker.", es: "En vez de modificar el texto directamente, el botón entrega un objeto Command al Invoker." },
        packet: { from: "invoker", to: "cmd", call: "cmd.execute()", returnVal: "DISPATCH_REC", type: "EXEC" },
        activeNodes: ["invoker", "cmd"],
        nodeStates: { invoker: "EXECUTING CMD", cmd: "PAYLOAD='GoF'" }
      },
      {
        id: 2,
        tag: { pt: "AÇÃO NO RECEIVER", en: "RECEIVER MUTATION", es: "ACCIÓN EN EL RECEPTOR" },
        title: { pt: "InsertTextCommand invoca a operação real no DocumentBuffer", en: "InsertTextCommand invokes insert() on DocumentBuffer receiver", es: "InsertTextCommand invoca insert() en el DocumentBuffer" },
        desc: { pt: "O objeto Command guarda a referência ao Receiver (DocumentBuffer), a posição (0) e a string ('GoF').", en: "The Command object holds the Receiver reference, cursor offset (0), and inserted string ('GoF').", es: "El objeto Command guarda la referencia al Receptor, la posición y el texto." },
        packet: { from: "cmd", to: "receiver", call: "insert('GoF', 0)", returnVal: "TEXT='GoF'", type: "MUTATE" },
        activeNodes: ["cmd", "receiver"],
        nodeStates: { receiver: "BUFFER: 'GoF'" }
      },
      {
        id: 3,
        tag: { pt: "EMPILHAMENTO NO HISTÓRICO", en: "HISTORY STACK PUSH", es: "APILADO EN HISTORIAL" },
        title: { pt: "Invoker empilha o comando executado na UndoHistoryStack", en: "Invoker pushes executed command onto UndoHistoryStack", es: "El Invoker apila el comando ejecutado en UndoHistoryStack" },
        desc: { pt: "Como o pedido é um objeto de primeira classe na memória (0x3D40), ele pode ser guardado em uma fila ou pilha LIFO.", en: "Because the request is a first-class heap object (0x3D40), it can be stored on a LIFO history stack.", es: "Al ser un objeto en memoria (0x3D40), puede almacenarse en una pila LIFO." },
        packet: { from: "invoker", to: "history", call: "stack.push(0x3D40)", returnVal: "DEPTH=1", type: "PUSH" },
        activeNodes: ["invoker", "history"],
        nodeStates: { history: "TOP: [Insert 'GoF']" }
      },
      {
        id: 4,
        tag: { pt: "ACIONAMENTO DO UNDO (CTRL+Z)", en: "UNDO TRIGGERED", es: "EJECUCIÓN DE UNDO (CTRL+Z)" },
        title: { pt: "Usuário pressiona Ctrl+Z e o Invoker desempilha o comando", en: "User presses Ctrl+Z; Invoker pops command and calls undo()", es: "El usuario presiona Ctrl+Z; el Invoker desapila e invoca undo()" },
        desc: { pt: "O Invoker recupera 0x3D40 do topo da pilha e chama seu método inverso cmd.undo().", en: "Invoker pops 0x3D40 from the stack and invokes its inverse operation cmd.undo().", es: "El Invoker recupera 0x3D40 de la pila e invoca su operación inversa cmd.undo()." },
        packet: { from: "history", to: "cmd", call: "pop() -> cmd.undo()", returnVal: "REVERSE_OP", type: "UNDO" },
        activeNodes: ["history", "invoker", "cmd"],
        nodeStates: { history: "DEPTH=0", cmd: "RUNNING UNDO()" }
      },
      {
        id: 5,
        tag: { pt: "REVERSÃO EXATA", en: "EXACT STATE REVERSAL", es: "REVERSIÓN EXACTA" },
        title: { pt: "Command executa delete(0, 3) no Receiver, revertendo o documento", en: "Command executes delete(0, 3) on Receiver, restoring prior state", es: "Command ejecuta delete(0, 3) en el Receptor, restaurando el estado" },
        desc: { pt: "O DocumentBuffer volta exatamente ao estado anterior sem que o ToolbarInvoker conheça detalhes de strings.", en: "DocumentBuffer returns to its exact prior state without ToolbarInvoker knowing anything about string manipulation.", es: "DocumentBuffer vuelve a su estado previo sin acoplar al Invoker." },
        packet: { from: "cmd", to: "receiver", call: "delete(pos:0, len:3)", returnVal: "TEXT=''", type: "RESTORE" },
        activeNodes: ["cmd", "receiver"],
        nodeStates: { receiver: "BUFFER: '' (REVERTED)", invoker: "UNDO COMPLETE" }
      }
    ]
  },

  "interpreter": {
    code: "IN",
    layerIndex: 3,
    scopeType: "CLASS",
    nodes: [
      { id: "context", label: "VariableContext", stereotype: "«context {x:true,y:false}»", addr: "0x1E00", x: 120, y: 165, color: "blue" },
      { id: "andExpr", label: "AndExpr(left, right)", stereotype: "«non-terminal»", addr: "0x2E00", x: 435, y: 165, color: "violet" },
      { id: "termX", label: "VarExpr('x')", stereotype: "«terminal»", addr: "0x4E10", x: 740, y: 75, color: "emerald" },
      { id: "notY", label: "NotExpr(Var('y'))", stereotype: "«non-terminal»", addr: "0x4E50", x: 740, y: 255, color: "cyan" }
    ],
    links: [
      { from: "context", to: "andExpr", label: "interpret(ctx)" },
      { from: "andExpr", to: "termX", label: "left.interpret(ctx)" },
      { from: "andExpr", to: "notY", label: "right.interpret(ctx)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "AVALIAÇÃO DA RAIZ AST", en: "AST ROOT EVALUATION", es: "EVALUACIÓN DE RAÍZ AST" },
        title: { pt: "Contexto {x:true, y:false} é passado para a raiz da árvore (x AND NOT y)", en: "Context {x:true, y:false} is passed into AST root (x AND NOT y)", es: "El contexto {x:true, y:false} se pasa a la raíz AST (x AND NOT y)" },
        desc: { pt: "A regra gramatical foi representada como uma árvore de objetos AbstractExpression.", en: "The grammar sentence is represented as an Abstract Syntax Tree (AST) of Expression objects.", es: "La sentencia gramatical se representa como un Árbol de Sintaxis Abstracta (AST)." },
        packet: { from: "context", to: "andExpr", call: "interpret({x:T, y:F})", returnVal: "EVAL_AST", type: "EVAL" },
        activeNodes: ["context", "andExpr"],
        nodeStates: { context: "x=true, y=false", andExpr: "EVALUATING LEFT" }
      },
      {
        id: 2,
        tag: { pt: "EXPRESSÃO TERMINAL ESQUERDA", en: "LEFT TERMINAL NODE", es: "NODO TERMINAL IZQUIERDO" },
        title: { pt: "AndExpr avalia o nó terminal esquerdo VarExpr('x')", en: "AndExpr evaluates left terminal node VarExpr('x')", es: "AndExpr evalúa el nodo terminal izquierdo VarExpr('x')" },
        desc: { pt: "VarExpr('x') consulta o dicionário do Contexto e resolve seu valor booleano para true.", en: "VarExpr('x') looks up 'x' in the Context bindings and resolves to boolean true.", es: "VarExpr('x') consulta el Contexto y resuelve su valor a true." },
        packet: { from: "andExpr", to: "termX", call: "left.interpret(ctx)", returnVal: "true", type: "TERMINAL" },
        activeNodes: ["andExpr", "termX"],
        nodeStates: { termX: "ctx['x'] => TRUE", andExpr: "LEFT = TRUE" }
      },
      {
        id: 3,
        tag: { pt: "RAMO NÃO-TERMINAL DIREITO", en: "RIGHT NON-TERMINAL BRANCH", es: "RAMA NO TERMINAL DERECHA" },
        title: { pt: "AndExpr avalia o ramo direito NotExpr(Var('y'))", en: "AndExpr evaluates right branch NotExpr(Var('y'))", es: "AndExpr evalúa la rama derecha NotExpr(Var('y'))" },
        desc: { pt: "Como o lado esquerdo resultou em true, o operador AND precisa avaliar recursivamente a sub-expressão direita.", en: "Because the left operand is true, the AND expression recursively evaluates its right sub-expression.", es: "Como el lado izquierdo es true, el nodo AND evalúa recursivamente la rama derecha." },
        packet: { from: "andExpr", to: "notY", call: "right.interpret(ctx)", returnVal: "!false => true", type: "RECURSE" },
        activeNodes: ["andExpr", "notY"],
        nodeStates: { notY: "NOT(false) => TRUE" }
      },
      {
        id: 4,
        tag: { pt: "REDUÇÃO BOOLEANA", en: "BOOLEAN REDUCTION", es: "REDUCCIÓN BOOLEANA" },
        title: { pt: "NotExpr retorna true para o operador pai AndExpr", en: "NotExpr returns true to parent AndExpr node", es: "NotExpr devuelve true al nodo padre AndExpr" },
        desc: { pt: "AndExpr combina os resultados dos dois filhos: true && true = true.", en: "AndExpr combines both child evaluations: true && true = true.", es: "AndExpr combina ambos resultados: true && true = true." },
        packet: { from: "notY", to: "andExpr", call: "return true", returnVal: "TRUE && TRUE", type: "REDUCE" },
        activeNodes: ["notY", "andExpr"],
        nodeStates: { andExpr: "TRUE && TRUE = TRUE" }
      },
      {
        id: 5,
        tag: { pt: "SENTENÇA INTERPRETADA", en: "SENTENCE INTERPRETED", es: "SENTENCIA INTERPRETADA" },
        title: { pt: "Raiz da AST devolve o resultado final (true) ao cliente", en: "AST root returns final evaluation (true) to caller", es: "La raíz AST devuelve el resultado final (true)" },
        desc: { pt: "Novos operadores (OR, XOR, REGEX) podem ser adicionados como novas subclasses de Expression.", en: "New grammar operators (OR, XOR, REGEX) can be added cleanly as new Expression subclasses.", es: "Nuevos operadores gramaticales se agregan fácilmente como subclases." },
        packet: { from: "andExpr", to: "context", call: "return true", returnVal: "RESULT_TRUE", type: "RETURN" },
        activeNodes: ["andExpr", "context"],
        nodeStates: { context: "OUTPUT = TRUE", andExpr: "DONE" }
      }
    ]
  },

  "iterator": {
    code: "IT",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "FeedRenderer", stereotype: "«client»", addr: "0x1F00", x: 110, y: 165, color: "blue" },
      { id: "iter", label: "TreeBFSIterator", stereotype: "«iterator cursor»", addr: "0x3F00", x: 435, y: 75, color: "violet" },
      { id: "aggregate", label: "SocialGraphCollection", stereotype: "«aggregate»", addr: "0x5F00", x: 435, y: 255, color: "emerald" },
      { id: "elem", label: "NodeItem[idx]", stereotype: "«element»", addr: "0x7F20", x: 745, y: 165, color: "cyan" }
    ],
    links: [
      { from: "client", to: "aggregate", label: "createIterator()" },
      { from: "client", to: "iter", label: "hasNext() / next()" },
      { from: "iter", to: "aggregate", label: "tracks cursor state" },
      { from: "iter", to: "elem", label: "yields item" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CRIAÇÃO DO CURSOR", en: "CURSOR CREATION", es: "CREACIÓN DEL CURSOR" },
        title: { pt: "Cliente solicita um objeto Iterator à coleção agregada", en: "Client requests an Iterator cursor from the Aggregate", es: "El cliente solicita un objeto Iterator a la colección" },
        desc: { pt: "SocialGraphCollection esconde sua estrutura interna de adjacência e devolve um TreeBFSIterator dedicado.", en: "SocialGraphCollection hides its internal adjacency lists and returns a dedicated TreeBFSIterator.", es: "SocialGraphCollection oculta su estructura interna y devuelve un TreeBFSIterator." },
        packet: { from: "client", to: "aggregate", call: "createBFSIterator()", returnVal: "Iter@0x3F00", type: "CREATE" },
        activeNodes: ["client", "aggregate", "iter"],
        nodeStates: { aggregate: "ENCAPSULATED", iter: "CURSOR AT 0" }
      },
      {
        id: 2,
        tag: { pt: "VERIFICAÇÃO DE LIMITE", en: "BOUNDARY CHECK", es: "VERIFICACIÓN DE LÍMITE" },
        title: { pt: "Cliente verifica iter.hasNext() antes de avançar", en: "Client checks iter.hasNext() before advancing", es: "El cliente verifica iter.hasNext() antes de avanzar" },
        desc: { pt: "O Iterator inspeciona sua fila interna de travessia em largura (BFS) e confirma que há elementos pendentes.", en: "The Iterator checks its internal BFS traversal queue and confirms remaining elements exist.", es: "El Iterator revisa su cola interna de recorrido y confirma que hay elementos." },
        packet: { from: "client", to: "iter", call: "iter.hasNext()", returnVal: "true (3 left)", type: "CHECK" },
        activeNodes: ["client", "iter"],
        nodeStates: { iter: "HAS_NEXT = TRUE" }
      },
      {
        id: 3,
        tag: { pt: "EXTRAÇÃO DO ELEMENTO", en: "ELEMENT EXTRACTION", es: "EXTRACCIÓN DE ELEMENTO" },
        title: { pt: "iter.next() busca o elemento atual e avança o cursor interno", en: "iter.next() fetches current element and advances cursor", es: "iter.next() obtiene el elemento actual y avanza el cursor" },
        desc: { pt: "O Iterator acessa a estrutura privada do Aggregate, extrai NodeItem[0] e atualiza o ponteiro para o próximo.", en: "Iterator accesses the Aggregate private structure, extracts NodeItem[0], and advances its cursor.", es: "El Iterator extrae NodeItem[0] y actualiza su posición interna." },
        packet: { from: "iter", to: "elem", call: "fetchCurrent()", returnVal: "Profile#101", type: "FETCH" },
        activeNodes: ["iter", "aggregate", "elem"],
        nodeStates: { iter: "CURSOR -> 1", elem: "YIELDED #101" }
      },
      {
        id: 4,
        tag: { pt: "ENTREGA SEQUENCIAL", en: "SEQUENTIAL YIELD", es: "ENTREGA SECUENCIAL" },
        title: { pt: "Elemento é entregue ao cliente através da interface uniforme", en: "Element is yielded to client via uniform Iterator interface", es: "El elemento se entrega al cliente mediante la interfaz uniforme" },
        desc: { pt: "Se a coleção mudar de Árvore para Tabela Hash amanhã, o loop while(it.hasNext()) do cliente não muda.", en: "If the collection changes from a Tree to a Hash Table tomorrow, the client's while(it.hasNext()) loop stays untouched.", es: "Si la colección cambia su estructura interna mañana, el bucle del cliente no cambia." },
        packet: { from: "iter", to: "client", call: "yield Profile#101", returnVal: "ITEM_OK", type: "YIELD" },
        activeNodes: ["iter", "client"],
        nodeStates: { client: "RENDERED #101", iter: "CURSOR AT 1" }
      },
      {
        id: 5,
        tag: { pt: "FIM DA TRAVESSIA", en: "TRAVERSAL COMPLETE", es: "FIN DEL RECORRIDO" },
        title: { pt: "Quando a fila esvazia, hasNext() retorna false e encerra o loop", en: "When queue empties, hasNext() returns false to terminate loop", es: "Al vaciarse la cola, hasNext() devuelve false y cierra el ciclo" },
        desc: { pt: "Múltiplos iteradores independentes podem percorrer a mesma coleção simultaneamente sem conflito de estado.", en: "Multiple independent iterators can traverse the exact same collection concurrently without cursor collisions.", es: "Múltiples iteradores pueden recorrer la misma colección en paralelo sin conflicto." },
        packet: { from: "iter", to: "client", call: "hasNext() => false", returnVal: "EOF_REACHED", type: "DONE" },
        activeNodes: ["iter", "client"],
        nodeStates: { iter: "EXHAUSTED", client: "LOOP FINISHED" }
      }
    ]
  },

  "mediator": {
    code: "MD",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "colA", label: "Flight747 (Colleague A)", stereotype: "«colleague»", addr: "0x1010", x: 120, y: 80, color: "blue" },
      { id: "colB", label: "Airbus320 (Colleague B)", stereotype: "«colleague»", addr: "0x1020", x: 120, y: 250, color: "blue" },
      { id: "mediator", label: "ControlTowerMediator", stereotype: "«mediator hub»", addr: "0x5000", x: 450, y: 165, color: "violet" },
      { id: "colC", label: "RunwayLightingSystem", stereotype: "«colleague C»", addr: "0x1030", x: 750, y: 165, color: "emerald" }
    ],
    links: [
      { from: "colA", to: "mediator", label: "notify('REQUEST_LAND')" },
      { from: "mediator", to: "colB", label: "holdPattern()" },
      { from: "mediator", to: "colC", label: "activateRunway09()" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "NOTIFICAÇÃO AO HUB CENTRAL", en: "HUB NOTIFICATION", es: "NOTIFICACIÓN AL CONCENTRADOR" },
        title: { pt: "Flight747 notifica apenas a Torre de Controle (Mediator)", en: "Flight747 notifies only the ControlTowerMediator", es: "Flight747 notifica únicamente a la Torre de Control (Mediator)" },
        desc: { pt: "Os aviões (Colleagues) não possuem referências diretas uns para os outros, evitando uma malha N*(N-1) caótica.", en: "Aircraft (Colleagues) hold zero direct references to each other, preventing a chaotic N*(N-1) dependency mesh.", es: "Los aviones no tienen referencias entre sí, evitando una malla caótica muchos-a-muchos." },
        packet: { from: "colA", to: "mediator", call: "notify(this, 'LAND')", returnVal: "EVAL_RUNWAY", type: "NOTIFY" },
        activeNodes: ["colA", "mediator"],
        nodeStates: { colA: "REQUESTING LAND", mediator: "COORDINATING" }
      },
      {
        id: 2,
        tag: { pt: "COORDENAÇÃO DO COLEGA B", en: "COLLEAGUE B COORDINATION", es: "COORDINACIÓN DE COLEGA B" },
        title: { pt: "Mediator instrui Airbus320 a manter espera em órbita", en: "Mediator instructs Airbus320 to enter holding pattern", es: "El Mediador instruye al Airbus320 a mantener espera" },
        desc: { pt: "O ControlTowerMediator concentra as regras de tráfego e bloqueia a pista para outras aeronaves.", en: "ControlTowerMediator centralizes traffic orchestration rules and puts other aircraft on hold.", es: "ControlTowerMediator centraliza las reglas y pone en espera a otras aeronaves." },
        packet: { from: "mediator", to: "colB", call: "setHoldingPattern()", returnVal: "HOLDING_ALT", type: "DIRECT" },
        activeNodes: ["mediator", "colB"],
        nodeStates: { colB: "HOLDING @ 5000ft" }
      },
      {
        id: 3,
        tag: { pt: "ACIONAMENTO DO COLEGA C", en: "COLLEAGUE C ACTIVATION", es: "ACTIVACIÓN DE COLEGA C" },
        title: { pt: "Mediator aciona o sistema de iluminação RunwayLightingSystem", en: "Mediator triggers RunwayLightingSystem for Runway 09", es: "El Mediador activa las luces de pista en RunwayLightingSystem" },
        desc: { pt: "Flight747 nem sabe que RunwayLightingSystem existe: toda a orquestração parte da estrela central (Mediator).", en: "Flight747 does not even know RunwayLightingSystem exists; orchestration radiates from the central star hub.", es: "Flight747 ni siquiera conoce a RunwayLightingSystem; todo fluye por el Mediador." },
        packet: { from: "mediator", to: "colC", call: "illuminate('RWY_09')", returnVal: "LIGHTS_ON", type: "DIRECT" },
        activeNodes: ["mediator", "colC"],
        nodeStates: { colC: "RUNWAY 09 LIT" }
      },
      {
        id: 4,
        tag: { pt: "AUTORIZAÇÃO FINAL", en: "CLEARANCE GRANTED", es: "AUTORIZACIÓN FINAL" },
        title: { pt: "Mediator envia permissão de pouso confirmada ao Flight747", en: "Mediator dispatches landing clearance back to Flight747", es: "El Mediador envía autorización de aterrizaje a Flight747" },
        desc: { pt: "Após garantir que todos os colegas estão sincronizados, o Mediator autoriza o solicitante original.", en: "Once all colleague states are synchronized, the Mediator clears the originating colleague.", es: "Una vez sincronizados todos los colegas, el Mediador autoriza al solicitante." },
        packet: { from: "mediator", to: "colA", call: "grantClearance('09')", returnVal: "CLEARED_LAND", type: "CLEAR" },
        activeNodes: ["mediator", "colA"],
        nodeStates: { colA: "LANDING RWY 09", mediator: "LOCKED RWY 09" }
      },
      {
        id: 5,
        tag: { pt: "TOPOLOGIA EM ESTRELA", en: "STAR TOPOLOGY COMPLETE", es: "TOPOLOGÍA EN ESTRELLA" },
        title: { pt: "Comunicação N-para-N reduzida para topologia 1-para-N desacoplada", en: "Many-to-many mesh reduced to clean 1-to-N star topology", es: "Malla muchos-a-muchos reducida a topología en estrella 1-a-N" },
        desc: { pt: "Cada Colleague conversa apenas com a interface Mediator, permitindo reutilizar os componentes isoladamente.", en: "Every Colleague talks strictly to the Mediator interface, keeping components modular and reusable.", es: "Cada colega se comunica únicamente con la interfaz Mediator." },
        packet: { from: "colA", to: "mediator", call: "notify('TOUCHDOWN')", returnVal: "RWY_FREE", type: "DONE" },
        activeNodes: ["colA", "colB", "colC", "mediator"],
        nodeStates: { colA: "LANDED", colB: "NEXT IN QUEUE", mediator: "STAR HUB OK" }
      }
    ]
  },

  "memento": {
    code: "MM",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "originator", label: "CanvasEditor (Originator)", stereotype: "«originator»", addr: "0x11A0", x: 130, y: 165, color: "emerald" },
      { id: "memento", label: "EditorMementoToken", stereotype: "«opaque snapshot»", addr: "0x44B0", x: 450, y: 75, color: "violet" },
      { id: "caretaker", label: "HistoryCaretaker", stereotype: "«caretaker»", addr: "0x66C0", x: 745, y: 165, color: "blue" }
    ],
    links: [
      { from: "originator", to: "memento", label: "save() creates snapshot" },
      { from: "memento", to: "caretaker", label: "stores opaque ref" },
      { from: "caretaker", to: "originator", label: "restore(memento)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CAPTURA DO ESTADO PRIVADO", en: "PRIVATE STATE SNAPSHOT", es: "CAPTURA DE ESTADO PRIVADO" },
        title: { pt: "Originator empacota seus atributos privados em um Memento imutável", en: "Originator packages its private fields into an immutable Memento", es: "Originator empaqueta su estado privado en un Memento inmutable" },
        desc: { pt: "Apenas o próprio CanvasEditor tem permissão para ler seus atributos privados (camadas, zoom, cursores) e gravá-los no Memento.", en: "Only CanvasEditor itself can read its private state (layers, zoom, selection) and seal it inside the Memento.", es: "Solo el propio CanvasEditor puede leer sus campos privados y sellarlos en el Memento." },
        packet: { from: "originator", to: "memento", call: "save() -> new Memento()", returnVal: "Snap#v1@0x44B0", type: "SNAPSHOT" },
        activeNodes: ["originator", "memento"],
        nodeStates: { originator: "STATE: v1 (BLUE)", memento: "SEALED v1" }
      },
      {
        id: 2,
        tag: { pt: "CUSTÓDIA OPACA", en: "OPAQUE CARETAKER STORAGE", es: "CUSTODIA OPACA" },
        title: { pt: "HistoryCaretaker armazena o Memento sem poder ler seu conteúdo", en: "HistoryCaretaker stores the Memento token without inspecting it", es: "HistoryCaretaker guarda el Memento sin poder abrirlo" },
        desc: { pt: "Para o Caretaker, o Memento expõe apenas uma interface estreita (metadados como timestamp), preservando o encapsulamento.", en: "To the Caretaker, the Memento exposes only a narrow interface (timestamp metadata), preserving strict encapsulation.", es: "Para el Caretaker, el Memento es una caja negra opaca que preserva el encapsulamiento." },
        packet: { from: "memento", to: "caretaker", call: "backups.push(0x44B0)", returnVal: "STORED_SAFE", type: "STORE" },
        activeNodes: ["memento", "caretaker"],
        nodeStates: { caretaker: "STACK: [Snap#v1]", memento: "LOCKED" }
      },
      {
        id: 3,
        tag: { pt: "MUTAÇÃO NO ORIGINATOR", en: "ORIGINATOR STATE MUTATION", es: "MUTACIÓN EN EL ORIGINATOR" },
        title: { pt: "Originator sofre alterações destrutivas durante a edição (Estado v2)", en: "Originator undergoes further edits and mutates to State v2", es: "El Originator sufre modificaciones y pasa al Estado v2" },
        desc: { pt: "O usuário aplica filtros incorretos no CanvasEditor, alterando seu estado interno para v2 (CORRUPTED_RED).", en: "The user applies unintended changes in CanvasEditor, mutating internal state to v2.", es: "El usuario realiza cambios no deseados, mutando el estado interno a v2." },
        packet: { from: "originator", to: "originator", call: "applyFilter('GLITCH')", returnVal: "STATE_v2", type: "MUTATE" },
        activeNodes: ["originator"],
        nodeStates: { originator: "STATE: v2 (DIRTY)", caretaker: "HOLDING v1" }
      },
      {
        id: 4,
        tag: { pt: "SOLICITAÇÃO DE ROLLBACK", en: "ROLLBACK DISPATCH", es: "SOLICITUD DE RESTAURACIÓN" },
        title: { pt: "Caretaker devolve o token Memento v1 para originator.restore()", en: "Caretaker passes the saved Memento v1 token back to originator.restore()", es: "El Caretaker entrega el Memento v1 a originator.restore()" },
        desc: { pt: "Quando o usuário solicita restaurar o checkpoint, o Caretaker entrega o objeto Memento (0x44B0) de volta ao Originator.", en: "When the user triggers rollback, the Caretaker hands the opaque Memento (0x44B0) back to the Originator.", es: "Al solicitar rollback, el Caretaker devuelve el Memento (0x44B0) al Originator." },
        packet: { from: "caretaker", to: "originator", call: "restore(Snap#v1)", returnVal: "UNSEALING", type: "RESTORE" },
        activeNodes: ["caretaker", "memento", "originator"],
        nodeStates: { caretaker: "POPPED v1", originator: "READING MEMENTO" }
      },
      {
        id: 5,
        tag: { pt: "ESTADO RESTAURADO SEM VIOLAR ENCAPSULAMENTO", en: "ENCAPSULATED RESTORE COMPLETE", es: "RESTAURACIÓN COMPLETADA" },
        title: { pt: "Originator restaura seus campos privados exatamente para o Estado v1", en: "Originator restores its private fields back to exact State v1", es: "Originator restaura sus atributos privados al Estado v1 exacto" },
        desc: { pt: "O estado interno voltou para v1 sem nunca ter exposto getters/setters públicos dos campos internos.", en: "Internal state rolled back to v1 without ever exposing public getters or setters for private fields.", es: "El estado interno regresó a v1 sin haber roto jamás el encapsulamiento." },
        packet: { from: "memento", to: "originator", call: "this.state = m.state", returnVal: "RESTORED_v1", type: "DONE" },
        activeNodes: ["originator", "memento"],
        nodeStates: { originator: "STATE: v1 (RESTORED)", caretaker: "CLEAN" }
      }
    ]
  },

  "observer": {
    code: "OB",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "subject", label: "StockTickerSubject", stereotype: "«concrete subject»", addr: "0x1000", x: 120, y: 175, color: "emerald" },
      { id: "obsIf", label: "Observer::update()", stereotype: "«interface»", addr: "0x2000", x: 420, y: 175, color: "violet" },
      { id: "chart", label: "CandlestickChart", stereotype: "«observer A»", addr: "0x5010", x: 730, y: 55, color: "cyan" },
      { id: "alert", label: "PriceAlertBot", stereotype: "«observer B»", addr: "0x5020", x: 730, y: 175, color: "cyan" },
      { id: "audit", label: "TickerTapeLogger", stereotype: "«observer C»", addr: "0x5030", x: 730, y: 295, color: "cyan" }
    ],
    links: [
      { from: "subject", to: "obsIf", label: "notify() loop" },
      { from: "obsIf", to: "chart", label: "update(142.50)" },
      { from: "obsIf", to: "alert", label: "update(142.50)" },
      { from: "obsIf", to: "audit", label: "update(142.50)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "MUTAÇÃO NO SUBJECT", en: "SUBJECT STATE CHANGE", es: "CAMBIO DE ESTADO EN SUJETO" },
        title: { pt: "StockTickerSubject recebe nova cotação (PETR4 = R$ 38,90)", en: "StockTickerSubject mutates state (NVDA = $142.50)", es: "StockTickerSubject cambia su estado interno ($142.50)" },
        desc: { pt: "setPrice(142.50) altera o estado do Subject e dispara automaticamente this.notify() para a lista de inscritos.", en: "setPrice(142.50) updates the Subject state and automatically triggers this.notify() across the subscriber list.", es: "setPrice(142.50) actualiza el estado y dispara automáticamente this.notify()." },
        packet: { from: "subject", to: "obsIf", call: "notify(price:142.50)", returnVal: "3_SUBSCRIBERS", type: "BROADCAST" },
        activeNodes: ["subject", "obsIf"],
        nodeStates: { subject: "PRICE = $142.50", obsIf: "BROADCASTING" }
      },
      {
        id: 2,
        tag: { pt: "NOTIFICAÇÃO DO OBSERVER 1", en: "NOTIFY OBSERVER #1", es: "NOTIFICACIÓN OBSERVADOR #1" },
        title: { pt: "CandlestickChart recebe update(142.50) e redesenha o candle", en: "CandlestickChart receives update(142.50) and redraws canvas", es: "CandlestickChart recibe update(142.50) y redibuja el gráfico" },
        desc: { pt: "O Subject não sabe que CandlestickChart é um componente gráfico; ele apenas invoca a interface Observer::update().", en: "The Subject does not know CandlestickChart is a UI widget; it merely invokes the abstract Observer::update() contract.", es: "El Sujeto no sabe qué hace CandlestickChart; solo invoca Observer::update()." },
        packet: { from: "obsIf", to: "chart", call: "chart.update(142.50)", returnVal: "CANDLE_DRAWN", type: "UPDATE" },
        activeNodes: ["obsIf", "chart"],
        nodeStates: { chart: "UPDATED $142.50" }
      },
      {
        id: 3,
        tag: { pt: "NOTIFICAÇÃO DO OBSERVER 2", en: "NOTIFY OBSERVER #2", es: "NOTIFICACIÓN OBSERVADOR #2" },
        title: { pt: "PriceAlertBot avalia gatilho de compra automática", en: "PriceAlertBot evaluates threshold trigger on update(142.50)", es: "PriceAlertBot evalúa reglas de alerta ante update(142.50)" },
        desc: { pt: "O segundo observador reage ao mesmo evento disparando um alerta de rompimento de preço.", en: "The second observer reacts to the exact same broadcast by triggering a price breakout alert.", es: "El segundo observador reacciona al mismo evento disparando una alerta." },
        packet: { from: "obsIf", to: "alert", call: "alert.update(142.50)", returnVal: "ALERT_FIRED", type: "UPDATE" },
        activeNodes: ["obsIf", "alert"],
        nodeStates: { chart: "SYNCED", alert: "TRIGGER FIRED" }
      },
      {
        id: 4,
        tag: { pt: "NOTIFICAÇÃO DO OBSERVER 3", en: "NOTIFY OBSERVER #3", es: "NOTIFICACIÓN OBSERVADOR #3" },
        title: { pt: "TickerTapeLogger grava a variação no log de auditoria", en: "TickerTapeLogger appends price tick to audit stream", es: "TickerTapeLogger registra la cotización en el log de auditoría" },
        desc: { pt: "O terceiro observador persiste o histórico temporal da cotação de forma totalmente independente.", en: "The third observer persists the time-series tick completely independently of the other two.", es: "El tercer observador registra la serie temporal de forma independiente." },
        packet: { from: "obsIf", to: "audit", call: "logger.update(142.50)", returnVal: "LOG_APPENDED", type: "UPDATE" },
        activeNodes: ["obsIf", "audit"],
        nodeStates: { alert: "SYNCED", audit: "LOGGED TICK" }
      },
      {
        id: 5,
        tag: { pt: "PROPAGAÇÃO CONCLUÍDA", en: "PUB/SUB CYCLE COMPLETE", es: "PROPAGACIÓN COMPLETADA" },
        title: { pt: "Todos os 3 dependentes sincronizados em acoplamento abstrato", en: "All 3 dependents synchronized with zero concrete coupling", es: "Los 3 dependientes sincronizados con acoplamiento abstracto" },
        desc: { pt: "Novos observadores podem usar attach() ou detach() em tempo de execução sem alterar uma linha do Subject.", en: "New observers can attach() or detach() at runtime without modifying a single line of Subject code.", es: "Nuevos observadores pueden suscribirse en vivo sin modificar al Subject." },
        packet: { from: "obsIf", to: "subject", call: "broadcastComplete()", returnVal: "3/3_SYNCED", type: "DONE" },
        activeNodes: ["subject", "chart", "alert", "audit"],
        nodeStates: { subject: "IDLE", chart: "SYNCED", alert: "SYNCED", audit: "SYNCED" }
      }
    ]
  },

  "state": {
    code: "ST",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "context", label: "TCPConnection (Context)", stereotype: "«context»", addr: "0x1880", x: 120, y: 165, color: "blue" },
      { id: "closed", label: "TCPClosedState", stereotype: "«state 1»", addr: "0x3810", x: 450, y: 75, color: "amber" },
      { id: "listen", label: "TCPListenState", stereotype: "«state 2»", addr: "0x3820", x: 450, y: 255, color: "violet" },
      { id: "estab", label: "TCPEstablishedState", stereotype: "«state 3»", addr: "0x3830", x: 750, y: 165, color: "emerald" }
    ],
    links: [
      { from: "context", to: "closed", label: "delegates open()" },
      { from: "closed", to: "listen", label: "changeState(Listen)" },
      { from: "listen", to: "estab", label: "changeState(Established)" },
      { from: "estab", to: "context", label: "send(payload) active" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "DELEGAÇÃO AO ESTADO INICIAL", en: "INITIAL STATE DELEGATION", es: "DELEGACIÓN AL ESTADO INICIAL" },
        title: { pt: "TCPConnection delega open() para seu estado atual TCPClosedState", en: "TCPConnection delegates open() to current TCPClosedState", es: "TCPConnection delega open() a su estado actual TCPClosedState" },
        desc: { pt: "Sem blocos switch(this.state): o Context delega qualquer chamada diretamente para o ponteiro this.currentState.", en: "Zero switch(this.state) blocks: Context delegates calls directly to its currentState object pointer.", es: "Sin bloques switch(estado): el Context delega directamente en su objeto currentState." },
        packet: { from: "context", to: "closed", call: "state.open(this)", returnVal: "SYN_SENT", type: "DELEGATE" },
        activeNodes: ["context", "closed"],
        nodeStates: { context: "STATE = CLOSED", closed: "HANDLING OPEN()" }
      },
      {
        id: 2,
        tag: { pt: "TRANSIÇÃO CLOSED -> LISTEN", en: "TRANSITION CLOSED -> LISTEN", es: "TRANSICIÓN CLOSED -> LISTEN" },
        title: { pt: "TCPClosedState inicia handshake e muda o ponteiro do Context para TCPListenState", en: "TCPClosedState initiates handshake and transitions Context to TCPListenState", es: "TCPClosedState inicia el handshake y cambia el estado a TCPListenState" },
        desc: { pt: "A própria classe de estado realiza a transição invocando ctx.changeState(TCPListenState.instance).", en: "The state object itself performs the transition by calling ctx.changeState(TCPListenState.instance).", es: "El propio objeto de estado ejecuta la transición invocando ctx.changeState()." },
        packet: { from: "closed", to: "listen", call: "ctx.changeState(Listen)", returnVal: "STATE=LISTEN", type: "TRANSITION" },
        activeNodes: ["closed", "listen", "context"],
        nodeStates: { context: "STATE = LISTEN", closed: "INACTIVE", listen: "ACTIVE STATE" }
      },
      {
        id: 3,
        tag: { pt: "TRANSIÇÃO LISTEN -> ESTABLISHED", en: "TRANSITION TO ESTABLISHED", es: "TRANSICIÓN A ESTABLISHED" },
        title: { pt: "TCPListenState recebe ACK e transiciona o Context para TCPEstablishedState", en: "TCPListenState receives SYN+ACK and transitions to TCPEstablishedState", es: "TCPListenState recibe ACK y transiciona a TCPEstablishedState" },
        desc: { pt: "Quando o pacote ACK chega, TCPListenState promove a conexão para TCPEstablishedState (0x3830).", en: "When the handshake completes, TCPListenState promotes the connection to TCPEstablishedState (0x3830).", es: "Al completarse el handshake, TCPListenState cambia el estado a TCPEstablishedState." },
        packet: { from: "listen", to: "estab", call: "ctx.changeState(Estab)", returnVal: "STATE=ESTAB", type: "TRANSITION" },
        activeNodes: ["listen", "estab", "context"],
        nodeStates: { context: "STATE = ESTABLISHED", listen: "INACTIVE", estab: "ACTIVE STATE" }
      },
      {
        id: 4,
        tag: { pt: "COMPORTAMENTO ALTERADO", en: "POLYMORPHIC BEHAVIOR SHIFT", es: "CAMBIO DE COMPORTAMIENTO" },
        title: { pt: "O objeto TCPConnection aparenta ter mudado de classe ao chamar send()", en: "TCPConnection appears to have changed its class when send() is called", es: "TCPConnection parece haber cambiado de clase al invocar send()" },
        desc: { pt: "No estado Closed, send() lançava erro; agora em Established, a mesma chamada transmite frames de dados reais.", en: "In Closed state, send() threw an error; now in Established state, the exact same call transmits data frames.", es: "En estado Closed, send() fallaba; ahora en Established transmite paquetes de datos." },
        packet: { from: "context", to: "estab", call: "state.send('HTTP GET')", returnVal: "BYTES_SENT_64", type: "EXEC" },
        activeNodes: ["context", "estab"],
        nodeStates: { context: "TRANSMITTING", estab: "STREAMING DATA" }
      },
      {
        id: 5,
        tag: { pt: "FECHAMENTO DE CONEXÃO", en: "FIN TRANSITION BACK", es: "CIERRE DE CONEXIÓN" },
        title: { pt: "Ao chamar close(), TCPEstablishedState envia FIN e retorna o estado para Closed", en: "Calling close() on TCPEstablishedState sends FIN and transitions back to Closed", es: "Al invocar close(), TCPEstablishedState envía FIN y regresa a Closed" },
        desc: { pt: "O ciclo da máquina de estados finitos completa-se com polimorfismo puro e zero condicionais.", en: "The finite state machine cycle completes via pure polymorphism with zero conditional sprawl.", es: "El ciclo de la máquina de estados concluye con polimorfismo puro." },
        packet: { from: "estab", to: "context", call: "ctx.changeState(Closed)", returnVal: "FIN_ACK_CLOSED", type: "DONE" },
        activeNodes: ["estab", "context", "closed"],
        nodeStates: { context: "STATE = CLOSED", estab: "CLOSED", closed: "ACTIVE AGAIN" }
      }
    ]
  },

  "strategy": {
    code: "SR",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "context", label: "OrderCheckout (Context)", stereotype: "«context»", addr: "0x1990", x: 120, y: 165, color: "blue" },
      { id: "stratIf", label: "ShippingStrategy", stereotype: "«interface»", addr: "0x2990", x: 435, y: 165, color: "violet" },
      { id: "sedex", label: "ExpressAirStrategy", stereotype: "«strategy A»", addr: "0x6010", x: 740, y: 75, color: "emerald" },
      { id: "drone", label: "PrimeDroneStrategy", stereotype: "«strategy B»", addr: "0x6050", x: 740, y: 255, color: "cyan" }
    ],
    links: [
      { from: "context", to: "stratIf", label: "strategy.calculate(order)" },
      { from: "stratIf", to: "sedex", label: "bound algorithm #1", dashed: true },
      { from: "stratIf", to: "drone", label: "hot-swapped algorithm #2", dashed: true }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "CONFIGURAÇÃO DA ESTRATÉGIA A", en: "STRATEGY A INJECTION", es: "INYECCIÓN DE ESTRATEGIA A" },
        title: { pt: "OrderCheckout é configurado inicialmente com ExpressAirStrategy", en: "OrderCheckout is configured with ExpressAirStrategy", es: "OrderCheckout se configura inicialmente con ExpressAirStrategy" },
        desc: { pt: "O Contexto mantém uma referência para a interface ShippingStrategy, desconhecendo a fórmula matemática interna.", en: "The Context holds a reference to the ShippingStrategy interface, agnostic to the underlying pricing formula.", es: "El Contexto mantiene una referencia a ShippingStrategy sin conocer la fórmula interna." },
        packet: { from: "context", to: "stratIf", call: "setStrategy(ExpressAir)", returnVal: "BOUND_0x6010", type: "BIND" },
        activeNodes: ["context", "stratIf", "sedex"],
        nodeStates: { context: "STRATEGY = AIR", sedex: "ACTIVE POLICY" }
      },
      {
        id: 2,
        tag: { pt: "EXECUÇÃO DO ALGORITMO A", en: "EXECUTE ALGORITHM A", es: "EJECUCIÓN DE ALGORITMO A" },
        title: { pt: "Contexto delega o cálculo de frete para ExpressAirStrategy", en: "Context delegates shipping calculation to ExpressAirStrategy", es: "El Contexto delega el cálculo en ExpressAirStrategy" },
        desc: { pt: "ExpressAirStrategy aplica tarifa volumétrica aérea + seguro e retorna R$ 48,00.", en: "ExpressAirStrategy computes volumetric air weight + insurance and returns $48.00.", es: "ExpressAirStrategy calcula peso volumétrico aéreo y devuelve $48.00." },
        packet: { from: "stratIf", to: "sedex", call: "calculate(weight:4kg)", returnVal: "$48.00 (24h)", type: "CALC" },
        activeNodes: ["stratIf", "sedex"],
        nodeStates: { sedex: "RESULT = $48.00" }
      },
      {
        id: 3,
        tag: { pt: "TROCA QUENTE (HOT-SWAP)", en: "RUNTIME HOT-SWAP", es: "CAMBIO EN CALIENTE (HOT-SWAP)" },
        title: { pt: "Usuário muda opção na UI e Context troca estratégia em tempo de execução", en: "User switches delivery tier; Context hot-swaps strategy at runtime", es: "El usuario cambia la opción; el Context cambia la estrategia en vivo" },
        desc: { pt: "checkout.setStrategy(new PrimeDroneStrategy()) substitui o algoritmo ativo instantaneamente sem tocar no pedido.", en: "checkout.setStrategy(new PrimeDroneStrategy()) swaps the active algorithm pointer on the fly.", es: "checkout.setStrategy(new PrimeDroneStrategy()) reemplaza el algoritmo al instante." },
        packet: { from: "context", to: "stratIf", call: "setStrategy(PrimeDrone)", returnVal: "BOUND_0x6050", type: "SWAP" },
        activeNodes: ["context", "stratIf", "drone"],
        nodeStates: { context: "STRATEGY = DRONE", sedex: "DETACHED", drone: "ACTIVE POLICY" }
      },
      {
        id: 4,
        tag: { pt: "EXECUÇÃO DO ALGORITMO B", en: "EXECUTE ALGORITHM B", es: "EJECUCIÓN DE ALGORITMO B" },
        title: { pt: "Mesma chamada checkout.calculateTotal() agora executa PrimeDroneStrategy", en: "Same checkout.calculateTotal() call now executes PrimeDroneStrategy", es: "La misma llamada calculateTotal() ahora ejecuta PrimeDroneStrategy" },
        desc: { pt: "PrimeDroneStrategy calcula rota geodésica GPS + autonomia de bateria e retorna R$ 65,00 (entrega em 30 min).", en: "PrimeDroneStrategy computes GPS geodesic distance + battery load and returns $65.00 (30m ETA).", es: "PrimeDroneStrategy calcula distancia GPS y devuelve $65.00 (30 min)." },
        packet: { from: "stratIf", to: "drone", call: "calculate(weight:4kg)", returnVal: "$65.00 (30m)", type: "CALC" },
        activeNodes: ["stratIf", "drone"],
        nodeStates: { drone: "RESULT = $65.00" }
      },
      {
        id: 5,
        tag: { pt: "RETORNO POLIMÓRFICO", en: "POLYMORPHIC RESULT", es: "RESULTADO POLIMÓRFICO" },
        title: { pt: "OrderCheckout finaliza o total com a política algorítmica escolhida", en: "OrderCheckout finalizes order total using the active strategy", es: "OrderCheckout finaliza el total usando la estrategia activa" },
        desc: { pt: "Famílias de algoritmos variam independentemente do Context que os consome (Princípio Aberto/Fechado).", en: "Families of algorithms vary independently from the Context that consumes them (Open/Closed Principle).", es: "Los algoritmos varían independientemente del Contexto que los utiliza." },
        packet: { from: "drone", to: "context", call: "return $65.00", returnVal: "CHECKOUT_OK", type: "RETURN" },
        activeNodes: ["drone", "context"],
        nodeStates: { context: "TOTAL UPDATED", drone: "COMPLETED" }
      }
    ]
  },

  "template-method": {
    code: "TM",
    layerIndex: 3,
    scopeType: "CLASS",
    nodes: [
      { id: "base", label: "DataMinerTemplate", stereotype: "«abstract class»", addr: "0x1A10", x: 140, y: 175, color: "violet" },
      { id: "stepOpen", label: "1. openFile() [Fixed]", stereotype: "«invariant step»", addr: "0x1A20", x: 660, y: 55, color: "blue" },
      { id: "stepParse", label: "2. extractData() [Abstract]", stereotype: "«subclass override»", addr: "0x5A40", x: 730, y: 175, color: "emerald" },
      { id: "stepReport", label: "3. sendReport() [Fixed]", stereotype: "«invariant step»", addr: "0x1A60", x: 660, y: 295, color: "blue" }
    ],
    links: [
      { from: "base", to: "stepOpen", label: "step 1 (base)" },
      { from: "base", to: "stepParse", label: "step 2 (PDFMiner override)", dashed: true },
      { from: "base", to: "stepReport", label: "step 3 (base)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "INVOCANDO O ESQUELETO", en: "SKELETON INVOCATION", es: "INVOCACIÓN DEL ESQUELETO" },
        title: { pt: "Cliente chama o método gabarito mineData() na superclasse", en: "Caller invokes the final mineData() template method on base class", es: "El cliente invoca el método plantilla mineData() en la clase base" },
        desc: { pt: "O método templateMethod() define a ordem fixa e invariante do algoritmo: abrir -> extrair -> gerar relatório.", en: "The template method locks down the invariant algorithm sequence: open -> extract -> report.", es: "El método plantilla fija la secuencia invariante: abrir -> extraer -> reportar." },
        packet: { from: "base", to: "stepOpen", call: "1. this.openFile()", returnVal: "FILE_HANDLE", type: "STEP_1" },
        activeNodes: ["base", "stepOpen"],
        nodeStates: { base: "RUNNING SKELETON", stepOpen: "EXECUTING BASE" }
      },
      {
        id: 2,
        tag: { pt: "PASSO INVARIANTE 1", en: "INVARIANT STEP 1 DONE", es: "PASO INVARIANTE 1 LISTO" },
        title: { pt: "openFile() executa implementação comum herdada da superclasse", en: "openFile() runs shared base logic and returns file stream", es: "openFile() ejecuta la lógica común de la superclase" },
        desc: { pt: "Nenhuma subclasse precisa duplicar o código de abertura e validação de stream.", en: "Subclasses do not duplicate stream opening and validation boilerplate.", es: "Las subclases no duplican el código de apertura de archivos." },
        packet: { from: "stepOpen", to: "base", call: "return stream", returnVal: "STREAM_READY", type: "ACK" },
        activeNodes: ["stepOpen", "base"],
        nodeStates: { stepOpen: "COMPLETED", base: "NEXT: STEP 2" }
      },
      {
        id: 3,
        tag: { pt: "INVERSÃO DE CONTROLE (HOOK)", en: "SUBCLASS PRIMITIVE HOOK", es: "GANCHO DE SUBCLASE (HOOK)" },
        title: { pt: "Superclasse invoca this.extractData() sobrescrito pela subclasse PDFMiner", en: "Base class calls this.extractData() overridden by PDFMiner subclass", es: "La superclase invoca this.extractData() sobrescrito por PDFMiner" },
        desc: { pt: "Princípio de Hollywood ('Não nos chame, nós chamaremos você'): a superclasse chama o passo específico da subclasse.", en: "Hollywood Principle ('Don't call us, we'll call you'): the base workflow invokes the subclass step.", es: "Principio de Hollywood: la superclase invoca el paso específico de la subclase." },
        packet: { from: "base", to: "stepParse", call: "2. PDFMiner::extract()", returnVal: "PARSED_ROWS", type: "OVERRIDE" },
        activeNodes: ["base", "stepParse"],
        nodeStates: { stepParse: "PDF PARSER ACTIVE" }
      },
      {
        id: 4,
        tag: { pt: "RETORNO DO PASSO CUSTOMIZADO", en: "CUSTOM STEP RETURN", es: "RETORNO DEL PASO PERSONALIZADO" },
        title: { pt: "Subclasse PDFMiner devolve os dados extraídos para o esqueleto base", en: "PDFMiner subclass returns extracted rows back to base skeleton", es: "PDFMiner devuelve las filas extraídas al esqueleto base" },
        desc: { pt: "O controle retorna imediatamente para o método gabarito na superclasse para continuar o pipeline.", en: "Control returns immediately to the base template method to resume the invariant pipeline.", es: "El control regresa al método plantilla de la clase base." },
        packet: { from: "stepParse", to: "base", call: "return rows[120]", returnVal: "120_RECORDS", type: "DATA" },
        activeNodes: ["stepParse", "base"],
        nodeStates: { stepParse: "DONE (120 ROWS)", base: "NEXT: STEP 3" }
      },
      {
        id: 5,
        tag: { pt: "FINALIZAÇÃO INVARIANTE", en: "INVARIANT FINAL STEP", es: "FINALIZACIÓN INVARIANTE" },
        title: { pt: "Superclasse executa o passo final sendReport() garantindo o contrato", en: "Base class executes final sendReport() step to complete workflow", es: "La superclase ejecuta el paso final sendReport()" },
        desc: { pt: "A subclasse personalizou apenas a extração PDF sem poder alterar a estrutura ou ordem global do algoritmo.", en: "The subclass customized PDF extraction without altering the overarching algorithm structure.", es: "La subclase personalizó la extracción sin alterar el orden del algoritmo." },
        packet: { from: "base", to: "stepReport", call: "3. this.sendReport()", returnVal: "PIPELINE_OK", type: "STEP_3" },
        activeNodes: ["base", "stepReport"],
        nodeStates: { base: "TEMPLATE COMPLETE", stepReport: "REPORT SENT" }
      }
    ]
  },

  "visitor": {
    code: "VS",
    layerIndex: 3,
    scopeType: "OBJECT",
    nodes: [
      { id: "client", label: "CompilerDriver", stereotype: "«client»", addr: "0x1B10", x: 105, y: 165, color: "blue" },
      { id: "elemA", label: "AssignmentNode", stereotype: "«element A»", addr: "0x3B10", x: 420, y: 75, color: "emerald" },
      { id: "elemB", label: "BinaryOpNode", stereotype: "«element B»", addr: "0x3B50", x: 420, y: 255, color: "emerald" },
      { id: "visitor", label: "TypeCheckVisitor", stereotype: "«visitor»", addr: "0x7B00", x: 740, y: 165, color: "violet" }
    ],
    links: [
      { from: "client", to: "elemA", label: "accept(visitor)" },
      { from: "elemA", to: "visitor", label: "v.visitAssignment(this)" },
      { from: "client", to: "elemB", label: "accept(visitor)" },
      { from: "elemB", to: "visitor", label: "v.visitBinaryOp(this)" }
    ],
    steps: [
      {
        id: 1,
        tag: { pt: "1º DESPACHO (ACCEPT)", en: "1ST DISPATCH: ACCEPT()", es: "1º DESPACHO: ACCEPT()" },
        title: { pt: "Cliente passa TypeCheckVisitor para assignmentNode.accept(v)", en: "Client passes TypeCheckVisitor into assignmentNode.accept(v)", es: "El cliente pasa TypeCheckVisitor a assignmentNode.accept(v)" },
        desc: { pt: "Primeiro despacho polimórfico: resolve qual classe concreta de Element está recebendo o visitante (AssignmentNode).", en: "First polymorphic dispatch: resolves which concrete Element class is accepting the visitor (AssignmentNode).", es: "Primer despacho polimórfico: identifica qué clase Element recibe al visitante." },
        packet: { from: "client", to: "elemA", call: "nodeA.accept(visitor)", returnVal: "DISPATCH_1", type: "ACCEPT" },
        activeNodes: ["client", "elemA"],
        nodeStates: { client: "TRAVERSING AST", elemA: "ACCEPTING VISITOR" }
      },
      {
        id: 2,
        tag: { pt: "2º DESPACHO (DOUBLE DISPATCH)", en: "2ND DISPATCH: VISIT(THIS)", es: "2º DESPACHO (DOUBLE DISPATCH)" },
        title: { pt: "AssignmentNode invoca v.visitAssignment(this) passando a si mesmo", en: "AssignmentNode calls v.visitAssignment(this) passing its typed self", es: "AssignmentNode invoca v.visitAssignment(this) pasándose a sí mismo" },
        desc: { pt: "Double Dispatch completo! Agora o método exato depende tanto do tipo concreto do Element quanto do tipo concreto do Visitor.", en: "Double Dispatch complete! The executed routine now binds both the concrete Element type and concrete Visitor type.", es: "¡Doble despacho completo! El método exacto conoce tanto el tipo de Element como el de Visitor." },
        packet: { from: "elemA", to: "visitor", call: "visitAssignment(this)", returnVal: "TYPE_INT_OK", type: "VISIT" },
        activeNodes: ["elemA", "visitor"],
        nodeStates: { elemA: "PASSED 'this'", visitor: "CHECKING ASSIGN" }
      },
      {
        id: 3,
        tag: { pt: "PRÓXIMO NODO DA ESTRUTURA", en: "NEXT STRUCTURE ELEMENT", es: "SIGUIENTE NODO DE LA ESTRUCTURA" },
        title: { pt: "Travessia avança e invoca binaryOpNode.accept(visitor)", en: "Traversal advances and calls binaryOpNode.accept(visitor)", es: "El recorrido avanza e invoca binaryOpNode.accept(visitor)" },
        desc: { pt: "O mesmo visitante agora visita um tipo de nó diferente na árvore sintática (BinaryOpNode).", en: "The same visitor instance now visits a different node type in the syntax tree (BinaryOpNode).", es: "El mismo visitante visita ahora otro tipo de nodo en el árbol (BinaryOpNode)." },
        packet: { from: "client", to: "elemB", call: "nodeB.accept(visitor)", returnVal: "DISPATCH_1", type: "ACCEPT" },
        activeNodes: ["client", "elemB"],
        nodeStates: { elemA: "VERIFIED", elemB: "ACCEPTING VISITOR" }
      },
      {
        id: 4,
        tag: { pt: "EXECUÇÃO ESPECÍFICA NO VISITOR", en: "TYPED VISIT OVERLOAD", es: "SOBRECARGA ESPECÍFICA VISIT" },
        title: { pt: "BinaryOpNode chama v.visitBinaryOp(this) no visitante", en: "BinaryOpNode invokes v.visitBinaryOp(this) on the visitor", es: "BinaryOpNode invoca v.visitBinaryOp(this) en el visitante" },
        desc: { pt: "TypeCheckVisitor valida os operandos esquerdo e direito de BinaryOpNode sem poluir a classe do nó com regras de tipos.", en: "TypeCheckVisitor validates left and right operands without polluting the AST node class with type-checking code.", es: "TypeCheckVisitor valida los operandos sin contaminar la clase del nodo AST." },
        packet: { from: "elemB", to: "visitor", call: "visitBinaryOp(this)", returnVal: "OP_TYPES_MATCH", type: "VISIT" },
        activeNodes: ["elemB", "visitor"],
        nodeStates: { elemB: "PASSED 'this'", visitor: "CHECKING BIN_OP" }
      },
      {
        id: 5,
        tag: { pt: "OPERAÇÃO EXTERNA CONCLUÍDA", en: "VISITOR REPORT READY", es: "OPERACIÓN VISITANTE COMPLETA" },
        title: { pt: "Visitor entrega o relatório consolidado ao CompilerDriver", en: "Visitor returns consolidated type analysis report to CompilerDriver", es: "El Visitor entrega el informe consolidado al CompilerDriver" },
        desc: { pt: "Para adicionar exportação XML ou geração de código LLVM amanhã, basta criar um novo Visitor sem tocar nos nós da AST.", en: "To add XML export or LLVM codegen tomorrow, simply create a new Visitor class without touching any AST node class.", es: "Para añadir nuevas operaciones mañana, basta crear otro Visitor sin tocar los nodos." },
        packet: { from: "visitor", to: "client", call: "getDiagnostics()", returnVal: "0_ERRORS", type: "RETURN" },
        activeNodes: ["visitor", "client"],
        nodeStates: { client: "AST VALIDATED", visitor: "0 TYPE ERRORS" }
      }
    ]
  }
};

