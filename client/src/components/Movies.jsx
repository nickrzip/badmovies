import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() { 
    if (this.props.showFaves) {
      return (<ul className="movies">
        {this.props.movies.map((movie) => {
        return (
            <li key = {movie.movieId} className="movie_item">
              <img src= {`https://image.tmdb.org/t/p/w500${movie.imageLink}`} />
              <div className="movie_description">
                <h2 onClick = {() => { this.props.deleteFavorite(movie.movieId)}}>{movie.movieTitle}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.voteAverage}</span>
                  </div>
                </section>
              </div>
            </li>
          )
        })}
    </ul>)
    }
    if (this.props.movies.length !== 0) {
      return (<ul className="movies">
        {this.props.movies.map((movie) => {
        return (
            <li key = {movie.id} className="movie_item">
              <img src= {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <div className="movie_description">
                <h2 onClick = {() => { this.props.saveMovie(movie.id)}}>{movie.title}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average}</span>
                  </div>
                </section>
              </div>
            </li>
          )
        })}
    </ul>)
    }
  else {
    return (<ul className="movies"></ul>)
  }
  }
}

export default Movies;