import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import "./Checkout.css"

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [isGuest, setIsGuest] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Karnataka",
    pincode: "",
  })

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
    // Redirect if cart is empty
    if (cartItems.length === 0 && !orderPlaced) {
      navigate("/cart")
      return
    }

    // Check if user is logged in
    if (!currentUser && !isGuest) {
      setShowLoginPrompt(true)
    } else if (currentUser) {
      // Pre-fill form with user data
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        state: currentUser.state || "Karnataka",
        pincode: currentUser.pincode || "",
      })
    }
  }, [currentUser, cartItems, navigate, isGuest, orderPlaced])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContinueAsGuest = () => {
    setIsGuest(true)
    setShowLoginPrompt(false)
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // In a real app, you would send the order to a server
    // For this demo, we'll just show a success message
    setOrderPlaced(true)
    clearCart()

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "Karnataka",
      pincode: "",
    })
  }

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="order-confirmation-content">
          <h1>Order Confirmed!</h1>
          <p>Thank you for shopping with us.</p>
          <button onClick={() => navigate("/")} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (showLoginPrompt) {
    return (
      <div className="login-prompt">
        <div className="login-prompt-content">
          <h2>Login or Continue as Guest</h2>
          <p>Please login to your account or continue as a guest to complete your purchase.</p>
          <div className="login-prompt-buttons">
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
            <button onClick={handleContinueAsGuest} className="guest-button">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1 className="section-title">Checkout</h1>

      <div className="checkout-content">
        <div className="checkout-form-container">
          <h2>Shipping Information</h2>

          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <select id="state" name="state" value={formData.state} onChange={handleChange} required>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  required
                />
              </div>
            </div>

            <h2>Payment Method</h2>
            <div className="payment-method">
              <label className="payment-option">
                <input type="radio" name="payment" value="cod" checked readOnly />
                <span>Cash on Delivery</span>
              </label>
            </div>

            <button type="submit" className="place-order-button">
              Place Order
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="order-item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
