const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
  ten_hang_san_xuat: { type: String, required: true },
  mo_ta: { type: String },
});

// Đảm bảo rằng bạn chỉ định đúng tên collection là 'hangsanxuat'
const ManufacturerModel = mongoose.model('Manufacturer', manufacturerSchema, 'hangsanxuat');

module.exports = ManufacturerModel;
