var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios');

var config = require('./config.js');
var bodyParser = require('body-parser');
var apiHelpers = require('./apiHelpers.js');
var dbHelpers = require('./database.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    var queryString = 'https://api.themoviedb.org/3/discover/movie?api_key='
    var queryLanguageAndSort = '&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_genres='  
    console.log(queryString + config.API_KEY + queryLanguageAndSort + req.query.genreSearchValue);
    axios.get(queryString + config.API_KEY + queryLanguageAndSort + req.query.genreSearchValue).then((response) => {
        res.status(200).send(response.data.results);
    })
    // https://www.themoviedb.org/account/signup

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
});

app.get('/genres', function(req, res) {
    queryString = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
    queryLanguage = '&language=en-US'
    // console.log(queryString + config.API_KEY + queryLanguage);
    axios.get(queryString + config.API_KEY + queryLanguage).then((response) => {
        res.status(200).send(response.data);
    }).catch((error)=>{
        console.log(error);
    });
});

app.get('/save', function(req, res) {
    dbHelpers.getAllFavorites((err, results) => {
        console.log('we are sending favourites');
        console.log(results);
        res.status(200).send(results);
    }); 
});

app.post('/save', function(req, res) {
    dbHelpers.saveFavorite(req.body.movieToSave[0], (err, results) => {
        if (err) {
            console.log(err);
        }
    });
});

app.post('/delete', function(req, res) {
    dbHelpers.deleteFavorites(req.body.movieToDelete[0].id);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
