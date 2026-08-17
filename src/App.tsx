import { BrowserRouter, Routes, Route } from "react-router-dom";

import DetailsPage from "./Pages/DetailsPage";
import PaymentPage from "./Pages/PaymentPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AccountPage from "./Pages/AccountPage";
import HomePage from "./Pages/HomePage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import ContactPage from "./Pages/ContactPage";
import MarketPlacePage from "./Pages/MarketPlacePage";
import RatingsreviewsPage from "./Pages/RatingsreviewsPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/account" element={<AccountPage />} />

        <Route path="/shop" element={<MarketPlacePage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/checkout/details"
          element={<DetailsPage />}
        />

        <Route
          path="/checkout/payment"
          element={<PaymentPage />}
        />

        <Route
          path="/checkout/confirmation"
          element={<ConfirmationPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/ratings-reviews"
          element={<RatingsreviewsPage />}
        />

        <Route
          path="/ratingsreviews"
          element={<RatingsreviewsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;