/* Page language comes from <html lang>: "es-PE" (/) or "en" (/en/). */
export const LANG = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "es";

const UI = {
  es: {
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    cartaShow: "Ver carta completa",
    cartaHide: "Ocultar carta",
    cartaTabs: "Categorías de la carta",
    cartaNote: "La carta puede variar según disponibilidad.",
    reviewSource: "Reseña en Google"
  },
  en: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    cartaShow: "See full menu",
    cartaHide: "Hide menu",
    cartaTabs: "Menu categories",
    cartaNote: "The menu may vary depending on availability.",
    reviewSource: "Google review · translated from Spanish"
  }
};

export function t(key) {
  return UI[LANG][key];
}

/* Picks the current language from a { es, en } object; plain strings pass through. */
export function pick(value) {
  if (!value || typeof value === "string") return value || "";
  return value[LANG] || value.es || "";
}

export function formatNumber(n, decimals = 0) {
  return Number(n).toLocaleString(LANG === "en" ? "en-US" : "es", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
