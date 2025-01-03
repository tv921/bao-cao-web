import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './css/index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/cart';
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ManageCatalog from "./pages/ManageCatalog";
import ManageManufacturer from "./pages/ManageManufacturer,";
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
          <Sidebar />
      
        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-84">
          <Navbar />
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/manage-catalog" element={<ManageCatalog />} />
              <Route path="/manage-manufacturer" element={<ManageManufacturer />} />
              <Route path="/manage-category" element={<CategoryPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;




