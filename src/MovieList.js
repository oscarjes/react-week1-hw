import React, { Component } from "react";
import MovieCard from "./MovieCard";

export default class MovieList extends Component {
  render() {
    return <div>
      {this.props.movies.
        map (m => <MovieCard movie={m}/>)}
    </div>;
  }
}
