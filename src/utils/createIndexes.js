const mongoose = require('mongoose');
const Bolsa = require('../models/Bolsa');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo_db:27017/bolsas_db';

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // Índice de texto para búsqueda por nombre y descripción
    await Bolsa.collection.createIndex({ nombre: 'text', descripcion: 'text' });
    // Índice único en sku (ya está en el esquema, esto asegura en colección)
    await Bolsa.collection.createIndex({ sku: 1 }, { unique: true });
    console.log('Índices creados correctamente.');
  } catch (e) {
    console.error('Error creando índices:', e.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
