import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwtDecode from 'jwt-decode';  // Import jwt-decode
import './css/index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./components/ProductListByCategory";
import ManageCatalog from "./pages/ManageCatalog";
import ManageManufacturer from './pages/ManageManufacturer';
import CategoryPage from './pages/CategoryPage';
import SearchResults from './pages/SearchResults';
import ProducDetail from './pages/ProducDetail';
import Cart from './pages/cart';

function App() {
  // State để theo dõi trạng thái đăng nhập và vai trò người dùng
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [userRole, setUserRole] = useState(null); // Lưu vai trò người dùng

  // Kiểm tra token và giải mã khi component được mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode(token); // Giải mã token
        console.log("Decoded token:", decoded); // In ra token đã giải mã để kiểm tra
        setUserRole(decoded.role); // Lấy vai trò từ token
        console.log("User Role:", decoded.role); // In ra vai trò
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
      }
    }
  }, []); // useEffect chỉ chạy một lần khi component mount

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    setIsLoggedIn(false); // Cập nhật lại trạng thái đăng nhập
    setUserRole(null); // Đặt lại vai trò người dùng
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar: Hiển thị khi người dùng là admin */}
        {isLoggedIn && <Sidebar />} {/* Sidebar chỉ hiển thị nếu người dùng là admin */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-84">
         
          {isLoggedIn ? (
            <Navbar1 onLogout={handleLogout} />
          ) : (
            <Navbar />
          )}
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/manage-catalog" element={<ManageCatalog />} />
              <Route path="/manage-manufacturer" element={<ManageManufacturer />} />
              <Route path="/productdetail/:productId" element={<ProducDetail />} />
              <Route path="/manage-category" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

