import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import SettingsPage from "./Pages/SettingsPage";

import AccountPage from "./Pages/AccountPage";
import MarketPlacePage from "./Pages/MarketPlacePage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";

import DetailsPage from "./Pages/DetailsPage";
import PaymentPage from "./Pages/PaymentPage";
import ConfirmationPage from "./Pages/ConfirmationPage";

import ContactPage from "./Pages/ContactPage";
import RatingsreviewsPage from "./Pages/RatingsreviewsPage";
import CategoriesPage from "./Pages/CategoriesPage";

import MyListingsPage from "./Pages/MyListingsPage";
import SavedPage from "./Pages/SavedPage";
import BulletinBoardPage from "./Pages/BulletinBoardPage";

import NotificationsPage from "./Pages/NotificationsPage";
import MessagesPage from "./Pages/MessagesPage";

import OTPPage from "./Pages/OTPPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

import ProductListingPage from "./Pages/ProductListingPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Account */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Marketplace */}
        <Route path="/shop" element={<MarketPlacePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/list-product" element={<ProductListingPage />} />
        <Route path="/my-listings" element={<MyListingsPage />} />
        <Route path="/saved" element={<SavedPage />} />

        {/* Cart / Checkout */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/details" element={<DetailsPage />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route
          path="/checkout/confirmation"
          element={<ConfirmationPage />}
        />

        {/* Community */}
        <Route path="/bulletin-board" element={<BulletinBoardPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Reviews */}
        <Route
          path="/ratings-reviews"
          element={<RatingsreviewsPage />}
        />

        {/* Optional old URL */}
        <Route
          path="/ratingsreviews"
          element={<RatingsreviewsPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;