$(document).ready(function() {
  updateCartBadge();

  $('.add-to-cart').click(function() {
    var name = $(this).data('name');
    var price = parseFloat($(this).data('price'));
    var image = $(this).data('image');

    $.ajax({
      url: '/api/cart/add',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        name: name,
        price: price,
        image: image
      }),
      success: function(response) {
        alert(name + ' added to cart!');
        updateCartBadge();
      },
      error: function(error) {
        alert('Error adding item to cart');
      }
    });
  });
});

function updateCartBadge() {
  $.ajax({
    url: '/api/cart',
    type: 'GET',
    success: function(response) {
      var badge = $('#cart-badge');
      if (response.itemCount > 0) {
        badge.text(response.itemCount);
        badge.show();
      } else {
        badge.hide();
      }
    }
  });
}
