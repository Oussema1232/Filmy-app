import http from "./httpService";
import config from "../config.json";

export function createUser(email, name, password) {
  return http.post(`${config.apiUrl}/users`, { email, name, password });
}
