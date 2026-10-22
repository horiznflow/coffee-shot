import { prefersReducedMotion } from "./utils.js";

const QUART = "cubic-bezier(0.25,1,0.5,1)";
const EXPO = "cubic-bezier(0.16,1,0.3,1)";

/* Hero entrance: logo fades in, nav drops, headline lines slide up from their
   masks, then lede, CTA and aside. Waits for fonts and the first video frame
   (max 3.5s). [data-intro] stays hidden via html.intro-pending until it starts. */
export function initIntro() {
  const root = document.documentElement;
  const done = () => root.classList.remove("intro-pending");

  if (prefersReducedMotion() || !Element.prototype.animate) {
    done();
    return;
  }

  let started = false;
  const go = () => {
    if (started) return;
    started = true;
    clearTimeout(failsafe);
    run(done);
  };
  const failsafe = setTimeout(go, 3500);

  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  const videoReady = new Promise((resolve) => {
    const v = document.querySelector(".hero-video");
    if (!v || v.readyState >= 2) resolve();
    else v.addEventListener("loadeddata", resolve, { once: true });
  });

  Promise.all([fontsReady, videoReady]).then(go, go);
}

function run(reveal) {
  const q = (s) => document.querySelector(s);
  const qa = (s) => Array.from(document.querySelectorAll(s));

  /* Travel distances scale with the CTA's rendered size */
  const cta = q('[data-intro="cta"]');
  const small = window.innerWidth < 650;
  const k = (cta && cta.offsetHeight ? cta.offsetHeight / 46 : 1) * (small ? .8 : 1);
  const d = (px) => Math.round(px * k);

  const anims = [];
  const A = (el, frames, opts) => {
    if (el) anims.push(el.animate(frames, Object.assign({ fill: "backwards" }, opts)));
  };
  const rise = (el, px, delay, duration, easing) => A(el, [
    { opacity: 0, transform: "translateY(" + d(px) + "px)" },
    { opacity: 1, transform: "translateY(0px)" }
  ], { delay, duration, easing });

  // Logo
  A(q('[data-intro="logo"]'), [
    { opacity: 0, transform: "scale(0.96)" },
    { opacity: 1, transform: "scale(1)" }
  ], { delay: 0, duration: 800, easing: QUART });

  // Nav or burger, links and video button
  rise(q('[data-intro="nav"]'), 8, 120, 700, EXPO);
  rise(q('[data-intro="menu"]'), 8, 120, 700, EXPO);
  rise(q('[data-intro="lang"]'), 8, 160, 700, EXPO);
  qa('[data-intro="navlink"]').forEach((el, i) => rise(el, 4, 260 + 45 * i, 600, EXPO));

  // Hero copy
  rise(q('[data-intro="eyebrow"]'), 10, 300, 650, EXPO);
  qa('[data-intro="line"]').forEach((el, i) => A(el, [
    { opacity: 1, transform: "translateY(115%)" },
    { opacity: 1, transform: "translateY(0%)" }
  ], { delay: 380 + 90 * i, duration: 1050, easing: EXPO }));
  qa('[data-intro="lede"]').forEach((el, i) => rise(el, 14, i === 0 ? 800 : 860, 800, EXPO));
  rise(cta, 12, 1000, 800, EXPO);
  rise(q('[data-intro="tlink"]'), 8, 1100, 600, QUART);

  // Rating and cue drop in
  ["rating", "cue"].forEach((n) => A(q('[data-intro="' + n + '"]'), [
    { opacity: 0, transform: "translateY(" + -d(6) + "px)" },
    { opacity: 1, transform: "translateY(0px)" }
  ], { delay: 1250, duration: 700, easing: EXPO }));

  /* fill: backwards keeps each element hidden until its own delay */
  reveal();

  const finish = () => repaint([q(".logo"), q(".actions")]);
  Promise.all(anims.map((a) => a.finished)).then(finish, finish);
}

/* Nudges a repaint so backdrop-filter / pill edges render crisp after the intro */
function repaint(els) {
  els.forEach((el) => {
    if (!el) return;
    el.style.transform = "translateZ(0)";
    requestAnimationFrame(() => { el.style.transform = ""; });
  });
}
