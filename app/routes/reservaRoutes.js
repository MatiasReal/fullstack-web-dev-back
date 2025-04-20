
const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

// POST   /api/reserva
router.post('/', reservaController.createReserva);
router.put('/:id',reservaController.updateReserva);
router.delete('/:id/cancel',reservaController.cancelReserva);

module.exports = router;
