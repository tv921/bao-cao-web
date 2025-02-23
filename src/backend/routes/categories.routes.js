const express = require('express');
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Lấy danh sách tất cả danh mục
 *     description: Trả về danh sách tất cả danh mục sản phẩm.
 *     responses:
 *       200:
 *         description: Danh sách danh mục sản phẩm
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Thêm danh mục mới
 *     description: Thêm một danh mục sản phẩm mới vào danh sách.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục
 *               description:
 *                 type: string
 *                 description: Mô tả danh mục
 *     responses:
 *       201:
 *         description: Danh mục đã được thêm thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
router.post('/', addCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Cập nhật danh mục theo ID
 *     description: Cập nhật thông tin của một danh mục sản phẩm dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên mới của danh mục
 *               description:
 *                 type: string
 *                 description: Mô tả mới của danh mục
 *     responses:
 *       200:
 *         description: Danh mục đã được cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.put('/:id', updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Xóa danh mục theo ID
 *     description: Xóa một danh mục sản phẩm dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của danh mục cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.delete('/:id', deleteCategory);

module.exports = router;