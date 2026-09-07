import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { useCart } from "../Components/useCart";
import { getProduct } from "../data/products";
import "./ProductDetailsPage.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = id ? getProduct(id) : undefined;
  const [added, setAdded] = useState(false);

  if (!product) {
    return <><Navbar /><main className="product-not-found"><h1>Item not found</h1><Link to="/shop">Return to marketplace</Link></main></>;
  }

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.title, price: product.price, seller: product.seller, category: product.category, location: product.location, imageUrl: product.image });
    setAdded(true);
  };

  return <div className="product-details-page">
    <Navbar />
    <main className="product-details-content">
      <button type="button" className="back-link" onClick={() => navigate(-1)}><FaArrowLeft /> Back to marketplace</button>
      <div className="product-details-layout">
        <div className="product-details-image"><img src={product.image} alt={product.title} /></div>
        <section className="product-details-info">
          <span className="product-category-label">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="product-details-price">R{product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-facts"><span><strong>Condition</strong>{product.condition}</span><span><strong>Seller</strong>{product.seller}</span><span><strong>Location</strong><FaMapMarkerAlt /> {product.location}</span></div>
          <button type="button" className="product-add-button" onClick={handleAddToCart}><FaShoppingCart /> {added ? "Added to cart" : "Add to cart"}</button>
          {added && <p className="product-added-message"><FaCheckCircle /> Item added. <Link to="/cart">View cart</Link></p>}
        </section>
      </div>
    </main>
  </div>;
}