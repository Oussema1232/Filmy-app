import React from "react";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Joi from "joi-browser";
import Form from "../commun/form";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", dailyRentalRate: "", numberInStock: "" },
    errors: {},
    genres: [],
  };

  componentDidMount() {
    this.populateGenres();
    this.populateMovies();
  }

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovies = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      const data = this.maptoViewModel(movie);
      this.setState({ data });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  };

  maptoViewModel = (movie) => {
    return {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      _id: movie._id,
      numberInStock: movie.numberInStock,
      genreId: movie.genre._id,
    };
  };

  capitalize = () => {
    const data = { ...this.state.data };
    let title = data.title;
    title = title[0].toUpperCase() + title.slice(1);
    data.title = title;
    return data;
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
  };

  dosubmit = async () => {
    const data = this.capitalize();
    await saveMovie(data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <form>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genres")}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("dailyRentalRate", "Rate")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;
