//Notes
//validate inputs(register & login) //alert
//when i register check if email used or not//alert
//auto movement form page to another
//Home : welcome+user logged +logout
//cant access home page without login

// elements vars
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var passInput = document.querySelector("#pass");
var rePassInput = document.querySelector("#rePass");
var signupBtn = document.querySelector("#signup");
var form = document.querySelector("form");
var showPassCheckbox = document.querySelector("#show-pass");

// global vars
var usersList = JSON.parse(localStorage.getItem("users")) || [];
//validation
var nameRegex = /[A-Z][a-z0-9_-]{3,15}$/;
var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
var rePassRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

//functions
//long code
// function signup() {
//     //long code
//   if (validate(nameRegex, nameInput)) {
//     if (validate(emailRegex, emailInput)) {
//       if (validate(passRegex, passInput)) {
//         if (rePassInput.value === passInput.value) {
//           var isDuplicatedEmail = usersList.some(
//             (user) =>
//               user.email.toLowerCase() === emailInput.value.toLowerCase()
//           );
//           if (isDuplicatedEmail) {
//             Swal.fire({
//               icon: "error",
//               title: "Email Already Registered",
//               text: "This email is already in use. Please use a different one or log in.",
//               footer: 'Need help? <a href="#">Contact support</a>',
//             });
//           } else {
//             var user = {
//               name: nameInput.value,
//               email: emailInput.value,
//               password: passInput.value,
//             };
//             usersList.push(user);
//             localStorage.setItem("users", JSON.stringify(usersList));
//           }
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Passwords Do Not Match",
//             text: "Please make sure the password and confirmation password match exactly.",
//             footer: "Tip: Copy and paste to be sure they’re identical",
//           });
//         }
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Weak Password",
//           text: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
//           footer: "Example: <b>StrongPass1@</b>",
//         });
//       }
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Email",
//         text: "Please enter a valid email address in the format: user@example.com",
//         footer: "Example: <b>osama.dev@gmail.com</b>",
//       });
//     }
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Name",
//       text: "Name must start with a capital letter and be 4-16 characters long. It can contain lowercase letters, numbers, underscores (_) or hyphens (-).",
//       footer: "Example: <b>Try again</b>",
//     });
//   }
// }

//short code
function signup() {
  if (
    nameInput.value == "" ||
    emailInput.value == "" ||
    passInput.value == "" ||
    rePassInput.value == ""
  )
    return showError(
      "There is empty input",
      "Fill all inputs",
      "Example: <b>Try again</b>"
    );

  if (!validate(nameRegex, nameInput))
    return showError(
      "Invalid Name",
      "Name must start with a capital letter and be 4-16 characters long. It can contain lowercase letters, numbers, underscores (_) or hyphens (-).",
      "Example: <b>Try again</b>"
    );

  if (!validate(emailRegex, emailInput))
    return showError(
      "Invalid Email",
      "Please enter a valid email address in the format: user@example.com",
      "Example: <b>osama.dev@gmail.com</b>"
    );

  if (!validate(passRegex, passInput))
    return showError(
      "Weak Password",
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      "Example: <b>StrongPass1@</b>"
    );

  if (passInput.value !== rePassInput.value)
    return showError(
      "Passwords Do Not Match",
      "Please make sure the password and confirmation password match exactly.",
      "Tip: Copy and paste to be sure they’re identical"
    );

  var isDuplicatedEmail = usersList.some(
    (user) => user.email.toLowerCase() === emailInput.value.toLowerCase()
  );

  if (isDuplicatedEmail)
    return showError(
      "Email Already Registered",
      "This email is already in use. Please use a different one or log in.",
      'Need help? <a href="#">Contact support</a>'
    );

  const user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passInput.value,
  };
  usersList.push(user);
  localStorage.setItem("users", JSON.stringify(usersList));
  Swal.fire({
    icon: "success",
    title: "Registered Successfully",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location.href = "./index.html";
  });
}
function showError(title, text, footer) {
  Swal.fire({
    icon: "error",
    title,
    text,
    footer,
  });
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    return true;
  } else {
    return false;
  }
}

//events
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
signupBtn.addEventListener("click", signup);

nameInput.addEventListener("input", function () {
  validate(nameRegex, nameInput);
});

emailInput.addEventListener("input", function () {
  validate(emailRegex, emailInput);
});

passInput.addEventListener("input", function () {
  validate(passRegex, passInput);
});
rePassInput.addEventListener("input", function () {
  validate(rePassRegex, rePassInput);
});

showPassCheckbox.addEventListener("change", function () {
  if (this.checked) {
    passInput.type = "text";
    rePassInput.type = "text";
  } else {
    passInput.type = "password";
    rePassInput.type = "password";
  }
});
