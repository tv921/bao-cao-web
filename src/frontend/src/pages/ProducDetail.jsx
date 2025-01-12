import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Footer from '../components/Footer';

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
  <>
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      {/* Tên sản phẩm */}
      <h3 className="text-3xl font-bold text-gray-800 text-center lg:text-left">{product.ten_san_pham}</h3>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Cột bên trái: Hình ảnh sản phẩm */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
        {/* Mô tả sản phẩm */}
        <p className="text-lg text-gray-600 mt-4 text-center lg:text-left">{product.mo_ta}</p>
        {/* Hình ảnh sản phẩm */}
        <div className="mt-8 flex justify-center">
          <img 
            src={product.hinh_anh} 
            alt={product.ten_san_pham} 
            className="w-full max-w-md h-auto object-contain rounded-lg"
          />
        </div>

    {/* Giá sản phẩm và nút thêm vào giỏ hàng */}
  <div className="mt-8 w-full flex flex-col items-center lg:items-start">
    <p className="text-3xl font-semibold text-green-600">{product.gia.toLocaleString()} VNĐ</p>
    <button 
      onClick={handleAddToCart} 
      className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 mt-4"
    >
      Thêm sản phẩm vào giỏ hàng
    </button>
  </div>

  {/* Cấu hình sản phẩm */}
  <div className="mt-8 w-full">
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
    </ul>
  </div>


</div>


        {/* Cột bên phải: Tên sản phẩm, mô tả, cấu hình và giá */}
        <div className="w-full lg:w-1/2">

          {/* Thông tin bán hàng */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800">
              Quà tặng/Khuyến mãi:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>✅ Tặng Windows 11 bản quyền theo máy</li>
              <li>✅ Miễn phí cân màu màn hình công nghệ cao</li>
              <li>✅ Balo thời trang cao cấp</li>
              <li>✅ Chuột không dây + Bàn di cao cấp</li>
              <li>✅ Tặng gói cài đặt, bảo dưỡng, vệ sinh máy trọn đời</li>
              <li>✅ Tặng Voucher giảm giá cho lần mua tiếp theo</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-10">
              YÊN TÂM MUA SẮM TẠI LAPTOP ABC
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li><span className="mr-2">🌐</span> Chất lượng sản phẩm là hàng đầu</li>
              <li><span className="mr-2">📈</span> Dùng test máy 15 ngày đầu lỗi 1 đổi 1</li>
              <li><span className="mr-2">📚</span> Hỗ trợ và hậu mãi sau bán hàng tốt nhất</li>
              <li><span className="mr-2">📦</span> Giao hàng miễn phí toàn quốc nhanh nhất</li>
            </ul>

            <div className="mt-6">
              <p><strong>Địa chỉ:</strong> 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh</p>
              <p><strong>Điện thoại:</strong> 0123.456.789</p>
              <p><strong>Email:</strong> hotrolaptopabc@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ProductDetail;

