/**
 * Gerenciador de Temas: Claro (Primário) e Escuro
 * Persiste a escolha do usuário no localStorage
 */

import { icons } from "./icons.js";

const THEME_KEY = "gof_patterns_theme";

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  // Primariamente em modo claro conforme solicitado:
  const theme = savedTheme ? savedTheme : "light";
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeButton(theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
  updateThemeButton(nextTheme);
}

function updateThemeButton(theme) {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  if (theme === "dark") {
    btn.innerHTML = icons.sun;
    btn.title = "Alternar para Modo Claro";
    btn.setAttribute("aria-label", "Alternar para Modo Claro");
  } else {
    btn.innerHTML = icons.moon;
    btn.title = "Alternar para Modo Escuro";
    btn.setAttribute("aria-label", "Alternar para Modo Escuro");
  }
}
