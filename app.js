const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home', { products: [] });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: [] });
});


io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('addProduct', (product) => {
    // agregar producto
    io.emit('updateProducts', { products: [] });
  });

  socket.on('deleteProduct', (productId) => {
    // eliminar producto
    io.emit('updateProducts', { products: [] });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
