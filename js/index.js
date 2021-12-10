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
const menuHeading = document.querySelector(".menu-heading");
const inputSearch = document.querySelector('.input-search');
const pageName = document.querySelector('.page-name');

let login = localStorage.getItem("login");

const getData = async function(url) {
  const response = await fetch(url);

  if (!response.ok) {
      throw new Error(`Ошибка по адерсу ${url}, 
      статус ошибка ${response.status}`);
  }
  return await response.json();
};


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

  function createCardReustarants(restaurant) {
    const { 
      image, kitchen, 
      name, price, stars, 
      products, time_of_delivery: timeOfDelivery} = restaurant 

    const card = `
        <a class="card card-restaurant wow animate__animated animate__fadeInUp" data-wow-delay="0" data-name="${name}" data-stars="${stars}" data-price="${price}" data-products="${products}">
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">
                    ${name}
                    </h3>
                    <span class="card-tag tag">
                    ${timeOfDelivery} мин
                    </span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        <img src="img/star.svg" alt="star" class="rating-star">
                        ${stars}
                    </div>
                    <div class="price">
                    От ${price} ₽
                    </div>
                    <div class="category">
                    ${kitchen} 
                    </div>
                </div>
            </div>
    </a>
    `
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createReustarantInfo({ stars, name, price }) {

  menuHeading.textContent = '';

  menuHeading.insertAdjacentHTML('beforeend', `
          <h2 class="section-title">
          ${name}
      </h2>
      <div class="card-info">
          <div class="rating">
              <img src="img/star.svg" alt="star" class="rating-star">
              ${stars}
          </div>
          <div class="price">
              От ${price} ₽
          </div>
          <div class="category">
              Пицца
          </div>
      </div>
  `);
}

function createCardGood({ description, image, name, price }) {
    const card = document.createElement('div');
    card.className = 'card wow fadeInUp';
    card.setAttribute('data-wow-delay', 0);
    card.insertAdjacentHTML('beforeend', `

    <img src="${image}" alt="image" class="card-image">
    <div class="card-text">
        <div class="card-heading">
            <h3 class="card-title card-title-regular">
            ${name}
            </h3>
        </div>
        <div class="card-info">
            <div class="ingredients">
            ${description}
            </div>
        </div>
        <div class="card-buttons">
            <button class="button button-primary">
                <span class="button-card-text">
                    В корзину
                </span>
                <img src="img/shopping2.svg" alt="shopping-cart" class="button-card-image">
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
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

            createReustarantInfo(restourant.dataset);
    
            getData(`./db/${restourant.dataset.products}`).then(function(data) {
              data.forEach(createCardGood);
          })
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



new WOW().init();

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  loop: true,
  autoplay: true,
  grabCursor: true,
});


function init() {
  getData('./db/partners.json').then(function(data) {
      data.forEach(createCardReustarants)
  });
  
  cardsRestaurants.addEventListener('click', openGoods);
  logo.addEventListener('click', function() {
      closeGoods();
  })
  
  checkAuth();
  
  inputSearch.addEventListener('keypress', function(event) {
    if(event.charCode === 13) {

        pageName.textContent = '';
        const value = event.target.value.trim();
        
        if(!value) {
            event.target.classList.add('invalid-input');
            setTimeout(function() {
                event.target.classList.remove('invalid-input');
            },1500)
            event.target.value = '';
            return;
        }

        getData('/db/partners.json')
          .then(function(data) {
            return data.map(function(partner) {
                return partner.products;
            });
        })
        .then(function(linkProducts) {
            linkProducts.forEach(function(link) {
                cardsMenu.textContent = '';

                getData(`./db/${link}`)
                  .then(function(data) {
                    const resultSearch = data.filter(item => {
                        const name = item.name.toLowerCase();
                        return name.includes(value.toLowerCase());
                    });

                    containerPromo.classList.add('hide');
                    restaurants.classList.add('hide');
                    menu.classList.remove('hide');
                    userName.classList.add('hide');

                    if(resultSearch.length == 0) {
                        if(pageName.textContent) return;
                        pageName.textContent  = 'Ничего не найдено';
                    }
                    else {
                        pageName.textContent = 'Результат поиска';
                        resultSearch.forEach(createCardGood);
                    }
                    pageName.classList.remove('hide');
                })
            })
        })
    }
});

}

init();