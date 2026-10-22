import { toggleRequires } from "./utils.js";

/* Wires [data-link] anchors from config and shows/hides [data-requires] blocks. */
export function applyLinks(config, placeQuery) {
  const reviews = String(config.googleReviews || "").trim() ||
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(placeQuery);
  const placeId = String(config.googlePlaceId || "").trim();
  const writeReview = placeId ? "https://search.google.com/local/writereview?placeid=" + encodeURIComponent(placeId) : "";
  const facebook = String(config.facebook || "").trim();

  setHref("googleReviews", reviews);
  setHref("writeReview", writeReview);
  setHref("facebook", facebook);

  toggleRequires("writeReview", !!writeReview);
  toggleRequires("facebook", !!facebook);
}

function setHref(key, url) {
  if (!url) return;
  document.querySelectorAll(`[data-link="${key}"]`).forEach((a) => {
    a.href = url;
  });
}
