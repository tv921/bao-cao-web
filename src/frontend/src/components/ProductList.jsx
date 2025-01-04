import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ categoryId, title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
        console.log(response); // Kiểm tra cấu trúc dữ liệu trả về
        setProducts(response.data); // Dùng response.data nếu cấu trúc đúng
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.hinh_anh} alt={product.ten_san_pham} className="h-40 w-full object-cover" />
            <h3 className="text-lg font-medium mt-2">{product.ten_san_pham}</h3>
            <p className="text-sm text-gray-500">{product.gia} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
