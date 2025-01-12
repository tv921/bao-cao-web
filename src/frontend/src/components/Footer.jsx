import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-50 rounded-lg  shadow-lg text-gray-800 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-semibold text-black mb-4">LAPTOP ABC</h2>
          <p className="text-sm">
            Nơi đáng tin cậy để mua sắm laptop.
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
              <span className="block text-sm">Email: hotrolaptopabc@gmail.com</span>
            </li>
            <li>
              <span className="block text-sm">Điện thoại:  0123.456.789</span>
            </li>
            <li>
              <span className="block text-sm">Địa chỉ: 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-black">
        &copy; {new Date().getFullYear()} LAPTOP ABC. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}

export default Footer;
