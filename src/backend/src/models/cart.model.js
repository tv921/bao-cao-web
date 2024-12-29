const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;

const CartSchema  = new Schema({
    id_nguoi_dung: mongoose.Schema.Types.ObjectId,
    san_pham: [
        {
            id_san_pham: mongoose.Schema.Types.ObjectId,
            so_luong: Number
        }
    ],
    tong_tien: Number,
    ngay_cap_nhat: { type: Date, default: Date.now }
})

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
