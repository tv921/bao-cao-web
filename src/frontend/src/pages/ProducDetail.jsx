import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Khai báo useNavigate

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      // Lấy token từ localStorage hoặc bất kỳ nơi nào bạn lưu trữ token
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        return;
      }

      // Giải mã token để lấy userId
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
      const response = await axios.post('http://localhost:5000/api/carts/add', {
        userId,
        productId,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Gửi token trong header
        }
      });

      alert(response.data.message);

      // Chuyển hướng đến trang giỏ hàng sau khi thêm sản phẩm
      navigate('/cart');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng.');
    }
  };

  if (!product) {
    return <div className="text-center text-lg text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Cột bên trái: Hình ảnh sản phẩm */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img 
            src={product.hinh_anh} 
            alt={product.ten_san_pham} 
            className="w-full max-w-md h-auto object-contain rounded-lg " // Dùng object-contain để giữ tỷ lệ hình ảnh
          />
        </div>

        {/* Cột bên phải: Tên sản phẩm, mô tả, cấu hình và giá */}
        <div className="w-full lg:w-1/2">
          {/* Tên sản phẩm */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{product.ten_san_pham}</h2>
            {/* Mô tả sản phẩm */}
            <p className="text-lg text-gray-600 mt-4">{product.mo_ta}</p>
          </div>

          {/* Cấu hình sản phẩm */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Cấu hình:</h3>
            <ul className="list-inside list-disc mt-4 text-gray-700 space-y-2">
              <li><strong>CPU:</strong> {product.cau_hinh.cpu}</li>
              <li><strong>RAM:</strong> {product.cau_hinh.ram}</li>
              <li><strong>Ổ cứng:</strong> {product.cau_hinh.o_cung}</li>
              <li><strong>GPU:</strong> {product.cau_hinh.gpu}</li>
              <li><strong>Màn hình:</strong> {product.cau_hinh.man_hinh}</li>
              <li><strong>Pin:</strong> {product.cau_hinh.pin} mAh</li>
              <li><strong>Cổng kết nối:</strong> {product.cau_hinh.cong_ket_noi}</li>
              <li><strong>Hệ điều hành:</strong> {product.cau_hinh.he_dieu_hanh}</li>
              <li><strong>Trọng lượng:</strong> {product.cau_hinh.trong_luong} g</li>
              <li><strong>Kích thước:</strong> {product.cau_hinh.kich_thuoc} mm</li>
            </ul>
          </div>

          {/* Giá sản phẩm */}
          <div className="mt-8 text-center lg:text-left">
            <p className="text-3xl font-semibold text-green-600">{product.gia.toLocaleString()} VNĐ</p>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <button 
              onClick={handleAddToCart} 
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Thêm sản phẩm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
