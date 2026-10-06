import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaShoppingBag,
  FaTags,
  FaBoxOpen,
  FaUsers,
  FaThumbtack,
  FaBullhorn,
  FaConciergeBell,
  FaCalendarAlt,
  FaComments,
  FaBell,
  FaShoppingCart,
  FaStar,
  FaUser,
  FaCog,
  FaEnvelope,
  FaPlus,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { supabase } from "../lib/supabaseClient";
import { useCart } from "./useCart";
import { useSaved } from "./useSaved";

import "./SideNav.css";

/* =========================================================
   MENU
   Every path below exists in App.tsx.
   "also" lists related pages that should keep the item lit,
   for example /product-details/12 keeps "Browse listings" lit.
========================================================= */

type Leaf = {
  label: string;
  path: string;
  icon?: ReactNode;
  also?: string[];
  badge?: number;
};

const SELL_PATH = "/list-product";

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const { itemCount } = useCart();
  const { savedItems } = useSaved();

  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  /* =======================================================
     CURRENT USER (name + photo from the profiles table)
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (!session) {
        setSignedIn(false);
        setUserName("");
        setAvatarUrl("");
        return;
      }

      setSignedIn(true);

      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();

      if (cancelled) return;

      setUserName(data?.full_name || session.user.email || "My account");
      setAvatarUrl(data?.avatar_url || "");
      setAvatarFailed(false);
    };

    loadUser();

    /* Keep the sidebar right after login / logout in another tab */
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  /* =======================================================
     ACTIVE STATE
  ======================================================= */

  const matches = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const isActive = (item: Leaf) =>
    matches(item.path) || (item.also ?? []).some(matches);

  const activeClass = (item: Leaf) => (isActive(item) ? "active" : "");

  /* =======================================================
     MENU DATA
  ======================================================= */

  const myProducts: Leaf[] = [
    { label: "Selling", path: "/my-listings" },
    { label: "Buying", path: "/buying", also: ["/orders"] },
    {
      label: "Saved",
      path: "/saved",
      badge: savedItems.length,
    },
  ];

  const community: Leaf[] = [
    { label: "Bulletin board", path: "/bulletin-board", icon: <FaThumbtack /> },
    { label: "Announcements", path: "/announcements", icon: <FaBullhorn /> },
    { label: "Services", path: "/services", icon: <FaConciergeBell /> },
    { label: "Events", path: "/events", icon: <FaCalendarAlt /> },
  ];

  const groupHasActive = (items: Leaf[]) => items.some(isActive);

  /* Groups open by themselves when you are inside them */
  const [myProductsOpen, setMyProductsOpen] = useState(() =>
    groupHasActive(myProducts)
  );
  const [communityOpen, setCommunityOpen] = useState(() =>
    groupHasActive(community)
  );

  useEffect(() => {
    if (groupHasActive(myProducts)) setMyProductsOpen(true);
    if (groupHasActive(community)) setCommunityOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* =======================================================
     LOG OUT
  ======================================================= */

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) return;

    await supabase.auth.signOut();

    /* Clear data saved by the login page */
    localStorage.removeItem("unitrade_user");

    navigate("/login");
  };

  /* =======================================================
     SMALL RENDER HELPERS
  ======================================================= */

  const badge = (count?: number) =>
    count && count > 0 ? (
      <span className="side-nav-badge" aria-label={`${count} items`}>
        {count > 99 ? "99+" : count}
      </span>
    ) : null;

  const mainItem = (item: Leaf) => (
    <button
      key={item.path}
      type="button"
      className={`side-nav-item ${activeClass(item)}`}
      onClick={() => navigate(item.path)}
      aria-current={isActive(item) ? "page" : undefined}
    >
      <span className="side-nav-icon">{item.icon}</span>
      <span className="side-nav-label">{item.label}</span>
      {badge(item.badge)}
    </button>
  );

  const subItem = (item: Leaf) => (
    <button
      key={item.path}
      type="button"
      className={`submenu-item ${activeClass(item)}`}
      onClick={() => navigate(item.path)}
      aria-current={isActive(item) ? "page" : undefined}
    >
      {item.icon}
      <span>{item.label}</span>
      {badge(item.badge)}
    </button>
  );

  const initial = (userName || "U").charAt(0).toUpperCase();

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <aside className="side-nav" aria-label="Main navigation">
      {/* LOGO */}
      <div className="side-nav-logo">
        <img
          src="/UniTrade logo 2.png"
          alt="UniTrade Campus Marketplace"
          className="unitrade-logo"
          onClick={() => navigate("/home")}
        />
      </div>

      {/* SELL BUTTON */}
      <div className="side-nav-sell">
        <button
          type="button"
          className="side-nav-sell-button"
          onClick={() => navigate(SELL_PATH)}
        >
          <FaPlus />
          <span>Sell an item</span>
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="side-nav-menu">
        {mainItem({ label: "Home", path: "/home", icon: <FaHome /> })}

        {mainItem({
          label: "Browse listings",
          path: "/shop",
          icon: <FaShoppingBag />,
          also: ["/product-details"],
        })}

        {mainItem({
          label: "Categories",
          path: "/categories",
          icon: <FaTags />,
        })}

        {/* MY PRODUCTS */}
        <button
          type="button"
          className="side-nav-item side-nav-parent"
          onClick={() => setMyProductsOpen((open) => !open)}
          aria-expanded={myProductsOpen}
        >
          <span className="side-nav-item-left">
            <span className="side-nav-icon">
              <FaBoxOpen />
            </span>
            <span>My products</span>
          </span>

          {myProductsOpen ? (
            <FaChevronUp className="side-nav-arrow" />
          ) : (
            <FaChevronDown className="side-nav-arrow" />
          )}
        </button>

        {myProductsOpen && (
          <div className="side-nav-submenu">{myProducts.map(subItem)}</div>
        )}

        {/* COMMUNITY */}
        <button
          type="button"
          className="side-nav-item side-nav-parent"
          onClick={() => setCommunityOpen((open) => !open)}
          aria-expanded={communityOpen}
        >
          <span className="side-nav-item-left">
            <span className="side-nav-icon">
              <FaUsers />
            </span>
            <span>Community</span>
          </span>

          {communityOpen ? (
            <FaChevronUp className="side-nav-arrow" />
          ) : (
            <FaChevronDown className="side-nav-arrow" />
          )}
        </button>

        {communityOpen && (
          <div className="side-nav-submenu">{community.map(subItem)}</div>
        )}

        {mainItem({
          label: "Messages",
          path: "/messages",
          icon: <FaComments />,
        })}

        {mainItem({
          label: "Notifications",
          path: "/notifications",
          icon: <FaBell />,
        })}

        {mainItem({
          label: "Cart",
          path: "/cart",
          icon: <FaShoppingCart />,
          also: ["/checkout"],
          badge: itemCount,
        })}

        {mainItem({
          label: "Ratings & reviews",
          path: "/ratings-reviews",
          icon: <FaStar />,
          also: ["/ratingsreviews"],
        })}

        {mainItem({ label: "Profile", path: "/profile", icon: <FaUser /> })}

        {mainItem({ label: "Settings", path: "/settings", icon: <FaCog /> })}

        {mainItem({
          label: "Contact us",
          path: "/contact",
          icon: <FaEnvelope />,
        })}
      </nav>

      {/* USER + LOG OUT */}
      <div className="side-nav-bottom">
        {signedIn ? (
          <>
            <button
              type="button"
              className="side-nav-user"
              onClick={() => navigate("/profile")}
              title="View my profile"
            >
              {avatarUrl && !avatarFailed ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="side-nav-user-avatar"
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <span className="side-nav-user-avatar side-nav-user-initial">
                  {initial}
                </span>
              )}

              <span className="side-nav-user-name">{userName}</span>
            </button>

            <button
              type="button"
              className="side-nav-logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Log out</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            className="side-nav-logout"
            onClick={() => navigate("/login")}
          >
            <FaUser />
            <span>Log in</span>
          </button>
        )}
      </div>
    </aside>
  );
}