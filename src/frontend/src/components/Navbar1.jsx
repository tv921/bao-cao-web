import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css'; 

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
  
        {/* Hotline */}
        <div className="hidden lg:flex items-center space-x-4 text-lg font-medium text-red-600">
          <i className="fas fa-phone-alt"></i>
          <span>Hotline: </span>
          <span className="font-bold">0123456789</span>
        </div>
  
        {/* Menu */}
        <ul className="flex space-x-6 items-center">
          {/* Danh mục sản phẩm (Dropdown) */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-black bg-blue-300 py-2 px-4 rounded-lg hover:bg-blue-300 transition-all duration-300"
            >
              Danh mục sản phẩm
            </button>
            {/* Dropdown Menu */}
            <ul
              className={`absolute left-0 w-48 mt-2 space-y-2 bg-blue-300 text-black shadow-lg rounded-lg transition-opacity duration-300 ${
                isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <li>
                <Link to="/laptop" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Laptop văn phòng
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Laptop gaming
                </Link>
              </li>
              <li>
                <Link to="/components" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Laptop mỏng nhẹ
                </Link>
              </li>
            </ul>
          </li>
  
          {/* Thanh tìm kiếm (Search Bar) */}
          <li className="flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm..."
                className="p-3 rounded-lg text-black focus:outline-none border-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
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
          {/* Đăng xuat */}
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