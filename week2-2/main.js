const $ = (selector) => document.querySelector(selector);
const cartItemList = [];

function attachCardClickEvent() {
  const breadCards = document.querySelectorAll('.bread__card');
  breadCards.forEach((breadCard) =>
    breadCard.addEventListener('click', function (e) {
      addCartListItem(e);
    })
  );
}

function attachCancelButtonClickEvent() {
  const cancelButton = $('.cart__button--cancel');
  cancelButton.addEventListener('click', function (e) {
    const cartList = $('.cart__list');
    while (cartList.hasChildNodes()) {
      cartList.removeChild(cartList.firstChild);
    }
    const totalPrice = $('.cart__total-price > h3');
    totalPrice.innerHTML = '0원';
  });
}

function attachOrderButtonClickEvent() {
  const orderButton = $('.cart__button--order');
  const cartItemList = document.querySelector('.cart__list');
  orderButton.addEventListener('click', function (e) {
    if (!cartItemList.hasChildNodes()) return;

    const modal = $('.modal');
    modal.classList.remove('hide');

    const yesButton = $('.modal__button--yes');
    yesButton.addEventListener('click', function (e) {
      location.href = 'complete.html';
    });

    const noButton = $('.modal__button--no');
    noButton.addEventListener('click', function (e) {
      modal.classList.add('hide');
    });
  });
}

function removeListItem(e) {
  const clickedList = e.currentTarget.parentNode;
  clickedList.remove();
}

function checkItemInCart(breadName) {
  return cartItemList.includes(breadName);
}

function plusAlreadyItemNum(breadName) {
  const cartList = $('.cart__list');
  const alreadyCartItem = cartList.querySelector(`#${breadName}`);
  const inputValue = +alreadyCartItem.querySelector('.cart__item-input').value + 1;
  alreadyCartItem.querySelector('.cart__item-input').value = '' + inputValue;
}

function calculatePriceToNumber(price) {
  const removedComma = price.slice(0, -1).replace(/\D/g, '');
  return +removedComma;
}

function makeCartListItem(breadName, breadPrice) {
  const cartItem = document.createElement('li');
  cartItem.className = 'cart__item';
  cartItem.id = `${breadName}`;

  cartItem.innerHTML = `<h4 class="cart__item-name">${breadName}</h4>
    <input class="cart__item-input" value="1" type="number" />
    <h4 class="cart__item-price">${breadPrice}</h4>
    <button class="cart__item-button">X</button>`;

  const cartItemButton = cartItem.querySelector('.cart__item-button');
  cartItemButton.addEventListener('click', function (e) {
    removeListItem(e);
    changeCartTotalPrice();
  });

  const cartItemInput = cartItem.querySelector('.cart__item-input');
  cartItemInput.addEventListener('change', function (e) {
    changeCartTotalPrice();
  });

  return cartItem;
}

function changeCartTotalPrice() {
  const cartList = document.querySelectorAll('.cart__item');
  let totalPrice = 0;
  cartList.forEach(
    (item) => (totalPrice += +item.querySelector('.cart__item-input').value * calculatePriceToNumber(item.querySelector('.cart__item-price').innerHTML))
  );
  const cartTotalPrice = $('.cart__total-price > h3');
  cartTotalPrice.innerHTML = `${totalPrice.toLocaleString()}원`;
}

function addCartListItem(e) {
  const breadCard = e.currentTarget;
  const breadName = breadCard.querySelector('.bread__name').innerHTML;
  const breadPrice = breadCard.querySelector('.bread__price').innerHTML;

  if (checkItemInCart(breadName)) {
    plusAlreadyItemNum(breadName);
    changeCartTotalPrice();
    return;
  } else {
    cartItemList.push(breadName);
  }

  const cartItem = makeCartListItem(breadName, breadPrice);
  const cartList = $('.cart__list');
  cartList.appendChild(cartItem);
  changeCartTotalPrice();
}

window.onload = function () {
  attachCardClickEvent();
  attachCancelButtonClickEvent();
  attachOrderButtonClickEvent();
};
