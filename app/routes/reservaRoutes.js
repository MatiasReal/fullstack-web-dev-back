
const express = require('express');
const reservaController = require('../controllers/reservaController');
const productoController = require('../controllers/productosController');
const router = express.Router();

// POST   /api/reserva
router.post('/', reservaController.createReserva, productoController.updateEstadoUso);
router.put('/:id',reservaController.updateReserva);
router.delete('/:id/cancel',reservaController.cancelReserva);

module.exports = router;
