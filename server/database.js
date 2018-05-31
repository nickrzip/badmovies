const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  connection.query(`SELECT * from favorites`, callback);
};

const saveFavorite = function(movie, callback) {
  connection.query(`INSERT INTO favorites 
  (movieId, movieTitle, releaseDate, voteAverage, imageLink) values
  (${movie.id}, "${movie.title}", ${movie.release_date}, ${movie.vote_average}, "${movie.poster_path}")`, callback);
};

const deleteFavorites = function(movieId, callback) {
  console.log('deleting stuff');
  connection.query(`DELETE FROM favorites where movieId = ${movieId}`)
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};