import { useEffect, useState } from "react"
import ProductGrid from "../components/ProductGrid"
import { getWomenWatches } from "../data/products"

const WomenWatches = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getWomenWatches())
  }, [])

  return (
    <div className="category-page">
      <h1 className="section-title">Women's Watches</h1>
      <p className="category-description">
        Explore our elegant collection of women's watches, featuring timeless designs and modern styles.
      </p>
      <ProductGrid products={products} />
    </div>
  )
}

export default WomenWatches
