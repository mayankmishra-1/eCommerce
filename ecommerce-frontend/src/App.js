import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductListing from "./pages/ProductListing";
import CartPage from "./pages/CartPage";
import OrderHistory from "./pages/OrderHistory";
import AdminPanel from "./pages/AdminPanel";

import RoleSwitcher from "./components/RoleSwitcher";

function App() {

  return (

    <BrowserRouter>

      <RoleSwitcher />

      <Routes>

        <Route path="/" element={<ProductListing />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/orders" element={<OrderHistory />} />

        <Route path="/admin" element={<AdminPanel />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;

