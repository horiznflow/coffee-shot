import { prefersReducedMotion } from "./utils.js";

/* Shifts the image inside .parallax up to ±24px as its frame crosses the viewport. */
export function initParallax() {
  if (prefersReducedMotion()) return;
  const img = document.querySelector(".parallax img");
  if (!img) return;

  let ticking = false;
  const update = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const r = img.parentElement.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
      const y = Math.max(-24, Math.min(24, -p * 24));
      img.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
