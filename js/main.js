import { CONFIG, PLACE_QUERY } from "./config.js";
import { applyLinks } from "./modules/links.js";
import { renderReviews } from "./modules/reviews.js";
import { initCarta } from "./modules/carta.js";
import { initMenu } from "./modules/menu.js";
import { initHeroVideo } from "./modules/hero-video.js";
import { initIntro } from "./modules/intro.js";
import { initReveal } from "./modules/reveal.js";
import { initParallax } from "./modules/parallax.js";

/* Render dynamic content first so reveal picks up the new .rv nodes. */
renderReviews();
initCarta();
applyLinks(CONFIG, PLACE_QUERY);

initMenu();
initHeroVideo();
initIntro();
initReveal();
initParallax();
