// Components/ProductsByManufacturer.js
// Components/ProductsByManufacturer.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductsByManufacturer = ({ manufacturerName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/manufacturer/Asus`
        );
        setProducts(response.data);
      } catch (err) {
        setError('Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [manufacturerName]);

  if (loading) {
    return <p className="text-center text-xl text-gray-500">Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Sản phẩm của {manufacturerName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-center col-span-full text-xl text-gray-500">Không có sản phẩm nào của hãng này.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="product-item bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleProductClick(product._id)} // Gọi hàm điều hướng khi bấm vào
            >
              <img
                src={product.hinh_anh}
                alt={product.ten_san_pham}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.ten_san_pham}</h3>
                <p className="text-gray-600 mt-2">{product.mo_ta}</p>
                <p className="text-lg font-bold text-red-600 mt-4">Giá: {product.gia.toLocaleString()} VND</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsByManufacturer;