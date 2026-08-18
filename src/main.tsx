import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./Components/CartContext";
import { SavedProvider } from "./Components/SavedContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <SavedProvider>
        <App />
      </SavedProvider>
    </CartProvider>
  </StrictMode>
);