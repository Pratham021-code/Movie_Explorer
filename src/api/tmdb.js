import axios from "axios"

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_KEY,
  },
  timeout: 30000,
})

api.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config

    if (!config._retry) {
      config._retry = true
      if (
        error.code === "ECONNABORTED" ||
        error.code === "ERR_NETWORK" ||
        error.response?.status === 429
      ) {
        await new Promise(res => setTimeout(res, 2000))
        return api(config)
      }
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timed out. Check your connection."))
    }
    if (error.response?.status === 401) {
      return Promise.reject(new Error("Invalid API key."))
    }
    if (error.response?.status === 404) {
      return Promise.reject(new Error("Not found."))
    }
    if (error.response?.status === 429) {
      return Promise.reject(new Error("Too many requests. Please wait a moment."))
    }
    return Promise.reject(new Error("Something went wrong. Please try again."))
  }
)

export const getTrending = (page = 1) => api.get("/trending/movie/week", { params: { page } })
export const getPopular = (page = 1) => api.get("/movie/popular", { params: { page } })
export const searchMovies = (query, page = 1) => api.get("/search/movie", { params: { query, page } })
export const getMovieDetails = (id) => api.get(`/movie/${id}`)
export const getMovieVideos = (id) => api.get(`/movie/${id}/videos`)

export default api
