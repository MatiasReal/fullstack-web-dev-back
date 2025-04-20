const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cliente: { type: String, required: true }, 
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],
  tiempoInicio: { type: Date, required: true },
  turnos: { type: Number, min: 1, max: 3, required: true }, // Turnos consecutivos (1-3)
  precioTotal: { type: Number, required: true },
  moneda: { type: String, enum: ['USD', 'ARS'], required: true },
  metodoDePago: { type: String, enum: ['EFECTIVO', 'TARJETA'], required: true },
  estado: { type: String, enum: ['PENDIENTE', 'CONFIRMADO', 'CANCELADO'], default: 'PENDIENTE' },
  seguroTormenta: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);