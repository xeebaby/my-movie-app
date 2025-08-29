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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CineHouse 🎬</h1>

      {/* Search Bar + Filters */}
      <form onSubmit={handleSearch} className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          className="border rounded-lg px-4 py-2"
        />
        <select
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border rounded-lg px-4 py-2"
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
          className="border rounded-lg px-4 py-2 w-24"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Movies */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <MovieList movies={movies} onMovieClick={(id) => setSelectedMovie(id)} />
      )}

      {/* Pagination */}
      {totalResults > 10 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="self-center">Page {page}</span>
          <button
            disabled={page * 10 >= totalResults}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
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
