class ClickEvents {

  constructor() {
    this.menuBtn = document.querySelector(".menu-container__menu-toggle");
    this.subMenuBtn = document.querySelectorAll(".menu__sub-menu-toggle");
  }

  menuButtonClickEvents() {
    // Hamburger Menu button click event
    if (this.menuBtn) {
      this.menuBtn.addEventListener("click", () => {
        let menu = document.querySelector(".menu");
        let body = document.querySelector("body");
        let overlay = document.querySelector(".overlay");

        // Just to be dumb
        this.menuBtn.classList.toggle("flipped");

        if (menu) {
          window.requestAnimationFrame(() => {
            menu.classList.toggle("visible");
          });

          if (overlay) {
            overlay.classList.toggle("active");

            // Make the click event on the overlay function the same as a click on the menu button
            overlay.addEventListener("click", () => {
              body.classList.toggle("nav-open");
              overlay.classList.toggle("active");
              this.menuBtn.classList.toggle("flipped");
              window.requestAnimationFrame(() => {
                menu.classList.toggle("visible");
              });

            });
          }

          body.classList.toggle("nav-open");
        }
      });
    }
  }

  subMenuCLickEvents() {
    if (this.subMenuBtn) {
      this.subMenuBtn.forEach(btn => {
        btn.addEventListener("click", function() {
          let parentElement = this.parentElement;
          let subMenu = parentElement.nextElementSibling;

          if (subMenu) {
            parentElement.classList.toggle("open");
            subMenu.classList.toggle("visible");
            btn.classList.toggle("flipped");
          }
        });
      });
    }
  }
}

export default ClickEvents;
