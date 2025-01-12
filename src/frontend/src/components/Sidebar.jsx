import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBox, FaUsers, FaPlusCircle, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-500 to-blue-700 w-84 text-gray-100 h-screen p-4" style={{ position: "sticky", top: "0" }}>
      <ul className="flex flex-col flex-grow space-y-4">
       
        <Link to="/allproduct">
          <li className="flex items-center px-4 py-2 text-2xl font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FaBox className="h-5 w-5 mr-2" />
            Quản lí sản phẩm
          </li>
        </Link>
        <Link to="/qluser">
          <li className="flex items-center px-4 py-2 text-2xl font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FaUsers className="h-5 w-5 mr-2" />
            Quản lí tài khoản người dùng
          </li>
        </Link>
        <Link to="/add-product">
          <li className="flex items-center px-4 py-2 text-2xl font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FaPlusCircle className="h-5 w-5 mr-2" />
            Thêm sản phẩm
          </li>
        </Link>
        <Link to="/manage-category"> 
          <li className="flex items-center px-4 py-2 text-2xl font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FaBox className="h-5 w-5 mr-2" />
            Quản lí danh mục
          </li>
        </Link>
        <Link to="/manage-manufacturer"> 
          <li className="flex items-center px-4 py-2 text-2xl font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FaBox className="h-5 w-5 mr-2" />
            Quản lí hãng sản xuất
          </li>
        </Link>
           <Link to="/manage-order"> 
          <li className="flex items-center px-4 py-2 text-2xl font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
            <FaBox className="h-5 w-5 mr-2" />
            Quản lí đơn hàng
          </li>
        </Link>  
      </ul>
    </div>
  );
};

export default Sidebar;

