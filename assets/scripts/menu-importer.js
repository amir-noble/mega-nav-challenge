import otterSVG from "../../otter.svg";

class MenuImporter {
  constructor() {
    // Load in the menu data
    this.menuData = require("../../menuData.json");
    this.menuElement = document.getElementById("main-navigation");
  }

  loadMenu() {
    // Basic error checking, bail if either our data/element isn't present
    if (!this.menuData || !this.menuElement) {
      console.error("Menu Data or Menu Element isn't present");
      return;
    }

    // Main parent ul, we will be jamming this into our nav element at the end of this function
    let navItemContainer = document.createElement("ul");
    navItemContainer.classList.add("menu__main-element")

    this.menuData.forEach(topLevelItem => {

      // Check for the 2 most critical items for each menu item before doing anything.
      // If we don't have these just skip this menu item
      if (topLevelItem.link && topLevelItem.name) {

        // Build this element and all its children
        let listElement = this.createMenuElement(topLevelItem);

        // Append this li element to our parent ul element
        navItemContainer.appendChild(listElement);
      }
    });

    // Append the final menu item to the actual nav element
    this.menuElement.appendChild(navItemContainer);
    this.menuElement.innerHTML += this.createRadicalLogo();
  }

  /**
   * Recursively build our menu. Mmmmm recursion.
   *
   * @param {*} menuItemData
   */
  createMenuElement(menuItemData) {
    // Base level return condition
    if (!menuItemData.subMenu) {
      return this.createListElement(menuItemData);
    }

    // Otherwise create all our elements that sub navs have
    let listEle = this.createListElement(menuItemData);
    let subList = document.createElement("ul");

    subList.classList.add("sub-menu");

    // Add each submenu item to the current one
    menuItemData.subMenu.forEach(subEle => {
      subList.appendChild(this.createMenuElement(subEle));
    });

    // Append our complete sublist tree and return it
    listEle.appendChild(subList);

    return listEle;
  }

  /**
   * This is our simple list item builder. It creates an li element
   * that contains a link within it
   * @param {*} data
   */
  createListElement(data) {
    // Create the required elements
    let listElement = document.createElement("li");
    let wrapper = document.createElement("div");
    let linkEle = document.createElement("a");
    let contentWrapper = document.createElement("div");

    // Add the needed classes to our required elements and set the required attributes/data
    contentWrapper.classList.add("menu__item-content");
    wrapper.classList.add("menu__item-wrapper");
    linkEle.classList.add("menu__link");

    linkEle.setAttribute("href", data.link);
    linkEle.innerHTML = data.name;

    // If this link item has an image create it and append it to the wrapper
    if (data.image) {
      let image = document.createElement("img");

      image.setAttribute("src", data.image);
      image.classList.add("menu__item-image");

      wrapper.appendChild(image);
    }

    // If this link item has an excerpt create it and append it to the wrapper
    if (data.excerpt) {
      let excerpt = document.createElement("p");
      excerpt.innerHTML = data.excerpt;

      contentWrapper.appendChild(linkEle);
      contentWrapper.appendChild(excerpt);
    } else {
      contentWrapper.appendChild(linkEle);
    }

    // Append the content to the wrapper
    wrapper.appendChild(contentWrapper);

    // If this bad boy has a submenu slap on out fancy sub menu toggle button for mobile
    if (data.subMenu) {
      let mobileToggleButton = document.createElement("button");
      mobileToggleButton.classList.add("menu__sub-menu-toggle");
      wrapper.appendChild(mobileToggleButton);
    }

    // Append the wrapper to the list element and then end things
    listElement.appendChild(wrapper);

    return listElement;
  }

  createRadicalLogo() {
    // Idk, I just wanted to mess around with Template strings
    let logo = `<div class="menu-container__bottom-logo-container">
                  <img class="menu-container__bottom-logo" src="${otterSVG}" alt="image of an otter, its the site's mascot">
                  <div class="menu-container__bottom-logo-text">Otter Bois.<br/> <div class="sub-logo">Splish Splash Bish.</span></div>
                </div>`;
    return logo;
  }
}

export default MenuImporter;
