import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/labs.css";
import "./styles/quiz.css";

import { initTheme, toggleTheme, updateThemeButton } from "./components/theme.js";
import { renderSidebar } from "./components/sidebar.js";
import { handleRoute } from "./components/router.js";
import { getLang, setLang, onLangChange, t } from "./data/i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const sidebarEl = document.getElementById("app-sidebar");
  const contentArea = document.getElementById("main-content-area");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const readingProgressBar = document.getElementById("reading-progress");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const langSelect = document.getElementById("lang-select");

  if (langSelect) {
    langSelect.value = getLang();
    langSelect.addEventListener("change", e => {
      setLang(e.target.value);
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      toggleTheme();
    });
  }

  function syncStaticLabels() {
    const brandTitle = document.getElementById("brand-title-el");
    const brandSub = document.getElementById("brand-subtitle-el");
    const menuLabel = document.getElementById("mobile-menu-label");
    const fHome = document.getElementById("footer-link-home");
    const fMatrix = document.getElementById("footer-link-matrix");
    const fLexi = document.getElementById("footer-link-lexi");
    const fLabs = document.getElementById("footer-link-labs");
    const fQuizzes = document.getElementById("footer-link-quizzes");

    if (brandTitle) brandTitle.textContent = t("brandTitle");
    if (brandSub) brandSub.textContent = t("brandSubtitle");
    if (menuLabel) menuLabel.textContent = t("menuLabel");
    if (fHome) fHome.textContent = t("navHome");
    if (fMatrix) fMatrix.textContent = t("navMatrix");
    if (fLexi) fLexi.textContent = t("navLexi");
    if (fLabs) fLabs.textContent = t("navLabs");
    if (fQuizzes) fQuizzes.textContent = t("navQuizzes");

    updateThemeButton();
  }

  function updateApp() {
    const currentHash = window.location.hash || "#/";
    syncStaticLabels();
    renderSidebar(sidebarEl, currentHash);
    handleRoute(contentArea);

    if (sidebarEl && sidebarEl.classList.contains("mobile-open")) {
      sidebarEl.classList.remove("mobile-open");
      if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
  }

  onLangChange(() => {
    updateApp();
  });

  if (mobileMenuBtn && sidebarEl) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = sidebarEl.classList.toggle("mobile-open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Close mobile drawer on Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && sidebarEl && sidebarEl.classList.contains("mobile-open")) {
      sidebarEl.classList.remove("mobile-open");
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.focus();
      }
    }
  });

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && readingProgressBar) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      readingProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
  }, { passive: true });

  window.addEventListener("hashchange", updateApp);

  updateApp();
});
