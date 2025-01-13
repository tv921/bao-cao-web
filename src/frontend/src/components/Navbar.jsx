import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLaptop, FaShoppingCart, FaSignInAlt, FaSearch } from 'react-icons/fa';
import '../css/index.css';

const Navbar = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-200 text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-3xl font-extrabold">
          <Link to="/" className="hover:opacity-80 transition-opacity duration-300 flex items-center">
            <FaLaptop className="text-gray-800 mr-2" /> 
          </Link>
        </div>

        <ul className="flex space-x-6 items-center w-full justify-center">
          <Link to='/'>
            <li><p>Laptop ABC</p></li>
          </Link>
          
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
                className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center"
              >
                <FaSearch className="mr-2" /> Tìm kiếm
              </button>
            </form>
          </li>

          <li className="relative">
            <Link to="/cart">
              <button className="relative text-white bg-indigo-500 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center">
                <FaShoppingCart className="text-xl mr-2" />
                Giỏ hàng
              </button>
            </Link>
          </li>

          <li>
            <Link to="/login">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 flex items-center">
                <FaSignInAlt className="mr-2" /> Đăng nhập
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
