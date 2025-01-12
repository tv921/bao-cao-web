import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

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

  // Hàm xử lý thanh toán
  const handlePayment = async (orderId, totalPrice) => {
    if (!totalPrice || !orderId) {
      alert("Đơn hàng không hợp lệ hoặc không có tổng tiền.");
      return;
    }

    setLoading(true); // Bắt đầu quá trình thanh toán
    try {
      const response = await axios.post(
        "http://localhost:5000/create-payment-link",
        { userId, totalPrice }, // Gửi userId và totalPrice lên backend
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.location.href = response.data.checkoutUrl; // Chuyển hướng đến URL thanh toán
      }
    } catch (error) {
      console.error("Có lỗi khi tạo liên kết thanh toán:", error.response || error.message);
      alert("Có lỗi xảy ra khi tạo liên kết thanh toán, vui lòng thử lại!");
    } finally {
      setLoading(false); // Kết thúc quá trình thanh toán
    }
  };

  // Hàm xử lý xóa đơn hàng khỏi giỏ hàng
  const handleDelete = async (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
      setLoading(true);
      try {
        const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Cập nhật lại danh sách đơn hàng sau khi xóa
          setOrders(orders.filter(order => order._id !== orderId));
        }
      } catch (error) {
        console.error("Có lỗi khi xóa đơn hàng:", error.response || error.message);
        alert("Có lỗi xảy ra khi xóa đơn hàng, vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    }
  };

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

              {/* Nút thanh toán và xóa cho từng đơn hàng */}
              {order.trang_thai !== 'Đã giao' && order.trang_thai !== 'Hủy' && (
                <div className="flex justify-between mt-6">
                  <span className="font-semibold text-xl">Tổng: {order.tong_tien.toLocaleString()} VND</span>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handlePayment(order._id, order.tong_tien)}
                      className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${loading ? 'bg-gray-400' : ''}`}
                      disabled={loading}
                    >
                      {loading ? "Đang xử lý..." : "Thanh toán"}
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className={`px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${loading ? 'bg-gray-400' : ''}`}
                      disabled={loading}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
