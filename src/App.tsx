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
import CategoriesPage from "./Pages/CategoriesPage";
import MyListingsPage from "./Pages/MyListingsPage";
import SavedPage from "./Pages/SavedPage";
import BulletinBoardPage from "./Pages/BulletinBoardPage";
import NotificationsPage from "./Pages/NotificationsPage";
import MessagesPage from "./Pages/MessagesPage";
import OTPPage from "./Pages/OTPPage";
import ResetPasswordPage from "./Pages/OTPPage";
import ProductListingPage from "./Pages/ProductListingPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/account" element={<AccountPage />} />

        <Route path="/shop" element={<MarketPlacePage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/my-listings" element={<MyListingsPage />} />

        <Route path="/bulletin-board" element={<BulletinBoardPage />} />

        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/messages" element={<MessagesPage />} />

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
         path="/categories" 
        element={<CategoriesPage />} />

        <Route
          path="/ratings-reviews"
          element={<RatingsreviewsPage />}
        />

        <Route path="/saved" element={<SavedPage />} />

        <Route
          path="/ratingsreviews"
          element={<RatingsreviewsPage />}
        />

        <Route path="/otp" element={<OTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/list-product" element={<ProductListingPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;