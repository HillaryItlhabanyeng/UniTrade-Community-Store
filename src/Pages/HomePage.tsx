import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { useCart } from "../Components/useCart";
import { products } from "../data/products";
import "./HomePage.css";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

// const categoryImages: Record<string, string> = {
//   Electronics: "/hpElite.jpg",
//   Books: "/old.jpg",
//   Furniture: "/selo.jpg",
//   Clothing: "/hoodie.jpg",
//   Other: "/backpack.jpg",
// };

export default function HomePage() {
  const [showMore, setShowMore] = useState(false);
  const { addItem } = useCart();
  const visibleProducts = showMore ? products : products.slice(0, 5);
  // const featuredCategories = categories.filter((category) => category !== "All Categories");

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
const navigate = useNavigate();
  return (
    <div className="ut-page">
      <Navbar />

      {/* <section className="ut-hero">
        <div className="ut-hero-copy">
          <h1>Buy. <span className="ut-accent">Sell.</span> Connect.</h1>
          <h2>Welcome to UniTrade</h2>
          <p>The trusted community marketplace for students, by students.</p>
          <p>Buy and sell items, discover great deals, and connect with your campus community.</p>
          <div className="ut-hero-buttons">
            <button className="ut-btn-primary" onClick={() => navigate("/shop")}>Show Marketplace</button>
            <button className="ut-btn-secondary" onClick={() => navigate("/list-product")}>Sell an Item</button>
          </div>
        </div>

        <div className="ut-hero-image">
          <img src="/student.jpg" alt="Students" />
          <div className="ut-verified-badge"><span className="ut-verified-icon">🛡️</span><div><p className="ut-verified-title">Verified Students</p><p className="ut-verified-subtitle">Safe • Secure • Trusted</p></div></div>
        </div>
      </section> */}

      <section className="homeSection1">
        <div className="homeSectionsContainer1">
          
          <div className="homeMini1">
            <div className="homeMini1Contents">
              <h1>Buy. <span>Sell.</span> Connect.</h1>
              <h2>Welcome to UniTrade</h2>
              <p>The trusted community marketplace for students, by students.</p>
              <p>Buy and sell items, discover great deals, and connect with your campus community.</p>
              <div className="homeMini1Contentsbuttons">
                <button className="homeMini1ContentsPrimary" onClick={() => navigate("/shop")}>Show Marketplace</button>
                <button className="homeMini1ContentsSecondary" onClick={() => navigate("/list-product")}>Sell an Item</button>
              </div>
            </div>

            <img src="/watch.png" alt="watch" />
          </div>

            <div className="homeSectionMiniContainer">
              <div className="homeMini2">
                <h1>Trending</h1>
                <img src="/home-deffuser2.png" alt="trending" />
              </div>
              <div className="homeMini3">
                <h1>Featured</h1>
                <img src="/headsets2.png" alt="featured" />
              </div>
            </div>
        </div>

        <div className="homeSectionsContainer1">
          <div className="homeMini4">
            <h1>Deals</h1>
            <img src="/portable-blender.png" alt="deals" />
          </div>
          <div className="homeMini5">
            <h1>Recently Added</h1>
            <img src="/Tiffany.png" alt="recently added" />
          </div>
          <div className="homeMini6">
            <h1>Top Rated</h1>
            <img src="/Portable-Bluetooth.png" alt="top rated" />
          </div>
        </div>
      </section>

      <section className="ut-section">
        <div className="ut-section-header"><h3>Popular Categories</h3><Link to="/categories" className="ut-view-all">View all categories</Link></div>
        {/* <div className="ut-categories">
          {featuredCategories.map((category) => {
            const categoryName = category;
            const count = products.filter((product) => product.category === categoryName).length;
            return <Link to={`/shop?category=${encodeURIComponent(categoryName)}`} className="ut-category-card" key={categoryName}>
              <img src={categoryImages[categoryName]} alt={categoryName} />
              <span>{categoryName}</span>
              <small>{count} listings</small>
            </Link>;
          })}
        </div> */}
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

      <section className="homePromosection">
        {/* <div className="gbvContainer">
          <h1>SAY NO TO GENDER BASED VIOLENCE</h1>
        </div> */}
        <button className="backTopButton">Back to top</button>
        </section>

      <Footer />
    </div>
  );
}
