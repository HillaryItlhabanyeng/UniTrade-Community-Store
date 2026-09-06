import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useCart } from "../Components/useCart";
import "./ConfirmationPage.css";

const DELIVERY_FEE = 150.0;

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  const referenceNumber = "FR-78TRFGDUN3452";
  const status = "PENDING";

  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  const formatCurrency = (value: number) => `R${value.toFixed(2)}`;

  return (
    <>
      <Navbar showLinks={false} />
      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="success-icon">
            <span className="checkmark">✓</span>
          </div>
          <p className="payment-confirmed-label">PAYMENT CONFIRMED</p>
          <h2>Order Placed!</h2>
          <p className="confirmation-subtext">
            We've received your order and will process it shortly
          </p>

          <div className="order-details-box">
            <div className="reference-row">
              <span className="reference-label">REFERENCE</span>
              <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
            </div>
            <p className="reference-number">{referenceNumber}</p>

            {items.length === 0 ? (
              <p>No items found for this order.</p>
            ) : (
              items.map((item, i) => (
                <div key={i} className="confirmation-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="confirmation-item-info">
                    <p className="item-name">{item.name}</p>
                    {item.category && <p className="item-specs">{item.category}</p>}
                    <p className="item-extra">Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))
            )}

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{formatCurrency(delivery)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Paid</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="track-order-btn" onClick={() => navigate("/account/orders")}>
              Track Order
            </button>
            <button className="continue-shopping-btn" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}