// BackToHomeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Dùng useNavigate để điều hướng
import { FaArrowLeft } from 'react-icons/fa'; // Sử dụng biểu tượng mũi tên trái

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

   // Ẩn nút nếu đang ở trang chủ
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button
    onClick={handleBackToHome}
    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 ml-2"
    >
    <FaArrowLeft className="mr-2" /> Quay lại Trang Chủ
    </button>

  );
};

export default BackToHomeButton;
