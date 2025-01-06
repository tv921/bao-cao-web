const Cart = require('../models/cart.model');
const mongoose = require('mongoose');  
const ProductModel = require('../models/product.model');

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        if (carts.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
        }
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: error.message });
    }
};

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        let cart = await Cart.findOne({ id_nguoi_dung: userId });

        if (!cart) {
            cart = new Cart({
                id_nguoi_dung: userId,
                san_pham: [{ id_san_pham: productId, so_luong: quantity }],
                tong_tien: product.gia * quantity,
            });
        } else {
            const productIndex = cart.san_pham.findIndex(item => item.id_san_pham.toString() === productId);

            if (productIndex > -1) {
                cart.san_pham[productIndex].so_luong += quantity;
            } else {
                cart.san_pham.push({ id_san_pham: productId, so_luong: quantity });
            }

            cart.tong_tien = await calculateTotal(cart.san_pham);
        }

        await cart.save();

        res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cart });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm vào giỏ hàng', error });
    }
};

async function calculateTotal(products) {
    let total = 0;
    for (let product of products) {
        const productData = await ProductModel.findById(product.id_san_pham);
        total += productData.gia * product.so_luong;
    }
    return total;
}

const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID người dùng không hợp lệ' });
    }

    try {
        const cart = await Cart.findOne({ id_nguoi_dung: userId }).populate('san_pham.id_san_pham');

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tìm thấy' });
        }

        // Tính tổng số sản phẩm trong giỏ hàng
        const totalItems = cart.san_pham.reduce((total, item) => total + item.so_luong, 0);

        // Trả về giỏ hàng và tổng số sản phẩm
        res.json({
            ...cart.toObject(),
            totalItems: totalItems
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: error.message });
    }
};


const removeItem = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Tìm giỏ hàng của người dùng
        const cart = await Cart.findOne({ id_nguoi_dung: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        // Tìm sản phẩm trong giỏ hàng
        const productIndex = cart.san_pham.findIndex(item => item.id_san_pham.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        cart.san_pham.splice(productIndex, 1);

        // Cập nhật lại tổng tiền
        const newTotalPrice = cart.san_pham.reduce((total, item) => {
            // Kiểm tra xem giá trị có hợp lệ không trước khi tính toán
            const price = item.id_san_pham?.gia || 0;  // Giá mặc định là 0 nếu không hợp lệ
            const quantity = item.so_luong || 0;  // Số lượng mặc định là 0 nếu không hợp lệ
            return total + (price * quantity);
        }, 0);

        // Kiểm tra giá trị tổng tiền
        if (isNaN(newTotalPrice)) {
            return res.status(400).json({ message: 'Tính toán tổng tiền không hợp lệ' });
        }

        // Cập nhật tổng tiền và thời gian
        cart.tong_tien = newTotalPrice;
        cart.ngay_cap_nhat = Date.now();

        // Lưu giỏ hàng đã cập nhật
        await cart.save();

        return res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa sản phẩm' });
    }
};



module.exports = {removeItem, getAllCarts, addToCart, getCartByUserId };
