import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [manufacturers, setManufacturers] = useState([]); // Danh sách hãng sản xuất
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    manufacturerId: '',
    hinh_anh: null, // Khởi tạo trường hình ảnh là null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Lấy danh mục và hãng sản xuất khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Dữ liệu categories không phải là mảng', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manufacturers');
        if (Array.isArray(response.data)) {
          setManufacturers(response.data);
        } else {
          console.error('Dữ liệu manufacturers không phải là mảng', response.data);
        }
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };

    fetchCategories();
    fetchManufacturers();
  }, []);

  // Xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý thay đổi file hình ảnh
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        hinh_anh: file,
      }));

      // Tạo preview cho ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('categoryId', formData.categoryId);
    formDataToSend.append('manufacturerId', formData.manufacturerId);
    if (formData.hinh_anh) {
      formDataToSend.append('hinh_anh', formData.hinh_anh);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Sản phẩm đã được thêm thành công!');
      console.log('Sản phẩm đã được thêm:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error adding product:', error.response?.data || error.message);
      } else {
        console.error('Unknown error:', error);
      }
      alert('Lỗi khi thêm sản phẩm');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows={4}
            required
          />
        </div>

        {/* Giá sản phẩm */}
        <div>
          <label className="block text-sm font-medium">Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-sm font-medium">Danh mục</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.ten_danh_muc}
              </option>
            ))}
          </select>
        </div>

        {/* Hãng sản xuất */}
        <div>
          <label className="block text-sm font-medium">Hãng sản xuất</label>
          <select
            name="manufacturerId"
            value={formData.manufacturerId}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Chọn hãng sản xuất</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.ten_hang}
              </option>
            ))}
          </select>
        </div>

        {/* Hình ảnh sản phẩm */}
        <div>
          <label className="block text-sm font-medium">Hình ảnh</label>
          <input
            type="file"
            name="hinh_anh"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            accept="image/*"
          />
          {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        {/* Nút thêm sản phẩm */}
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
