import {Link} from "react-router-dom";
import "./Navbar.css";

export default function Navbar(){
    return (
        <>
        <div className="delivery-banner">
        Nationalwide delivery R150 . Pay securely via PayFast/ Ozow
        </div>

        <nav className="navbar">
            <Link to="/" className="navbar-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">
                Uni<span className="logo-highlight">Trade</span>
                </span>
                </Link>

        <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
        </div>

        <div className="navbar-actions">
            <button className="icon-btn" aria-label="search">🔍</button>
            <button className="icon-btn" aria-label="Cart">🛒</button>
            <Link to="/login" className="sign-in-link">Sign in</Link>
            <Link to="/register" className="register-btn">Register</Link>
        </div>
        </nav>
        </>
    );  
}