import React, { Component } from "react";
import logo from "./wm_logo.svg";
import "./App.css";
import { Container, Field, Control, Input } from "bloomer";
import 'font-awesome/css/font-awesome.min.css';
import "bulma/css/bulma.css";
import MovieList from "./MovieList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async componentDidMount() {
    try {
      const results = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c80d4ec3595ddc1835ea6ef7e2caf0f9');
      const data = await results.json();
      this.movies = data.results;
      await this.sleep(4000)
      this.setState({
        movies: this.movies,
        loading: false
      });
    }

    catch(e) {
      alert('there was an error');
      console.log('error': e); 
    }
  }

  render() {

    let content;
    if(this.state.loading) {
      content = <h1>I am loading</h1>
    }
    else {
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
            <Field className="App-Searchbar">
              <Control>
                  <Input type="text" placeholder='Search...' />
              </Control>
            </Field>
            { content }
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
