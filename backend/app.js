const express = require('express');
const cors = require('cors');
const db = require('./database/database');
const User = require('./models/User');
const Movie = require('./models/Movie');
const authRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Associações
User.hasMany(Movie, { foreignKey: 'userId', as: 'movies' });
Movie.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Conexão DB
db.sync()
  .then(() => console.log('Banco conectado!'))
  .catch((err) => console.error('Erro ao conectar:', err));

// Rotas
app.use(authRoutes);
app.use(movieRoutes);

module.exports = app;
