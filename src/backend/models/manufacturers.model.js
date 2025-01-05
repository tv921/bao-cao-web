const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho hãng sản xuất
const manufacturerSchema = new Schema({
  ten_hang_san_xuat: { type: String, required: true }, // Tên hãng sản xuất
  mo_ta: { type: String }, 
});

// Đăng ký model 'hangsanxuat'
const ManufacturerModel = mongoose.model('hangsanxuat', manufacturerSchema,'hangsanxuat');

module.exports = ManufacturerModel;
