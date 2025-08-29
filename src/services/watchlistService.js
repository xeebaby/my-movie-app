const WATCHLIST_KEY = "watchlist_movies";

export function getWatchlist() {
  const saved = localStorage.getItem(WATCHLIST_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function addToWatchlist(movie) {
  const current = getWatchlist();
  if (!current.find((m) => m.imdbID === movie.imdbID)) {
    const updated = [...current, movie];
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  }
}

export function removeFromWatchlist(imdbID) {
  const current = getWatchlist();
  const updated = current.filter((m) => m.imdbID !== imdbID);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
}
