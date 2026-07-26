import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CheckoutSteps from "../Components/CheckoutSteps";
import "./PaymentPage.css";

export default function PaymentPage(){
  const navigate = useNavigate();
  const [cardNumber, setCardNumber]= useState("");
  const [expiry, setExpiry]= useState("");
  const [cvv, setCvv] = useState("");

  const orderItem ={
    name: "PROLINE INTEL CELERON",
    quantity: 1,
    price: 3849.0,
  };

  const total = orderItem.price;

  const handlePayNow = () => {
    if(!cardNumber || !expiry || !cvv){
      alert("Please fill in all payment fields");
      return;
    }
    navigate("/checkout/confirmation")
  };

  return (
    <>
    <Navbar />
    <div className="payment-page">
      <p className="step-label">STEP 2 OF 3</p>
      <h2>Secure Payment</h2>

      <CheckoutSteps currentStep={2} />

      <div className="payfast-card">
        <div className="payfast-header">
          <span className="payfast-icon">💳</span>
          <div>
            <p className="payfast-title">PayFast</p>
            <p className="payfast-subtitle">Secure checkout gateway</p>
          </div>
        </div>

        <div className="amount-due-section">
          <p className =" amount-label">AMOUNT DUE</p>
          <p className="amount-value">R{total.toFixed(2)}</p>
          <p className="amount-subtext">Delivery - no store pickup</p>
        </div>

        <div className="order-line-box">
          <div className="order-line">
            <span>{orderItem.name} x {orderItem.quantity}</span>
            <span>R{orderItem.price.toFixed(2)}</span>
          </div>

          <div className="order-line total">
            <span>Total</span>
            <span>R{total.toFixed(2)}</span>
          </div>
        </div>

        <label>CARD NUMBER</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="4111 1111 1111 1111"
        />

        <div className="form-row">
          <div>
            <label>EXPIRY DATE</label>
            <input
              type="text"
              value={expiry}
              onChange={(e)=> setExpiry(e.target.value)}
              placeholder="11/23"
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e)=> setCvv(e.target.value)}
              placeholder="***"
            />
          </div>
        </div>

        <button className="pay-now-btn" onClick={handlePayNow}>
          🔒 Pay Now - R{total.toFixed(2)}
        </button>
        <p className="simulated-note">
          Simulated payment for demonstration purposes only
        </p>
      </div>
    </div>
    </>
  );
}