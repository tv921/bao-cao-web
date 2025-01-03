const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;


const ReviewSchema = new mongoose.Schema({
    id_san_pham: mongoose.Schema.Types.ObjectId,
    id_nguoi_dung: mongoose.Schema.Types.ObjectId,
    so_sao: { type: Number, min: 1, max: 5 },
    binh_luan: String,
    ngay_danh_gia: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;