
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { products: productManager.getProducts() });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: productManager.getProducts() });
});

module.exports = router;

