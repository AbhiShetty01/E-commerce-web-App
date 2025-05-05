"use client"

import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import "./Wishlist.css"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className="wishlist-page">
      <h1 className="section-title">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <button className="remove-wishlist-item" onClick={() => removeFromWishlist(item.id)}>
                ✕
              </button>

              <Link to={`/product/${item.id}`} className="wishlist-item-link">
                <div className="wishlist-item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>

                <div className="wishlist-item-info">
                  <h3>{item.name}</h3>
                  <p className="wishlist-item-price">₹{item.price.toLocaleString()}</p>
                </div>
              </Link>

              <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
