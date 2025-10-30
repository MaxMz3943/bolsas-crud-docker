require('dotenv').config();
const mongoose = require('mongoose');
const Bolsa = require('../src/models/Bolsa');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo_db:27017/bolsas_db';

const data = [
  {
    sku: "BOL-CLAS-001",
    nombre: "Bolsa Clásica de Piel",
    descripcion: "Bolsa tote de piel vacuna con costuras reforzadas",
    categoria: "tote",
    precio: 1899,
    variantes: [
      { color: "Negro", acabado: "Mate", stock: 5 },
      { color: "Café", acabado: "Brillante", stock: 3 }
    ]
  },
  {
    sku: "BOL-CRSB-002",
    nombre: "Bolsa Crossbody Minimal",
    descripcion: "Bandolera ligera para uso diario",
    categoria: "crossbody",
    precio: 1299,
    variantes: [
      { color: "Miel", acabado: "Mate", stock: 4 }
    ]
  }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Bolsa.deleteMany({}); // limpiar
    await Bolsa.insertMany(data);
    console.log('✅ Seed insertado:', data.length, 'documentos.');
  } catch (e) {
    console.error('❌ Error en seed:', e.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
