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

function calculatePriceToNumber(price) {
  const removedComma = price.slice(0, -1).replace(/\D/g, '');
  return +removedComma;
}

function removeListItem(e) {
  const clickedList = e.currentTarget.parentNode;
  clickedList.remove();
}

function checkItemInCart(breadName) {
  return cartItemList.includes(breadName);
}

function plusAlreayItemNum(breadName) {
  const cartList = $('.cart__list');
  const alreadyCartItem = cartList.querySelector(`#${breadName}`);
  const inputValue = +alreadyCartItem.querySelector('.cart__item-input').value + 1;
  alreadyCartItem.querySelector('.cart__item-input').value = '' + inputValue;
}

function makeCartListItem(breadName, breadPrice) {
  const cartItem = document.createElement('li');
  cartItem.className = 'cart__item';
  cartItem.id = `${breadName}`;

  cartItem.innerHTML = `<h4 class="cart__item-name">${breadName}</h4>
    <input class="cart__item-input" value="1" type="number" />
    <h4 class="cart__item-price">${calculatePriceToNumber(breadPrice).toLocaleString()}원</h4>
    <button class="cart__item-button">X</button>`;

  const cartItemButton = cartItem.querySelector('.cart__item-button');
  cartItemButton.addEventListener('click', function (e) {
    removeListItem(e);
  });
  return cartItem;
}

function addCartListItem(e) {
  const breadCard = e.currentTarget;
  const breadName = breadCard.querySelector('.bread__name').innerHTML;
  const breadPrice = breadCard.querySelector('.bread__price').innerHTML;

  if (checkItemInCart(breadName)) {
    plusAlreayItemNum(breadName);
    return;
  } else {
    cartItemList.push(breadName);
  }

  const cartItem = makeCartListItem(breadName, breadPrice);
  const cartList = $('.cart__list');
  cartList.appendChild(cartItem);
}

window.onload = function () {
  attachCardClickEvent();
};
