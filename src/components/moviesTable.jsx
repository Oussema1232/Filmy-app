import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Like from "../commun/likeComponent";
import Table from "../commun/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      content: (movie) => (
        <NavLink
          to={localStorage.getItem("token") ? `/movies/${movie._id}` : "/login"}
        >
          {movie.title}
        </NavLink>
      ),
      label: "Title",
    },
    { path: "genre.genre", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.like} likemovie={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content:
        auth.getCurrentUser() && auth.getCurrentUser().isAdmin
          ? (movie) => (
              <button
                className="btn btn-danger"
                onClick={() => this.props.onDelete(movie._id)}
              >
                Delete
              </button>
            )
          : null,
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
