import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Hero({ movies }) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!movies || movies.length === 0) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % movies.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [movies])

  if (!movies || movies.length === 0) return null

  const movie = movies[current]
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <div className="relative w-full h-[550px] overflow-hidden">

      {/* Background image */}
      <img
        src={backdropUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">

        {/* Badge */}
        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
           TRENDING
        </span>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-3 leading-none tracking-tight drop-shadow-lg">
          {movie.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-yellow-400 font-semibold">
             {movie.vote_average?.toFixed(1)}
          </span>
          <span className="text-gray-300">
             {movie.release_date?.slice(0, 4)}
          </span>
          <span className="text-gray-300">
             {movie.vote_count?.toLocaleString()} votes
          </span>
        </div>

        {/* Overview */}
        <p className="text-gray-200 text-sm md:text-base mb-8 line-clamp-3 leading-relaxed drop-shadow-md max-w-xl">
          {movie.overview}
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            View Details →
          </button>
          <button
            onClick={() => navigate("/search")}
            className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold backdrop-blur-sm transition-colors"
          >
            Browse More
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-8 md:left-16 flex gap-2">
        {movies.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-8" : "bg-white/40 w-4"
            }`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => setCurrent(prev => (prev - 1 + movies.length) % movies.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent(prev => (prev + 1) % movies.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
      >
        ›
      </button>
    </div>
  )
}

export default Hero