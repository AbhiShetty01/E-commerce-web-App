import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Auth.css"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "Karnataka",
    pincode: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { register } = useAuth()
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode")
      return
    }

    // Register user
    const result = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    })

    if (result.success) {
      setSuccess("Registration successful! You can now login.")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <h1>Create an Account</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <select id="state" name="state" value={formData.state} onChange={handleChange}>
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
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
