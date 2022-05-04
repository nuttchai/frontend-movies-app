import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = { movies: [], isLoaded: false, error: null };

  // React Lifecycle Ref: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  componentDidMount() {
    fetch("http://localhost:4000/v1/movies")
      .then((response) => {
        if (response.status !== "200") {
          let err = Error;
          err.message = `Invalid response code: ${response.status}`;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then((json) => {
        this.setState(
          {
            isLoaded: true,
            movies: json.movies,
          },
          // NOTE: check API error
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      });
  }

  render() {
    const { isLoaded, movies, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
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
