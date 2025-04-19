//elements vars
var logoutBtn = document.querySelector("button");
var spanContent = document.querySelector("span");

//global vars
var usersList = JSON.parse(localStorage.getItem("users")) || [];
var userData = JSON.parse(localStorage.getItem("isLogged"));

if (userData.status != true) {
  window.location.href = "./index.html";
}
function getName() {
  var currentUser = usersList.find((user) => user.email === userData.email);
  return currentUser["name"];
}

function setName() {
  spanContent.innerHTML = getName();
}

setName();

// events
logoutBtn.addEventListener("click", function () {
  userData.status = false;
  localStorage.setItem("isLogged", JSON.stringify(userData));
  window.location.href = "./index.html";
});
