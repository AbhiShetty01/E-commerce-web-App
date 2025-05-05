import { useEffect, useState } from "react"
import ProductGrid from "../components/ProductGrid"
import { getMenWatches } from "../data/products"

const MenWatches = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getMenWatches())
  }, [])

  return (
    <div className="category-page">
      <h1 className="section-title">Men's Watches</h1>
      <p className="category-description">
        Discover our collection of premium men's watches, from classic designs to modern timepieces.
      </p>
      <ProductGrid products={products} />
    </div>
  )
}

export default MenWatches
