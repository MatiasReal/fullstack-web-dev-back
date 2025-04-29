module.exports = function validarConsecutivos(req, res, next) {
    try {
      const { tiempoInicio, numTurnos } = req.body;
      const DURACION_TURNO = 30;               // minutos
      const turnMs = DURACION_TURNO * 60_000;  // ms
  
      // 1) parseo hora
      const [h, m] = tiempoInicio.split(':').map(Number);
      if ([h, m].some(isNaN)) {
        return res.status(400).json({ error: 'Formato de tiempoInicio debe ser "HH:mm".' });
      }
  
      // 2) rangos
      const start = new Date();
      start.setHours(h, m, 0, 0);
      const end = new Date(start.getTime() + numTurnos * turnMs);
  
      // 3) validaciones
      if (numTurnos > 3) {
        return res.status(400).json({
          error: `Solo pueden reservarse hasta 3 turnos (${DURACION_TURNO} min cada uno).`
        });
      }
      if (start.toDateString() !== end.toDateString()) {
        return res.status(400).json({
          error: 'La reserva no puede cruzar la medianoche en el mismo día.'
        });
      }

      req.body.rango = { start, end };
      next();
    } catch (err) {
      res.status(500).json({ error: 'Error validando los turnos.' });
    }
  };

  //No supe implementarlo hasta el momento.