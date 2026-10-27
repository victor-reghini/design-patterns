import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/labs.css";
import "./styles/quiz.css";

import { initTheme, toggleTheme } from "./components/theme.js";
import { renderSidebar } from "./components/sidebar.js";
import { handleRoute } from "./components/router.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializa o Tema (Claro por padrão, com suporte a Escuro)
  initTheme();

  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      toggleTheme();
    });
  }

  // 2. Elementos DOM do Layout
  const sidebarEl = document.getElementById("app-sidebar");
  const contentArea = document.getElementById("main-content-area");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const readingProgressBar = document.getElementById("reading-progress");

  // 3. Renderiza o Menu Lateral (Sidebar)
  function updateApp() {
    const currentHash = window.location.hash || "#/";
    renderSidebar(sidebarEl, currentHash);
    handleRoute(contentArea);

    // Fecha menu mobile após clique se aberto
    if (sidebarEl.classList.contains("mobile-open")) {
      sidebarEl.classList.remove("mobile-open");
    }

    // Atualiza links ativos na top-nav
    document.querySelectorAll(".top-nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentHash || (href === "#/" && (currentHash === "" || currentHash === "#/livro"))) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // 4. Mobile Menu Drawer
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebarEl.classList.toggle("mobile-open");
    });
  }

  // 5. Barra de Leitura Superior no Scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && readingProgressBar) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      readingProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
  });

  // 6. Listener de Navegação Hash
  window.addEventListener("hashchange", updateApp);

  // Inicialização inicial
  updateApp();
});
