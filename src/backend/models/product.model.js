const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  ten_san_pham: { type: String, required: true },
  mo_ta: { type: String, required: true },
  gia: { type: Number, required: true },
  hinh_anh: { type: String },
  trang_thai: { type: String },
  id_danh_muc: { type: Schema.Types.ObjectId, ref: 'Category' }, // Liên kết với danh mục
  id_hang_san_xuat: { type: Schema.Types.ObjectId, ref: 'Manufacturer' }, // Liên kết với hãng sản xuất
});

// Đảm bảo rằng bạn chỉ định đúng tên collection là 'sanpham'
const ProductModel = mongoose.model('Product', productSchema, 'sanpham');

module.exports = ProductModel;
