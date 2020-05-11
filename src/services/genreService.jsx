import http from "./httpService";
import config from "../config.json";

export function getGenres() {
  return http.get(`${config.apiUrl}/genres`);
}

export function getGenre(genreId) {
  return http.get(`${config.apiUrl}/genres/${genreId}`);
}
