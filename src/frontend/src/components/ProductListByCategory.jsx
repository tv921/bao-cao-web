import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductListByCategory = ({ categoryId, title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="my-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/productdetail/${product._id}`}
            className="group border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white overflow-hidden flex flex-col"
            style={{ height: '400px', width: '340px' }} 
          >
            {/* Hình ảnh sản phẩm */}
            <div className="w-full h-56 flex items-center justify-center bg-gray-100">
              <img
                src={product.hinh_anh}
                alt={product.ten_san_pham}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* Thông tin sản phẩm */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                {product.ten_san_pham}
              </h3>
              
              {/* Đẩy giá xuống dưới và thêm màu */}
              <div className="mt-auto">
                <p className="text-2xl text-red-500 font-bold">{product.gia.toLocaleString()} VNĐ</p> {/* Màu đỏ cho giá */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListByCategory;
