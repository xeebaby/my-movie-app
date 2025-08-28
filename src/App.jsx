import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import { fetchMovies } from "./services/movieService";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (term) => {
    const data = await fetchMovies(term);
    setMovies(data.Search || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => setSelectedMovie(movie.imdbID)}
          />
        ))}
      </div>

      {/* Show details modal if a movie is selected */}
      {selectedMovie && (
        <MovieDetails
          imdbID={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
