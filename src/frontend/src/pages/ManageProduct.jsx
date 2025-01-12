import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Dùng để điều hướng trang

  // Gọi API để lấy tất cả sản phẩm
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);  // Lưu danh sách sản phẩm vào state
        setLoading(false);  // Đánh dấu đã tải xong
      })
      .catch((err) => {
        setError(err.message);  // Xử lý lỗi
        setLoading(false);
      });
  }, []);

  // Xử lý xóa sản phẩm
  const handleDelete = (productId) => {
    // Gửi yêu cầu xóa sản phẩm từ API
    axios.delete(`http://localhost:5000/api/products/${productId}`)
      .then(() => {
        // Xóa sản phẩm khỏi danh sách trong state
        setProducts(products.filter((product) => product._id !== productId));
        alert('Sản phẩm đã được xóa thành công');
      })
      .catch((err) => {
        setError('Không thể xóa sản phẩm. Lỗi: ' + err.message);
      });
  };

  // Xử lý điều hướng khi nhấn nút "Sửa"
  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);  // Chuyển đến trang sửa sản phẩm với ID sản phẩm
  };

  if (loading) {
    return <div className="text-center text-xl">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="products-page container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Danh sách sản phẩm</h1>
      <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-item border rounded-lg shadow-lg p-4 bg-white flex flex-col h-full">
              <img
                src={product.hinh_anh}
                alt={product.ten_san_pham}
                className="product-image w-full h-48 object-cover rounded-md mb-4"
              />
              
              <h2 className="text-xl font-semibold mb-2">{product.ten_san_pham}</h2>
              <p className="text-gray-600 mb-4">{product.mo_ta}</p>

              {/* Hiển thị tên danh mục và hãng sản xuất */}
              <div className="mt-4">
                <p><strong>Danh mục:</strong> {product.id_danh_muc?.ten_danh_muc}</p>
                <p><strong>Hãng sản xuất:</strong> {product.id_hang_san_xuat?.ten_hang_san_xuat}</p>
              </div>

              {/* Kiểm tra sự tồn tại của cau_hinh trước khi hiển thị thông tin */}
              {product.cau_hinh && (
                <div className="cau-hinh mt-4">
                  <p><strong>CPU:</strong> {product.cau_hinh.cpu}</p>
                  <p><strong>RAM:</strong> {product.cau_hinh.ram}</p>
                  <p><strong>Ổ cứng:</strong> {product.cau_hinh.o_cung}</p>
                  <p><strong>GPU:</strong> {product.cau_hinh.gpu}</p>
                  <p><strong>Màn hình:</strong> {product.cau_hinh.man_hinh}</p>
                  <p><strong>Pin:</strong> {product.cau_hinh.pin}</p>
                  <p><strong>Cổng kết nối:</strong> {product.cau_hinh.cong_ket_noi}</p>
                  <p><strong>Hệ điều hành:</strong> {product.cau_hinh.he_dieu_hanh}</p>
                  <p><strong>Trọng lượng:</strong> {product.cau_hinh.trong_luong}</p>
                 
                </div>
              )}

              {/* Giá nằm ở dưới cùng */}
              <div className="mt-auto text-lg font-bold text-green-600">Giá: {product.gia} VNĐ</div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(product._id)}  // Điều hướng tới trang sửa sản phẩm
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product._id)}  // Gọi hàm xóa khi nhấn nút
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl text-gray-500">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
