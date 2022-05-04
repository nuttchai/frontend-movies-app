import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = { movies: [], isLoaded: false };

  // React Lifecycle Ref: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  componentDidMount() {
    fetch("http://localhost:4000/v1/movies")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          movies: json.movies,
        });
      });
  }

  render() {
    const { isLoaded, movies } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      // Fragment wraps everything in a single element
      <Fragment>
        <h2>Choose a movie</h2>

        <ul>
          {movies.map((m) => (
            <li key={m.id}>
              <Link to={`/movies/${m.id}`}> {m.title} </Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
