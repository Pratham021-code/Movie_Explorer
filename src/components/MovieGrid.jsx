import MovieCard from "./MovieCard"
import SkeletonCard from "./SkeletonCard"
import { useTheme } from "../context/ThemeContext"

function MovieGrid({ title, movies, loading }) {
  const { dark } = useTheme()

  return (
    <div className="mb-12">
      {title && (
        <h2 className={`text-2xl font-bold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading
          ? Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        }
      </div>
    </div>
  )
}

export default MovieGrid