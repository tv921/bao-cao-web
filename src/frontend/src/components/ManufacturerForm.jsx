import React, { useState, useEffect } from 'react';

const ManufacturerForm = ({ onSubmit, manufacturer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (manufacturer) {
      setName(manufacturer.ten_hang_san_xuat);
      setDescription(manufacturer.mo_ta || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [manufacturer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ten_hang_san_xuat: name, mo_ta: description });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Tên hãng sản xuất</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Mô tả</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {manufacturer ? 'Cập nhật' : 'Thêm mới'}
      </button>
    </form>
  );
};

export default ManufacturerForm;
