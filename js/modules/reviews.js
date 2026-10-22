import { GOOGLE_RATING, REVIEWS } from "../data/reviews.js";
import { t, pick, formatNumber } from "./i18n.js";

/* Fills the Google rating / review count and renders the review cards
   from js/data/reviews.js with #review-template. */
export function renderReviews() {
  document.querySelectorAll("[data-rating]").forEach((el) => {
    el.textContent = formatNumber(GOOGLE_RATING.rating, 1);
  });
  document.querySelectorAll("[data-review-count]").forEach((el) => {
    el.textContent = formatNumber(GOOGLE_RATING.count);
  });

  const list = document.querySelector(".quotes");
  const tpl = document.getElementById("review-template");
  if (!list || !tpl) return;

  REVIEWS.forEach((review) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector(".q-text").textContent = pick(review.text);
    node.querySelector(".who").textContent = review.author;
    node.querySelector(".src").textContent = t("reviewSource");
    list.appendChild(node);
  });
}
