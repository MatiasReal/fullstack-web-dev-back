const express = require('express');
const Product = require('../models/productos');

async function createProducto(req, res) {
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
      maxPersonas,
      estadoUso: 'DISPONIBLE' // Valor por defecto
    });
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

async function updateEstadoUso(req, res, next) {
  try {
    const { id } = req.params;
    const { tipo, nombre, precioPorTurno, requiresCasco, requiresChaleco, maxPersonas,estadoUso } = req.body;

    const allowedTypes = ['JETSKY', 'CUATRICICLO', 'BUCEO', 'SURF'];
    if (!allowedTypes.includes(tipo)) {
      return res.status(400).json({ error: `'tipo' debe ser uno de los valores: ${allowedTypes.join(', ')}` });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      tipo,
      nombre,
      precioPorTurno,
      requiresCasco,
      requiresChaleco,
      maxPersonas,
      estadoUso: 'RESERVADO' 
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  updateEstadoUso,
  createProducto
};