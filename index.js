const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static(__dirname));

let cart = [];

app.get('/api/cart', function(req, res) {
  let total = 0;
  let itemCount = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
    itemCount = itemCount + cart[i].quantity;
  }

  res.json({
    cart: cart,
    total: total,
    itemCount: itemCount
  });
});

app.post('/api/cart/add', function(req, res) {
  let name = req.body.name;
  let price = req.body.price;
  let image = req.body.image;

  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  res.json({ message: name + ' added to cart', cart: cart });
});

app.post('/api/cart/update', function(req, res) {
  let name = req.body.name;
  let quantity = req.body.quantity;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      if (quantity <= 0) {
        cart.splice(i, 1);
      } else {
        cart[i].quantity = quantity;
      }
      break;
    }
  }

  res.json({ message: 'Cart updated', cart: cart });
});

app.post('/api/checkout', function(req, res) {
  if (cart.length === 0) {
    res.status(400).json({ error: 'Cart is empty' });
    return;
  }

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity);
  }

  let order = {
    items: cart.slice(),
    total: total,
    date: new Date().toISOString()
  };

  cart = [];

  res.json({
    message: 'Order placed successfully',
    order: order
  });
});

app.listen(port, function() {
  console.log('server running at http://localhost:' + port);
});
