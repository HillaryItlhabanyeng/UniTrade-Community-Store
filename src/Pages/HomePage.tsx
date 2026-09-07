import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { useCart } from "../Components/useCart";
import { categories, products } from "../data/products";
import "./HomePage.css";

const categoryImages: Record<string, string> = {
  Electronics: "/hpElite.jpg",
  Books: "/old.jpg",
  Furniture: "/selo.jpg",
  Clothing: "/hoodie.jpg",
  Other: "/backpack.jpg",
};

export default function HomePage() {
  const [showMore, setShowMore] = useState(false);
  const { addItem } = useCart();
  const visibleProducts = showMore ? products : products.slice(0, 5);
  const featuredCategories = categories.filter((category) => category !== "All Categories");

  const handleAddToCart = (product: typeof products[number]) => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      seller: product.seller,
      category: product.category,
      location: product.location,
      imageUrl: product.image,
    });
  };

  return (
    <div className="ut-page">
      <Navbar />

      <section className="ut-hero">
        <div className="ut-hero-copy">
          <h1>Buy. <span className="ut-accent">Sell.</span> Connect.</h1>
          <h2>Welcome to UniTrade</h2>
          <p>The trusted community marketplace for students, by students.</p>
          <p>Buy and sell items, discover great deals, and connect with your campus community.</p>
          <div className="ut-hero-buttons">
            <Link className="ut-btn-primary" to="/shop">Show Marketplace</Link>
            <Link className="ut-btn-secondary" to="/list-product">Sell an Item</Link>
          </div>
        </div>

        <div className="ut-hero-image">
          <img src="/students.jpg" alt="Students" />
          <div className="ut-verified-badge"><span className="ut-verified-icon">🛡️</span><div><p className="ut-verified-title">Verified Students</p><p className="ut-verified-subtitle">Safe • Secure • Trusted</p></div></div>
        </div>
      </section>

      <section className="ut-section">
        <div className="ut-section-header"><h3>Popular Categories</h3><Link to="/categories" className="ut-view-all">View all categories</Link></div>
        <div className="ut-categories">
          {featuredCategories.map((category) => {
            const categoryName = category;
            const count = products.filter((product) => product.category === categoryName).length;
            return <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="ut-category-card" key={categoryName}>
              <img src={categoryImages[categoryName]} alt={categoryName} />
              <span>{categoryName}</span>
              <small>{count} listings</small>
            </Link>;
          })}
        </div>
      </section>

      <section className="ut-section">
        <div className="ut-section-header"><div><h3>Featured Listings</h3><p className="ut-section-subtitle">Fresh finds from students across campus</p></div><Link to="/shop" className="ut-view-all">View all listings</Link></div>
        <div className="ut-listings">
          {visibleProducts.map((product) => <article className="ut-listing-card" key={product.id}>
            <Link to={`/product/${product.id}`} className="ut-listing-image-link"><img src={product.image} alt={product.title} /></Link>
            <div className="ut-listing-info">
              <Link to={`/product/${product.id}`} className="ut-listing-title">{product.title}</Link>
              <span className="ut-listing-price">R{product.price.toFixed(2)}</span>
              <span className="ut-listing-meta"><FaMapMarkerAlt /> {product.location}</span>
              <button type="button" className="ut-add-to-cart" onClick={() => handleAddToCart(product)}><FaShoppingCart /> Add to Cart</button>
            </div>
          </article>)}
        </div>
        <button type="button" className="ut-more-button" onClick={() => setShowMore((current) => !current)}>{showMore ? "Show less" : "More items"}</button>
      </section>
    </div>
  );
}
