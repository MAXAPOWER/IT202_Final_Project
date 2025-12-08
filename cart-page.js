$(document).ready(function() {
  loadCart();
});

function loadCart() {
  $.ajax({
    url: '/api/cart',
    type: 'GET',
    success: function(response) {
      displayCart(response.cart, response.total, response.itemCount);
      updateCartBadge(response.itemCount);
    }
  });
}

function updateCartBadge(count) {
  var badge = $('#cart-badge');
  if (count > 0) {
    badge.text(count);
    badge.show();
  } else {
    badge.hide();
  }
}

function displayCart(cart, total, itemCount) {
  var cartItemsDiv = $('#cart-items');
  var emptyMessage = $('#empty-cart-message');
  var cartContent = $('#cart-content');

  if (cart.length === 0) {
    emptyMessage.show();
    cartContent.hide();
    return;
  }

  emptyMessage.hide();
  cartContent.show();
  cartItemsDiv.empty();

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var subtotal = item.price * item.quantity;

    var row = '<tr>' +
      '<td>' +
        '<div class="d-flex align-items-center">' +
          '<img src="' + item.image + '" alt="' + item.name + '" style="width: 60px; height: 60px; object-fit: contain;" class="me-3">' +
          '<span>' + item.name + '</span>' +
        '</div>' +
      '</td>' +
      '<td>$' + item.price.toFixed(2) + '</td>' +
      '<td>' +
        '<div class="d-flex align-items-center gap-2">' +
          '<button class="btn btn-sm btn-outline-secondary minus-btn" data-name="' + item.name + '" data-qty="' + item.quantity + '">-</button>' +
          '<span class="mx-2">' + item.quantity + '</span>' +
          '<button class="btn btn-sm btn-outline-secondary plus-btn" data-name="' + item.name + '" data-qty="' + item.quantity + '">+</button>' +
        '</div>' +
      '</td>' +
      '<td>$' + subtotal.toFixed(2) + '</td>' +
    '</tr>';

    cartItemsDiv.append(row);
  }

  $('#total-items').text(itemCount);
  $('#total').text(total.toFixed(2));

  $('.minus-btn').click(function() {
    var name = $(this).data('name');
    var qty = $(this).data('qty');
    updateQuantity(name, qty - 1);
  });

  $('.plus-btn').click(function() {
    var name = $(this).data('name');
    var qty = $(this).data('qty');
    updateQuantity(name, qty + 1);
  });
}

function updateQuantity(name, quantity) {
  $.ajax({
    url: '/api/cart/update',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      name: name,
      quantity: quantity
    }),
    success: function(response) {
      loadCart();
    }
  });
}
