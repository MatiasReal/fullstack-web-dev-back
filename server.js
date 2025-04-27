const express = require("express");
const cors = require("cors");
const db = require('./app/config/database');    // Conexión DB
const http = require('http');
const app = require('./app/config/app');
const PORT = process.env.PORT || 5000;


http
  .createServer(app)
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.use(cors());
app.use(express.json());

// Importar rutas
const productoRoutes = require('./app/routes/productoRoutes');
const reservaRoutes  = require('./app/routes/reservaRoutes');

// Montar routers bajo /api
app.use('/api/productos', productoRoutes);
app.use('/api/reserva',   reservaRoutes);

// Handler global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

module.exports = app;