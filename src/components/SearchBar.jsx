import { useState } from "react";
import { fetchMovies } from "../services/api";

function SearchBar({ onResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    try {
      const data = await fetchMovies(searchTerm);
      if (data.Response === "True") {
        onResults(data.Search);
      } else {
        setError(data.Error || "No movies found.");
        onResults([]); // clear results
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      onResults([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-blue-600 mt-3">Loading...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-600 mt-3">{error}</p>
      )}
    </div>
  );
}

export default SearchBar;
