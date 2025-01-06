const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    id_nguoi_dung: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  // Liên kết với User schema
        required: true 
    },
    san_pham: [
        {
            id_san_pham: { 
                type: Schema.Types.ObjectId, 
                ref: 'Product',  // Liên kết với Product schema
                required: true 
            },
            so_luong: { type: Number, required: true }
        }
    ],
    tong_tien: { type: Number, required: true },
    ngay_cap_nhat: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
