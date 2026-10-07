import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";
import { supabase } from "../lib/supabaseClient";
import { mapProductRow } from "../lib/products";
import type { Product } from "../types/product";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const visibleProducts = showMore ? products : products.slice(0, 5);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(24);

      if (cancelled) return;

      if (error) {
        console.error("Failed to fetch featured products:", error);
        return;
      }

      setProducts((data ?? []).map(mapProductRow));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="ut-page">
      <Navbar />

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

      <section className="homeSection2">
        <div className="homeSection2Header">
          <h1>Trending</h1>
          <p onClick={() => navigate("/products")}>View all <FaAngleDoubleRight /></p>
        </div>
        <div className="homeSection2Contents">
          <div className="homeSection2Card">
            <img src="/samsung1.png" alt="Samsung Galaxy S21" />
            <div className="homeSection2CardText">
              <h2>Samsung Galaxy S21</h2>
              <p>Get your hands on the latest Samsung Ultra!</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone7.png" alt="iPhone 7" />
            <div className="homeSection2CardText">
              <h2>iPhone 7</h2>
              <p>Experience the power of the iPhone 7 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone8.png" alt="iPhone 8" />
            <div className="homeSection2CardText">
              <h2>iPhone 8</h2>
              <p>Experience the power of the iPhone 8 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone11.png" alt="iPhone 11" />
            <div className="homeSection2CardText">
              <h2>iPhone 11</h2>
              <p>Experience the power of the iPhone 11 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone13.png" alt="iPhone 13" />
            <div className="homeSection2CardText">
              <h2>iPhone 13</h2>
              <p>Experience the power of the iPhone 13 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/samsung2.png" alt="Samsung Galaxy S21" />
            <div className="homeSection2CardText">
              <h2>Samsung Galaxy S21</h2>
              <p>Get your hands on the latest Samsung Galaxy S21!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ut-section">
        <div className="ut-section-header">
          <div>
            <h3>Featured Listings</h3>
            <p className="ut-section-subtitle">Fresh finds from students across campus</p>
          </div>
          <Link to="/shop" className="ut-view-all">View all listings</Link>
        </div>
        <div className="ut-listings">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length > 5 && (
          <button
            type="button"
            className="ut-more-button"
            onClick={() => setShowMore((current) => !current)}
          >
            {showMore ? "Show less" : "More items"}
          </button>
        )}
      </section>

      <section className="homeDealsSection">
        <div className="homeDealCard1">
          <div className="homeDealCard1Text">
            <h2>Summer Sale</h2>
            <p>Up to 50% off on selected items</p>
            <button className="homeDealCard2Button" onClick={() => navigate("/shop")}>Shop Now</button>
          </div>
          <img src="/speaker2.png" alt="summer sale" />
        </div>

        <div className="homeDealCard2">
          <div className="homeDealCard2Text">
            <h2>Back to School</h2>
            <p>Get ready for the new semester with our back-to-school deals</p>
            <button className="homeDealCard2Button" onClick={() => navigate("/shop")}>Shop Now</button>
          </div>
          <img src="/back-to-school-laptop.png" alt="back to school" />
        </div>
      </section>

      <section className="homeBestSellingSection">
        <div className="homeBestSellingheader">
          <h2>Best Selling</h2>
          <button className="homeBestSellingview-allButton" onClick={() => navigate("/shop")}>
            View all <FaAngleDoubleRight />
          </button>
        </div>

        <div className="homeBestSellingCardsCollection1">
          <div className="homeBestSellingmainCard">
            <h1>What's Trending</h1>
            <h2>See what's popular this week.</h2>
            <button onClick={() => navigate("/shop")}>Explore</button>
          </div>

          <div className="homeBestSellingCardsCollection">
            <div className="homeBestSellingCardss">
              <img src="/adidas-shoes.png" alt="Adidas shoes" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/bafana.png" alt="Bafana jersey" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/bat.png" alt="Cricket bat" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/kattle.png" alt="Kettle" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/pots-set.png" alt="Pots set" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/redbat-bag.png" alt="Red Bat bag" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/soccer-ball.png" alt="Soccer ball" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/trending3.png" alt="Trending item" className="homeBestSellingImages" />
            </div>
          </div>
        </div>
      </section>

      <section className="homePromosection">
        <button
          className="backTopButton"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
        </button>
      </section>

      <Footer />
    </div>
  );
}