const Order = require('../models/order.model');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa đơn hàng', error: error.message });
    }
};

module.exports = {getAllOrders, createOrder, updateOrder, deleteOrder};