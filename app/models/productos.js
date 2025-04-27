const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // "JetSky", "Cuatriciclo", etc.
  tipo: { type: String, enum: ['JETSKY', 'CUATRICICLO', 'BUCEO', 'SURF'], required: true },
  precioPorTurno: { type: Number, required: true }, // Precio por turno de 30min
  requiresCasco: { type: Boolean, default: false },
  requiresChaleco: { type: Boolean, default: false },
  maxPersonas: { type: Number, default: 1 },
  estadoUso: { type: String, enum: ['DISPONIBLE', 'MANTENIMIENTO', 'RESERVADO'], default: 'DISPONIBLE' },
});

module.exports = mongoose.model('productos', productSchema);