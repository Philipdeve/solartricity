import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Categories, Products, SharedLayout, Stats, AdminSignup } from "./pages/admin";
import {Home, Product, Cart, Signup, ShippingAddress, Summary} from "./pages/users"
//figure out how to handle adminNavbar and Navbar
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:slug" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/checkout/shipping" element={<ShippingAddress />}></Route>
        <Route path="/checkout/summary" element={<Summary />}></Route>
        <Route path="/admin-signup" element={<AdminSignup />}></Route>
        <Route path="/admin-dashboard" element={<ProtectedRoute><SharedLayout /></ProtectedRoute> }>
          <Route index element={<Stats />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
