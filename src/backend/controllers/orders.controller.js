const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

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

// API để xử lý thanh toán đơn hàng
const checkoutOrder = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Lấy giỏ hàng của người dùng và populate thông tin sản phẩm
        const cart = await Cart.findOne({ id_nguoi_dung: userId }).populate('san_pham.id_san_pham');
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }

        // Tạo đơn hàng từ giỏ hàng
        const newOrder = new Order({
            id_nguoi_dung: userId,
            san_pham: cart.san_pham.map(item => ({
                id_san_pham: item.id_san_pham._id,
                so_luong: item.so_luong,
                gia: item.id_san_pham.gia // Lấy giá từ sản phẩm đã populate
            })),
            tong_tien: cart.san_pham.reduce((total, item) => total + item.so_luong * item.id_san_pham.gia, 0), // Tính tổng tiền
            ghi_chu: req.body.ghi_chu || '',
            phuong_thuc_thanh_toan: req.body.phuong_thuc_thanh_toan || 'Tiền mặt'
        });

        await newOrder.save();

        // Xóa giỏ hàng sau khi tạo đơn hàng thành công
        await Cart.findByIdAndDelete(cart._id);

        res.status(200).json({ message: 'Đơn hàng đã được tạo thành công.', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xử lý đơn hàng.', error });
    }
};


// API để lấy danh sách đơn hàng của người dùng
const getOrderById = async (req, res) => {
    try {
        const orders = await Order.find({ id_nguoi_dung: req.params.userId })
            .populate('san_pham.id_san_pham')
            .populate('id_nguoi_dung', 'ten_dang_nhap email sdt dia_chi'); // Thêm populate để lấy thông tin địa chỉ từ bảng User
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error });
    }
};

const approveOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: -1, message: "Order not found" });
        }

        order.trang_thai = 'Đã giao';
        await order.save();

        return res.json({
            error: 0,
            message: "Order approved successfully",
            data: order,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: -1, message: "Failed to approve order" });
    }
};


module.exports = {getAllOrders, createOrder, updateOrder, deleteOrder, checkoutOrder, getOrderById, approveOrder};