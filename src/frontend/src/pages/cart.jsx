import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán tại cửa hàng');

  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
  }

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/carts/${userId}`)
        .then(response => {
          const cart = response.data;
          setCartItems(cart.san_pham);
          setTotalPrice(cart.tong_tien);
        })
        .catch(error => {
          console.error("Có lỗi khi lấy dữ liệu giỏ hàng!", error);
        });
    }
  }, [userId]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id_san_pham._id === productId) {
        return { ...item, so_luong: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);

    // Cập nhật tổng tiền sau khi thay đổi số lượng
    let newTotalPrice = 0;
    updatedItems.forEach(item => {
      newTotalPrice += item.id_san_pham.gia * item.so_luong;
    });
    setTotalPrice(newTotalPrice);
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/carts/remove/${userId}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const updatedItems = cartItems.filter(item => item.id_san_pham._id !== productId);
        setCartItems(updatedItems);
  
        // Cập nhật tổng tiền
        let newTotalPrice = 0;
        updatedItems.forEach(item => {
          newTotalPrice += item.id_san_pham.gia * item.so_luong;
        });
        setTotalPrice(newTotalPrice);
  
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.');
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/orders/checkout/${userId}`, {
        ghi_chu: note,
        phuong_thuc_thanh_toan: paymentMethod
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Đơn hàng đã được tạo thành công!');
        setCartItems([]);
        setTotalPrice(0);
        setNote('');
        setPaymentMethod('Thanh toán tại cửa hàng');
      }
    } catch (error) {
      console.error('Lỗi khi gửi đơn hàng:', error);
      alert('Có lỗi xảy ra khi gửi đơn hàng.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id_san_pham._id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <img
                  src={item.id_san_pham.hinh_anh}
                  alt={item.id_san_pham.ten_san_pham}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium">{item.id_san_pham.ten_san_pham}</h3>
                  <p className="text-sm text-gray-500">{item.id_san_pham.mo_ta}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.so_luong}
                  min="1"
                  className="w-12 p-2 border rounded"
                  onChange={(e) => handleQuantityChange(item.id_san_pham._id, parseInt(e.target.value))}
                />
                <span className="text-lg font-semibold">
                  {(item.id_san_pham.gia * item.so_luong).toLocaleString('vi-VN')} VND
                </span>
                <button
                  onClick={() => handleRemoveItem(item.id_san_pham._id)}
                  className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <label className="block mb-2 font-medium">Ghi chú đơn hàng:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-medium">Phương thức thanh toán:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Thanh toán tại cửa hàng">Thanh toán tại cửa hàng</option>
              <option value="Thanh toán khi nhận hàng (COD)">Thanh toán khi nhận hàng (COD)</option>
              <option value="Thanh toán bằng chuyển khoản ngân hàng">Thanh toán bằng chuyển khoản ngân hàng</option>
            </select>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="font-semibold text-xl">
              Tổng: {totalPrice.toLocaleString('vi-VN')} VND
            </span>
            <div className="flex space-x-4">
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Gửi đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


