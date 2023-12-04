import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Categories, Products, SharedLayout, Stats, AdminSignup, AdminSignin } from "./pages/admin";
import {Home, Product, Cart} from "./pages/users"
//figure out how to handle adminNavbar and Navbar
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:slug" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
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
