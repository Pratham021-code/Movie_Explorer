import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import Button from "./Button"

function Navbar() {
  const { dark, setDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // helper — highlights active link
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
          className={`md:hidden p-2 rounded-lg ${dark ? "text-white" : "text-gray-900"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden mt-4 pb-4 flex flex-col gap-4 border-t pt-4
          ${dark ? "border-gray-700" : "border-gray-200"}`}
        >
          {[
            { path: "/", label: "Home" },
            { path: "/search", label: "Search" },
            { path: "/favorites", label: "Favorites" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium px-2 py-1 rounded transition-colors
                ${isActive(path)
                  ? "text-blue-500"
                  : dark ? "text-gray-300" : "text-gray-600"
                }`}
            >
              {label}
            </Link>
          ))}
          <Button variant="secondary" size="sm" onClick={() => setDark(!dark)}>
            {dark ? " Light" : " Dark"}
          </Button>
        </div>
      )}
    </nav>
  )
}

export default Navbar