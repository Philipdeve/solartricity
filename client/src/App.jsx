import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Categories, Products, SharedLayout, Stats } from "./pages/admin";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/admin-dashboard" element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
