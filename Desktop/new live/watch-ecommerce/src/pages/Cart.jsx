"use client"

import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import "./Cart.css"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some products first.")
      return
    }

    navigate("/checkout")
  }

  return (
    <div className="cart-page">
      <h1 className="section-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
                    +
                  </button>
                </div>

                <div className="item-total">₹{(item.price * item.quantity).toLocaleString()}</div>

                <button onClick={() => removeFromCart(item.id)} className="remove-item">
                  ✕ remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>

            <button onClick={handleProceedToCheckout} className="checkout-button">
              Proceed to Checkout
            </button>

            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
