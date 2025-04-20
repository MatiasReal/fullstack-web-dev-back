const mongoose = require('mongoose');

// URI CORREGIDA (ejemplo con contraseña codificada)
const uri = "mongodb+srv://matimaxpower:cuervo1011@cluster0.yp07r.mongodb.net/FsBackEnd?retryWrites=true&w=majority";

const clientOptions = {
    serverApi: { 
        version: '1', 
        strict: true, 
        deprecationErrors: true 
    }
};

async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("✅ Conexión exitosa a MongoDB Atlas");

        // Mantener conexión activa
        mongoose.connection.on('connected', () => {
            console.log('🔄 Conexión activa');
        });

    } catch (error) {
        console.error('⛔ Error crítico:', error.message);
        process.exit(1);
    }
}

connectDB();