import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import "./Navbar.css"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Karnataka")
  const locationDropdownRef = useRef(null)
  const navigate = useNavigate()

  const indianStates = [
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Delhi",
    "Gujarat",
    "Uttar Pradesh",
    "West Bengal",
    "Telangana",
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      // For now, we'll just navigate to home with the query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setShowLocationDropdown(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>WatchHub</h1>
          </Link>
        </div>

        <div className="navbar-location" ref={locationDropdownRef}>
          <button className="location-button" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
            <span className="location-icon">📍</span>
            <span>{selectedLocation}</span>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showLocationDropdown && (
            <div className="location-dropdown">
              <h4>Select Your Location</h4>
              <ul>
                {indianStates.map((state) => (
                  <li
                    key={state}
                    onClick={() => handleLocationSelect(state)}
                    className={selectedLocation === state ? "active" : ""}
                  >
                    {state}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/children">Children</Link>
          </li>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
        </ul>

        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search watches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>

        <div className="navbar-actions">
          <Link to="/wishlist" className="icon-button wishlist-icon">
            ❤️
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="icon-button cart-icon">
            🛒{cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          {currentUser ? (
            <button onClick={handleLogout} className="auth-button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="auth-button">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
