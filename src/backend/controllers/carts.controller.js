const Cart = require('../models/cart.model');

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

const createCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo giỏ hàng', error: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng', error: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa giỏ hàng', error: error.message });
    }
};


module.exports = {getAllCarts, createCart, updateCart, deleteCart };