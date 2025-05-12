const { DataTypes } = require("sequelize");
const db = require("../database/database");

const Movie = db.define('movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overview: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster_path: {
    type: DataTypes.STRING,
  },
  backdrop_path: {
    type: DataTypes.STRING,
  },
  release_date: {
    type: DataTypes.INTEGER,
  },
  vote_average: {  // Corrigido para 'vote_average' com tipo correto
    type: DataTypes.FLOAT,  // Usando FLOAT ao invés de NUMBER
  },
  genres: {
    type: DataTypes.STRING,  // Corrigido para DataTypes.STRING
  },
  imdb_id: {
    type: DataTypes.INTEGER,  // Usando INTEGER ao invés de NUMBER
  },
  trailer_url: {
    type: DataTypes.STRING,
  } 
  
}, {
  tableName: 'movies',
  timestamps: true,
});

module.exports = Movie;
