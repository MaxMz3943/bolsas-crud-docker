const express = require('express');
const mongoose = require('mongoose');
const Bolsa = require('../models/Bolsa');
const router = express.Router();

// GET /api/bolsas  -> lista todas
router.get('/', async (req, res) => {
  try {
    const bolsas = await Bolsa.find().sort({ creadoEn: -1 });
    res.json(bolsas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bolsas/search?q=texto  -> búsqueda por índice de texto
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Falta query param q' });
    const docs = await Bolsa.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bolsas  -> crear
router.post('/', async (req, res) => {
  try {
    const { sku, nombre, precio, descripcion, categoria, variantes, activo } = req.body;
    if (!sku || !nombre || typeof precio !== 'number') {
      return res.status(400).json({ error: 'sku, nombre y precio (number) son requeridos' });
    }
    const created = await Bolsa.create({ sku, nombre, precio, descripcion, categoria, variantes, activo });
    res.status(201).json(created);
  } catch (err) {
    // manejar duplicados de unique index sku
    if (err.code === 11000) {
      return res.status(400).json({ error: 'SKU duplicado' });
    }
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/bolsas/:id  -> (bonus) update parcial
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'id inválido' });
    const updated = await Bolsa.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/bolsas/:id  -> eliminar
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'id inválido' });
    const deleted = await Bolsa.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ ok: true, eliminado: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
