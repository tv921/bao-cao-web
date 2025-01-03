const express = require("express");
const multer = require('multer');
const path = require('path');

const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const router = express.Router();

// Cấu hình multer để lưu file vào thư mục 'frontend/public/images'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Lưu ảnh vào thư mục 'frontend/public/images'
    cb(null, path.join(__dirname, '../../frontend/public/images'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
/// Lấy tất cả sản phẩm
router.get("/", getAllProducts);

// Thêm sản phẩm mới
router.post("/", upload.any(), addProduct);

// Cập nhật sản phẩm theo ID
router.put("/:id", updateProduct);

// Xóa sản phẩm theo ID
router.delete("/:id", deleteProduct);

module.exports = router;