import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/movieService";

function MovieDetails({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(imdbID);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (imdbID) getDetails();
  }, [imdbID]);

  if (loading) return <p className="text-center mt-4">Loading details...</p>;
  if (!movie) return <p className="text-center mt-4">No details available.</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-bold text-gray-600 hover:text-red-500"
        >
          ✖
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
            alt={movie.Title}
            className="w-48 h-auto rounded-md shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {movie.Year} • {movie.Runtime} • {movie.Genre}
            </p>
            <p className="mb-4">{movie.Plot}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
