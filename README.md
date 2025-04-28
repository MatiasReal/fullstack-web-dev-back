# Sistema de Gestión de Alquiler de Productos de Playa

## Descripción
Este proyecto implementa un sistema de gestión de alquiler de productos de playa para un parador en el Caribe. El sistema permite a los clientes alquilar productos como JetSky, cuatriciclos, equipos de buceo y tablas de surf (para niños y adultos). Además, incluye funcionalidades para gestionar reservas, aplicar descuentos, manejar pagos y garantizar la seguridad de los usuarios.

## Funcionalidades Principales
- **Gestión de productos**: Alquiler de JetSky, cuatriciclos, equipos de buceo y tablas de surf.
- **Requisitos de seguridad**:
  - JetSky y cuatriciclos requieren cascos.
  - JetSky requiere chalecos salvavidas.
  - Máximo de 2 personas por JetSky o cuatriciclo.
- **Duración del alquiler**: Cada turno tiene una duración de 30 minutos. Los clientes pueden reservar hasta 3 turnos consecutivos.
- **Descuentos**: Se aplica un 10% de descuento al total si se contratan múltiples productos.
- **Anticipación de reservas**: Los turnos pueden reservarse con una anticipación máxima de 48 horas.
- **Cancelaciones**: Las reservas pueden cancelarse sin costo hasta 2 horas antes del turno.
- **Pagos**:
  - Métodos de pago: efectivo o tarjeta.
  - Monedas aceptadas: USD y ARS.
  - Los pagos en efectivo deben realizarse al menos 2 horas antes del turno.
- **Seguro de tormenta**: En caso de tormenta imprevista, se devuelve el 50% del valor abonado.

## Estructura del Proyecto
```
fullstack-web-dev/
├── server.js
├── package.json
├── README.md
├── app/
│   ├── config/
│   │   ├── app.js
│   │   ├── database.js
│   ├── controllers/
│   │   ├── productosController.js
│   │   ├── reservaController.js
│   ├── models/
│   │   ├── productos.js
│   │   ├── reserva.js
│   ├── routes/
│   │   ├── productoRoutes.js
│   │   ├── reservaRoutes.js
│   ├── utilities/
│   │   ├── turnos.js
│   ├── views/
```

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd fullstack-web-dev
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso
1. Configura la conexión a la base de datos en `app/config/database.js`.
2. Inicia el servidor:
   ```bash
   npm start
   ```
3. Accede a la API en `http://localhost:5000`.

## Endpoints Principales
### Productos
- **POST /api/productos**: Crear un nuevo producto.

### Reservas
- **POST /api/reserva**: Crear una nueva reserva.
- **PUT /api/reserva/:id**: Actualizar una reserva existente.
- **DELETE /api/reserva/:id/cancel**: Cancelar una reserva.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB (Mongoose ODM)
- **Otros**: Body-parser, CORS
