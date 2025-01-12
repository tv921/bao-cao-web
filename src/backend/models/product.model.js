const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  ten_san_pham: { type: String, required: true },
  mo_ta: { type: String, required: false },
  gia: { type: Number, required: true },
  hinh_anh: { type: String },
  trang_thai: { type: String },
  id_danh_muc: { type: Schema.Types.ObjectId, ref: 'danhmuc' }, // Liên kết với danh mục
  id_hang_san_xuat: { type: Schema.Types.ObjectId, ref: 'hangsanxuat' },
  cau_hinh: {
    cpu: { type: String, required: true },  // Ví dụ: "Intel Core i7"
    ram: { type: String, required: true },  // Ví dụ: "16GB"
    o_cung: { type: String, required: true },  // Ví dụ: "512GB SSD"
    gpu: { type: String, required: true },  // Ví dụ: "NVIDIA GTX 1650"
    man_hinh: { type: String, required: true },  // Ví dụ: "15.6 inch Full HD"
    pin: { type: String, required: true },  // Ví dụ: "5000mAh"
    cong_ket_noi: { type: String, required: true },  
    he_dieu_hanh: { type: String, required: true },  
    trong_luong: { type: String, required: true },
   
  } // Liên kết với hãng sản xuất
});

// Đảm bảo rằng bạn chỉ định đúng tên collection là 'sanpham'
const ProductModel = mongoose.model('Product', productSchema, 'sanpham');

module.exports = ProductModel;
