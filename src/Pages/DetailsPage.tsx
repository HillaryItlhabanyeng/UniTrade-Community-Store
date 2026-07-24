import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
import OrderSummary from "../Components/OrderSummary";
import "./DetailsPage.css"

export default function DetailsPage(){
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const[email,setEmail] = useState("");

    const handleContinue = ()=> {
        if(!fullName || !phone || !email){
            alert("Please fill in all fields");
            return;
        }
        navigate("/checkout/payment");
    };

    return (
    <div className="checkout-page">
        <p className="secure-label">SECURE CHECKOUT</p>
        <h2>Your Details</h2>

        <CheckoutSteps currentStep={1} />

        <div className="checkout-content">
          <div className="details-form">
            <p className="section-label">CONTACT INFORMATION</p>

            <label>FULL NAME</label>
            <input
               type="text"
               value={fullName}
               onChange={(e) => setFullName(e.target.value)}
               placeholder="Sipho Paul Modise"
            />

            <div className="form-row">
                <div>
                    <label>PHONE NUMBER</label>
                    <input
                       type="tel"
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder="0893452344"
                    />
                </div>
                <div>
                    <label>EMAIL ADDRESS</label>
                    <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="paulmodise12@gmail.com"
                    />
                </div>
            </div>
          </div>

          <OrderSummary
            items={[
                {
                    name: "PROLINE INTEL CELERON",
                    specs: "DUAL CORE, 4GB/500GB",
                    price: 3699.0,
                    image: "/laptop.jpg",
                },
            ]}
            deliveryFee={150.0}
          />
        </div>

        <button className="continue-btn" onClick={handleContinue}>
            Continue to Payment →
        </button>
    </div>
);
}