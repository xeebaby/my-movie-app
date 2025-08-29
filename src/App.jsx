import React, { useState, useEffect } from "react";
import { fetchMovies } from "./services/movieService";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ type: "", year: "" });
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const data = await fetchMovies(searchTerm, filters, page);
        if (data.Search) {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults, 10));
        } else {
          setMovies([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [searchTerm, filters, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTerm(e.target.search.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400 drop-shadow-lg">
          CineHouse 🎬
        </h1>
        <p className="text-gray-400 mt-2">Discover movies, series & more</p>
      </header>

      {/* Search Bar + Filters */}
      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 bg-gray-800/70 backdrop-blur-md p-4 rounded-2xl shadow-lg mb-8"
      >
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          className="flex-1 border-none rounded-lg px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <select
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="rounded-lg px-4 py-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="w-24 rounded-lg px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-2 rounded-lg font-semibold shadow-md"
        >
          Search
        </button>
      </form>

      {/* Movies */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <MovieList movies={movies} onMovieClick={(id) => setSelectedMovie(id)} />
        )}
      </div>

      {/* Pagination */}
      {totalResults > 10 && (
        <div className="flex justify-center gap-6 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-600 transition"
          >
            Prev
          </button>
          <span className="self-center text-gray-300">Page {page}</span>
          <button
            disabled={page * 10 >= totalResults}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          imdbID={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
