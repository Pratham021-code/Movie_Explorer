import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import MovieDetails from "./pages/MovieDetails"
import Favorites from "./pages/Favorites"
import NotFound from "./pages/NotFound"
import { useTheme } from "./context/ThemeContext"

function App() {
  const { dark } = useTheme()

  return (
    <BrowserRouter>
      <div className={`${dark ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App