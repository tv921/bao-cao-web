// src/routes/categories.routes.js
const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');

const router = express.Router();

// Định nghĩa các route
router.get('/', getAllCategories);         // Lấy tất cả danh mục
router.post('/', addCategory);             // Thêm danh mục
router.put('/:id', updateCategory);        // Sửa danh mục
router.delete('/:id', deleteCategory);     // Xóa danh mục

module.exports = router;
