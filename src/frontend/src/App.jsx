import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import './css/index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/cart';
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";


function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 h-[calc(100%-4rem)] bg-white shadow-lg fixed top-24 left-0 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <Navbar />
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product" element={<ProductList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;



