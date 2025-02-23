const express = require('express');
const {
  getAllManufacturers,
  addManufacturer,
  updateManufacturer,
  deleteManufacturer
} = require('../controllers/manufacturers.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Manufacturers
 *   description: Quản lý nhà sản xuất
 */

/**
 * @swagger
 * /api/manufacturers:
 *   get:
 *     tags:
 *       - Manufacturers
 *     summary: Lấy danh sách tất cả nhà sản xuất
 *     description: Trả về danh sách tất cả nhà sản xuất.
 *     responses:
 *       200:
 *         description: Danh sách nhà sản xuất
 */
router.get('/', getAllManufacturers);

/**
 * @swagger
 * /api/manufacturers:
 *   post:
 *     tags:
 *       - Manufacturers
 *     summary: Thêm nhà sản xuất mới
 *     description: Thêm một nhà sản xuất mới vào danh sách.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_hang_san_xuat:
 *                 type: string
 *                 description: Tên nhà sản xuất
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả nhà sản xuất
 *     responses:
 *       201:
 *         description: Nhà sản xuất đã được thêm thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
router.post('/', addManufacturer);

/**
 * @swagger
 * /api/manufacturers/{id}:
 *   put:
 *     tags:
 *       - Manufacturers
 *     summary: Cập nhật thông tin nhà sản xuất
 *     description: Cập nhật thông tin của một nhà sản xuất dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhà sản xuất cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_hang_san_xuat:
 *                 type: string
 *                 description: Tên mới của nhà sản xuất
 *               mo_ta:
 *                 type: string
 *                 description: Mô tả mới của nhà sản xuất
 *     responses:
 *       200:
 *         description: Nhà sản xuất đã được cập nhật thành công
 *       404:
 *         description: Không tìm thấy nhà sản xuất
 */
router.put('/:id', updateManufacturer);

/**
 * @swagger
 * /api/manufacturers/{id}:
 *   delete:
 *     tags:
 *       - Manufacturers
 *     summary: Xóa nhà sản xuất
 *     description: Xóa một nhà sản xuất dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của nhà sản xuất cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nhà sản xuất đã được xóa thành công
 *       404:
 *         description: Không tìm thấy nhà sản xuất
 */
router.delete('/:id', deleteManufacturer);

module.exports = router;