const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
let cartItemList = [];

function attachCardClickEvent() {
  const bread = $('.bread');
  bread.addEventListener('click', addCartListItem);
}

function attachCancelClickEvent() {
  const cancelButton = $('.cart__button--cancel');
  cancelButton.addEventListener('click', resetCart);
}

function attachOrderClickEvent() {
  const orderButton = $('.cart__button--order');
  orderButton.addEventListener('click', clickOrderButton);
}

function clickedItem(e) {
  const clickedList = e.currentTarget.parentNode;
  clickedList.remove();

  const removeItem = clickedList.querySelector('.cart__item-name').innerHTML;
  cartItemList = cartItemList.filter((bread) => bread !== removeItem);
}

function plusItemNum(breadName) {
  const cartList = $('.cart__list');
  const alreadyCartItem = cartList.querySelector(`#${breadName}`);
  const inputValue = +alreadyCartItem.querySelector('.cart__item-input').value + 1;
  alreadyCartItem.querySelector('.cart__item-input').value = '' + inputValue;
}

function calculatePriceToNumber(price) {
  const removedComma = price.slice(0, -1).replace(/\D/g, '');
  return +removedComma;
}

function makeCartItem(breadName, breadPrice) {
  const cartItem = document.createElement('li');
  cartItem.className = 'cart__item';
  cartItem.id = `${breadName}`;

  cartItem.innerHTML = `<h4 class="cart__item-name">${breadName}</h4>
    <input class="cart__item-input" value="1" min="1" type="number" />
    <h4 class="cart__item-price">${breadPrice}</h4>
    <button class="cart__item-button">X</button>`;

  const cartItemButton = cartItem.querySelector('.cart__item-button');
  cartItemButton.addEventListener('click', function (e) {
    clickedItem(e);
    calculateCartTotalPrice();
  });

  const cartItemInput = cartItem.querySelector('.cart__item-input');
  cartItemInput.addEventListener('change', calculateCartTotalPrice);

  return cartItem;
}

function calculateCartTotalPrice(e) {
  const cartList = $$('.cart__item');
  let totalPrice = 0;
  cartList.forEach(
    (item) => (totalPrice += +item.querySelector('.cart__item-input').value * calculatePriceToNumber(item.querySelector('.cart__item-price').innerHTML))
  );
  $('.cart__total-price > h3').innerHTML = `${totalPrice.toLocaleString()}???`;
}

function clickOrderButton(e) {
  const cartItemList = $('.cart__list');

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
}

function resetCart(e) {
  const cartList = $('.cart__list');
  while (cartList.hasChildNodes()) {
    cartList.removeChild(cartList.firstChild);
  }
  const totalPrice = $('.cart__total-price > h3');
  totalPrice.innerHTML = '0???';
  cartItemList = [];
}

function addCartListItem(e) {
  let el = e.target;
  if (el.classList.contains('bread')) return;
  while (!el.classList.contains('bread__card')) {
    el = el.parentNode;
  }

  $('.cart').classList.add('shake');
  setTimeout(function () {
    $('.cart').classList.remove('shake');
  }, 1000);

  const breadName = el.querySelector('.bread__name').innerHTML;
  const breadPrice = el.querySelector('.bread__price').innerHTML;

  if (cartItemList.includes(breadName)) {
    plusItemNum(breadName);
  } else {
    cartItemList.push(breadName);
    const cartItem = makeCartItem(breadName, breadPrice);
    $('.cart__list').appendChild(cartItem);
  }
  calculateCartTotalPrice();
}

window.onload = function () {
  attachCardClickEvent();
  attachCancelClickEvent();
  attachOrderClickEvent();
};
