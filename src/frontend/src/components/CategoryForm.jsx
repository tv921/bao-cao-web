import React, { useState } from 'react';

const CategoryForm = ({ onSubmit, category }) => {
  const [tenDanhMuc, setTenDanhMuc] = useState(category ? category.ten_danh_muc : '');
  const [moTa, setMoTa] = useState(category ? category.mo_ta : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { ten_danh_muc: tenDanhMuc, mo_ta: moTa };
    onSubmit(newCategory);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block">Tên danh mục</label>
        <input
          type="text"
          value={tenDanhMuc}
          onChange={(e) => setTenDanhMuc(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Mô tả</label>
        <textarea
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        ></textarea>
      </div>
      <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded">
        {category ? 'Cập nhật' : 'Thêm danh mục'}
      </button>
    </form>
  );
};

export default CategoryForm;
