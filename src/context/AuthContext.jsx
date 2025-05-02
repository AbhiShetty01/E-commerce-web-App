"use client"

import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from sessionStorage
    const loggedInUser = sessionStorage.getItem("currentUser")
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser))
    }
    setLoading(false)
  }, [])

  const register = (userData) => {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem("users")) || []

    // Check if user already exists
    const userExists = users.some((user) => user.email === userData.email)
    if (userExists) {
      return { success: false, message: "User with this email already exists" }
    }

    // Add new user
    users.push(userData)
    localStorage.setItem("users", JSON.stringify(users))

    return { success: true, message: "Registration successful" }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
      // Store user in sessionStorage for the session
      sessionStorage.setItem("currentUser", JSON.stringify(user))
      setCurrentUser(user)
      return { success: true }
    } else {
      return { success: false, message: "Account not found. Please register first." }
    }
  }

  const logout = () => {
    sessionStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
