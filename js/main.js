///////////////////////////////////////////////// check if there is local storage color option (local storage is not Empty)
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  //console.log("oooooopsssss");
  //console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main--color", mainColors);

  // Remove active class from all colors list items :
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add active class on element with data-color === local storage item
    if (element.dataset.color === mainColors) {
      // Add active class :
      element.classList.add("active");
    }
  });
}

///////////////////////////////////////////////////////////////// Round Background Option :
let backgroundOption = true;

// Variable to control the background interval function :
let backgroundInterval;

//////////// check if there is Local storage random background item (local storage is not Empty):
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  console.log(backgroundLocalItem);

  // Remove active class from all spans :
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

//////////////////////////////////////////////////////////////////// Toggle spin class on setting icon (fa-gear):
document.querySelector(".toggle-setting .setting-icon").onclick = function () {
  // Toggle class fa-spin for rotation on the element itself
  this.classList.toggle("fa-spin");

  //Toggle class open on main setting box :
  document.querySelector(".setting-box").classList.toggle("open");
};

///////////////////////////////////////////////////// Click anywhere outside Setting icon and toggle the box :

let toggleButton = document.querySelector(".setting-box .setting-icon");
let boxes = document.querySelector(".setting-box");
let optionsBox = document.querySelector(".setting-box .option-box");

document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (
    e.target !== toggleButton &&
    e.target !== boxes &&
    e.target !== optionsBox
  ) {
    //  console.log("this is not the toggle button or The menu");
    // Check if menu is opened or not :
    if (boxes.classList.contains("open")) {
      // console.log("Menu Now is opened");

      // Toggle menu  :
      toggleButton.classList.toggle("setting-container");

      // Toggle the opne class on  Links Menu :
      boxes.classList.toggle("open");
    }
  }
});

boxes.onclick = function (e) {
  // Stop Propagation :
  e.stopPropagation();
};

//////////////////////////////////////////////////////////////////////  Switch page colors from setting :

const colorsLi = document.querySelectorAll(".colors-list li");

//Loop in List items
colorsLi.forEach((li) => {
  // Click on every list items
  li.addEventListener("click", (event) => {
    // console.log(event.target.dataset.color);
    // Set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      event.target.dataset.color
    );

    // set color on local storage :
    localStorage.setItem("color_option", event.target.dataset.color);

    /*   // Remove active class from all children //// Ther is a function handleActive() for that :
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove("active");
    });

    // Add active class on the clicked element :
    event.target.classList.add("active"); */

    handleActive(event);
  });
});

//////////////////////////////////////////////////////////////////  Switch Background from setting :

const randomBackgroundEl = document.querySelectorAll(
  ".random-backgrounds span"
);

//Loop on all spans
randomBackgroundEl.forEach((span) => {
  // Click on every span
  span.addEventListener("click", (event) => {
    /*     // Remove active class from all spans :
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove("active");
    });

    // Add active class on the clicked span :
    event.target.classList.add("active");
  */

    handleActive(event);

    if (event.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

//////////////////////////////////////////////////////// Choose Background //////////////////////////////////////////

let firstOption = document.getElementById("first"),
  secondOption = document.getElementById("second"),
  thirdOption = document.getElementById("third"),
  forthOption = document.getElementById("forth"),
  fithOption = document.getElementById("fifth");

firstOption.addEventListener("click", (e) => {
  if (backgroundOption === false) {
    let firstImage = document.getElementById("choose-land");

    firstImage.style.backgroundImage = "url(img/10.jpg)";
  } else {
    return null;
  }

  handleActive(e);
});

secondOption.addEventListener("click", (e) => {
  if (backgroundOption === false) {
    let secondImage = document.getElementById("choose-land");

    secondImage.style.backgroundImage = "url(img/11.jpg)";
  } else {
    return null;
  }

  handleActive(e);
});

thirdOption.addEventListener("click", (e) => {
  if (backgroundOption === false) {
    let thirdImage = document.getElementById("choose-land");

    thirdImage.style.backgroundImage = "url(img/3.jpg)";
  } else {
    return null;
  }

  handleActive(e);
});

forthOption.addEventListener("click", (e) => {
  if (backgroundOption === false) {
    let forthImage = document.getElementById("choose-land");

    forthImage.style.backgroundImage = "url(img/4.jpg)";
  } else {
    return null;
  }

  handleActive(e);
});

fithOption.addEventListener("click", (e) => {
  if (backgroundOption === false) {
    let fifthImage = document.getElementById("choose-land");

    fifthImage.style.backgroundImage = "url(img/about-us.jpg)";
  } else {
    return null;
  }

  handleActive(e);
});

///////////////////////////////////////////////////////// This function for toggle the background image every 1 second

// Select Landing Page :
let landingPage = document.querySelector(".landing-page");

// Get array of images :
let imgsArray = ["8.png", "9.jpg", "12.jpeg", "7.jpg"];

// Function to randomize background images :

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random number :
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //Change background image url :
      landingPage.style.backgroundImage =
        'url("img/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}

randomizeImgs();

///////////////////////////////////////////////// Select Skills Selectors //////////////////////////////////////////////
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offset top :
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer hieght
  let skillsOuterHeight = ourSkills.offsetHeight;

  //window height
  let windowHeight = window.innerHeight;
  // this.console.log(windowHeight);

  // Window scrollTop :
  let windoScrollTop = this.pageYOffset;

  if (windoScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // this.console.log("skills section reached :)");

    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

///////////////////////////////////////////////////// Creat Popup with the Image /////////////////////////////////////////////

let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay element :
    let overlay = document.createElement("div");

    // Add class to overlay :
    overlay.className = "popup-overlay";

    // Append the overlay to the Body :
    document.body.appendChild(overlay);

    // Create The popup :
    let popupBox = document.createElement("div");

    // Add class to the Popup Box :
    popupBox.className = "popup-box";

    ///// Adding the alt to the image :
    // check if the alt is empty 'null' :
    if (img.alt !== null) {
      // create heading to add the value of alt in it :
      let imgHeading = document.createElement("h3");

      // create text for Heading :
      let imgText = document.createTextNode(img.alt);

      // Append the text to the Heading :
      imgHeading.appendChild(imgText);

      // Append the Heading to the Popup box :
      popupBox.appendChild(imgHeading);
    }

    // Create the Image :
    let popupImage = document.createElement("img");

    // Set Image Source 'src' :
    popupImage.src = img.src;

    // Add image to Popup Box :
    popupBox.appendChild(popupImage);

    // Append the popup box to the Body :
    document.body.appendChild(popupBox);

    //  Create The Close span ('X' mark) :
    let closeButton = document.createElement("span");

    // Create the close button text :
    let closeButtonText = document.createTextNode("X");

    // Append text to close button :
    closeButton.appendChild(closeButtonText);

    // Add class to closeButton :
    closeButton.className = "close-button";

    // Add the close button to the Popup Box :
    popupBox.appendChild(closeButton);
  });
});

///////////////////////////////////////////////////////////////// Close the Popup :

document.addEventListener("click", (e) => {
  // check if the element has class name 'close button' ?
  if (e.target.className == "close-button") {
    // Remove the current popup :
    e.target.parentNode.remove();

    // Then Remove the overlay :
    document.querySelector(".popup-overlay").remove();
  }
});

//////////////////////////////////// Nav Bullets //////////////////////////////
/* 
// Select all bullets :
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {

    bullet.addEventListener('click', (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'
        });

    });

});
 */
//////////////////////////////////////// Links in Landing page ///////////////////////
/* 
// Select all Links :
const allLinks = document.querySelectorAll(".links a");

allLinks.forEach(link => {

    link.addEventListener('click', (e) => {

        // stop the default behavior to do :
        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'
        });

    });

});

 */

// Select all bullets :
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all Links :
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
  elements.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      // stop the default behavior to do :
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

/////////////////////////////////////////////////////// Handle Active class state ///////////////////////////

function handleActive(e) {
  // Remove active class from all children :
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class on the clicked element :
  e.target.classList.add("active");
}

//////////////////////////////////////////////////// Show / Hide Bullets Option ////////////////////////////////////

// handle the spans that hold the yes and no on bullets option :
let bulletSpan = document.querySelectorAll(".bullets-option span");

// handle the bullets nav  that hold all bullets :
let bulletsContainer = document.querySelector(".nav-bullets");

/////////// check if there is local storage option (local storage is not Empty)
let bulletLocal = localStorage.getItem("bullets_option");

if (bulletLocal !== null) {
  // remove active class from all spans :
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocal === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
  // console.log("NOT EMPTY");
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

///////////////////////////////////////////////////////////////// Reset Button ///////////////////////////////

document.querySelector(".reset-options").onclick = function () {
  // clear() function : delete all data that saved in local storage
  // localStorage.clear();

  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload window :
  window.location.reload();
};

///////////////////////////////////////////////////////////// Toggle menu button /////////////////////////////////

let toggleBtn = document.querySelector(".header-area .toggle-menu");

// get the links :
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation :
  e.stopPropagation();

  // Toggle the arrow (menu-active class) :
  this.classList.toggle("menu-active");

  // Toggle the opne class on  Links Menu :
  theLinks.classList.toggle("open");
};

//////////////////////////////////////////////////////////////// Click anywhere outside menu and toggle the button :

document.addEventListener("click", (e) => {
  // console.log(e.target);

  if (e.target !== toggleBtn && e.target !== theLinks) {
    // console.log("this is not the toggle button or The menu");

    // Check if menu is opened or not :
    if (theLinks.classList.contains("open")) {
      // console.log("Menu Now is opened");

      // Toggle menu  :
      toggleBtn.classList.toggle("menu-active");

      // Toggle the opne class on  Links Menu :
      theLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation on menu :
theLinks.onclick = function (e) {
  e.stopPropagation();
};

/* 
$(function () {
    'use strict';
   
    
$('.landing-page .links a').on('click', function () {

    $(this).addClass('active').siblings().removeClass('active');

});


});
 */
