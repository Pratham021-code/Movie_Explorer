import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getTrending, getPopular } from "../api/tmdb"
import MovieGrid from "../components/MovieGrid"
import Hero from "../components/Hero"
import GenreFilter from "../components/GenreFilter"
import Pagination from "../components/Pagination"
import ErrorMessage from "../components/ErrorMessage"

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read page from URL, default to 1
  const trendingPage = parseInt(searchParams.get("tpage") || "1")
  const popularPage = parseInt(searchParams.get("ppage") || "1")

  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [loadingTrending, setLoadingTrending] = useState(true)
  const [loadingPopular, setLoadingPopular] = useState(true)
  const [errorTrending, setErrorTrending] = useState(null)
  const [errorPopular, setErrorPopular] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [trendingTotal, setTrendingTotal] = useState(1)
  const [popularTotal, setPopularTotal] = useState(1)

  const fetchTrending = (page) => {
    setLoadingTrending(true)
    setErrorTrending(null)
    getTrending(page)
      .then(res => {
        setTrending(res.data.results)
        setTrendingTotal(res.data.total_pages)
      })
      .catch(err => setErrorTrending(err.message))
      .finally(() => setLoadingTrending(false))
  }

  const fetchPopular = (page) => {
    setLoadingPopular(true)
    setErrorPopular(null)
    getPopular(page)
      .then(res => {
        setPopular(res.data.results)
        setPopularTotal(res.data.total_pages)
      })
      .catch(err => setErrorPopular(err.message))
      .finally(() => setLoadingPopular(false))
  }

  useEffect(() => { fetchTrending(trendingPage) }, [trendingPage])
  useEffect(() => { fetchPopular(popularPage) }, [popularPage])

  const filterByGenre = (movies) => {
    if (!selectedGenre) return movies
    return movies.filter(movie => movie.genre_ids?.includes(selectedGenre))
  }

  // Update URL instead of state
  const handleTrendingPage = (page) => {
    setSearchParams({ tpage: page, ppage: popularPage })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePopularPage = (page) => {
    setSearchParams({ tpage: trendingPage, ppage: page })
  }

  return (
    <div>
      <Hero movies={trending.slice(0, 5)} />

      <div className="p-8">
        <GenreFilter selectedGenre={selectedGenre} onSelect={setSelectedGenre} />

        {errorTrending ? (
          <ErrorMessage message={errorTrending} onRetry={() => fetchTrending(trendingPage)} />
        ) : (
          <>
            <MovieGrid
              title=" Trending This Week"
              movies={filterByGenre(trending)}
              loading={loadingTrending}
            />
            <Pagination
              currentPage={trendingPage}
              totalPages={Math.min(trendingTotal, 50)}
              onPageChange={handleTrendingPage}
            />
          </>
        )}

        {errorPopular ? (
          <ErrorMessage message={errorPopular} onRetry={() => fetchPopular(popularPage)} />
        ) : (
          <>
            <MovieGrid
              title=" Popular Movies"
              movies={filterByGenre(popular)}
              loading={loadingPopular}
            />
            <Pagination
              currentPage={popularPage}
              totalPages={Math.min(popularTotal, 50)}
              onPageChange={handlePopularPage}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Home