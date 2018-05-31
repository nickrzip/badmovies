import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies(80);
  }

  getMovies(genre) {
    axios.get('/search', {params: {genreSearchValue: genre}}).then((response) => {
      this.setState({
        movies: response.data
      });
    });
  }

  saveMovie(movieID) {
    var movieToSave = this.state.movies.filter((movie) => movie.id === movieID);
    axios.post('/save',{movieToSave: movieToSave})
  }

  deleteMovie(movieID) {
    var movieToDelete = this.state.movies.filter((movie) => { 
      return movie.id === movieID;
    });
    console.log(movieToDelete);
    var moviesToKeep = this.state.favorites.filter((movie) => { 
      return movie.movieId !== movieID;
    });
    console.log(moviesToKeep);
    this.setState({
      favorites: moviesToKeep
    })
    axios.post('/delete',{movieToDelete: movieToDelete})
  }

  getFavorites() {
    axios.get('/save').then((response) => {
      this.setState({
        favorites: response.data
      });
      this.swapFavorites();
    });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search searchClickHandler = {(e) => {this.getMovies(e)}} swapFavorites={() => {this.getFavorites()}} showFaves={this.state.showFaves}/>
          <Movies deleteFavorite = {(movieID) => {this.deleteMovie(movieID)}} saveMovie = {(movieID) => {this.saveMovie(movieID)}} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));