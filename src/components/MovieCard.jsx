export default function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transform transition"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      <div className="p-2">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-gray-500">{movie.Year}</p>
      </div>
    </div>
  );
}
