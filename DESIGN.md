# DESIGN.md - Pattern Explorer (GoF Interactive Architecture Visualizer)

## 1. Identity & Soul
- **Product:** Pattern Explorer (GoF Design Patterns Interactive Visualizer)
- **Visual Reference:** Inspired by Protocol Explorer (`protocol-explorer-alpha.vercel.app`), translating packet-by-packet network protocol visualization into message-by-message and object-by-object software architecture visualization.
- **Target Audience:** Software engineers, architects, and computer science students studying the 23 Gang of Four (GoF) Design Patterns.
- **Author / Profile:** Victor Reghini (`https://github.com/victor-reghini`).
- **Dials:** `Dial: ENERGY 2 / RHYTHM 2 / MOTION 2`

## 2. One-Line Purpose Reasons (R-31 Compliance)
- **Why this palette?** Deep neutral charcoal/zinc (`#121214` / `#1c1c1f`) in dark mode and high-contrast paper/slate (`#f8fafc` / `#ffffff`) in light mode maximize legibility for dense technical telemetry, hex memory offsets, and SVG call-flow lines, using 3 semantic category colors (Creational Emerald, Structural Cyan/Blue, Behavioral Violet) + 1 primary electric blue accent (`#2563eb` light / `#3b82f6` dark).
- **Why this layout?** A fixed 288px left navigation rail paired with a sticky telemetry top bar and a split interactive workspace (Step Timeline + SVG Topology Canvas + Runtime Stack/Memory Hex Inspector) lets users scrub through pattern execution without losing context.
- **Why this typography?** `Inter` handles dense UI labels and multi-language prose, `Outfit` distinguishes structural headings, and `JetBrains Mono` aligns memory addresses (`0x0000`), hex byte grids, method signatures, and multi-language code blocks.
- **Why this spacing?** Compact 8px/12px/16px spacing inside the telemetry workspace keeps the canvas and byte inspector visible together above the fold, while 24px/32px spacing separates architectural documentation sections below.
- **Why use cards/panels?** Bordered panels represent distinct architectural boundaries: runtime topology canvas, call-stack layer accordion, memory hex dump, and trade-off comparison tables.
- **Why use these icons and SVG nodes?** Vector diagrams represent real UML/runtime participants (`«interface»`, `«client»`, `«singleton»`), directional call edges, and animated method-invocation packets rather than decorative illustrations.
- **Why this motion?** Step-by-step animated message capsules gliding between participant nodes visually demonstrate runtime delegation, polymorphism, and object creation (R-19).

## 3. Color System & Verified WCAG AA Contrast Ratios (R-25, R-29, R-34)

### Dark Mode (`[data-theme="dark"]`)
- **Canvas Background (`--bg-primary`):** `#121214`
- **Surface Panel (`--bg-surface`):** `#1c1c1f`
- **Elevated Surface (`--bg-surface-elevated`):** `#26262a`
- **Primary Text (`--text-primary`):** `#f4f4f5` (Contrast on `#1c1c1f`: **15.2:1** PASS AAA)
- **Secondary Text (`--text-secondary`):** `#d4d4d8` (Contrast on `#1c1c1f`: **11.5:1** PASS AAA)
- **Muted Metadata (`--text-muted`):** `#a1a1aa` (Contrast on `#1c1c1f`: **6.6:1** PASS AA)
- **Primary Accent (`--accent-primary`):** Pastel slate blue `#84a6cc` for text/links on dark surfaces (**6.6:1** PASS AA), matte slate blue `#385375` with `#ffffff` text for filled buttons/tabs (**5.1:1** PASS AA).
- **Semantic Accents:** Pastel sage green `#82b99e` (creational/pros/success) and pastel terracotta `#d28787` (danger/cons) over muted opaque backgrounds (`#1b2620` / `#261d1d`).
- **Component Borders (`--border-strong`):** `#52525b` for interactive controls (>= **3.0:1** non-text contrast).

### Light Mode (`[data-theme="light"]`)
- **Canvas Background (`--bg-primary`):** `#f8fafc`
- **Surface Panel (`--bg-surface`):** `#ffffff`
- **Elevated Surface (`--bg-surface-elevated`):** `#f1f5f9`
- **Primary Text (`--text-primary`):** `#0f172a` (Contrast on `#ffffff`: **17.8:1** PASS AAA)
- **Secondary Text (`--text-secondary`):** `#334155` (Contrast on `#ffffff`: **10.3:1** PASS AAA)
- **Muted Metadata (`--text-muted`):** `#475569` (Contrast on `#ffffff`: **7.5:1** PASS AAA; on `#f1f5f9`: **6.7:1** PASS AAA)
- **Primary Accent (`--accent-primary`):** `#1d4ed8` (Contrast on `#ffffff`: **6.7:1** PASS AA; `#ffffff` text on `#1d4ed8` button: **6.7:1** PASS AA).
- **Component Borders (`--border-strong`):** `#64748b` for interactive controls (**4.7:1** non-text contrast).

