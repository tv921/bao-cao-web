const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const router = express.Router();

// Lấy tất cả danh mục
router.get('/', getAllCategories);

// Thêm danh mục mới
router.post('/', addCategory);

// Cập nhật danh mục theo ID
router.put('/:id', updateCategory);

// Xóa danh mục theo ID
router.delete('/:id', deleteCategory);

module.exports = router;
