import { icons } from "./icons.js";
import { t } from "../data/i18n.js";

const THEME_KEY = "gof_patterns_theme";

export function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch {
    return "dark";
  }
}

export function initTheme() {
  const theme = getTheme();
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeButton(theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const nextTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch {
    // ignore storage errors
  }
  updateThemeButton(nextTheme);
}

export function updateThemeButton(theme = getTheme()) {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  const label = theme === "dark" ? t("themeLight") : t("themeDark");
  const icon = theme === "dark" ? icons.sun : icons.moon;
  btn.innerHTML = `${icon} <span class="theme-btn-label">${label}</span>`;
  btn.title = label;
  btn.setAttribute("aria-label", t("toggleThemeAria"));
}
