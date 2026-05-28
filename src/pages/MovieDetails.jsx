import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetails, getMovieVideos } from "../api/tmdb"
import { useFavorites } from "../context/FavoritesContext"
import { useTheme } from "../context/ThemeContext"
import ErrorMessage from "../components/ErrorMessage"
import Button from "../components/Button"

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { dark } = useTheme()

  const fetchMovie = () => {
    setLoading(true)
    setError(null)

    // Fetch both movie details and videos at the same time
    Promise.all([getMovieDetails(id), getMovieVideos(id)])
      .then(([detailsRes, videosRes]) => {
        setMovie(detailsRes.data)

        // Find the official trailer from YouTube
        const videos = videosRes.data.results
        const officialTrailer =
          videos.find(v => v.type === "Trailer" && v.site === "YouTube" && v.official) ||
          videos.find(v => v.type === "Trailer" && v.site === "YouTube") ||
          videos.find(v => v.site === "YouTube")

        setTrailer(officialTrailer || null)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMovie()
    setShowTrailer(false) // reset trailer when movie changes
  }, [id])

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className={dark ? "text-gray-400" : "text-gray-600"}>Loading movie details...</p>
    </div>
  )

  if (error) return (
    <div className="p-8">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-6 block">
        ← Back
      </button>
      <ErrorMessage message={error} onRetry={fetchMovie} />
    </div>
  )

  const favorited = isFavorite(movie.id)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 block hover:underline ${dark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-64 mx-auto md:mx-0 shadow-2xl"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className={`text-3xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight
            ${dark ? "text-white" : "text-gray-900"}`}>
            {movie.title}
          </h1>

          <p className="text-yellow-400 text-lg font-semibold mb-2">
             {movie.vote_average?.toFixed(1)}
            <span className={`text-sm font-normal ml-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
              ({movie.vote_count?.toLocaleString()} votes)
            </span>
          </p>

          <p className={`mb-4 ${dark ? "text-gray-400" : "text-gray-600"}`}>
             {movie.release_date} &nbsp;|&nbsp;  {movie.runtime} min
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className={`leading-relaxed text-base mb-6 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Favorite button */}
            <Button
              variant={favorited ? "danger" : "warning"}
              onClick={() => favorited ? removeFavorite(movie.id) : addFavorite(movie)}
            >
              {favorited ? " Remove from Favorites" : " Add to Favorites"}
            </Button>

            {/* Trailer button */}
            {trailer && (
              <Button
                variant="primary"
                onClick={() => setShowTrailer(true)}
              >
                 Watch Trailer
              </Button>
            )}

            {!trailer && (
              <p className={`text-sm self-center ${dark ? "text-gray-500" : "text-gray-400"}`}>
                No trailer available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)} // click outside to close
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking video
          >
            {/* Close button */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕ Close
            </button>

            {/* YouTube embed */}
            <div className="relative pt-[56.25%]"> {/* 16:9 ratio */}
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetails