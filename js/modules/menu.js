import { t } from "./i18n.js";

/* Mobile menu: the burger opens the nav pill as a dropdown.
   Closes on link click, Escape, or a tap outside. */
export function initMenu() {
  const header = document.querySelector(".hdr");
  const nav = document.getElementById("site-nav");
  const btn = document.querySelector(".mbtn");
  if (!header || !nav || !btn) return;

  const isOpen = () => nav.classList.contains("is-open");

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", t(open ? "menuClose" : "menuOpen"));
  };

  btn.addEventListener("click", () => {
    setOpen(!isOpen());
    if (isOpen()) {
      const first = nav.querySelector(".nav-links a");
      if (first) first.focus();
    }
  });

  nav.addEventListener("click", (e) => {
    if (isOpen() && e.target.closest("a")) setOpen(false);
  });

  header.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      btn.focus();
    }
  });

  document.addEventListener("pointerdown", (e) => {
    if (!isOpen() || e.target.closest(".nav, .mbtn")) return;
    setOpen(false);
  });
}
