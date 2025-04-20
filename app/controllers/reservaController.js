const reserva = require('../models/reserva');
const Product = require('../models/productos');

async function createReserva(req, res) {
  try {
    const { cliente, productos, tiempoInicio, turnos, moneda, metodoDePago, seguroTormenta } = req.body;

    // Validar campos obligatorios
    if (!cliente||!productos || !tiempoInicio || !turnos || !moneda || !metodoDePago) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Validar anticipación máxima (48h)
    const maxBookingTime = new Date(tiempoInicio).getTime();
    const minBookingTime = Date.now() + (48 * 60 * 60 * 1000); // 48 horas desde ahora
    if (maxBookingTime < minBookingTime) {
      return res.status(400).json({ error: "La reserva debe hacerse con al menos 48h de anticipación" });
    }

    // Calcular precio total
    const productList = await Product.find({ _id: { $in: productos } });
    let subtotal = productList.reduce((acc, product) => acc + product.precioPorTurno, 0) * turnos;

    // Aplicar descuento del 10% por múltiples productos
    if (productList.length > 1) subtotal *= 0.9;

    // Agregar seguro de tormenta (50% del subtotal)
    const total = seguroTormenta ? subtotal * 1.5 : subtotal;

    // Crear reserva
    const newReserva = await reserva.create({
      cliente,
      productos,
      tiempoInicio,
      turnos,
      precioTotal: total,
      moneda,
      metodoDePago,
      seguroTormenta
    });

    res.status(201).json(newReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateReserva(req, res) {
  try {
    const { id } = req.params;
    const {
      productos,
      tiempoInicio,
      turnos,
      moneda,
      metodoDePago,
      seguroTormenta
    } = req.body;

    // validaciones mínimas
    if (!productos || !tiempoInicio || !turnos || !moneda || !metodoDePago) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Recalcula el precioTotal (igual que en createReserva)
    const productList = await Product.find({ _id: { $in: productos } });
    let subtotal = productList.reduce((acc, p) => acc + p.precioPorTurno, 0) * turnos;
    if (productList.length > 1) subtotal *= 0.9;
    const total = seguroTormenta ? subtotal * 1.5 : subtotal;

    // Ejecuta el update
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      id,
      { productos, tiempoInicio, turnos, moneda, metodoDePago, seguroTormenta, precioTotal: total },
      { new: true, runValidators: true }
    );

    if (!reservaActualizada) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json(reservaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Función para cancelar una reserva
async function cancelReserva(req, res) {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    // (Opcional) aquí podrías chequear la lógica de “hasta 2h antes”
    reserva.estado = 'CANCELADO';
    await reserva.save();
    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createReserva,
  updateReserva,
  cancelReserva
};
