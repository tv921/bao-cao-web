const express = require("express");
const multer = require('multer');
const path = require('path');

const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getProductById,
  getProductsByManufacturer
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

router.get('/category/:categoryId', getProductsByCategory);

router.get('/search', searchProducts);

// Lấy tất cả sản phẩm
router.get("/", getAllProducts);

// Thêm sản phẩm mới
router.post("/", upload.any(), addProduct);

// Cập nhật sản phẩm theo ID
router.put("/:id", upload.any(), updateProduct);

// Xóa sản phẩm theo ID
router.delete("/:id", deleteProduct);

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', getProductById);

// Định nghĩa route lấy sản phẩm theo hãng sản xuất
router.get('/manufacturer/:manufacturerName', getProductsByManufacturer); // Thêm dòng này

module.exports = router;
