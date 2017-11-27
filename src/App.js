import React, { Component } from "react";
import "./App.css";
import {
  Container,
  Field,
  Control,
  Input,
  Label,
  Button,
  Tab,
  Tabs,
  Title,
  Tile,
  Select,
  TabLink,
  TabList,
  Icon
} from "bloomer";
import "font-awesome/css/font-awesome.min.css";
import "bulma/css/bulma.css";
import MovieList from "./MovieList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      nowPlaying: true,
      sorting: "popularity"
    };
    this.baseState = this.state;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async loadNowPlayingData() {
    this.setState({
      loading: true
    });
    const results = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"
    );
    const data = await results.json();
    await this.sleep(2000);
    const movieResults = data.results;
    this.setState({
      movies: movieResults,
      loading: false
    });
    this.baseState = this.state;
  }

  async loadTopRatedData() {
    this.setState({
      loading: true
    });
    const results = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"
    );
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
      this.loadNowPlayingData();
    } catch (e) {
      alert("there was an error");
      console.log(("error": e));
    }
  }

  filterList(e) {
    let updatedList = this.baseState.movies;
    updatedList = updatedList.filter(function(movie) {
      return (
        movie.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({
      movies: updatedList
    });
  }

  showNowPlaying() {
    this.setState({
      nowPlaying: true
    });
    this.loadNowPlayingData();
  }

  showTopRated() {
    this.setState({
      nowPlaying: false
    });
    this.loadTopRatedData();
  }

  sortMovies(e) {
    let newSorting = e.target.value;

    let movieList = this.state.movies;
    let orderedMovies;

    if (newSorting == "rating") {
      orderedMovies = movieList.sort(
        (a, b) => (a.vote_average < b.vote_average ? 1 : -1)
      );
    } else if (newSorting == "popularity") {
      orderedMovies = movieList.sort(
        (a, b) => (a.popularity < b.popularity ? 1 : -1)
      );
    } else {
      orderedMovies = movieList.sort(
        (a, b) => (a.release_date < b.release_date ? 1 : -1)
      );
    }

    this.setState({
      movies: orderedMovies,
      sorting: newSorting
    });
  }

  render() {
    let content;
    if (this.state.loading) {
      content = null;
    } else {
      content = <MovieList movies={this.state.movies} />;
    }

    let refresh;
    if (this.state.loading) {
      refresh = (
        <Button isColor="info" isLoading>
          isLoading={true}
        </Button>
      );
    } else {
      if (this.state.nowPlaying) {
        refresh = (
          <Button className='App-Button' isColor="info" onClick={this.loadNowPlayingData.bind(this)}>
            Refresh List
          </Button>
        );
      } else {
        refresh = (
          <Button className='App-Button' isColor="info" onClick={this.loadTopRatedData.bind(this)}>
            Refresh List
          </Button>
        );
      }
    }

    let tabs;
    if (this.state.nowPlaying) {
      tabs = (
        <div>
          <Tabs className="App-Tabs" isAlign="centered" isToggle="true">
            <TabList>
              <Tab isActive>
                <TabLink onClick={this.showNowPlaying.bind(this)}>
                  <Icon isSize="small">
                    <span className="fa fa-video-camera" aria-hidden="true" />
                  </Icon>
                  <span>Now Playing</span>
                </TabLink>
              </Tab>
              <Tab>
                <TabLink onClick={this.showTopRated.bind(this)}>
                  <Icon isSize="small">
                    <span className="fa fa-trophy" aria-hidden="true" />
                  </Icon>
                  <span>Top Rated</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
        </div>
      );
    } else {
      tabs = (
        <div>
          <Tabs className="App-Tabs" isAlign="centered" isToggle="true">
            <TabList>
              <Tab>
                <TabLink onClick={this.showNowPlaying.bind(this)}>
                  <Icon isSize="small">
                    <span className="fa fa-video-camera" aria-hidden="true" />
                  </Icon>
                  <span>Now Playing</span>
                </TabLink>
              </Tab>
              <Tab isActive>
                <TabLink onClick={this.showTopRated.bind(this)}>
                  <Icon isSize="small">
                    <span className="fa fa-trophy" aria-hidden="true" />
                  </Icon>
                  <span>Top Rated</span>
                </TabLink>
              </Tab>
            </TabList>
          </Tabs>
        </div>
      );
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <Title isSize={2}>Watch Me!</Title>
          </header>
          <Container>
            {tabs}
            <Label className="App-Label">Sort By:</Label>
            <Select
              className="App-Select"
              onChange={this.sortMovies.bind(this)}
              value={this.state.sorting}
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="date">Release Date</option>
            </Select>
            <Field className="App-Searchbar">
              <Control>
                <Input
                  type="text"
                  placeholder="Search..."
                  onChange={this.filterList.bind(this)}
                />
              </Control>
            </Field>
            {refresh}
            <Tile isAncestor>
              {content}
            </Tile>
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
