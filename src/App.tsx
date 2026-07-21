import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";
import PaymentPage from "./Pages/PaymentPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AccountPage from "./Pages/AccountPage";
import HomePage from "./Pages/HomePage";
import ConfirmationPage from "./Pages/ConfirmationPage";


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
        </Routes>
        </BrowserRouter>
    );

  }
  export default App;