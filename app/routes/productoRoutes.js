// routes/productoRoutes.js
const express = require('express');
const product = require('../controllers/productosController');
const router = express.Router();



router.post('/', product.createProducto);

module.exports = router;
