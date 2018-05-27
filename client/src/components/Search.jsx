import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: 35
    };
  }

  getGenres() {
    axios.get('/genres').then((response) => {
      this.setState({
        genres: response.data.genres
      })
    });
  }

  changeSelectedGenre(event) {
    this.setState({
      selectedGenre: event.target.value
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange = {(e) => {this.changeSelectedGenre(e)}} value = {this.state.selectedGenre}>
          {this.state.genres.map((genre) => {
            return <option value = {genre.id} key = {genre.id}>{genre.name}</option>
          })}
        </select>

        <br/><br/>

        <button onClick = {() => {
          this.props.searchClickHandler(this.state.selectedGenre);
        }}>Search</button>

      </div>
    );
  }
}

export default Search;