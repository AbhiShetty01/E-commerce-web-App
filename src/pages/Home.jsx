import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductGrid from "../components/ProductGrid"
import { getFeaturedWatches, searchProducts } from "../data/products"
import "./Home.css"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Get featured products
    setFeaturedProducts(getFeaturedWatches())

    // Check if there's a search query in the URL
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get("search")

    if (searchQuery) {
      setSearchResults(searchProducts(searchQuery))
    } else {
      setSearchResults(null)
    }
  }, [location.search])

  return (
    <div className="home-page">
      {!searchResults && (
        <>
          <div className="hero-section">
            <div className="hero-content">
              <h1>Luxury Watches for Every Occasion</h1>
              <p>Discover our collection of premium timepieces</p>
            </div>
          </div>

          <ProductGrid products={featuredProducts} title="Featured Watches" />
        </>
      )}

      {searchResults && (
        <ProductGrid products={searchResults} title={`Search Results (${searchResults.length} items)`} />
      )}
    </div>
  )
}

export default Home
