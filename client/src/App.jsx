import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Categories, Products, SharedLayout, Stats, AdminSignup, AdminSignin } from "./pages/admin";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/admin-signup" element={<AdminSignup />}></Route>
        {/* <Route path="/admin-signin" element={<AdminSignin />}></Route> */}
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
