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

    adjustSidebarHeight();
  }

  // 4. Mobile Menu Drawer
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebarEl.classList.toggle("mobile-open");
    });
  }

  // 5. Ajuste Dinâmico da Sidebar (Permanecer rigorosamente acima do Footer)
  const footerEl = document.querySelector(".app-footer");
  function adjustSidebarHeight() {
    if (!sidebarEl) return;
    if (window.innerWidth <= 992) {
      sidebarEl.style.maxHeight = "";
      return;
    }
    if (!footerEl) return;
    const footerRect = footerEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const headerHeight = 64; // var(--header-height)
    if (footerRect.top < windowHeight) {
      const available = Math.max(120, footerRect.top - headerHeight);
      sidebarEl.style.maxHeight = `${available}px`;
    } else {
      sidebarEl.style.maxHeight = `calc(100vh - var(--header-height))`;
    }
  }

  // 6. Barra de Leitura Superior no Scroll & Ajuste da Sidebar
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && readingProgressBar) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      readingProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
    adjustSidebarHeight();
  }, { passive: true });

  window.addEventListener("resize", adjustSidebarHeight, { passive: true });

  // 7. Listener de Navegação Hash
  window.addEventListener("hashchange", updateApp);

  // Inicialização inicial
  updateApp();
});
