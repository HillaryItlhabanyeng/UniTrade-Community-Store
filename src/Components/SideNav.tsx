import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBoxOpen,
  FaShoppingBag,
  FaBullhorn,
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { supabase } from "../lib/supabaseClient";

import "./SideNav.css";

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [myProductsOpen, setMyProductsOpen] = useState(true);
  const [communityOpen, setCommunityOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const activeClass = (path: string) => (isActive(path) ? "active" : "");

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) return;

    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className="side-nav">
      {/* LOGO */}
      <div className="side-nav-logo">
        <img
          src="/UniTrade logo 2.png"
          alt="UniTrade Campus Marketplace"
          className="unitrade-logo"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="side-nav-menu">
        {/* HOME */}
        <button
          type="button"
          className={`side-nav-item ${activeClass("/home")}`}
          onClick={() => navigate("/home")}
        >
          <FaHome className="side-nav-icon" />
          <span>Home</span>
        </button>

        {/* MY PRODUCTS */}
        <button
          type="button"
          className="side-nav-item side-nav-parent"
          onClick={() => setMyProductsOpen(!myProductsOpen)}
        >
          <span className="side-nav-item-left">
            <FaBoxOpen className="side-nav-icon" />
            <span>My products</span>
          </span>

          {myProductsOpen ? (
            <FaChevronUp className="side-nav-arrow" />
          ) : (
            <FaChevronDown className="side-nav-arrow" />
          )}
        </button>

        {myProductsOpen && (
          <div className="side-nav-submenu">
            <button
              type="button"
              className={`submenu-item ${activeClass("/my-listings")}`}
              onClick={() => navigate("/my-listings")}
            >
              Selling
            </button>

            <button
              type="button"
              className={`submenu-item ${activeClass("/buying")}`}
              onClick={() => navigate("/buying")}
            >
              Buying
            </button>

            <button
              type="button"
              className={`submenu-item ${activeClass("/saved")}`}
              onClick={() => navigate("/saved")}
            >
              Saved
            </button>
          </div>
        )}

        {/* PRODUCTS */}
        <button
          type="button"
          className={`side-nav-item ${activeClass("/products")}`}
          onClick={() => navigate("/products")}
        >
          <FaShoppingBag className="side-nav-icon" />
          <span>Products</span>
        </button>

        {/* COMMUNITY */}
        <button
          type="button"
          className="side-nav-item side-nav-parent"
          onClick={() => setCommunityOpen(!communityOpen)}
        >
          <span className="side-nav-item-left">
            <FaUsers className="side-nav-icon" />
            <span>Community</span>
          </span>

          {communityOpen ? (
            <FaChevronUp className="side-nav-arrow" />
          ) : (
            <FaChevronDown className="side-nav-arrow" />
          )}
        </button>

        {communityOpen && (
          <div className="side-nav-submenu">
            <button
              type="button"
              className={`submenu-item ${activeClass("/announcements")}`}
              onClick={() => navigate("/announcements")}
            >
              <FaBullhorn />
              <span>Announcements</span>
            </button>

            <button
              type="button"
              className={`submenu-item ${activeClass("/services")}`}
              onClick={() => navigate("/services")}
            >
              <FaComments />
              <span>Services</span>
            </button>

            <button
              type="button"
              className={`submenu-item ${activeClass("/events")}`}
              onClick={() => navigate("/events")}
            >
              <FaCalendarAlt />
              <span>Events</span>
            </button>
          </div>
        )}

        {/* PROFILE */}
        <button
          type="button"
          className={`side-nav-item ${activeClass("/profile")}`}
          onClick={() => navigate("/profile")}
        >
          <FaUser className="side-nav-icon" />
          <span>Profile</span>
        </button>
      </nav>

      {/* LOGOUT */}
      <div className="side-nav-bottom">
        <button
          type="button"
          className="side-nav-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}