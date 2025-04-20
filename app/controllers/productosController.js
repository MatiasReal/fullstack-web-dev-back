const express = require('express');
const Product = require('../models/productos');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Extraemos todos los campos, incluido 'tipo'
    const { tipo, nombre, precioPorTurno, requiresCasco, requiresChaleco, maxPersonas } = req.body;
    

    const allowedTypes = ['JETSKY', 'CUATRICICLO', 'BUCEO', 'SURF'];
    if (!allowedTypes.includes(tipo)) {
      return res.status(400).json({ error: `'tipo' debe ser uno de los valores: ${allowedTypes.join(', ')}` });
    }
    
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
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;