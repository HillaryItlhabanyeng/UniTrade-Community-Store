import React from "react";
import "./HomePage.css";

const categories = [
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop",
  },
  {
    name: "Books",
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=150&fit=crop",
  },
  {
    name: "Furniture",
    img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=200&h=150&fit=crop",
  },
  {
    name: "Clothing",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=150&fit=crop",
  },
];

const listings = [
  {
    title: "PROLINE INTEL CELERON",
    price: "R3699.00",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop",
  },
  {
    title: "A4 Counter Books - 3 Quire",
    price: "R40.00",
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=150&fit=crop",
  },
  {
    title: "Nordic Classic Home Office Desk",
    price: "R1500.00",
    img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=150&fit=crop",
  },
  {
    title: "Adidas Campus",
    price: "R1300.00",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=150&fit=crop",
  },
  {
    title: "iPhone 11 64GB",
    price: "R5200.00",
    img: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=150&fit=crop",
  },
];

export default function HomePage() {
  return (
    <div className="ut-page">
      <header className="ut-topbar">
        <div className="ut-logo">
          <span className="ut-logo-badge">U</span>

          <div className="ut-logo-text">
            <span className="ut-logo-title">UniTrade</span>
            <span className="ut-logo-subtitle">Campus Marketplace</span>
          </div>
        </div>

        <div className="ut-search">
          <input
            type="text"
            placeholder="Search for items, users or categories..."
          />
          <button>🔍</button>
        </div>
      </header>

      <nav className="ut-nav">
        <a href="#" className="active">
          Home
        </a>
        <a href="#">Browse Listings</a>
        <a href="#">Categories</a>
        <a href="#">Bulletin Board</a>
        <a href="#">My Orders</a>
        <a href="#">My Listings</a>
      </nav>

      <section className="ut-hero">
        <div className="ut-hero-copy">
          <h1>
            Buy. <span className="ut-accent">Sell.</span> Connect.
          </h1>

          <h2>Welcome to UniTrade</h2>

          <p>
            The trusted community marketplace for students, by students.
          </p>

          <div className="ut-hero-buttons">
            <button className="ut-btn-primary">
              Shop Marketplace
            </button>

            <button className="ut-btn-secondary">
              Sell an Item
            </button>
          </div>
        </div>

        <div className="ut-hero-image">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=420&fit=crop"
            alt="Students"
          />
        </div>
      </section>

      <section className="ut-section">
        <h3>Popular Categories</h3>

        <div className="ut-categories">
          {categories.map((cat) => (
            <div className="ut-category-card" key={cat.name}>
              <img src={cat.img} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ut-section">
        <h3>Featured Listings</h3>

        <div className="ut-listings">
          {listings.map((item) => (
            <div className="ut-listing-card" key={item.title}>
              <img src={item.img} alt={item.title} />

              <div className="ut-listing-info">
                <span className="ut-listing-title">{item.title}</span>
                <span className="ut-listing-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}