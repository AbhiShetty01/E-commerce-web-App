import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { getProductById } from "../data/products"
import "./ProductDetails.css"

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchedProduct = getProductById(Number.parseInt(id))
    if (fetchedProduct) {
      setProduct(fetchedProduct)
    }
  }, [id])

  if (!product) {
    return <div className="loading">Loading product details...</div>
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-detail-image" />
        </div>

        <div className="product-info-container">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">₹{product.price.toLocaleString()}</p>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={decrementQuantity} className="quantity-btn">
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button onClick={incrementQuantity} className="quantity-btn">
                +
              </button>
            </div>

            <div className="action-buttons">
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`wishlist-button ${isInWishlist(product.id) ? "in-wishlist" : ""}`}
              >
                {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>

          <div className="product-meta">
            <p>
              <strong>Category:</strong> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
            <p>
              <strong>Availability:</strong> {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
