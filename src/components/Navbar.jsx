// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-red-500">CineHouse</h1>
      <div className="flex space-x-6">
        <a href="/" className="text-gray-300 hover:text-white">Home</a>
        <a href="/watchlist" className="text-gray-300 hover:text-white">Watchlist</a>
      </div>
    </nav>
  );
}
