import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/cart';

function App() {
  

  return (
    <Router>
      <div className="flex min-h-screen">

      <div className="flex-1 flex flex-col">
        <Navbar></Navbar>

          {/* Content Area */}
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />

              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;



