export const THEME_STORAGE_KEY = "marci-theme";

export const THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
} as const;

export type Theme = keyof typeof THEME_COLORS;

export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored === "dark" || (stored !== "light" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (error) {
    /* Storage can be blocked (private mode); fall back to the light theme. */
  }
})();
`;
