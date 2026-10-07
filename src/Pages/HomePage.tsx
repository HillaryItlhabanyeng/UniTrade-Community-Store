<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import { supabase } from "../lib/supabaseClient";
import { mapProductRow } from "../lib/products";
import type { Product } from "../types/product";
=======
// import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Navbar from "../Components/Navbar";
// import { useCart } from "../Components/useCart";
// import { products } from "../data/products";
>>>>>>> 239f029303a165b2eda75b55d3f4bca93a4c3c40
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
<<<<<<< HEAD
  const [showMore, setShowMore] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const visibleProducts = showMore ? products : products.slice(0, 5);
  // const featuredCategories = categories.filter((category) => category !== "All Categories");

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

=======
  // const [showMore, setShowMore] = useState(false);
  // const { addItem } = useCart();
  // const visibleProducts = showMore ? products : products.slice(0, 5);
  // const featuredCategories = categories.filter((category) => category !== "All Categories");

  // const handleAddToCart = (product: typeof products[number]) => {
  //   addItem({
  //     id: product.id,
  //     name: product.title,
  //     price: product.price,
  //     seller: product.seller,
  //     category: product.category,
  //     location: product.location,
  //     imageUrl: product.image,
  //   });
  // };
>>>>>>> 239f029303a165b2eda75b55d3f4bca93a4c3c40
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

      <section className="homeSection2">
        <div className="homeSection2Header">
          <h1>Trending</h1>
          <p onClick={() => navigate("/products")}>View all <FaAngleDoubleRight /></p>
        </div>
        <div className="homeSection2Contents">
          <div className="homeSection2Card">
            <img src="/samsung1.png" alt="card1" />
            <div className="homeSection2CardText">
              <h2>Samsung Galaxy S21</h2>
              <p>Get your hands on the latest Samsung Ultra!</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone7.png" alt="card1" />
            <div className="homeSection2CardText">
              <h2>iPhone 7</h2>
              <p>Experience the power of the iPhone 7 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone8.png" alt="card1" />
            <div className="homeSection2CardText">
              <h2>iPhone 8</h2>
              <p>Experience the power of the iPhone 8 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone11.png" alt="card1" />
            <div className="homeSection2CardText">
              <h2>iPhone 11</h2>
              <p>Experience the power of the iPhone 11 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/iphone13.png" alt="card1" />
            <div className="homeSection2CardText">
              <h2>iPhone 13</h2>
              <p>Experience the power of the iPhone 13 with its sleek design.</p>
            </div>
          </div>
          <div className="homeSection2Card">
            <img src="/samsung2.png" alt="card1" />
            <div className="homeSection2CardText">
              <h2>Samsung Galaxy S21</h2>
              <p>Get your hands on the latest Samsung Galaxy S21!</p>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="ut-section">
        <div className="ut-section-header"><div><h3>Featured Listings</h3><p className="ut-section-subtitle">Fresh finds from students across campus</p></div><Link to="/shop" className="ut-view-all">View all listings</Link></div>
        <div className="ut-listings">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length > 5 && (
          <button type="button" className="ut-more-button" onClick={() => setShowMore((current) => !current)}>{showMore ? "Show less" : "More items"}</button>
        )}
=======
      <section className="homeCategoriesSection">
        <div className="homeCategoriesHeader">
          <h1>Featured Categories</h1>
          <p onClick={() => navigate("/categories")}>View all <FaAngleDoubleRight /></p>
        </div>
        <div className="homeCardsCollection">
          <div className="homeCardss">
            <h1 className="homeCardsText">Books</h1>
            <img src="/books.png" alt="Books" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
          <div className="homeCardss">
            <h1 className="homeCardsText">Clothes</h1>
            <img src="/clothes.png" alt="Clothes" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
          <div className="homeCardss">
            <h1 className="homeCardsText">Electronics</h1>
            <img src="/mac.png" alt="Electronics" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
          <div className="homeCardss">
            <h1 className="homeCardsText">Bedding</h1>
            <img src="/bedding.jpg" alt="Bedding" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
          <div className="homeCardss">
            <h1 className="homeCardsText">Kitchen</h1>
            <img src="/kitchen.jpg" alt="Kitchen" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
          <div className="homeCardss">
            <h1 className="homeCardsText">Games</h1>
            <img src="/puzzle.jpg" alt="Games" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
          <div className="homeCardss">
            <h1 className="homeCardsText">Sports & outdoor</h1>
            <img src="/sports.png" alt="Sports" className="homeImages" onClick={() => navigate("/categories")} />
          </div>
        </div>
>>>>>>> 239f029303a165b2eda75b55d3f4bca93a4c3c40
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

      {/* <section className="homeBestSelling">
        <h1>Best Selling</h1>
        <div className="bestSellingCardContainer">
          <div className="homeBestSellingMainContents">

          </div>

          <div className="homeBestSellingMainContentsContainer">
            <div className="homeBestSellingMainContentsCard"></div>
            <div className="homeBestSellingMainContentsCard"></div>
            <div className="homeBestSellingMainContentsCard"></div>
            <div className="homeBestSellingMainContentsCard"></div>
            <div className="homeBestSellingMainContentsCard"></div>
            <div className="homeBestSellingMainContentsCard"></div>
          </div>
        </div>
      </section> */}
      <section className="homeBestSellingSection">
        <div className="homeBestSellingheader">
          <h2>Best Selling</h2>
          <button className="homeBestSellingview-allButton" onClick={() => navigate("/shop")}>View all <FaAngleDoubleRight /></button>
        </div>

        <div className="homeBestSellingCardsCollection1">
          <div className="homeBestSellingmainCard">
            <h1>What's Trending</h1>
            <h2>See what's popular this week.</h2>
            <button onClick={() => navigate("/shop")}>Explore</button>
          </div>

          <div className="homeBestSellingCardsCollection">
            <div className="homeBestSellingCardss">
              <img src="/adidas-shoes.png" alt="Engines" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/bafana.png" alt="clothes" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/bat.png" alt="sport" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/kattle.png" alt="Kitchen" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/pots-set.png" alt="Kitchen" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/redbat-bag.png" alt="Interior" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/soccer-ball.png" alt="sport" className="homeBestSellingImages" />
            </div>
            <div className="homeBestSellingCardss">
              <img src="/trending3.png" alt="Suspensions" className="homeBestSellingImages" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="ut-section">
        <div className="ut-section-header"><h3>Popular Categories</h3><Link to="/categories" className="ut-view-all">View all categories</Link></div>
      </section> */}

      <section className="homePromosection">
        <button className="backTopButton">Back to top</button>
      </section>

      <Footer />
    </div>
  );
}
