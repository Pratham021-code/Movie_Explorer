import { createContext, useContext, useState, useEffect } from "react"

const FavContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || []
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => setFavorites([...favorites, movie])
  
  const removeFavorite = (id) => setFavorites(favorites.filter(m => m.id !== id))
  
  const isFavorite = (id) => favorites.some(m => m.id === id)

  return (
    <FavContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavContext.Provider>
  )
}

export const useFavorites = () => useContext(FavContext)