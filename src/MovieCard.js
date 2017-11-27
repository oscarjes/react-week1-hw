import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardHeaderTitle,
  CardImage,
  Image,
  CardContent,
  Content,
  CardFooter,
  CardFooterItem,
  Icon,
  Tile
} from "bloomer";
import { Container } from "bloomer";
import "./MovieCard.css";

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }

  render() {
    const toggleDescription = e => {
      e.preventDefault();
      this.setState({
        showMore: !this.state.showMore
      });
    };

    let description;
    if (this.state.showMore) {
      description = (
        <div>
          <CardContent>
            <Content>{this.props.movie.overview}</Content>
          </CardContent>
          <CardFooter>
            <CardFooterItem href="#" onClick={toggleDescription}>
              Description <Icon icon="angle-double-up" />
            </CardFooterItem>
          </CardFooter>
        </div>
      );
    } else {
      description = (
        <div>
          <CardFooter>
            <CardFooterItem href="#" onClick={toggleDescription}>
              Description <Icon icon="angle-double-down" />
            </CardFooterItem>
          </CardFooter>
        </div>
      );
    }

    return (

      <Tile className="MovieCard-Tile" isPulled="left" >
        <Card className="MovieCard-Card">
          <CardHeader>
            <CardHeaderTitle>
              {this.props.movie.title}
              <span className="MovieCard-Rating">
                <Icon icon="heart" /> {this.props.movie.vote_average}
              </span>
            </CardHeaderTitle>
          </CardHeader>
          <CardImage>
            <Image
              isRatio="2:3"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
                this.props.movie.poster_path
              }`}
            />
          </CardImage>
          {description}
        </Card>
      </Tile>
    );
  }
}
