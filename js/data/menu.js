/* ==========================================================================
   Carta digital (español + inglés)
   Lo que se edite aquí se actualiza en las dos versiones de la página.

   Cada categoría es una pestaña. Cada producto:
     name   { es, en }   nombre
     desc   { es, en }   descripción corta (opcional)
     price  "18"         precio en soles, sin "S/". Vacío = no se muestra.
     tag    { es, en }   etiqueta pequeña (opcional), ej. Destacado

   Ejemplo:
   { name: { es: "Capuccino", en: "Cappuccino" }, desc: { es: "", en: "" }, price: "12" }
   ========================================================================== */

export const CURRENCY = "S/";

const FEATURED = { es: "Destacado", en: "Featured" };

export const MENU = [
  {
    id: "cafes",
    name: { es: "Cafés y bebidas", en: "Coffee & drinks" },
    items: [
      { name: { es: "Espresso", en: "Espresso" }, desc: { es: "Café de especialidad, corto e intenso.", en: "Specialty coffee, short and intense." }, price: "" },
      { name: { es: "Cold brew", en: "Cold brew" }, desc: { es: "Café extraído en frío, suave y refrescante.", en: "Slow cold-steeped coffee, smooth and refreshing." }, price: "" },
      { name: { es: "Iced Honey Shot", en: "Iced Honey Shot" }, desc: { es: "Nuestro shot de café helado con miel.", en: "Our iced coffee shot with honey." }, price: "", tag: FEATURED },
      { name: { es: "Preparaciones de especialidad", en: "Specialty coffee drinks" }, desc: { es: "Calientes o heladas.", en: "Hot or iced." }, price: "" },
      { name: { es: "Jugos naturales", en: "Fresh juices" }, desc: { es: "De fruta natural.", en: "Made with fresh fruit." }, price: "" }
    ]
  },
  {
    id: "comida",
    name: { es: "Desayunos y comida", en: "Breakfast & food" },
    items: [
      { name: { es: "Desayunos", en: "Breakfast" }, desc: { es: "Para empezar el día.", en: "To start the day." }, price: "" },
      { name: { es: "Piqueos", en: "Small plates" }, desc: { es: "Para compartir en el after office.", en: "To share after office." }, price: "" },
      { name: { es: "Sándwiches", en: "Sandwiches" }, desc: { es: "Para el almuerzo o la tarde.", en: "For lunch or the afternoon." }, price: "" },
      { name: { es: "Pizzas artesanales", en: "Artisan pizzas" }, desc: { es: "Ideales para el after office.", en: "Perfect for after office." }, price: "" }
    ]
  },
  {
    id: "postres",
    name: { es: "Postres", en: "Desserts" },
    items: [
      { name: { es: "Postres", en: "Desserts" }, desc: { es: "El cierre dulce, a cualquier hora del día.", en: "The sweet ending, any time of day." }, price: "" }
    ]
  },
  {
    id: "cocteles",
    name: { es: "Cócteles y vinos", en: "Cocktails & wine" },
    items: [
      { name: { es: "Toasted Martini", en: "Toasted Martini" }, desc: { es: "Cóctel de autor.", en: "Signature cocktail." }, price: "", tag: FEATURED },
      { name: { es: "Coffee Spritz", en: "Coffee Spritz" }, desc: { es: "Cóctel de autor.", en: "Signature cocktail." }, price: "", tag: FEATURED },
      { name: { es: "Cócteles de autor", en: "Signature cocktails" }, desc: { es: "Tragos de la casa para la noche.", en: "House drinks for the night." }, price: "" },
      { name: { es: "Vinos", en: "Wine" }, desc: { es: "Para acompañar la noche.", en: "To go with the night." }, price: "" }
    ]
  }
];
