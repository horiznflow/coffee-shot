export function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
}

/* Unhide every [data-requires="<key>"] element when `condition` is true. */
export function toggleRequires(key, condition) {
  document.querySelectorAll(`[data-requires="${key}"]`).forEach((el) => {
    el.hidden = !condition;
  });
}
