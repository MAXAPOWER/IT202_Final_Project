let cart = [];
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function calculateTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
  }
  return total;
}

function getTotalItems() {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}

function updateQuantity(productName, newQuantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === productName) {
      if (newQuantity <= 0) {
        removeItem(productName);
      } else {
        cart[i].quantity = newQuantity;
      }
      break;
    }
  }
  saveCart();
  displayCart();
}

function removeItem(productName) {
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name !== productName) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  saveCart();
  displayCart();
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCart();
    displayCart();
  }
}

function displayCart() {
  let cartItemsDiv = document.getElementById('cart-items');
  let emptyMessage = document.getElementById('empty-cart-message');
  let cartContent = document.getElementById('cart-content');

  if (cart.length === 0) {
    emptyMessage.style.display = 'block';
    cartContent.style.display = 'none';
    return;
  }

  emptyMessage.style.display = 'none';
  cartContent.style.display = 'block';

  cartItemsDiv.textContent = '';

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let subtotal = item.price * item.quantity;

    let row = document.createElement('tr');

    let productCell = document.createElement('td');
    let productDiv = document.createElement('div');
    productDiv.className = 'd-flex align-items-center';

    let img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.style.width = '60px';
    img.style.height = '60px';
    img.style.objectFit = 'contain';
    img.className = 'me-3';

    let nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;

    productDiv.appendChild(img);
    productDiv.appendChild(nameSpan);
    productCell.appendChild(productDiv);

    let priceCell = document.createElement('td');
    priceCell.textContent = '$' + item.price.toFixed(2);

    let quantityCell = document.createElement('td');
    let quantityDiv = document.createElement('div');
    quantityDiv.className = 'd-flex align-items-center gap-2';

    let minusBtn = document.createElement('button');
    minusBtn.className = 'btn btn-sm btn-outline-secondary';
    minusBtn.textContent = '-';
    minusBtn.onclick = function() {
      updateQuantity(item.name, item.quantity - 1);
    };

    let quantitySpan = document.createElement('span');
    quantitySpan.className = 'mx-2';
    quantitySpan.textContent = item.quantity;

    let plusBtn = document.createElement('button');
    plusBtn.className = 'btn btn-sm btn-outline-secondary';
    plusBtn.textContent = '+';
    plusBtn.onclick = function() {
      updateQuantity(item.name, item.quantity + 1);
    };

    quantityDiv.appendChild(minusBtn);
    quantityDiv.appendChild(quantitySpan);
    quantityDiv.appendChild(plusBtn);
    quantityCell.appendChild(quantityDiv);

    let subtotalCell = document.createElement('td');
    subtotalCell.textContent = '$' + subtotal.toFixed(2);

    let actionCell = document.createElement('td');
    let removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-danger';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
      removeItem(item.name);
    };
    actionCell.appendChild(removeBtn);

    row.appendChild(productCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(subtotalCell);
    row.appendChild(actionCell);

    cartItemsDiv.appendChild(row);
  }

  document.getElementById('total-items').textContent = getTotalItems();
  document.getElementById('total').textContent = calculateTotal().toFixed(2);
}

document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

displayCart();
