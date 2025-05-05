import { useEffect, useState } from "react"
import ProductGrid from "../components/ProductGrid"
import { getChildrenWatches } from "../data/products"

const ChildrenWatches = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getChildrenWatches())
  }, [])

  return (
    <div className="category-page">
      <h1 className="section-title">Children's Watches</h1>
      <p className="category-description">
        Fun and educational watches for kids of all ages, designed to be both playful and functional.
      </p>
      <ProductGrid products={products} />
    </div>
  )
}

export default ChildrenWatches
