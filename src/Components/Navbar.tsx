import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

type Props = {
  userName?: string;
  cartCount?: number;
  notificationCount?: number;
  showLinks?: boolean;
};

export default function Navbar({
  userName = "Sipho",
  cartCount = 2,
  notificationCount = 3,
  showLinks = true,
}: Props) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <div className="logo-text-group">
            <span className="logo-text">
              Uni<span className="logo-highlight">Trade</span>
            </span>
            <span className="logo-subtext">Campus Marketplace</span>
          </div>
        </Link>

        <div className="navbar-search">
          <input type="text" placeholder="Search for items, users or categories..." />
          <button aria-label="Search">🔍</button>
        </div>

        <div className="navbar-actions">
          <Link to="/messages" className="nav-action">
            <span className="action-icon">💬</span>
            <span className="action-label">Messages</span>
          </Link>

          <Link to="/notifications" className="nav-action">
            <span className="action-icon-wrapper">
              <span className="action-icon">🔔</span>
              {notificationCount > 0 && (
                <span className="badge">{notificationCount}</span>
              )}
            </span>
            <span className="action-label">Notifications</span>
          </Link>

          <Link to="/saved" className="nav-action">
            <span className="action-icon">🤍</span>
            <span className="action-label">Saved</span>
          </Link>

          <Link to="/cart" className="nav-action">
            <span className="action-icon-wrapper">
              <span className="action-icon">🛒</span>
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </span>
            <span className="action-label">Cart</span>
          </Link>

          <Link to="/account" className="nav-profile">
            <span className="profile-avatar">👤</span>
            <span className="profile-name">{userName}</span>
            <span className="profile-chevron">⌄</span>
          </Link>
        </div>
      </nav>

      {showLinks && (
        <div className="nav-links-row">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>
            Shop
          </NavLink>
          <NavLink to="/browse-listings" className={({ isActive }) => (isActive ? "active" : "")}>
            Browse Listings
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
            Categories
          </NavLink>
          <NavLink to="/bulletin-board" className={({ isActive }) => (isActive ? "active" : "")}>
            Bulletin Board
          </NavLink>
          <NavLink to="/account" className={({ isActive }) => (isActive ? "active" : "")}>
            My Orders
          </NavLink>
          <NavLink to="/my-listings" className={({ isActive }) => (isActive ? "active" : "")}>
            My Listings
          </NavLink>
          <NavLink to="/ratings-reviews" className={({ isActive }) => (isActive ? "active" : "")}>
            Ratings & Reviews
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </div>
      )}
    </>
  );
}