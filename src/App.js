import React, { Component } from "react";
import logo from "./wm_logo.svg";
import "./App.css";
import { Container } from "bloomer";
import "bulma/css/bulma.css";
import MovieList from "./MovieList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async componentDidMount() {
    const results = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const data = await results.json();
    this.movies = data.results;
    await this.sleep(4000)
    this.setState({
      movies: this.movies,
      loading: false
    });
  }

  render() {

    let content;
    if(this.state.loading) {
      content = <h1>I am loading</h1>
    } else {
      content = <MovieList movies={this.state.movies}/>
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Watch Me!</h1>
          </header>
          <Container>
            { content }
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
