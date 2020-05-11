export default function (selectedGenre, movies) {
  if (selectedGenre.genre === "All Genres") return movies;
  const filteredMovies = movies.filter(
    (m) => m.genre.genre === selectedGenre.genre
  );
  return filteredMovies;
}
