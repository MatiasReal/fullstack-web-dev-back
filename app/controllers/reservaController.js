const Reserva = require('../models/reserva');
const Product = require('../models/productos');


//Función para crear una reserva
async function createReserva(req, res, next) {
  try {
    const { cliente, productos, tiempoInicio, turnos, moneda, metodoDePago, seguroTormenta } = req.body;
    
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


    // Verificar si alguno ya está reservado
    const productoReservado = productList.find(p => p.estadoUso === 'RESERVADO');
    if (productoReservado) {
      return res.status(400).json({ error: `El producto ${productoReservado.nombre} ya está reservado.` });
    }

    // Aplicar descuento del 10% por múltiples productos
    if (productList.length > 1) subtotal *= 0.9;

    // Agregar seguro de tormenta (50% del subtotal)
    const total = seguroTormenta ? subtotal * 1.5 : subtotal;

    // Crear reserva
    const newReserva = await Reserva.create({
      cliente,
      productos,
      tiempoInicio,
      turnos,
      precioTotal: total,
      moneda,
      metodoDePago,
      seguroTormenta
    });

    next(); 
    

    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Función para actualizar una reserva
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

    if (!productos || !tiempoInicio || !turnos || !moneda || !metodoDePago) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const productList = await Product.find({ _id: { $in: productos } });
    let subtotal = productList.reduce((acc, p) => acc + p.precioPorTurno, 0) * turnos;
    if (productList.length > 1) subtotal *= 0.9;
    const total = seguroTormenta ? subtotal * 1.5 : subtotal;

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

    const ahora = Date.now();
    const tiempoInicio = new Date(reserva.tiempoInicio).getTime();
    const tiempoPosibleCancelacion = tiempoInicio - (2 * 60 * 60 * 1000); 

    if (ahora > tiempoPosibleCancelacion) {
      return res.status(400).json({ error: "No se puede cancelar la reserva con menos de 2 horas de anticipación" });

    }else{
      reserva.estado = 'CANCELADO';
      await reserva.save();

      await Product.updateMany(
        { _id: { $in: reserva.productos } },
        { estadoUso: 'DISPONIBLE' }
      );
      res.json(reserva);
    }
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
