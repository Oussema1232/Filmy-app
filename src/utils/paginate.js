export default function (movies, currentPage, maxPage) {
  let newMovies = movies.slice(
    (currentPage - 1) * maxPage,
    (currentPage - 1) * maxPage + 4
  );
  return newMovies;
}
