import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-300 rounded-lg  shadow-lg text-gray-800 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-semibold text-black mb-4">Foodie</h2>
          <p className="text-sm">
            Khám phá công thức nấu ăn thú vị để làm phong phú thêm bữa ăn hàng ngày của bạn.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Liên Kết Nhanh</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-black transition duration-300">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black transition duration-300">Giới Thiệu</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black transition duration-300">Liên Hệ</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-black transition duration-300">Chính Sách Bảo Mật</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Liên Hệ</h3>
          <ul className="space-y-2">
            <li>
              <span className="block text-sm">Email: support@foodie.com</span>
            </li>
            <li>
              <span className="block text-sm">Điện thoại: +84 123 456 789</span>
            </li>
            <li>
              <span className="block text-sm">Địa chỉ: 123 Đường ABC, TP. Trà Vinh</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Kết Nối Với Chúng Tôi</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-black">
        &copy; {new Date().getFullYear()} Foodie. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}

export default Footer;
