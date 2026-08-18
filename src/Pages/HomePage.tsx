import Navbar from "../Components/Navbar";
import { useCart } from "../Components/useCart";
import "./HomePage.css";

const categories = [
  { name: "Electronics", image: "/hpElite.jpg" },
  { name: "Books", image: "/old.jpg" },
  { name: "Furniture", image: "/selo.jpg" },
  { name: "Clothing", image: "/hoodie.jpg" },
];

const listings = [
  {
    id: "proline-intel-celeron",
    title: "PROLINE INTEL CELERON",
    price: "R3699.00",
    image: "/laptop.jpg",
  },
  {
    id: "a4-counter-books",
    title: "A4 Counter Books - 3 Quire",
    price: "R40.00",
    image: "/a4.jpg",
  },
  {
    id: "nordic-classic-desk",
    title: "Nordic Classic Home Office Desk",
    price: "R1500.00",
    image: "/desks.jpg",
  },
  {
    id: "adidas-campus",
    title: "Adidas Campus",
    price: "R1300.00",
    image: "/adidas.jpg",
  },
  {
    id: "iphone-11-64gb",
    title: "iPhone 11 64GB",
    price: "R5200.00",
    image: "/iphone.jpg",
  },
];

export default function HomePage() {
  const { addItem } = useCart();

  const parsePrice = (priceStr: string) =>
    parseFloat(priceStr.replace(/[^0-9.]/g, ""));

  const handleAddToCart = (item: (typeof listings)[number]) => {
    addItem({
      id: item.id,
      name: item.title,
      price: parsePrice(item.price),
      imageUrl: item.image,
    });
  };

  return (
    <div className="ut-page">
      <Navbar />

      <section className="ut-hero">
        <div className="ut-hero-copy">
          <h1>
            Buy. <span className="ut-accent">Sell.</span> Connect.
          </h1>

          <h2>Welcome to UniTrade</h2>

          <p>The trusted community marketplace for students, by students.</p>
          <p>
            Buy and sell items, discover great deals, and connect with your
            campus community.
          </p>

          <div className="ut-hero-buttons">
            <button className="ut-btn-primary">Show Marketplace</button>
            <button className="ut-btn-secondary">Sell an Item</button>
          </div>
        </div>

        <div className="ut-hero-image">
          <img src="/students.jpg" alt="Students" />
          <div className="ut-verified-badge">
            <span className="ut-verified-icon">🛡️</span>
            <div>
              <p className="ut-verified-title">Verified Students</p>
              <p className="ut-verified-subtitle">Safe • Secure • Trusted</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ut-section">
        <h3>Popular Categories</h3>

        <div className="ut-categories">
          {categories.map((cat) => (
            <div className="ut-category-card" key={cat.name}>
              <img src={cat.image} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
          <div className="ut-category-card ut-category-more">
            <span className="ut-more-dots">⋯</span>
            <span>More</span>
          </div>
        </div>
      </section>

      <section className="ut-section">
        <div className="ut-section-header">
          <h3>Featured Listings</h3>
          <a href="#" className="ut-view-all">View all</a>
        </div>

        <div className="ut-listings">
          {listings.map((item) => (
            <div className="ut-listing-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="ut-listing-info">
                <span className="ut-listing-title">{item.title}</span>
                <span className="ut-listing-price">{item.price}</span>
                <button
                  className="ut-add-to-cart"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
