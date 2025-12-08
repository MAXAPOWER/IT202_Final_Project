$(document).ready(function() {
  processCheckout();
});

function processCheckout() {
  $.ajax({
    url: '/api/cart',
    type: 'GET',
    success: function(response) {
      if (response.cart.length === 0) {
        window.location.href = 'index.html';
        return;
      }

      $.ajax({
        url: '/api/checkout',
        type: 'POST',
        contentType: 'application/json',
        success: function(orderResponse) {
          displayOrderSummary(orderResponse.order);
        },
        error: function(error) {
          alert('Error processing checkout');
          window.location.href = 'cart.html';
        }
      });
    }
  });
}

function displayOrderSummary(order) {
  var orderItemsDiv = $('#order-items');
  orderItemsDiv.empty();

  for (var i = 0; i < order.items.length; i++) {
    var item = order.items[i];
    var subtotal = item.price * item.quantity;

    var row = '<tr>' +
      '<td>' +
        '<div class="d-flex align-items-center">' +
          '<img src="' + item.image + '" alt="' + item.name + '" style="width: 50px; height: 50px; object-fit: contain;" class="me-2">' +
          '<span>' + item.name + '</span>' +
        '</div>' +
      '</td>' +
      '<td>$' + item.price.toFixed(2) + '</td>' +
      '<td>' + item.quantity + '</td>' +
      '<td>$' + subtotal.toFixed(2) + '</td>' +
    '</tr>';

    orderItemsDiv.append(row);
  }

  $('#order-total').text(order.total.toFixed(2));
}
