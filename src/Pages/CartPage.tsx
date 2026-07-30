import Navbar from "../Components/Navbar";
import "./CartPage.css";

export default function CartPage() {
  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-content">
        <h2>Your Cart</h2>
        <p>Cart page coming soon.</p>
      </div>
    </div>
  );
}
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  seller: string;
  category: string;
  location: string;
  imageUrl?: string;
}

const DELIVERY_FEE = 50;

function CartPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "HP Laptop",
      price: 7000,
      quantity: 1,
      seller: "Spin Tech",
      category: "Devices",
      location: "D6 Campus",
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(Boolean)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponMessage("Enter a coupon code.");
      setDiscount(0);
      return;
    }

    // Replace with a real coupon lookup (API call) when ready
    if (code === "SAVE10") {
      const value = Math.round(subtotal * 0.1);
      setDiscount(value);
      setCouponMessage(`Coupon applied: R${value.toFixed(2)} off.`);
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    sessionStorage.setItem(
      "checkoutCart",
      JSON.stringify({ items, subtotal, discount, delivery, total })
    );
    navigate("/checkout/details");
  };

  const formatCurrency = (value: number) => `R${value.toFixed(2)}`;

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="cart-header-left">
          <span className="logo-mark">U</span>
          <span className="logo-text">Trade</span>
        </div>
        <nav className="cart-nav">
          <a href="/browse">Browse</a>
          <a href="/category">Category</a>
          <a href="/sell">Sell</a>
          <a href="/messages">Messages</a>
        </nav>
        <div className="cart-header-right">
          <button className="icon-btn" aria-label="Cart">
            🛒
          </button>
          <button className="icon-btn" aria-label="Account">
            👤
          </button>
        </div>
      </header>

      <main className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="breadcrumb">
          <a href="/">Home</a> &gt; <span>Cart</span>
        </p>

        <div className="cart-table-wrapper">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="col-item">Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="col-item">
                      <div className="item-cell">
                        <div className="item-thumb">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} />
                          ) : null}
                        </div>
                        <div className="item-info">
                          <p className="item-name">{item.name}</p>
                          <p className="item-seller">
                            Sold by: {item.seller}
                          </p>
                          <p className="item-meta">
                            Category: {item.category}
                          </p>
                          <p className="item-meta">
                            Location: {item.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>
                      <div className="qty-control">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="cart-bottom">
          <div className="coupon-card">
            <h2 className="card-heading">Have a Coupon?</h2>
            <div className="coupon-row">
              <input
                type="text"
                placeholder="Enter Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="apply-btn" onClick={handleApplyCoupon}>
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className="coupon-message">{couponMessage}</p>
            )}
          </div>

          <div className="summary-card">
            <h2 className="card-heading">Cart Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>{formatCurrency(discount)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{formatCurrency(delivery)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
