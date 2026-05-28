import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

const genreMap = {
  28: "Action", 12: "Adventure", 16: "Animation",
  35: "Comedy", 80: "Crime", 99: "Documentary",
  18: "Drama", 10751: "Family", 14: "Fantasy",
  36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
}

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { dark } = useTheme()

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image"

  const genres = movie.genre_ids?.slice(0, 2).map(id => genreMap[id]).filter(Boolean)
  const year = movie.release_date?.slice(0, 4)

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${movie.id}`)}
      aria-label={`View details for ${movie.title}`}
      className={`rounded-xl overflow-hidden cursor-pointer group
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl hover:shadow-black/50
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${dark ? "bg-gray-800" : "bg-white shadow-md"}`}
    >
      {/* Poster with overlay on hover */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300" />
        {/* View details text on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className={`font-semibold text-sm truncate mb-1 transition-colors
          ${dark ? "text-white" : "text-gray-900"}`}>
          {movie.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <p className="text-yellow-400 text-xs font-medium">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>
          {year && (
            <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
              {year}
            </p>
          )}
        </div>

        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.map(genre => (
              <span
                key={genre}
                className="bg-blue-600/80 text-white text-xs px-2 py-0.5 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard