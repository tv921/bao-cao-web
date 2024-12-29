
const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    id_nguoi_dung: mongoose.Schema.Types.ObjectId,
    san_pham: [
        {
            id_san_pham: mongoose.Schema.Types.ObjectId,
            so_luong: Number,
            gia: Number
        }
    ],
    tong_tien: Number,
    trang_thai: { type: String, enum: ['Đang xử lý', 'Đã giao', 'Hủy'], default: 'Đang xử lý' },
    ngay_dat_hang: { type: Date, default: Date.now },
    ghi_chu: String
});
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;