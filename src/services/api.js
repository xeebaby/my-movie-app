const API_KEY = "20071961";
const BASE_URL = "http://www.omdbapi.com/";

export async function fetchMovies(searchTerm) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`);
  return res.json();
}
