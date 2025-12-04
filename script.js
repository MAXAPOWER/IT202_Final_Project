let cart = [];

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price, image) {
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    let item = {
      name: name,
      price: price,
      image: image,
      quantity: 1
    };
    cart.push(item);
  }

  saveCart();
  alert(name + ' added to cart!');
  console.log('Cart:', cart);
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
  }
  return total;
}

function getItemCount() {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}

let buttons = document.querySelectorAll('.add-to-cart');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    let name = this.getAttribute('data-name');
    let price = parseFloat(this.getAttribute('data-price'));
    let image = this.getAttribute('data-image');

    addToCart(name, price, image);
  });
}

console.log('Items in cart:', getItemCount());
console.log('Total price: $' + getTotal().toFixed(2));
