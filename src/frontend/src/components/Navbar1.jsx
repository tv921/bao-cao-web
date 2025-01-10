import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar1 = ({ onLogout }) => {
  // State để theo dõi dropdown (mở hoặc đóng)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Hook navigate

  // Reference cho dropdown để kiểm tra click bên ngoài
  const dropdownRef = useRef(null);

  // Hàm để mở/đóng dropdown khi nhấn vào button
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Đóng dropdown khi nhấn ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hàm xử lý tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Điều hướng đến trang tìm kiếm và truyền từ khóa tìm kiếm qua URL
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-200 text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold">
          <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
            Website bán laptop
          </Link>
        </div>

        {/* Menu */}
        <ul className="flex space-x-6 items-center w-full justify-center">
          {/* Thanh tìm kiếm (Search Bar) */}
          <li className="flex-grow">
            <form onSubmit={handleSearchSubmit} className="flex justify-center w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm..."
                className="p-3 w-2/3 rounded-lg text-black focus:outline-none border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Tìm kiếm
              </button>
            </form>
          </li>

          {/* Giỏ hàng (Shopping Cart) */}
          <li className="relative">
            <Link to="/cart">
              <button className="relative text-white bg-indigo-500 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center">
                <i className="fas fa-shopping-cart text-xl text-black mr-2"></i>
                <span>Giỏ hàng</span>
              </button>
            </Link>
          </li>

          {/* Đơn hàng (Order) - Nút dẫn đến trang /order */}
          <li>
            <Link to="/order">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
                Đơn hàng của tôi
              </button>
            </Link>
          </li>

          {/* Đăng xuất */}
          <li>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </nav>
  ); 
};

export default Navbar1;
