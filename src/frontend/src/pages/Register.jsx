import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');  // Thay đổi tên biến thành ten_dang_nhap
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');  // Thay đổi tên biến thành mat_khau
  const [confirmMatKhau, setConfirmMatKhau] = useState('');  // Thay đổi tên biến thành confirm_mat_khau
  const [sdt, setSdt] = useState('');  // Thêm trường số điện thoại (sdt)
  const [diaChi, setDiaChi] = useState('');  // Thêm trường địa chỉ (dia_chi)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (matKhau !== confirmMatKhau) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users/register', {  // Chỉnh sửa URL cho đúng
        ten_dang_nhap: tenDangNhap,  // Gửi tên đăng nhập (ten_dang_nhap)
        email,
        mat_khau: matKhau,  // Gửi mật khẩu (mat_khau)
        sdt,  // Gửi số điện thoại (sdt)
        dia_chi: diaChi,  // Gửi địa chỉ (dia_chi)
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-sky-200 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">Đăng ký</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="tenDangNhap" className="block text-lg font-medium text-black">
            Tên người dùng
          </label>
          <input
            type="text"
            id="tenDangNhap"
            value={tenDangNhap}
            onChange={(e) => setTenDangNhap(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
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
          <label htmlFor="matKhau" className="block text-lg font-medium text-black">
            Mật khẩu
          </label>
          <input
            type="password"
            id="matKhau"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmMatKhau" className="block text-lg font-medium text-black">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirmMatKhau"
            value={confirmMatKhau}
            onChange={(e) => setConfirmMatKhau(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="sdt" className="block text-lg font-medium text-black">
            Số điện thoại
          </label>
          <input
            type="text"
            id="sdt"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label htmlFor="diaChi" className="block text-lg font-medium text-black">
            Địa chỉ
          </label>
          <input
            type="text"
            id="diaChi"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-violet-500 text-white text-lg font-bold rounded-lg hover:bg-violet-700 transition">
          Đăng ký
        </button>
      </form>
      <p className="text-center mt-4 text-black">
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-violet-700 font-bold hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
};

export default Register;
