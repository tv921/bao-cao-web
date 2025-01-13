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
import ManufacturersPage from './pages/ManufacturersPage';
import ManageCategory from './pages/ManageCategory';
import SearchResults from './pages/SearchResults';
import ProducDetail from './pages/ProducDetail';
import Cart from './pages/cart';
import ManageProduct from './pages/ManageProduct';
import EditProductPage from "./pages/EditProductPage";
import ManageUser from "./pages/ManageUser";
import Orders from './pages/Order';
import PrivateRoute from "./components/PrivateRoute";
import ManageOrder from "./pages/ManageOrder";
import Logout from './pages/Logout';
import ProductsByManufacturer from './components/ProductsByManufacturer';
import ProductsByManufacturerDell from './components/ProductsByManufacturerDell';
import ProductsByManufacturerLenovo from './components/ProductsByManufacturerLenovo'; 
import ProductsByManufacturerMacbook from './components/ProductsByManufacturerMacbook';
import ProductsByManufacturerAsus from './components/ProductsByManufacturerAsus';
import ProductsByManufacturerAcer from './components/ProductsByManufacturerAcer';
import ProductsByManufacturerMSI from './components/ProductsByManufacturerMSI';

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
    setIsLoggedIn(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // Cập nhật ngay vai trò
      } catch (error) {
        console.error("Invalid token during login", error);
      }
    }
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
        {isLoggedIn && userRole === "admin" && <Sidebar />} {/* Sidebar chỉ hiển thị nếu người dùng là admin */}

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-84">
          {isLoggedIn ? (
            <Navbar1 onLogout={handleLogout} />
          ) : (
            <Navbar />
          )}


          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/productdetail/:productId" element={<ProducDetail />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="/products/hp" element={<ProductsByManufacturer manufacturerName="HP" />} />
              <Route path="/products/dell" element={<ProductsByManufacturerDell manufacturerName="Dell" />} />
              <Route path="/products/apple" element={<ProductsByManufacturerMacbook manufacturerName="Macbook" />} />
              <Route path="/products/lenovo" element={<ProductsByManufacturerLenovo manufacturerName="Lenovo" />} />
              <Route path="/products/asus" element={<ProductsByManufacturerAsus manufacturerName="Asus" />} />
              <Route path="/products/acer" element={<ProductsByManufacturerAcer manufacturerName="Acer" />} />
              <Route path="/products/msi" element={<ProductsByManufacturerLenovo manufacturerName="MSI" />} />
              {/* Các route được bảo vệ với PrivateRoute */}
              <Route
                path="/order"
                element={
                  <PrivateRoute roles={["user", "admin"]}>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-category"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManageCategory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-manufacturer"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManufacturersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-product"
                element={
                  <PrivateRoute roles={["user", "admin"]}>
                    <ManageProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-product"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <AddProduct />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editproduct/:id"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <EditProductPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/qluser"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManageUser />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-order"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManageOrder />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
