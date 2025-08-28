import { useEffect, useState } from "react";

const API_KEY = "20071961";
const BASE_URL = "http://www.omdbapi.com/";

export default function MovieDetails({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (imdbID) {
      fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`)
        .then((res) => res.json())
        .then((data) => setMovie(data));
    }
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        {movie ? (
          <div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {movie.Year} • {movie.Runtime} • {movie.Genre}
            </p>
            <p className="text-gray-700 mb-4">{movie.Plot}</p>
            <p className="text-gray-600">
              ⭐ {movie.imdbRating} / 10 ({movie.imdbVotes} votes)
            </p>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}
