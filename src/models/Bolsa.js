const mongoose = require('mongoose');

const varianteSchema = new mongoose.Schema({
  color: { type: String, trim: true },
  acabado: { type: String, trim: true }, // Mate, Brillante, Gamuza, etc.
  stock: { type: Number, default: 0, min: 0 }
}, { _id: false });

const bolsaSchema = new mongoose.Schema({
  sku: { type: String, required: true, trim: true, unique: true },
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true },
  categoria: { type: String, trim: true, enum: ['tote','crossbody','mochila','clutch','bandolera','otra'], default: 'otra' },
  precio: { type: Number, required: true, min: 0 },
  variantes: { type: [varianteSchema], default: [] },
  activo: { type: Boolean, default: true },
  creadoEn: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Bolsa', bolsaSchema);
