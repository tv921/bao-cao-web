import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Slider from '../components/Slider';
import ProductList from '../components/ProductListByCategory';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate
  
  const handleShowHPProducts = () => {
    navigate('/products/hp'); // Navigate to the HP products page
  };

  const handleShowDellProducts = () => {
    navigate('/products/dell'); // Navigate to the Dell products page
  };

  const handleShowLenovoProducts = () => {
    navigate('/products/lenovo'); // Navigate to the Lenovo products page
  };

  const handleShowAsus = () => {
    navigate('/products/asus'); // Navigate to the MacBook products page
  };


  const handleShowAcer = () => {
    navigate('/products/acer'); // Navigate to the MacBook products page
  };


  const handleShowMSI= () => {
    navigate('/products/msi'); // Navigate to the MacBook products page
  };


  const handleShowMacBooks = () => {
    navigate('/products/apple'); // Navigate to the MacBook products page
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <Slider />
        
        {/* Các nút tìm kiếm với hình ảnh */}
        <div className="flex space-x-4 mt-4">
          {/* Nút tìm kiếm theo hãng HP */}
          <button
            onClick={handleShowHPProducts}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/images/hp.svg" alt="HP" />
          </button>

          {/* Nút tìm kiếm theo hãng Dell */}
          <button
            onClick={handleShowDellProducts}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/images/dell.svg" alt="Dell" />
          </button>

          {/* Nút tìm kiếm theo hãng Lenovo */}
          <button
            onClick={handleShowLenovoProducts}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/images/lenovo.svg" alt="Lenovo" />
          </button>

          {/* Nút tìm kiếm sản phẩm MacBook */}
          <button
            onClick={handleShowMacBooks}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/images/macbook.svg" alt="apple" />
          </button>

          <button
            onClick={handleShowAsus}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/img/asus.svg" alt="Asus" />
          </button>

         <button
            onClick={handleShowAcer}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/img/acer.svg" alt="Acer" />
          </button>
       

         <button
            onClick={handleShowMSI}
            className="px-4 py-2 border border-gray-300 text-white rounded transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          >
            <img src="/img/msi.svg" alt="MSI" />
          </button>
        </div>

         
        

        {/* Các danh mục sản phẩm */}
        <div className="product-categories mt-8">
          <ProductList categoryId="675bc20d6df648478e4756cf" title="Laptop văn phòng" />
          <ProductList categoryId="675cfe95fb5fc99bc8fafce7" title="Laptop gaming" />
          <ProductList categoryId="675d0fe241cb03f8fcd34b77" title="Laptop mỏng nhẹ" />
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
