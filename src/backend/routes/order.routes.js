const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  checkoutOrder,
  getOrderById,
  approveOrder
} = require('../controllers/orders.controller');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Quản lý đơn hàng
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Lấy tất cả đơn hàng
 *     description: Trả về danh sách tất cả đơn hàng.
 *     responses:
 *       200:
 *         description: Danh sách tất cả đơn hàng
 */
router.get('/', getAllOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Tạo đơn hàng mới
 *     description: Tạo một đơn hàng mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID của người dùng
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Đơn hàng đã được tạo thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
router.post('/', createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Cập nhật đơn hàng theo ID
 *     description: Cập nhật thông tin của một đơn hàng dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Đơn hàng đã được cập nhật thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.put('/:id', updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Xóa đơn hàng theo ID
 *     description: Xóa một đơn hàng dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đơn hàng đã được xóa thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.delete('/:id', deleteOrder);

/**
 * @swagger
 * /api/orders/checkout/{userId}:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Thanh toán đơn hàng
 *     description: Thanh toán đơn hàng của người dùng dựa trên ID người dùng.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thanh toán thành công
 *       404:
 *         description: Không tìm thấy đơn hàng hoặc người dùng
 */
router.post('/checkout/:userId', checkoutOrder);

/**
 * @swagger
 * /api/orders/{userId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Lấy đơn hàng theo ID người dùng
 *     description: Trả về thông tin đơn hàng của người dùng dựa trên ID người dùng.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin đơn hàng của người dùng
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.get('/:userId', getOrderById);

/**
 * @swagger
 * /api/orders/approve/{orderId}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Phê duyệt đơn hàng
 *     description: Phê duyệt một đơn hàng dựa trên ID đơn hàng.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID của đơn hàng cần phê duyệt
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đơn hàng đã được phê duyệt thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.put('/approve/:orderId', approveOrder);

module.exports = router;