const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
]

function GenreFilter({ selectedGenre, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {/* All button */}
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedGenre === null
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        All
      </button>

      {GENRES.map(genre => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedGenre === genre.id
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter