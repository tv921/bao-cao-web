import React, { useState } from 'react';
import axios from 'axios';

const ThemDanhMuc = () => {
  // State để lưu trữ thông tin nhập vào từ người dùng
  const [tenDanhMuc, setTenDanhMuc] = useState('');
  const [moTa, setMoTa] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi tên danh mục
  const handleTenDanhMucChange = (e) => {
    setTenDanhMuc(e.target.value);
  };

  // Xử lý thay đổi mô tả danh mục
  const handleMoTaChange = (e) => {
    setMoTa(e.target.value);
  };

  // Xử lý gửi form để thêm danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenDanhMuc || !moTa) {
      setMessage('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Gửi yêu cầu POST đến API thêm danh mục
      const response = await axios.post('http://localhost:5000/api/categories', {
        ten_danh_muc: tenDanhMuc,
        mo_ta: moTa
      });

      if (response.status === 201) {
        setMessage('Danh mục đã được thêm thành công!');
        setTenDanhMuc('');
        setMoTa('');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi thêm danh mục.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Thêm Danh Mục</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tenDanhMuc">Tên Danh Mục</label>
          <input
            type="text"
            id="tenDanhMuc"
            className="form-control"
            value={tenDanhMuc}
            onChange={handleTenDanhMucChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="moTa">Mô Tả</label>
          <textarea
            id="moTa"
            className="form-control"
            value={moTa}
            onChange={handleMoTaChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Đang thêm...' : 'Thêm Danh Mục'}
        </button>
      </form>
    </div>
  );
};

export default ThemDanhMuc;
