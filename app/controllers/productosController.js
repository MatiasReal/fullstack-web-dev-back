const express = require('express');
const Product = require('../models/productos');

// Función para crear un nuevo producto
async function createProducto(req, res) {
  try {

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

// Función para actualizar el estado de uso de los productos
async function updateEstadoUso(req, res) {
  try {
    const productos = req.body.productos; 

    if (productos.length === 0) {
      return res.status(400).json({ error: "No se han proporcionado productos" });
    }

    await Product.updateMany(
      { _id: { $in: productos } },
      { estadoUso: 'RESERVADO' }
    );
    res.status(201).json({ message: "Reservado correctamente" });
    console.log("Estado de uso actualizado a 'RESERVADO' para los productos:", productos);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  updateEstadoUso,
  createProducto
};