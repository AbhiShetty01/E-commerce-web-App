"use client"

import { createContext, useState, useEffect, useContext } from "react"

const WishlistContext = createContext()

export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    // Load wishlist from sessionStorage
    const savedWishlist = sessionStorage.getItem("wishlist")
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist)
      setWishlistItems(parsedWishlist)
      setWishlistCount(parsedWishlist.length)
    }
  }, [])

  useEffect(() => {
    // Save wishlist to sessionStorage whenever it changes
    sessionStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    setWishlistCount(wishlistItems.length)
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Item already in wishlist, do nothing
        return prevItems
      } else {
        // Add new item to wishlist
        return [...prevItems, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
