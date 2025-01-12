import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders'); // API lấy danh sách đơn hàng
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { trang_thai: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, trang_thai: newStatus } : order
      ));
      alert('Order status updated successfully!');
    } catch (error) {
      alert('Failed to update order status.');
    }
  };

  function getStatusClass(status) {
    switch (status) {
      case 'Đang xử lý':
        return 'text-yellow-500';
      case 'Đã giao':
        return 'text-green-500';
      case 'Hủy':
        return 'text-red-500';
      default:
        return '';
    }
  } 

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Quản lý đơn hàng</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Hiện không có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Đơn hàng ID: {order._id}</h3>
              <p className="text-gray-700">Ngày đặt hàng: {new Date(order.ngay_dat_hang).toLocaleDateString()}</p>
              <p className="text-gray-700">Người đặt: {order.id_nguoi_dung?.ten_dang_nhap || order.id_nguoi_dung}</p>
              <div className="mt-4">
                <h4 className="text-lg font-medium">Chi tiết sản phẩm:</h4>
                {order.san_pham?.map((sp, index) => (
                  <div key={`${sp.id_san_pham._id}-${index}`} className="ml-4 mt-2">
                    <p className="text-gray-600">Tên sản phẩm: {sp.id_san_pham.ten_san_pham}</p>
                    <p className="text-gray-600">Số lượng: {sp.so_luong}</p>
                    <p className="text-gray-600">Giá: {sp.gia.toLocaleString()} VND</p>
                    <p className={`text-sm font-medium mt-4 ${getStatusClass(order.trang_thai)}`}>
                    Trạng thái: {order.trang_thai}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Trạng thái đơn hàng:
              </label>
              <select
                value={order.trang_thai} 
                onChange={(e) => handleStatusChange(order._id, e.target.value)} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Hủy">Hủy</option>
              </select>
              </div> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrder;



