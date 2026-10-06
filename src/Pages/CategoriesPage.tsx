import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./CategoriesPage.css";
// import { FaShoppingCart } from "react-icons/fa";
import Footer from "../Components/Footer";


export default function CategoriesPage() {
    const navigate = useNavigate();

    // const handleProductClick = (product: Product) => {
    //     navigate(`/product-details/${product.id}`, { state: { product } });
    // };

    return (
        <div className="categoryContainer">
            <Navbar />

            {/* Category Section */}
            <section className="categorySection">

                <h1 className="categorySectionTitle">Categories</h1>
                <p className="categorySectionText">Explore our wide range of categories to find the products you love.</p>
                <div className="categoryCardsCollection">
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Books</h1>
                        <img src="/books.png" alt="Books" className="categoryImages" onClick={() => navigate("/shop/books")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Clothes</h1>
                        <img src="/clothes.png" alt="Clothes" className="categoryImages" onClick={() => navigate("/shop/clothes")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Electronics</h1>
                        <img src="/mac.png" alt="Electronics" className="categoryImages" onClick={() => navigate("/shop/electronics")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Bedding</h1>
                        <img src="/bedding.jpg" alt="Bedding" className="categoryImages" onClick={() => navigate("/shop/bedding")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Kitchen</h1>
                        <img src="/kitchen.jpg" alt="Kitchen" className="categoryImages" onClick={() => navigate("/shop/kitchen")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Games</h1>
                        <img src="/puzzle.jpg" alt="Games" className="categoryImages" onClick={() => navigate("/shop/games")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Sports & outdoor</h1>
                        <img src="/sports.png" alt="Sports" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Furniture</h1>
                        <img src="/mirror.png" alt="Furniture" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Home</h1>
                        <img src="/deffuser.png" alt="Home" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Jewelry</h1>
                        <img src="/accessories.png" alt="Jewelry" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Office</h1>
                        <img src="/chair.png" alt="Office" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Food</h1>
                        <img src="/chips.png" alt="Food" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                    <div className="categoryCardss">
                        <h1 className="categoryCardsText">Other</h1>
                        <img src="/shoes.png" alt="Other" className="categoryImages" onClick={() => navigate("")} />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}