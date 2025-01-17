import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Lỗi khi tải dữ liệu người dùng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      // Remove the deleted user from the list without refetching
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Lỗi khi xóa người dùng');
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Tên đăng nhập</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Vai trò</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Địa chỉ</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Hành động</th> {/* Cột hành động */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="py-2 px-4 text-sm text-gray-800">{user.ten_dang_nhap}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{user.email}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{user.role}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{user.dia_chi || 'Chưa có thông tin'}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{user.sdt || 'Chưa có thông tin'}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {/* Nút xóa */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

