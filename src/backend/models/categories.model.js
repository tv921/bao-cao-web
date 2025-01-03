const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  ten_danh_muc: { type: String, required: true },
  mo_ta: { type: String },
});

// Đảm bảo rằng bạn chỉ định đúng tên collection là 'danhmuc'
const CategoryModel = mongoose.model('Category', categorySchema, 'danhmuc');

module.exports = CategoryModel;
