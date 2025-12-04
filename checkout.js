let cart = [];
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

function calculateTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
  }
  return total;
}

function displayOrderSummary() {
  let orderItemsDiv = document.getElementById('order-items');

  if (cart.length === 0) {
    window.location.href = 'index.html';
    return;
  }

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
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.objectFit = 'contain';
    img.className = 'me-2';

    let nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;

    productDiv.appendChild(img);
    productDiv.appendChild(nameSpan);
    productCell.appendChild(productDiv);

    let priceCell = document.createElement('td');
    priceCell.textContent = '$' + item.price.toFixed(2);

    let quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;

    let subtotalCell = document.createElement('td');
    subtotalCell.textContent = '$' + subtotal.toFixed(2);

    row.appendChild(productCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(subtotalCell);

    orderItemsDiv.appendChild(row);
  }

  document.getElementById('order-total').textContent = calculateTotal().toFixed(2);

  localStorage.removeItem('cart');
}

displayOrderSummary();
