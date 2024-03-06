// app.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  res.render('home', { products: [] });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: [] });
});

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Escucha eventos desde el cliente
  socket.on('addProduct', (product) => {
    // Lógica para agregar el producto
    io.emit('updateProducts', { products: [] });
  });

  socket.on('deleteProduct', (productId) => {
    // Lógica para eliminar el producto
    io.emit('updateProducts', { products: [] });
  });

  // Manejo de desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
