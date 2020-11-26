/***
but if you want to check whether Intersection Observer is supported while you’re working with it, you could see if the property IntersectionObserver exists in the window object:
***/

/* listen for event on nav bar parent element */
var parentElement = document.querySelector(".container .link__list");
var listenElement = document.querySelector(".second-sub");
var showElement = document.querySelector(".second-menu-sub");

function showSubmenu(eventHandlerElement, effectedElement) {
  eventHandlerElement.addEventListener("keydown", function doStuff(event) {
    var currentEnteredSubmenu = document.activeElement;
    // console.dir(event.target);
    // console.log(event.key);
    // console.log(event.code);
    // console.log(this);eventHandlerELement which is the a tag
    console.log(currentEnteredSubmenu);
    if (event.code == "Enter" || event.code == "Space") {
      //   console.log("Hello");
      let getAnchorElements = document.querySelectorAll(
        ".second-nav__submenu > li > a"
      );
      let arrayOfLiElements = Array.from(getAnchorElements);
      let firstFocusElement = arrayOfLiElements[0];
      let lastFocusElement = arrayOfLiElements[arrayOfLiElements.length - 1];
      //   console.log(typeof firstFocusElement);
      //   console.log(firstFocusElement);
      arrayOfLiElements.forEach(function listenForFocus(
        currValue,
        index,
        array
      ) {
        currValue.addEventListener("keydown", function printStuff(innerEvent) {
          /*** first attempt trap tab***/
          /*var firstItemInArray = array[0];
          console.log(secondEvent);
          if (index == array.length - 1) {
            /* listen for tab
            /*this will put focus on the first item in the array
            console.log("last item");
            // console.log(secondEvent.target);
            secondEvent.target.addEventListener(
              "keydown",
              function checkingStuff(innerEvent) {
                if (innerEvent.code == "Tab") {
                  console.log(firstItemInArray);
                  console.log("hit the tab key");
                  firstItemInArray.focus();
                }
              }
            );
          }
          //   console.log(this); currValue
          //console.log(document.activeElement); get current focused element
          console.log(event);*/
          /*** second attempt ***/
          if (innerEvent.key == "Tab" || innerEvent.keyCode == 9) {
            /*** listOfClassOfElement will have classes for our top menu li ***/
            /***Note when we tab in our submenu when we console.log document.activeElement it is the element we previous on after we hit tab.
             * ex: first li is <blog> when we are on <blog> then hit tab console.log will let us know we were on <blog>
             ***/
            console.log(currentEnteredSubmenu);
            if (innerEvent.shiftKey == true) {
              if (document.activeElement == firstFocusElement) {
                lastFocusElement.focus();
                innerEvent.preventDefault();
              }
            } else {
              if (document.activeElement == lastFocusElement) {
                firstFocusElement.focus();
                innerEvent.preventDefault();
              }
            }
          }
          /*** if we hit escape go back to top level link/li, top/first nav menu***/
          if (innerEvent.key == "Escape" || innerEvent.code == "Escape") {
            let listOfClassOfElement = effectedElement.className.split(" ");
            //check for active class on top/menu li
            if (listOfClassOfElement.includes("active")) {
              /*** if out top/menu li has active class, first we remove it the we set focus to that top/menu li
               * we saved that top/menu li when we hit enter or space key to add "active" class to enter our submenu
               * ***/
              effectedElement.classList.remove("active");
              currentEnteredSubmenu.focus();
            }
          }
          //   console.log(innerEvent);
        });
      });
      effectedElement.classList.toggle("active");
    }
  });
}

// showSubmenu(parentElement, showElement);

/* keep a list of focusable elements */
// var focusableEls = element.querySelectorAll(
//   'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
// );

/*** make it dynamic ***/

function makeItDynamic() {
  /*** Select our elements***/
  var topLinkList = document.querySelector(".link__list");
  /*** ***/
  topLinkList.addEventListener("keydown", function addClass(event) {
    var currentEnteredSubmenu = document.activeElement;
    if (event.code == "Enter" || event.code == "Space") {
      //current activeElement will be the anchor tag that we hit enter or space on
      let anchorEle = document.activeElement;
      let divElement = anchorEle.nextElementSibling; //div element sibling of <a> element
      let ulElement = divElement.firstElementChild; //ul of li is a child of div
      //list of li that we turned into an array. then we can access that value use firstElementChild to get the anchor tag of first and last element.
      let listOfListElements = Array.from(ulElement.children);
      let firstElementInList = listOfListElements[0].firstElementChild;
      let lastElementInList =
        listOfListElements[listOfListElements.length - 1].firstElementChild;
      //   console.dir(divElement);
      //   console.dir(Array.isArray(listOfListElements));
      //   console.log(firstElementInList);
      //   console.log(lastElementInList);
      divElement.classList.toggle("active");
      listOfListElements.forEach(function loopThroughAnchorElement(currValue) {
        currValue.firstElementChild.addEventListener(
          "keydown",
          function checkForFocus(innerEvent) {
            /*** loop through the submenu with tab and shift tab ***/
            if (innerEvent.key == "Tab" || innerEvent.keyCode == 9) {
              if (innerEvent.shiftKey == true) {
                if (document.activeElement == firstElementInList) {
                  lastElementInList.focus();
                  innerEvent.preventDefault();
                }
              } else {
                if (document.activeElement == lastElementInList) {
                  firstElementInList.focus();
                  innerEvent.preventDefault();
                }
              }
            }
            //if we hit escape we want to remove the active class on the currentEnteredSubmenu that we saved to an identifier when we hit enter
            if (innerEvent.key == "Escape" || innerEvent.code == "Escape") {
              //currentEnteredSubmenu is the anchor tag <a> one of the nav menu. its sibling is the div with the active class we want to check for and remove
              //when we hit Escape key we want to remove the active class on the div element and set focus on that anchor element.
              //   console.dir(currentEnteredSubmenu.nextElementSibling.classList);
              let elementToRemoveClass =
                currentEnteredSubmenu.nextElementSibling;
              let getListOfClassAttr = currentEnteredSubmenu.nextElementSibling.className.split(
                " "
              );
              //   console.log(getListOfClassAttr);
              if (getListOfClassAttr.includes("active")) {
                elementToRemoveClass.classList.remove("active");
                currentEnteredSubmenu.focus();
              }
            }
          }
        );
      });
    }
  });
}

makeItDynamic();

/*** select menu-toggle and add class to it ***/

function toggleHamburgerBtn() {
  /*** select our elements ***/
  //hamburger button
  var menuToggle = document.querySelector(".menu-toggle");
  //navbar menu
  var navbarMenu = document.querySelector(".link__list--second");
  menuToggle.addEventListener("click", function addClassToElement(event) {
    console.log(event.target);
    console.dir(event.target);
    menuToggle.classList.toggle("open");
    navbarMenu.classList.toggle("show");
  });
}

toggleHamburgerBtn();

/*window.requestAnimFrame = (function () {
    using OR logical operator to return different things depending on the condition.
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();*/

/*** new keyword on function that returns a value ***/

function objReturnValue() {
  this.name = "Hello";
  this.words = "world";

  return `${this.name} ${this.words}`;
}

var ourSaying = new objReturnValue(); //calling objReturnValue() with new will not return the string Hello world. we have to call objReturnValue() to get the string "Hello world".

/*** intersection Observer ***/

/*const options = {
    root: document.body,
    rootMargin: '0px',
    threshold: 0
}

function callback(entries, observer) {
    console.log(observer);

    entries.forEach(entry => {
        console.log(entry);
    });
}

let observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);


Typical Observer's registration

let observer = new YOUR - TYPE - OF - OBSERVER(function (entries) {
    // entries: Array of observed elements
    entries.forEach(entry => {
        // Here we can do something with each particular entry
    });
});

// Now we should tell our Observer what to observe
observer.observe(WHAT - TO - OBSERVE);

root: This is the root element used for the observation. It defines the basic “capturing frame” for observable elements.

By default, the root is the viewport of your browser but can really be any element in your DOM (then you set root to something like document.getElementById('your-element')).

Keep in mind though that the elements you want to observe must “live” in root’s DOM tree in this case

new IntersectionObserver(function(entries, SELF) {…});


*/

/*var ourObserver = new IntersectionObserver(function observeStuff(
  enteries,
  ourObserver //will have methods we can use in our callback.
) {
  console.log(ourObserver); //our observer parameter for callback that is passed into IntersectionObserver does not have to match the identifier/variable that holds the object that is returned by calling
  //new IntersectionObserver. it does reference itself.
  /*methods we can use from ourObserver object. ourObserver.observe(), ourObserver.unobserve(), ourObserver.takeRecords(), ourObserver.disconnect()
  entries.forEach(function printStuff(entry) {
    console.log(entry.target);
  });
  enteries.reduce(function howCanWeUseReduce(buildingUp, currentValue) {}, []);
}, optionsObj);*/

/*
if (!!window.IntersectionObserver) {
    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            console.log(self);
            if (entry.isIntersecting) {
                console.log(entry);
                entry.target.src = entry.target.dataset.src;
                self.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -200px 0px" });
    document.querySelectorAll('img').forEach(img => { observer.observe(img) });
}

else document.querySelector('#warning').style.display = 'block';*/

/*
let isLeaving = false;
let observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // we are ENTERING the "capturing frame". Set the flag.
            isLeaving = true;
            // Do something with entering entry
        } else if (isLeaving) {
            // we are EXITING the "capturing frame"
            isLeaving = false;
            // Do something with exiting entry
        }
    });
}, config);*/

/*
target is one more property of the IntersectionObserverEntry interface that you might need to get to quite often. But there is absolutely no magic here –
it’s just the original element that had been passed to observe() function of your Observer. Just like event.target you’ve got used to when working with events.
*/
