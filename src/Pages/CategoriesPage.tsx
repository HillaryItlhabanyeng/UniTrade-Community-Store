import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./CategoriesPage.css";

const categoryData = [
  {
    name: "Electronics",
    image: "/hpElite.jpg",
    count: 34,
    description: "Laptops, phones, accessories & more",
  },
  {
    name: "Books",
    image: "/old.jpg",
    count: 21,
    description: "Textbooks, novels & study guides",
  },
  {
    name: "Furniture",
    image: "/selo.jpg",
    count: 15,
    description: "Desks, chairs, storage & decor",
  },
  {
    name: "Clothing",
    image: "/hoodie.jpg",
    count: 18,
    description: "Hoodies, shoes & campus wear",
  },
  {
    name: "Other",
    image: "/backpack.jpg",
    count: 8,
    description: "Everything else worth trading",
  },
];

export default function CategoriesPage() {
  return (
    <div className="cat-page">
      <Navbar />

      <div className="cat-page-header">
        <div>
          <h1>Categories</h1>
          <p>Browse listings by category</p>
        </div>
      </div>

      <div className="cat-grid">
        {categoryData.map((cat) => (
          <Link
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="cat-card"
            key={cat.name}
          >
            <div className="cat-card-image">
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="cat-card-info">
              <span className="cat-card-title">{cat.name}</span>
              <span className="cat-card-count">{cat.count} listings</span>
              <p className="cat-card-desc">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}