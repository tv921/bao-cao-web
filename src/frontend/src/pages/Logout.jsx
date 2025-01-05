import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    navigate('/login'); // Điều hướng về trang đăng nhập
  }, [navigate]);

  return null; // Không cần giao diện cho trang đăng xuất
};

export default Logout;