require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bolsaRoutes = require('./routes/bolsaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo_db:27017/bolsas_db';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send({ status: 'ok', api: 'Bolsas de piel CRUD', endpoints: ['/api/bolsas'] });
});

app.use('/api/bolsas', bolsaRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
