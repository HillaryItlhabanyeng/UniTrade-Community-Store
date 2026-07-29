import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

interface ShippingInfo {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  deliveryLocation: string;
}

interface FormErrors {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  deliveryLocation?: string;
}

type PaymentMethod = "payfast" | "card" | "other";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
}

const DELIVERY_FEE = 50;
const DISCOUNT = 0;

function CheckoutPage() {
  const navigate = useNavigate();

  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    deliveryLocation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("payfast");

  
  const orderItems: OrderItem[] = [
    { id: "1", name: "HP Laptop", price: 7000, qty: 1 },
  ];

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [orderItems]
  );
  const total = subtotal + DELIVERY_FEE - DISCOUNT;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!shipping.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shipping.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required.";
    } else if (!emailPattern.test(shipping.emailAddress)) {
      newErrors.emailAddress = "Enter a valid email address.";
    }

    const phoneDigits = shipping.phoneNumber.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (phoneDigits.length < 10) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }

    if (!shipping.deliveryLocation.trim()) {
      newErrors.deliveryLocation = "Delivery location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({ shipping, paymentMethod, subtotal, total })
    );

    navigate("/checkout/review");
  };

  const formatCurrency = (value: number) =>
    `${value < 0 ? "-" : ""}R${Math.abs(value).toFixed(2)}`;

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header-left">
          <span className="logo-mark">U</span>
          <span className="logo-text">Trade</span>
        </div>
        <nav className="checkout-nav">
          <a href="/browse">Browse</a>
          <a href="/category">Category</a>
          <a href="/sell">Sell</a>
          <a href="/messages">Messages</a>
        </nav>
        <div className="checkout-header-right">
          <button className="icon-btn" aria-label="Cart">
            
          </button>
          <button className="icon-btn" aria-label="Account">
            
          </button>
        </div>
      </header>

      <main className="checkout-main">
        <h1 className="checkout-title">Checkout</h1>
        <p className="breadcrumb">
          <a href="/">Home</a> &gt; <a href="/cart">Cart</a> &gt;{" "}
          <span>Checkout</span>
        </p>

        <ol className="step-indicator">
          <li className="step active">
            <span className="step-circle">1</span>
            <span className="step-label">Shipping</span>
          </li>
          <li className="step-connector" />
          <li className="step">
            <span className="step-circle">2</span>
            <span className="step-label">Payment</span>
          </li>
          <li className="step-connector" />
          <li className="step">
            <span className="step-circle">3</span>
            <span className="step-label">Review</span>
          </li>
          <li className="step-connector" />
          <li className="step">
            <span className="step-circle">4</span>
            <span className="step-label">Confirmation</span>
          </li>
        </ol>

        <div className="checkout-columns">
          {/* Left column: forms */}
          <div className="checkout-left">
            <section className="checkout-card">
              <h2 className="card-heading">1. Shipping Information</h2>

              <div className="form-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={shipping.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "input-error" : ""}
                />
                {errors.fullName && (
                  <span className="field-error">{errors.fullName}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  placeholder="Enter email address"
                  value={shipping.emailAddress}
                  onChange={handleChange}
                  className={errors.emailAddress ? "input-error" : ""}
                />
                {errors.emailAddress && (
                  <span className="field-error">{errors.emailAddress}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={shipping.phoneNumber}
                  onChange={handleChange}
                  className={errors.phoneNumber ? "input-error" : ""}
                />
                {errors.phoneNumber && (
                  <span className="field-error">{errors.phoneNumber}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="deliveryLocation">Delivery Location</label>
                <input
                  id="deliveryLocation"
                  name="deliveryLocation"
                  type="text"
                  placeholder="Enter location"
                  value={shipping.deliveryLocation}
                  onChange={handleChange}
                  className={errors.deliveryLocation ? "input-error" : ""}
                />
                {errors.deliveryLocation && (
                  <span className="field-error">
                    {errors.deliveryLocation}
                  </span>
                )}
              </div>
            </section>

            <section className="checkout-card">
              <h2 className="card-heading">2. Payment Method</h2>

              <div className="payment-options">
                <label
                  className={`payment-option ${
                    paymentMethod === "payfast" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payfast"
                    checked={paymentMethod === "payfast"}
                    onChange={() => setPaymentMethod("payfast")}
                  />
                  <span className="payment-swatch" />
                  <span>PayFast (Cards)</span>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "card" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span className="payment-swatch" />
                  <span>Debit / Credit Card</span>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "other" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="other"
                    checked={paymentMethod === "other"}
                    onChange={() => setPaymentMethod("other")}
                  />
                  <span className="payment-swatch" />
                  <span>Other Payment Methods</span>
                </label>
              </div>

              <button className="continue-btn" onClick={handleContinue}>
                Continue to Review
              </button>
            </section>
          </div>

          {/* Right column: order summary */}
          <aside className="checkout-right">
            <div className="summary-card">
              <h2 className="card-heading">Order Summary</h2>

              {orderItems.map((item) => (
                <div className="summary-item" key={item.id}>
                  <div className="summary-thumb">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : null}
                  </div>
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.qty}</p>
                  </div>
                  <p className="summary-item-price">
                    {formatCurrency(item.price * item.qty)}
                  </p>
                </div>
              ))}

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Subtotal ({orderItems.length} item{orderItems.length !== 1 ? "s" : ""})</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{formatCurrency(DELIVERY_FEE)}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>{formatCurrency(-DISCOUNT)}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <div className="secure-checkout">
                <span className="lock-icon"></span>
                <div>
                  <p className="secure-title">Secure Checkout</p>
                  <p className="secure-subtitle">
                    Your payment is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
