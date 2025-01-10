
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cập nhật lại OrderSchema để sử dụng ref cho các sản phẩm
const OrderSchema = new mongoose.Schema({
    id_nguoi_dung: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    san_pham: [
        {
            id_san_pham: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  // Liên kết tới Product
            so_luong: { type: Number, required: true },
            gia: { type: Number, required: true }
        }
    ],
    tong_tien: { type: Number, required: true },
    trang_thai: { type: String, enum: ['Đang xử lý', 'Đã giao', 'Hủy'], default: 'Đang xử lý' },
    ngay_dat_hang: { type: Date, default: Date.now },
    ghi_chu: String,
    phuong_thuc_thanh_toan: { type: String, required: true }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
