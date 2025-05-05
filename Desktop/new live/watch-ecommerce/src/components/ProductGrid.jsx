import ProductCard from "./ProductCard"
import "./ProductGrid.css"

const ProductGrid = ({ products, title }) => {
  return (
    <div className="product-grid-container">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
