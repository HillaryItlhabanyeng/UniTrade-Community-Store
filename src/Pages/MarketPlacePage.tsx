import  { useState } from "react";
import Navbar from "../Components/Navbar";
import "./MarketPlacePage.css";

const categories = ["All Categories", "Electronics", "Books", "Furniture", "Other"];
const conditions = ["All", "New", "Like New", "Good", "Fair"];
const locations = ["Bellville Campus", "Distric 6 Campus", "Mowbray Campus", "Wellington Campus"];

const products = [
  {
    title: "PROLINE INTEL CELERON",
    price: "R3699.00",
    location: "Bellville Campus",
    image: "/laptop.jpg",
  },
  {
    title: "A4 Counter Books - 3 Quire",
    price: "R40.00",
    location: "Wellington Campus",
    image: "/a4.jpg",
  },
  {
    title: "Laptop Stand Laptop Cooling Pad",
    price: "R250.00",
    location: "Mowbray Campus",
    image: "/coolpad.jpg",
  },
  {
    title: "Calculator Scientific - Black - Deli",
    price: "R550.00",
    location: "Distric 6 Campus",
    image: "/calculator.jpg",
  },
  {
    title: "Iphone 11 64GB",
    price: "R5200.00",
    location: "Distric 6 Campus",
    image: "/iphone.jpg",
  },
  {
    title: "Bugani FreeBuds B20 Wireless Earbuds",
    price: "R930.00",
    location: "Mowbray Campus",
    image: "/earbuds.jpg",
  },
  {
    title: "Nortic Classic Home office Desk",
    price: "R1500.00",
    location: "Wellington Campus",
    image: "/desks.jpg",
  },
  {
    title: "Brightup Backpack Zip",
    price: "R765.00",
    location: "Bellville Campus",
    image: "/backpack.jpg",
  },
];

export default function MarketPlacePage() {
  const [activeCategory, setActiveCategory] = useState("All Categories");

  return (
    <div className="mp-page">
      <Navbar />

      <div className="mp-page-header">
        <div>
          <h1>Market Place</h1>
          <p>discover great items from your community</p>
        </div>
        <button className="mp-sell-btn">Sell an Item</button>
      </div>

      <div className="mp-filter-bar">
        <div className="mp-filter-search">
          <span>🔍</span>
          <input type="text" placeholder="Search items......" />
        </div>
        <select defaultValue="All Categories">
          <option>All Categories</option>
          {categories.slice(1).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select defaultValue="All Locations">
          <option>All Locations</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select defaultValue="Price: Any">
          <option>Price: Any</option>
        </select>
        <button className="mp-filters-btn">
          <span>⚙️</span> Filters
        </button>
      </div>

      <div className="mp-body">
        <aside className="mp-sidebar">
          <div className="mp-sidebar-section">
            <h4>Categories</h4>
            <ul className="mp-category-list">
              {categories.map((c) => (
                <li
                  key={c}
                  className={activeCategory === c ? "mp-active" : ""}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mp-sidebar-section">
            <h4>Conditions</h4>
            {conditions.map((cond) => (
              <label className="mp-checkbox" key={cond}>
                <input type="checkbox" />
                <span>{cond}</span>
              </label>
            ))}
          </div>

          <div className="mp-sidebar-section">
            <h4>Location</h4>
            {locations.map((loc) => (
              <label className="mp-checkbox" key={loc}>
                <input type="checkbox" />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="mp-results">
          <div className="mp-results-header">
            <span>96 Results found</span>
            <span className="mp-sort">
              Sort By: <strong>Newest First ▾</strong>
            </span>
          </div>

          <div className="mp-grid">
            {products.map((p) => (
              <div className="mp-card" key={p.title}>
                <div className="mp-card-image">
                  <img src={p.image} alt={p.title} />
                  <button className="mp-fav">♡</button>
                </div>
                <div className="mp-card-info">
                  <span className="mp-card-title">{p.title}</span>
                  <span className="mp-card-price">{p.price}</span>
                  <span className="mp-card-location">📍 {p.location}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mp-pagination">
            <button className="mp-page-nav">‹</button>
            <button className="mp-page-num mp-active">1</button>
            <button className="mp-page-num">2</button>
            <button className="mp-page-num">3</button>
            <button className="mp-page-num">4</button>
            <span className="mp-page-dots">•••</span>
            <button className="mp-page-num">10</button>
            <button className="mp-page-nav">›</button>
          </div>
        </main>
      </div>
    </div>
  );
}