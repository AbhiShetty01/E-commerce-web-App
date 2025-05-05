import { useEffect, useState } from "react"
import ProductGrid from "../components/ProductGrid"
import { getOffersWatches } from "../data/products"
import "./Offers.css"

const Offers = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getOffersWatches())
  }, [])

  return (
    <div className="offers-page">
      <div className="offers-banner">
        <h1>Special Offers</h1>
        <p>Limited time deals on premium watches. Up to 20% off!</p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}

export default Offers
