import React, { useEffect, useState } from 'react';

const ManufacturerList = ({ setEditingManufacturer }) => {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/manufacturers')
      .then(response => response.json())
      .then(data => setManufacturers(data))
      .catch(error => console.error('Lỗi khi lấy danh sách hãng sản xuất:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/manufacturers/${id}`, {
      method: 'DELETE',
    })
      .then(() => setManufacturers(manufacturers.filter(manufacturer => manufacturer._id !== id)))
      .catch(error => console.error('Lỗi khi xóa hãng sản xuất:', error));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Danh sách hãng sản xuất</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Tên hãng sản xuất</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Mô tả</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer, index) => (
              <tr
                key={manufacturer._id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{manufacturer.ten_hang_san_xuat}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {manufacturer.mo_ta || 'Không có mô tả'}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setEditingManufacturer(manufacturer)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                      Sửa
                    </button>
                   
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManufacturerList;
