import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RatingsReviewsPage.css";

import {
  FaSearch,
  FaRegCommentDots,
  FaRegBell,
  FaRegHeart,
  FaShoppingBag,
  FaChevronDown,
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type ReviewerRole = "buyer" | "seller";

interface Review {
  id: string;
  name: string;
  role: ReviewerRole;
  /**
   * Photo shown in the review card. Same pattern as the logo/illustration
   * images on the other pages: a root-relative path into /public. Save the
   * actual photo files as public/avatars/<name>.png (or .jpg) to match.
   */
  image: string;
  /** Shown instead of the photo if it fails to load (see AvatarImg below). */
  initials: string;
  avatarColor: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  item?: string;
}

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Lerato M.",
    role: "buyer",
    image: "/avatars/lerato.png",
    initials: "LM",
    avatarColor: "#f0b64c",
    date: "2 days ago",
    rating: 5,
    title: "Great quality and fast delivery!",
    body: "The laptop was in excellent condition and the seller was friendly. High recommend!",
    item: "HP EliteBook 840 G5",
  },
  {
    id: "r2",
    name: "Wazeer J.",
    role: "seller",
    image: "/avatars/wazeer.png",
    initials: "WJ",
    avatarColor: "#6c8ec9",
    date: "3 days ago",
    rating: 4,
    title: "Smooth transaction",
    body: "Buyer was responsive and the payment was processed quickly. Great experience overall.",
  },
  {
    id: "r3",
    name: "Ayesha D.",
    role: "buyer",
    image: "/avatars/ayesha.png",
    initials: "AD",
    avatarColor: "#c97fb0",
    date: "1 week ago",
    rating: 5,
    title: "Exactly as described",
    body: "The product matched the description perfectly. Very happy with my purchase.",
    item: "Wireless Headphones",
  },
  {
    id: "r4",
    name: "Thabo N.",
    role: "seller",
    image: "/avatars/thabo.png",
    initials: "TN",
    avatarColor: "#5aa9a3",
    date: "1 week ago",
    rating: 4,
    title: "Reliable buyer",
    body: "Paid on time and picked up promptly. Would gladly sell to again.",
  },
  {
    id: "r5",
    name: "Naledi K.",
    role: "buyer",
    image: "/avatars/naledi.png",
    initials: "NK",
    avatarColor: "#e08a6b",
    date: "2 weeks ago",
    rating: 3,
    title: "Good, but delivery took a while",
    body: "Item was fine and as described, just took a bit longer to arrive than expected.",
    item: "Scientific Calculator",
  },
  {
    id: "r6",
    name: "Sipho R.",
    role: "seller",
    image: "/avatars/sipho-r.png",
    initials: "SR",
    avatarColor: "#8b7fd9",
    date: "3 weeks ago",
    rating: 5,
    title: "Excellent buyer to work with",
    body: "Clear communication throughout and collected the item the same day.",
  },
];

/*
  These summary numbers represent your FULL dataset (matching the Figma
  design), while REVIEWS above is just the small sample actually rendered
  on this page. That split is normal — in a real backend, the total counts
  would come from the server's pagination metadata, while REVIEWS would be
  just the current page of results. Once you have a real API, replace these
  four constants with values from that response instead of hardcoding them.
*/
const OVERALL_RATING = 4.7;
const TOTAL_REVIEWS_COUNT = 128;
const BUYER_REVIEWS_COUNT = 96;
const SELLER_REVIEWS_COUNT = 32;
const RATING_BREAKDOWN = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const REVIEWS_PER_PAGE = 3;

type TabKey = "all" | "buyers" | "sellers";
type SortKey = "recent" | "oldest" | "highest" | "lowest";

const StarRow: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  return (
    <span className="star-row" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < Math.round(rating) ? (
          <FaStar key={i} size={size} className="star star-filled" />
        ) : (
          <FaRegStar key={i} size={size} className="star star-empty" />
        )
      )}
    </span>
  );
};

/**
 * Renders the photo if it loads; if the path is missing/broken (e.g. the
 * real photo files haven't been added to public/avatars/ yet), falls back
 * to a colored circle with the person's initials instead of a broken-image
 * icon.
 */
const AvatarImg: React.FC<{
  src: string;
  alt: string;
  initials: string;
  color: string;
  className: string;
  fallbackClassName: string;
}> = ({ src, alt, initials, color, className, fallbackClassName }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={fallbackClassName} style={{ background: color }}>
        {initials}
      </div>
    );
  }

  return (
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
};

const RatingsReviewsPage: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [sortOrder, setSortOrder] = useState<SortKey>("recent");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Brief simulated load on first render. Swap for a real fetch() pending
  // state once reviews come from a live backend instead of the REVIEWS constant.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredReviews = useMemo(() => {
    let list = REVIEWS;
    if (activeTab === "buyers") list = list.filter((r) => r.role === "buyer");
    if (activeTab === "sellers") list = list.filter((r) => r.role === "seller");

    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.title.toLowerCase().includes(query) ||
          r.body.toLowerCase().includes(query)
      );
    }

    const sorted = [...list];
    if (sortOrder === "highest") sorted.sort((a, b) => b.rating - a.rating);
    if (sortOrder === "lowest") sorted.sort((a, b) => a.rating - b.rating);
    if (sortOrder === "oldest") sorted.reverse();
    return sorted;
  }, [activeTab, sortOrder, search]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE));
  const pageReviews = filteredReviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  const changeTab = (tab: TabKey) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="ratings-page">
      {/* ===================== HEADER ===================== */}
      <header className="site-header">
        <div className="site-header-top">
          <Link to="/" className="site-logo">
            <img src="/image.png" alt="UniTrade Campus Marketplace" />
          </Link>

          <div className="site-search">
            <input
              type="text"
              placeholder="Search for items, users or categories..."
              aria-label="Search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <button type="button" aria-label="Search">
              <FaSearch />
            </button>
          </div>

          <div className="site-header-actions">
            <button type="button" className="header-icon-btn" aria-label="Messages">
              <FaRegCommentDots />
              <span className="icon-btn-label">Messages</span>
            </button>

            <button type="button" className="header-icon-btn" aria-label="Notifications">
              <FaRegBell />
              <span className="icon-badge">3</span>
              <span className="icon-btn-label">Notifications</span>
            </button>

            <button type="button" className="header-icon-btn" aria-label="Saved">
              <FaRegHeart />
              <span className="icon-btn-label">Saved</span>
            </button>

            <button type="button" className="header-icon-btn" aria-label="Cart">
              <FaShoppingBag />
              <span className="icon-badge icon-badge-accent">2</span>
              <span className="icon-btn-label">Cart</span>
            </button>

            <button type="button" className="user-menu">
              <AvatarImg
                src="/avatars/sipho.png"
                alt="Sipho"
                initials="S"
                color="#304967"
                className="user-avatar-img"
                fallbackClassName="user-avatar-fallback"
              />
              <span className="user-name">Sipho</span>
              <FaChevronDown size={11} />
            </button>
          </div>
        </div>

        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/browse-listings">Browse Listings</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/bulletin-board">Bulletin Board</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/my-listings">My Listings</Link>
          <Link to="/ratings-reviews" className="active">
            Ratings &amp; Reviews
          </Link>
        </nav>
      </header>

      {/* ===================== MAIN ===================== */}
      <main className="ratings-main">
        <div className="ratings-page-heading">
          <div>
            <h1>Ratings &amp; Reviews</h1>
            <p>See what other students and sellers are saying about their experience on UniTrade.</p>
          </div>

          <button
            type="button"
            className="write-review-btn"
            onClick={() => navigate("/write-review")}
          >
            <FaStar size={13} />
            Write a Review
          </button>
        </div>

        <div className="ratings-content">
          {/* ---------- LEFT: SUMMARY ---------- */}
          <aside className="rating-summary-card">
            <h2>Overall Rating</h2>

            <div className="rating-summary-score">{OVERALL_RATING.toFixed(1)}</div>
            <StarRow rating={OVERALL_RATING} size={22} />
            <p className="rating-summary-count">Based on {TOTAL_REVIEWS_COUNT} reviews</p>

            <div className="rating-breakdown">
              {RATING_BREAKDOWN.map((row) => (
                <div className="rating-breakdown-row" key={row.stars}>
                  <span className="rating-breakdown-label">{row.stars} Stars</span>
                  <div className="rating-breakdown-track">
                    <div
                      className="rating-breakdown-fill"
                      style={{ ["--fill-percent" as string]: `${row.percent}%` }}
                    />
                  </div>
                  <span className="rating-breakdown-percent">{row.percent}%</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ---------- RIGHT: REVIEWS ---------- */}
          <section className="reviews-panel">
            <div className="reviews-panel-header">
              <div className="reviews-tabs">
                <button
                  type="button"
                  className={activeTab === "all" ? "active" : ""}
                  onClick={() => changeTab("all")}
                >
                  All Reviews({TOTAL_REVIEWS_COUNT})
                </button>
                <button
                  type="button"
                  className={activeTab === "buyers" ? "active" : ""}
                  onClick={() => changeTab("buyers")}
                >
                  From Buyers({BUYER_REVIEWS_COUNT})
                </button>
                <button
                  type="button"
                  className={activeTab === "sellers" ? "active" : ""}
                  onClick={() => changeTab("sellers")}
                >
                  From Sellers({SELLER_REVIEWS_COUNT})
                </button>
              </div>

              <div className="reviews-sort">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortKey)}
                  aria-label="Sort reviews"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
                <FaChevronDown size={11} className="reviews-sort-icon" />
              </div>
            </div>

            {isLoading ? (
              <div className="review-list">
                {[1, 2, 3].map((n) => (
                  <div className="review-card review-skeleton" key={n} aria-hidden="true">
                    <div className="skeleton-circle" />
                    <div className="skeleton-lines">
                      <div className="skeleton-line skeleton-line-short" />
                      <div className="skeleton-line skeleton-line-medium" />
                      <div className="skeleton-line skeleton-line-long" />
                      <div className="skeleton-line skeleton-line-long" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="review-list">
                {pageReviews.length === 0 && (
                  <p className="review-empty">No reviews in this category yet.</p>
                )}

                {pageReviews.map((review) => (
                  <article className="review-card" key={review.id}>
                    <AvatarImg
                      src={review.image}
                      alt={review.name}
                      initials={review.initials}
                      color={review.avatarColor}
                      className="review-avatar-img"
                      fallbackClassName="review-avatar-fallback"
                    />

                    <div className="review-content">
                      <div className="review-meta">
                        <span className="review-name">{review.name}</span>
                        <span className={`review-role review-role-${review.role}`}>
                          {review.role === "buyer" ? "Buyer" : "Seller"}
                        </span>
                      </div>

                      <div className="review-rating-row">
                        <StarRow rating={review.rating} />
                        <span className="review-date">• {review.date}</span>
                      </div>

                      <h3 className="review-title">{review.title}</h3>
                      <p className="review-body">{review.body}</p>

                      {review.item && (
                        <p className="review-item">
                          <strong>Item:</strong> {review.item}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!isLoading && totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  className="pagination-arrow"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <FaChevronLeft size={12} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    type="button"
                    key={num}
                    className={num === page ? "active" : ""}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  className="pagination-arrow"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default RatingsReviewsPage;