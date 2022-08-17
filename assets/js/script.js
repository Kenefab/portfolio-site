"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const result = document.getElementById("result");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

/////////////////////////////////////////////web3forms event listener
form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.style.marginRight = "0";
        result.innerHTML = json.message;
        // result.classList.remove("text-gray-500");
        // result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        // result.classList.remove("text-gray-500");
        // result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// //////////////////////////////////////////////////////////fields object
const fields = {
  fullname: document.getElementById("fullname"),
  messageBody: document.getElementById("message-body"),
};

const email = document.getElementById("email");

// function sendEmail() {
//   Email.send({
//     Host: "smtp.elasticemail.com",
//     Username: "kenefab26@gmail.com",
//     Password: "27BE023E290AF1730A007A8FB23F3356C034",
//     To: "kenefabukozor@gmail.com",
//     From: email.value,
//     Subject: "New Contact Form",
//     Body:
//       "Full Name: " +
//       fields.fullname +
//       "<br /> Email: " +
//       fields.email +
//       "<br /> Message: " +
//       fields.messageBody,
//   }).then((message) => alert("Message sent"));
// }

// //////////////////////////////////////////////////////////load fields to DOMContentLoaded and create fields properties
// document.addEventListener("DOMContentLoaded", () => {
//   fields.fullname = document.getElementById("fullname");
//   fields.email = document.getElementById("email");
//   fields.messageBody = document.getElementById("message-body");
// });

// ////////////////////////////////////////////////////////////////////////////functions
// function isNotEmpty(value) {
//   if (value == null || typeof value == "undefined") return false;

//   return value.length > 0;
// }

// function isEmail(email) {
//   let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//   return regex.test(String(email).toLowerCase());
// }

// function fieldValidation(field, validFunction) {
//   if (field == null) return false;

//   let isFieldValid = validFunction(field.value);
//   if (!isFieldValid) {
//     alert("field not valid");
//   } else {
//     console.log("all fields valid");
//   }

//   return isFieldValid;
// }

// function isValid() {
//   var valid = true;

//   valid &= fieldValidation(fields.fullname, isNotEmpty);
//   valid &= fieldValidation(fields.email, isEmail);
//   valid &= fieldValidation(fields.messageBody, isNotEmpty);

//   console.log(valid);

//   return valid;
// }

// class Visitor {
//   constructor(fullName, email, messageBody) {
//     this.fullName = fullName;
//     this.email = email;
//     this.messageBody = messageBody;
//   }
// }

// function sendContact() {
//   if (isValid()) {
//     let visitor = new Visitor(fullName.value, email.value, messageBody.value);

//     alert(`${visitor.fullName} thanks for registering.`);
//   } else {
//     alert("There was an error");
//   }
// }

// // form.addEventListener("submit", () => {
// //   return false;
// // });

// const btn = document.getElementById("btn");

// btn.addEventListener("click", () => {
//   sendContact();
// });
