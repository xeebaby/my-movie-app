export default function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-600 mt-6">No movies found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg"
          onClick={() => onSelectMovie(movie.imdbID)}
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
            alt={movie.Title}
            className="w-full h-64 object-cover rounded"
          />
          <h3 className="mt-2 font-semibold text-sm">{movie.Title}</h3>
          <p className="text-xs text-gray-500">{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}
