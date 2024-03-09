const express = require('express');
const router = express.Router();
const productManager = require('./productManager'); // Ajusta la ruta según tu estructura de archivos

router.get('/', (req, res) => {
  res.render('home', { products: productManager.getProducts() });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: productManager.getProducts() });
});

module.exports = router;
