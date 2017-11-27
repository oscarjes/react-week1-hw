import React, { Component } from "react";
import logo from "./wm_logo.svg";
import "./App.css";
import { Container, Field, Control, Input, Button } from "bloomer";
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
    this.baseState = this.state
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async loadData() {
    this.setState({
      loading: true
    });
    const results = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c80d4ec3595ddc1835ea6ef7e2caf0f9');
    const data = await results.json();
    await this.sleep(2000);
    const movieResults = data.results;
    this.setState({
      movies: movieResults,
      loading: false
    });
    this.baseState = this.state;
  }

  async componentDidMount() {
      try {
        this.loadData();
      }

      catch(e) {
        alert('there was an error');
        console.log('error': e); 
      }
  }

  filterList(e) {
    let updatedList = this.baseState.movies;
    updatedList = updatedList.filter(function(movie){
      return movie.title.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      movies: updatedList
    });
  }

  render() {

    let content;
    if(this.state.loading) {
      content = null
    }
    else {
      content = <MovieList movies={this.state.movies}/>
    }

    let refresh;
    if(this.state.loading) {
      refresh = <Button isColor='info' isLoading>isLoading={true}</Button>
    }
    else {
      refresh = <Button isColor='info' onClick={ this.loadData.bind(this) }>Refresh List</Button>
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
                  <Input type="text" placeholder='Search...' onChange={this.filterList.bind(this)}/>
              </Control>
            </Field>
            { refresh }
            { content }
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
