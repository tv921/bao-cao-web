import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    manufacturerId: "",
    hinh_anh: null,
    cau_hinh: {
      cpu: "",
      ram: "",
      o_cung: "",
      gpu: "",
      man_hinh: "",
      pin: "",
      cong_ket_noi: "",
      he_dieu_hanh: "",
      trong_luong: "",
      kich_thuoc: "",
    },
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manufacturers');
        console.log('Manufacturers data:', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setManufacturers(response.data);
        } else {
          console.error('API trả về dữ liệu không hợp lệ hoặc không có dữ liệu:', response.data);
          setManufacturers([]);
        }
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
        alert('Không thể tải danh sách hãng sản xuất. Vui lòng kiểm tra lại.');
      }
    };
    

    fetchCategories();
    fetchManufacturers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu là thuộc tính trong cau_hinh
    if (name in formData.cau_hinh) {
      setFormData((prev) => ({
        ...prev,
        cau_hinh: {
          ...prev.cau_hinh,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        hinh_anh: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Kiểm tra các trường bắt buộc
    if (!formData.name || !formData.price || !formData.categoryId || !formData.manufacturerId) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
  
    // Chuẩn bị FormData để gửi
    const dataToSend = new FormData();
    dataToSend.append("ten_san_pham", formData.name);
    dataToSend.append("mo_ta", formData.description);
    dataToSend.append("gia", formData.price.toString());
    dataToSend.append("id_danh_muc", formData.categoryId);
    dataToSend.append("id_hang_san_xuat", formData.manufacturerId);
  
    // Thêm các thuộc tính cấu hình vào FormData
    for (const key in formData.cau_hinh) {
      if (formData.cau_hinh[key]) {
        dataToSend.append(`cau_hinh[${key}]`, formData.cau_hinh[key]);
      }
    }

    // Chỉ thêm file nếu có
    if (formData.hinh_anh) {
      dataToSend.append("hinh_anh", formData.hinh_anh);
    }
  
    try {
      setLoading(true);
  
      // Gửi dữ liệu tới server
      const response = await axios.post("http://localhost:5000/api/products", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Lấy URL ảnh từ phản hồi
      const { hinh_anh_url } = response.data;
  
      alert("Sản phẩm đã được thêm thành công!");
      console.log("Dữ liệu trả về:", response.data);
  
      // Đặt lại form về trạng thái ban đầu
      setFormData({
        name: "",
        description: "",
        price: 0,
        categoryId: "",
        manufacturerId: "",
        hinh_anh: null,
        cau_hinh: {
          cpu: "",
          ram: "",
          o_cung: "",
          gpu: "",
          man_hinh: "",
          pin: "",
          cong_ket_noi: "",
          he_dieu_hanh: "",
          trong_luong: "",
          kich_thuoc: "",
        },
      });
      setImagePreview(hinh_anh_url || null); // Hiển thị lại ảnh đã tải lên (nếu cần)
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error.response?.data || error.message);
      alert("Thêm sản phẩm thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.ten_danh_muc}
              </option>
            ))}
          </select>
        </div>
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
            {manufacturers.map((manu) => (
              <option key={manu._id} value={manu._id}>
                {manu.ten_hang_san_xuat}
              </option>
            ))}
          </select>
        </div>
        {/* Thêm phần cấu hình sản phẩm */}
        <div>
          <h3 className="text-lg font-medium">Cấu hình sản phẩm</h3>
          {Object.keys(formData.cau_hinh).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium">{key}</label>
              <input
                type="text"
                name={key}
                value={formData.cau_hinh[key]}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium">Hình ảnh</label>
          <input
            type="file"
            name="hinh_anh"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            accept="image/*"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
            {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
