import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";
import PaymentPage from "./Pages/PaymentPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AccountPage from "./Pages/AccountPage";
import HomePage from "./Pages/HomePage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import OTPPage from "./Pages/OTPPage";
import ProductListingPage from "./Pages/ProductListingPage";


function App(){
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout/details" element={<DetailsPage />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="/checkout/confirmation" element={<ConfirmationPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/product-listing" element={<ProductListingPage />} />
        </Routes>
        </BrowserRouter>
    );

  }
  export default App;