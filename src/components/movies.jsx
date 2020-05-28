import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "../commun/pagination";
import paginate from "../utils/paginate";
import filterMovies from "../utils/filtering";
import Listgroup from "../commun/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import ThemeContext from "../commun/context/themeContext";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    loading: true,
    maxPage: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: { genre: "All Genres", _id: 123123123 },
    data: { query: "" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ genre: "All Genres", _id: 123123123 }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres, loading: false });
  }

  deletthemovie = async (id) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast("movie already deleted");
      this.setState({ movies: originalMovies });
    }
  };

  likemovie = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlepageChange = (page) => {
    this.setState({ currentPage: page });
  };

  onGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSorting = (sortColumn) => {
    this.setState({ sortColumn });
  };

  onchange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const value = input.value;
    data[input.name] = value;
    this.setState({ data });
  };

  getPagedData = () => {
    const {
      maxPage,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;
    const { query } = this.state.data;
    let filteredMovies;
    if (query) {
      const movies = allMovies;
      const searchword = query.toLowerCase();
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchword)
      );
    } else {
      filteredMovies = filterMovies(selectedGenre, allMovies);
    }

    const count = filteredMovies.length;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, maxPage);
    return { count, movies };
  };
  render() {
    const {
      maxPage,
      currentPage,
      selectedGenre,
      sortColumn,
      genres,
      loading,
      data,
    } = this.state;
    const { user } = this.props;
    const { count, movies } = this.getPagedData();
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <div className="row">
            <div className="col-3">
              <Listgroup
                selectedGenre={selectedGenre}
                onGenreSelect={this.onGenreSelect}
                genres={genres}
              />
            </div>
            <div className="col">
              {!loading ? (
                <div>
                  {user && (
                    <Link
                      to={
                        localStorage.getItem("token") ? "/movies/new" : "/login"
                      }
                    >
                      <button className={`btn btn-${theme.createButton}`}>
                        Create Movie
                      </button>
                    </Link>
                  )}
                  <SearchBox
                    name="query"
                    label="SearchBox"
                    onChange={this.onchange}
                    value={data.query}
                  />
                  {count > 0 ? (
                    <div>
                      {selectedGenre.genre !== "All Genres" ? (
                        <h3 style={{ color: theme.color }}>
                          Number of {selectedGenre.genre} movies is {count}
                        </h3>
                      ) : (
                        <h3 style={{ color: theme.color }}>
                          Number of total movies is {count}
                        </h3>
                      )}

                      <MoviesTable
                        movies={movies}
                        onLike={this.likemovie}
                        onDelete={this.deletthemovie}
                        sortColumn={sortColumn}
                        onSort={this.handleSorting}
                      />
                      <Pagination
                        maxPage={maxPage}
                        movieNumber={count}
                        handlepageChange={this.handlepageChange}
                        currentPage={currentPage}
                      />
                    </div>
                  ) : (
                    <h3 style={{ color: theme.color }}>there are no movies </h3>
                  )}
                </div>
              ) : (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Movies;
