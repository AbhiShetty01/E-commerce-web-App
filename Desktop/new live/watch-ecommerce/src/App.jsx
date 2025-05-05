import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import MenWatches from "./pages/MenWatches"
import WomenWatches from "./pages/WomenWatches"
import ChildrenWatches from "./pages/ChildrenWatches"
import Offers from "./pages/Offers"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import ProductDetails from "./pages/ProductDetails"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import "./App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/men" element={<MenWatches />} />
                  <Route path="/women" element={<WomenWatches />} />
                  <Route path="/children" element={<ChildrenWatches />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
              </main>
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
