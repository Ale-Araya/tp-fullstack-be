const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("conectado a la base de datos")
    } catch (error) {
        throw new Error('No se pudo conectar a la base de datos...')
    }
}

module.exports = dbConnect;