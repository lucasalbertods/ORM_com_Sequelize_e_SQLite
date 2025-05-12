// database.js
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite' // Nome do arquivo do banco
});

module.exports = db;