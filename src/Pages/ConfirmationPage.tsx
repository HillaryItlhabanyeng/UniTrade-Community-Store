import {useNavigate} from "react-router-dom";
import "./ConfirmationPage.css";

type OrderItem = {
    name: string;
    specs: string;
    extra: string;
    price: number;
    image: string;
};

export default function ConfirmationPage() {
    const navigate = useNavigate();

    const referenceNumber = "FR-78TRFGDUN3452";
    const status = "PENDING";

    const orderItems: OrderItem[] = [
        {
            name:"PROLINE INTEL CELERON",
            specs:"DUAL CORE, 4GB/500GB",
            extra:"HDD/Windows 10 Pro",
            price: 3699.0,
            image:"/laptop.jpg",
        },
    ];

    const deliveryFee = 150.0;
    const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + deliveryFee;

    return (
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

          {orderItems.map((item, i) => (
            <div key={i} className="confirmation-item">
              <img src={item.image} alt={item.name} />
              <div className="confirmation-item-info">
                <p className="item-name">{item.name}</p>
                <p className="item-specs">{item.specs}</p>
                <p className="item-extra">{item.extra}</p>
              </div>
              <span className="item-price">R{item.price.toFixed(2)}</span>
            </div>
          ))}

<div className="summary-row">
            <span>Subtotal</span>
            <span>R{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>R{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total Paid</span>
            <span>R{total.toFixed(2)}</span>
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
  );
}