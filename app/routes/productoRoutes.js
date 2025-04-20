// routes/productoRoutes.js
const express = require('express');
const Product = require('../models/productos');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Mostrar en consola el contenido recibido por el body para depuración.
    console.log("req.body:", req.body);

    // Extraemos los campos. Si no se envía "tipo", asignamos un valor por defecto.
    let { tipo, nombre, precioPorTurno, requiresCasco, requiresChaleco, maxPersonas } = req.body;
    
    // Si el campo 'tipo' no viene definido, lo asignamos por defecto a "JETSKY"
    if (!tipo) {
      tipo = "JETSKY";
    }
    
    // Verificamos que 'tipo' sea uno de los valores permitidos.
    const allowedTypes = ['JETSKY', 'CUATRICICLO', 'BUCEO', 'SURF'];
    if (!allowedTypes.includes(tipo)) {
      return res.status(400).json({ error: `'tipo' debe ser uno de los siguientes valores: ${allowedTypes.join(', ')}` });
    }
    
    // Creamos el producto usando todos los campos.
    const newProduct = await Product.create({
      tipo,
      nombre,
      precioPorTurno,
      requiresCasco,
      requiresChaleco,
      maxPersonas
    });
    
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error al crear el producto:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
