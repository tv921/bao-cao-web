import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Lấy token từ localStorage
  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
  }

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/orders/${userId}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error("Có lỗi khi lấy danh sách đơn hàng!", error);
        });
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách đơn hàng của bạn</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Đơn hàng ID: {order._id}</h3>
              <p className="text-gray-700">Ngày đặt hàng: {new Date(order.ngay_dat_hang).toLocaleDateString()}</p> 
              <p className={`text-sm font-medium ${order.trang_thai === 'Đã giao' ? 'text-green-600' : order.trang_thai === 'Hủy' ? 'text-red-600' : 'text-yellow-600'}`}>Trạng thái: {order.trang_thai}</p>
              <p className="text-gray-700">Tổng tiền: <span className="text-blue-600 font-bold">{order.tong_tien.toLocaleString()} VND</span></p>
              <p className="text-gray-700">Ghi chú: {order.ghi_chu}</p>
              <p className="text-gray-700">Phương thức thanh toán: {order.phuong_thuc_thanh_toan}</p>
              <p className="text-gray-700">Địa chỉ giao hàng: {order.id_nguoi_dung.dia_chi}</p> {/* Hiển thị địa chỉ */}
              <div className="mt-4">
                <h4 className="text-lg font-medium">Sản phẩm:</h4>
                {order.san_pham.map((sp, index) => (
                  <div key={`${sp.id_san_pham._id}-${index}`} className="ml-4 mt-2">
                    <p className="text-gray-600">Tên sản phẩm: {sp.id_san_pham.ten_san_pham}</p>
                    <p className="text-gray-600">Số lượng: {sp.so_luong}</p>
                    <p className="text-gray-600">Giá: {sp.gia.toLocaleString()} VND</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


