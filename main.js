import MenuImporter from "./assets/scripts/menu-importer.js";
import ClickEvents from "./assets/scripts/click-events.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let menuImport = new MenuImporter();
  menuImport.loadMenu();

  let events = new ClickEvents();

  events.menuButtonClickEvents();
  events.subMenuCLickEvents();
});
