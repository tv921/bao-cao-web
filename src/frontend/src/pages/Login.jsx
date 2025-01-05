import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        mat_khau: password,
      });

      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);

      // Gọi hàm onLogin từ prop
      if (onLogin) {
        onLogin();
      }

      // Điều hướng về trang chính sau khi đăng nhập thành công
      navigate('/');
    } catch (err) {
      console.error('Login Error: ', err); // In lỗi chi tiết ra console
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-sky-200 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-700">Đăng nhập</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg font-medium text-black">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-violet-500 text-white text-lg font-bold rounded-lg hover:bg-violet-700 transition"
        >
          Đăng nhập
        </button>
      </form>
      <p className="text-center mt-4 text-black">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-violet-700 font-bold hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};

export default Login;
