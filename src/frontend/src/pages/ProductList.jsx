import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Thay đổi URL phù hợp
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Lỗi khi tải danh sách sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Đang tải danh sách sản phẩm...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center p-2">
              <img
                src={product.hinh_anh}
                alt={product.ten_san_pham}
                className="w-48 h-48 object-contain rounded-lg" // Sử dụng object-contain để giữ nguyên tỷ lệ hình ảnh
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-800">{product.ten_san_pham}</h3>
              <p className="text-gray-600 mt-2">{product.mo_ta}</p>
              <p className="mt-4 text-lg font-semibold text-green-600">
                {product.gia.toLocaleString()} VND
              </p>
              <p
                className={`mt-2 text-sm ${
                  product.trang_thai === 'Còn hàng' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {product.trang_thai}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
