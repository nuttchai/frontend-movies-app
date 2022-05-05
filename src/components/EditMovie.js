import React, { Component, Fragment } from "react";
import "./EditMovie.css";
import Input from "./form-components/Input";
import Select from "./form-components/Select";
import TextArea from "./form-components/TextArea";
import Alert from "./ui-components/Alert";
export default class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        rating: "",
        description: "",
      },
      mpaaOptions: [
        { id: "G", value: "G" },
        { id: "PG", value: "PG" },
        { id: "PG13", value: "PG13" },
        { id: "R", value: "R" },
        { id: "NC17", value: "NC17" },
      ],
      isLoaded: false,
      error: null,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };

    this.handleChange = this.handleChange.bind(this); // to handle when input is changed
    this.handleSubmit = this.handleSubmit.bind(this); // to handle when form is submitted
  }

  handleSubmit = (event) => {
    event.preventDefault(); // prevent page from refreshing

    // client side validation
    let errors = [];
    if (this.state.movie.title === "") {
      errors.push("title");
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return;
    }

    const data = new FormData(event.target); // create a FormData object from the form
    const payload = Object.fromEntries(data); // convert the FormData object to an object
    console.log(payload);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            alert: {
              type: "alert-danger",
              message: data.error.message,
            },
          });
        }
        this.setState({
          alert: {
            type: "alert-success",
            message: "Changes saved successfully!",
          },
        });
      });
  };

  handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState((prevState) => ({
      movie: {
        ...prevState.movie,
        [name]: value, // [name] is a key/string interpolation which means that the value of the name variable will be used as the key
      },
    }));
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id > 0) {
      fetch(`http://localhost:4000/v1/movie/${id}`)
        .then((response) => {
          if (response.status !== "200") {
            let err = Error;
            err.message = `Invalid response code: ${response.status}`;
            this.setState({ error: err });
          }
          return response.json();
        })
        .then((json) => {
          const releaseDate = new Date(json.movie.release_date);

          this.setState(
            {
              movie: {
                id: id,
                title: json.movie.title,
                release_date: releaseDate.toISOString().split("T")[0], // example releaseDate format: 2020-04-20T00:00:00.000Z
                runtime: json.movie.runtime,
                rating: json.movie.rating,
                mpaa_rating: json.movie.mpaa_rating,
                description: json.movie.description,
              },
              isLoaded: true,
            },
            // The second argument that can optionally be passed to setState is a callback function which gets called immediately after the setState is completed and the components get re-rendered
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          );
        });
    } else {
      this.setState({ isLoaded: true });
    }
  }

  render() {
    let { movie, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <Fragment>
        <h2>Add/Edit Movie</h2>
        <Alert
          type={this.state.alert.type}
          message={this.state.alert.message}
        />
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={movie.id}
            onChange={this.handleChange}
          />
          <Input
            title="Title"
            className={this.hasError("title") ? "is-invalid" : ""}
            type="text"
            name="title"
            value={movie.title}
            handleChange={this.handleChange}
            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
            errorMsg="Please enter a title"
          />
          <Input
            title="Release Date"
            type="date"
            name="release_date"
            value={movie.release_date}
            handleChange={this.handleChange}
          />
          <Input
            title="Runtime"
            type="text"
            name="runtime"
            value={movie.runtime}
            handleChange={this.handleChange}
          />
          <Select
            title="MPAA Rating"
            name="mpaa_rating"
            value={movie.mpaa_rating}
            handleChange={this.handleChange}
            options={this.state.mpaaOptions}
            placeholder="Choose..."
          />
          <Input
            title="Rating"
            type="text"
            name="rating"
            value={movie.rating}
            handleChange={this.handleChange}
          />
          <TextArea
            title="Description"
            name="description"
            value={movie.description}
            handleChange={this.handleChange}
          />
          <hr />
          <button className="btn btn-primary">Save</button>
        </form>
      </Fragment>
    );
  }
}
