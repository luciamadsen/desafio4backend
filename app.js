
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes'); 
const ProductManager = require('./productManager'); 

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const productManager = new ProductManager();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('addProduct', (product) => {
    productManager.addProduct(product);
    io.emit('updateProducts', { products: productManager.getProducts() });
  });

  socket.on('deleteProduct', (productId) => {
    productManager.deleteProduct(productId);
    io.emit('updateProducts', { products: productManager.getProducts() });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
