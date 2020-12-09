/*** 
 * window.onresize = function() {
    document.body.height = window.innerHeight;
}
window.onresize(); // called to initially set the height.
 * ***/

function animateToggleAndShowNav() {
  /*** select our elements ***/
  var ourButton = document.querySelector(".menu-toggle");
  var ourNav = document.querySelector(".main-nav");
  /*** select wrapper to test clicking on elements: learning ***/
  var outerWrapper = document.querySelector(".wrapper");
  outerWrapper.addEventListener("click", function learningAboutElements(event) {
    console.dir(event.target);
    console.dir(document.activeElement);
  });

  ourButton.addEventListener("click", function rotateHam(event) {
    ourButton.classList.toggle("open");
    ourNav.classList.toggle("show-main-nav");
  });
}

animateToggleAndShowNav();
