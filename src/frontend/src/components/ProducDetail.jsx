import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return; // Kiểm tra nếu productId không có giá trị

      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data); // Lưu dữ liệu sản phẩm vào state
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Thêm logic để thêm sản phẩm vào giỏ hàng, ví dụ sử dụng context hoặc redux.
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  if (!product) {
    return <div className="text-center text-lg">Đang tải...</div>; // Hiển thị khi chưa có dữ liệu
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center">{product.ten_san_pham}</h2>
      
      <div className="flex justify-center mt-6">
        <img 
          src={product.hinh_anh} 
          alt={product.ten_san_pham} 
          className="w-full max-w-lg h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      <p className="text-lg mt-6 text-gray-600">{product.mo_ta}</p>
      <p className="text-2xl font-semibold mt-4 text-green-600">{product.gia} VNĐ</p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Cấu hình:</h3>
        <ul className="list-inside list-disc mt-4 text-gray-700">
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

      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleAddToCart} 
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;