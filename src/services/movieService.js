const API_KEY = "20071961";
const BASE_URL = "http://www.omdbapi.com/";

export async function fetchMovies(searchTerm, filters = {}, page = 1) {
  let url = `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;

  if (filters.type) {
    url += `&type=${filters.type}`;
  }
  if (filters.year) {
    url += `&y=${filters.year}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function fetchMovieDetails(imdbID) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
  return res.json();
}
