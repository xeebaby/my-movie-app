import { useState, useEffect } from "react";
import { getWatchlist, removeFromWatchlist } from "../services/watchlistService";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);
    setWatchlist(getWatchlist()); // refresh list
  };

  if (watchlist.length === 0) {
    return <div className="p-6 text-gray-600">Your watchlist is empty.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎬 My Watchlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchlist.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold text-center">{movie.Title}</h3>
            <p className="text-sm text-gray-500">{movie.Year}</p>
            <button
              onClick={() => handleRemove(movie.imdbID)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
