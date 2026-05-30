import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import Button from "./Button"

function Navbar() {
  const { dark, setDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} 
      border-b px-6 py-4 sticky top-0 z-50 transition-colors duration-300`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-extrabold tracking-tight transition-colors
          ${dark ? "text-white" : "text-gray-900"}`}
        >
           Movie Explorer
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { path: "/", label: "Home" },
            { path: "/search", label: "Search" },
            { path: "/favorites", label: "Favorites" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors duration-200 relative
                after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-blue-500
                after:transition-all after:duration-300
                ${isActive(path)
                  ? "text-blue-500 after:w-full"
                  : dark
                    ? "text-gray-300 hover:text-white after:w-0 hover:after:w-full"
                    : "text-gray-600 hover:text-gray-900 after:w-0 hover:after:w-full"
                }`}
              aria-current={isActive(path) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <Button variant="secondary" size="sm" onClick={() => setDark(!dark)}>
            {dark ? " Light" : " Dark"}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg text-xl ${dark ? "text-white" : "text-gray-900"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu — absolute so it overlays content */}
      <div
        className={`md:hidden absolute left-0 right-0 z-50
          ${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
          border-b shadow-xl
          transition-all duration-300 ease-in-out overflow-hidden
          ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {[
            { path: "/", label: " Home" },
            { path: "/search", label: " Search" },
            { path: "/favorites", label: " Favorites" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium px-3 py-3 rounded-lg transition-colors
                ${isActive(path)
                  ? "bg-blue-600 text-white"
                  : dark
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t mt-1 ${dark ? 'border-gray-700' : 'border-gray-200'}">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setDark(!dark); setMenuOpen(false) }}
              className="w-full"
            >
              {dark ? " Switch to Light" : " Switch to Dark"}
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop — clicking outside closes menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
