import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductPage = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate(); // Điều hướng sau khi cập nhật

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [manufacturers, setManufacturers] = useState([]); // Danh sách hãng sản xuất
  const [formData, setFormData] = useState({
    ten_san_pham: '',
    mo_ta: '',
    gia: '',
    id_danh_muc: '',
    id_hang_san_xuat: '',
    cau_hinh: {
      cpu: '',
      ram: '',
      o_cung: '',
      gpu: '',
      man_hinh: '',
      pin: '',
      cong_ket_noi: '',
      he_dieu_hanh: '',
      trong_luong: '',
      kich_thuoc: '',
    },
    hinh_anh: null,
  });

  useEffect(() => {
    // Lấy thông tin sản phẩm
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setFormData({
          ...response.data,
          id_danh_muc: response.data.id_danh_muc ? response.data.id_danh_muc._id : '',
          id_hang_san_xuat: response.data.id_hang_san_xuat ? response.data.id_hang_san_xuat._id : '',
          hinh_anh: response.data.hinh_anh || '',  // Nếu không có ảnh, đặt là chuỗi rỗng
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  
    // Lấy danh sách danh mục và hãng sản xuất
    axios.get('http://localhost:5000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        setError('Lỗi khi lấy danh mục: ' + err.message);
      });
  
    axios.get('http://localhost:5000/api/manufacturers')
      .then((response) => {
        setManufacturers(response.data);
      })
      .catch((err) => {
        setError('Lỗi khi lấy hãng sản xuất: ' + err.message);
      });
  }, [id]);
  
  // Xử lý khi thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('cau_hinh.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        cau_hinh: {
          ...prev.cau_hinh,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Xử lý khi thay đổi file ảnh
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      hinh_anh: e.target.files[0], // Cập nhật ảnh mới
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
  
    // Duyệt qua các trường trong formData để thêm vào FormData
    Object.keys(formData).forEach((key) => {
      if (key === 'cau_hinh') {
        // Nếu là trường cấu hình, chuyển nó thành JSON string
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'hinh_anh') {
        // Nếu có ảnh mới, thêm ảnh vào FormData
        if (formData.hinh_anh) {
          data.append(key, formData.hinh_anh);
        } else {
          // Nếu không có ảnh mới, gửi ảnh cũ (giữ nguyên ảnh cũ)
          if (product && product.hinh_anh) {
            data.append(key, product.hinh_anh); // Giữ ảnh cũ
          }
        }
      } else {
        // Các trường khác chỉ cần thêm giá trị vào FormData
        data.append(key, formData[key]);
      }
    });
  
    // Gửi request PUT để cập nhật sản phẩm
    axios.put(`http://localhost:5000/api/products/${id}`, data)
      .then((response) => {
        alert('Cập nhật sản phẩm thành công!');
        navigate('/manage-product'); // Điều hướng về trang danh sách sản phẩm
      })
      .catch((err) => {
        setError('Lỗi khi cập nhật sản phẩm: ' + err.message);
      });
  };
  
  

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="edit-product-page container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="ten_san_pham"
            value={formData.ten_san_pham}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            name="mo_ta"
            value={formData.mo_ta}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            name="gia"
            value={formData.gia}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label>Danh mục</label>
          <select
            name="id_danh_muc"
            value={formData.id_danh_muc}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.ten_danh_muc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hãng sản xuất</label>
          <select
            name="id_hang_san_xuat"
            value={formData.id_hang_san_xuat}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Chọn hãng sản xuất</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.ten_hang_san_xuat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cấu hình</label>
          {Object.keys(formData.cau_hinh).map((key) => (
            <div key={key}>
              <label>{key.toUpperCase()}</label>
              <input
                type="text"
                name={`cau_hinh.${key}`}
                value={formData.cau_hinh[key]}
                onChange={handleChange}
                className="w-full border p-2"
              />
            </div>
          ))}
        </div>
        <div>
          <label>Hình ảnh</label>
          <input
            type="file"
            name="hinh_anh"
            onChange={handleFileChange}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
