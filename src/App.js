import React, { Component } from "react";
import logo from "./wm_logo.svg";
import "./App.css";
import { Container, Field, Control, Input, Button, Tab, Tabs, TabLink, TabList, Icon } from "bloomer";
import 'font-awesome/css/font-awesome.min.css';
import "bulma/css/bulma.css";
import MovieList from "./MovieList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      nowPlaying: true
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

  componentDidMount() {
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

  showNowPlaying() {
    this.setState({
      nowPlaying: true
    });
  }

  showTopRated() {
    this.setState({
      nowPlaying: false
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

    let tabs;
    if(this.state.nowPlaying) {
      tabs = <div>
        <Tabs className='App-Tabs' isAlign='centered' isToggle='true'>
          <TabList>
            <Tab isActive>
                <TabLink onClick={this.showNowPlaying.bind(this)}>
                    <Icon isSize='small'><span className='fa fa-video-camera' aria-hidden='true' /></Icon>
                    <span>Now Playing</span>
                </TabLink>
            </Tab>
            <Tab>
              <TabLink onClick={this.showTopRated.bind(this)}>
                  <Icon isSize='small'><span className='fa fa-trophy' aria-hidden='true' /></Icon>
                  <span>Top Rated</span>
              </TabLink>
            </Tab>
          </TabList>
        </Tabs>
      </div>
    }
    else {
      tabs = <div>
      <Tabs className='App-Tabs' isAlign='centered' isToggle='true'>
        <TabList>
          <Tab>
              <TabLink onClick={this.showNowPlaying.bind(this)}>
                  <Icon isSize='small'><span className='fa fa-video-camera' aria-hidden='true' /></Icon>
                  <span>Now Playing</span>
              </TabLink>
          </Tab>
          <Tab isActive>
            <TabLink onClick={this.showTopRated.bind(this)}>
                <Icon isSize='small'><span className='fa fa-trophy' aria-hidden='true' /></Icon>
                <span>Top Rated</span>
            </TabLink>
          </Tab>
        </TabList>
      </Tabs>
    </div>
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Watch Me!</h1>
          </header>
          <Container>
            { tabs }
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
