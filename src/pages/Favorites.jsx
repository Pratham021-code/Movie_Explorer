import { useFavorites } from "../context/FavoritesContext"
import MovieGrid from "../components/MovieGrid"

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="p-8">
      {favorites.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400 text-xl mb-2">No favorites yet!</p>
          <p className="text-gray-500">Click a movie and add it to favorites.</p>
        </div>
      ) : (
        <MovieGrid
          title=" My Favorites"
          movies={favorites}
          loading={false}
        />
      )}
    </div>
  )
}

export default Favorites