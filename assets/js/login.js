//element vars
var emailInput = document.querySelector("#email");
var passInput = document.querySelector("#pass");
var signinBtn = document.querySelector("#signin");
var form = document.querySelector("form");
var showPassCheckbox = document.querySelector("#show-pass");

//global vars
var usersList = JSON.parse(localStorage.getItem("users")) || [];

var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
//funcions
function login() {
  if (emailInput.value == "" || passInput.value == "")
    return showError(
      "There is empty input",
      "Fill all inputs",
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

  var isExist = usersList.some(
    (user) =>
      user.email.toLowerCase() === emailInput.value.toLowerCase() &&
      user.password === passInput.value
  );
  if (!isExist) {
    return showError(
      "email or password is incorrect",
      "If u dont have account please create one",
      "Example: <b>Try agian</b>"
    );
  } else {
    Swal.fire({
      icon: "success",
      title: "Logged Successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      var userInfo = {
        email: emailInput.value,
        status: true,
      };
      localStorage.setItem("isLogged", JSON.stringify(userInfo));
      window.location.href = "./home.html";
    });
  }
}
function validate(regex, element) {
  if (regex.test(element.value)) {
    return true;
  } else {
    return false;
  }
}
function showError(title, text, footer) {
  Swal.fire({
    icon: "error",
    title,
    text,
    footer,
  });
}
// events
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
emailInput.addEventListener("input", function () {
  validate(emailRegex, emailInput);
});

passInput.addEventListener("input", function () {
  validate(passRegex, passInput);
});
signinBtn.addEventListener("click", login);
showPassCheckbox.addEventListener("change", function () {
  if (this.checked) {
    passInput.type = "text";
  } else {
    passInput.type = "password";
  }
});
