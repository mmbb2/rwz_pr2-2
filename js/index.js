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
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

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

  function createCardReustarants() {
    const card = `
        <a class="card card-restaurant wow animate__animated animate__fadeInUp" data-wow-delay="0">
            <img src="img/pizza-plus.png" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">
                        Пицца плюс
                    </h3>
                    <span class="card-tag tag">
                        50 мин
                    </span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        <img src="img/star.svg" alt="star" class="rating-star">
                        4.5
                    </div>
                    <div class="price">
                        От 900 ₽
                    </div>
                    <div class="category">
                        Пицца
                    </div>
                </div>
            </div>
    </a>
    `
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card wow fadeInUp';
    card.setAttribute('data-wow-delay', 0);
    card.insertAdjacentHTML('beforeend', `

    <img src="img/image.png" alt="image" class="card-image">
    <div class="card-text">
        <div class="card-heading">
            <h3 class="card-title card-title-regular">
                Ролл угорь стандарт
            </h3>
        </div>
        <div class="card-info">
            <div class="ingredients">
                Рис, угорь, соус унаги, кунжут, водоросли нори.
            </div>
        </div>
        <div class="card-buttons">
            <button class="button button-primary">
                <span class="button-card-text">
                    В корзину
                </span>
                <img src="img/shopping2.svg" alt="shopping-cart" class="button-card-image">
            </button>
            <strong class="card-price-bold">250 ₽</strong>
        </div>
    </div>
    `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    if(login){
        const target = event.target;
    
        const restourant = target.closest('.card-restaurant');
    
        cardsMenu.textContent = '';
        
        if (restourant) {
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
    
            createCardGood();
            createCardGood();
            createCardGood();
            createCardGood();
        }
    }
    else {
      ToggleModalAuth();
    }
}

function closeGoods() {
    containerPromo.classList.remove('hidden');
    restaurants.classList.remove('hidden');
    menu.classList.add('hidden');
}

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function() {
    closeGoods();
})

  checkAuth();

  createCardReustarants();
createCardReustarants();
createCardReustarants();
createCardReustarants();


new WOW().init();
