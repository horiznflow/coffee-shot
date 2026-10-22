import { MENU, CURRENCY } from "../data/menu.js";
import { t, pick } from "./i18n.js";

/* Full digital menu: "Ver carta completa" opens a panel with one tab per
   category, built from js/data/menu.js with #menu-item-template. */
export function initCarta() {
  const toggle = document.querySelector("[data-carta-toggle]");
  const panel = document.getElementById("carta-completa");
  const tpl = document.getElementById("menu-item-template");
  if (!toggle || !panel || !tpl) return;

  if (!MENU.length) {
    toggle.hidden = true;
    return;
  }

  const tabList = panel.querySelector(".carta-tabs");
  const panels = panel.querySelector(".carta-panels");
  tabList.setAttribute("aria-label", t("cartaTabs"));
  panel.querySelector(".carta-note").textContent = t("cartaNote");

  const tabs = MENU.map((cat, i) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "carta-tab";
    tab.id = "tab-" + cat.id;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "panel-" + cat.id);
    tab.textContent = pick(cat.name);
    tabList.appendChild(tab);

    const pane = document.createElement("div");
    pane.className = "carta-pane";
    pane.id = "panel-" + cat.id;
    pane.setAttribute("role", "tabpanel");
    pane.setAttribute("aria-labelledby", tab.id);
    pane.tabIndex = 0;

    const list = document.createElement("ul");
    list.className = "mi-list";
    cat.items.forEach((item) => list.appendChild(renderItem(tpl, item)));
    pane.appendChild(list);
    panels.appendChild(pane);

    tab.addEventListener("click", () => select(i, false, true));
    return { tab, pane };
  });

  /* reveal: keep the chosen tab in view when the tab row scrolls sideways (mobile) */
  function select(index, focus, reveal) {
    tabs.forEach(({ tab, pane }, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      pane.hidden = !on;
    });
    if (focus) tabs[index].tab.focus();
    if (focus || reveal) tabs[index].tab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  /* Arrow keys / Home / End move between tabs */
  tabList.addEventListener("keydown", (e) => {
    const current = tabs.findIndex(({ tab }) => tab === document.activeElement);
    if (current < 0) return;
    const last = tabs.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  });

  select(0);

  const label = toggle.querySelector("[data-label]");
  toggle.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = t(open ? "cartaHide" : "cartaShow");
  });
}

function renderItem(tpl, item) {
  const node = tpl.content.firstElementChild.cloneNode(true);
  const price = String(item.price || "").trim();
  const tag = pick(item.tag);
  const desc = pick(item.desc);

  node.querySelector(".mi-name").textContent = pick(item.name);

  const tagEl = node.querySelector(".mi-tag");
  if (tag) tagEl.textContent = tag;
  else tagEl.remove();

  const priceEl = node.querySelector(".mi-price");
  if (price) priceEl.textContent = CURRENCY + " " + price;
  else priceEl.remove();

  const descEl = node.querySelector(".mi-desc");
  if (desc) descEl.textContent = desc;
  else descEl.remove();

  return node;
}
