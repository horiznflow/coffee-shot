import { prefersReducedMotion } from "./utils.js";

/* Keeps the muted ping-pong hero loop playing while it is on screen.
   Pauses it off screen, in background tabs, and for reduced motion. */
export function initHeroVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  if (prefersReducedMotion()) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  const hero = document.querySelector(".hero");
  let inView = true;

  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;

  const sync = () => {
    if (!inView || document.hidden) {
      video.pause();
      return;
    }
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };

  /* Fallback if the native loop doesn't restart */
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    sync();
  });

  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        sync();
      });
    }, { threshold: 0 }).observe(hero);
  }

  document.addEventListener("visibilitychange", sync);
  sync();
}
