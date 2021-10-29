const cardButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem("login");


cardButton.addEventListener('click', function(e) {
    modal.classList.add('is-open');
})

close.addEventListener('click', function(e) {
    modal.classList.remove('is-open');
})


function ToggleModalAuth() {
    modalAuth.classList.toggle('is-open');

    if (modalAuth.classList.contains('is-open')) {
        console.log('открыто')
        disabledScroll();
      } else {
        console.log('закрытр')
        enabledScroll();
      }
}


console.log(modalAuth)

function notAuthorized() {
    console.log("Не авторизован");

    function logIn(event) {
        event.preventDefault();
        console.log("логин");
        login = loginInput.value;

        if (login.trim()) {
            localStorage.setItem("login", login);
            ToggleModalAuth();
          } else {
            loginInput.style.borderColor = "#ff0000";
          }
        
        buttonAuth.removeEventListener('click', ToggleModalAuth)
        closeAuth.removeEventListener('click', ToggleModalAuth)
        logInForm.removeEventListener("submit", logIn);
    logInForm.reset();
        checkAuth();
    }

    buttonAuth.addEventListener('click', ToggleModalAuth)
    closeAuth.addEventListener('click', ToggleModalAuth)
    logInForm.addEventListener("submit", logIn);

    modalAuth.addEventListener("click", function (event) {
        if (event.target.classList.contains('is-open')) {
          ToggleModalAuth();
        }
      })
  }
  
  function authorized() {

    function logOut() {
        login = '';
        localStorage.removeItem("login");
        buttonAuth.style.display = "flex";
        userName.style.display = "none";
        buttonOut.style.display = "none";
        buttonOut.removeEventListener('click', logOut)
        checkAuth();
      }

    loginInput.style.borderColor = "#000000";
    console.log("Авторизован");
    userName.textContent = login;
    buttonAuth.style.display = "none";
    userName.style.display = "inline";
    buttonOut.style.display = "flex";

    buttonOut.addEventListener('click', logOut)
  }

  function checkAuth() {
    if (login) {
      authorized();
    } else {
      notAuthorized();
    }
  }

  checkAuth();

new WOW().init();
