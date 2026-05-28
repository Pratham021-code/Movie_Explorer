import { useState, useEffect } from "react"
import { searchMovies } from "../api/tmdb"
import MovieGrid from "../components/MovieGrid"
import Pagination from "../components/Pagination"
import ErrorMessage from "../components/ErrorMessage"
import { useTheme } from "../context/ThemeContext"

function Search() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { dark } = useTheme()

  useEffect(() => {
    if (query.trim() === "") {
      setMovies([])
      setSearched(false)
      setPage(1)
      setError(null)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      setSearched(true)
      setError(null)
      try {
        const res = await searchMovies(query, page)
        setMovies(res.data.results)
        setTotalPages(res.data.total_pages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, page])

  useEffect(() => { setPage(1) }, [query])

  return (
    <div className="p-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies... "
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none mb-8"
      />

      {error && <ErrorMessage message={error} onRetry={() => setPage(page)} />}

      {!error && !loading && searched && movies.length === 0 && (
        <p className={`text-center text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
          No movies found for "{query}"
        </p>
      )}

      {!error && (searched || loading) && (
        <>
          <MovieGrid
            title={searched && !loading ? `Results for "${query}"` : ""}
            movies={movies}
            loading={loading}
          />
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.min(totalPages, 50)}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Search