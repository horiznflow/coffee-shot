import { prefersReducedMotion } from "./utils.js";

/* Fades .rv elements up as they enter the viewport, staggering ones that
   enter together. Without JS or with reduced motion, .rv-on is never set
   and content stays visible. */
export function initReveal() {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver((entries) => {
    let i = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = (i++ * 60) + "ms";
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  document.documentElement.classList.add("rv-on");
}
