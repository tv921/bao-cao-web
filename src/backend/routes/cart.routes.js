const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts.controller');

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Quản lý giỏ hàng
 */

/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Lấy danh sách tất cả giỏ hàng
 *     description: Trả về danh sách tất cả giỏ hàng.
 *     responses:
 *       200:
 *         description: Danh sách giỏ hàng
 */
router.get('/', cartController.getAllCarts);

/**
 * @swagger
 * /api/carts/{userId}:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Lấy giỏ hàng theo ID người dùng
 *     description: Trả về thông tin giỏ hàng của người dùng dựa trên ID người dùng.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin giỏ hàng của người dùng
 *       404:
 *         description: Không tìm thấy giỏ hàng
 */
router.get('/:userId', cartController.getCartByUserId);

/**
 * @swagger
 * /api/carts/add:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     description: Thêm một sản phẩm vào giỏ hàng của người dùng.
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
 *               productId:
 *                 type: string
 *                 description: ID của sản phẩm
 *               quantity:
 *                 type: number
 *                 description: Số lượng sản phẩm
 *     responses:
 *       201:
 *         description: Sản phẩm đã được thêm vào giỏ hàng thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
router.post('/add', cartController.addToCart);

/**
 * @swagger
 * /api/carts/remove/{userId}/{productId}:
 *   delete:
 *     tags:
 *       - Carts
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     description: Xóa một sản phẩm khỏi giỏ hàng của người dùng dựa trên ID người dùng và ID sản phẩm.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa khỏi giỏ hàng thành công
 *       404:
 *         description: Không tìm thấy giỏ hàng hoặc sản phẩm
 */
router.delete('/remove/:userId/:productId', cartController.removeItem);

module.exports = router;