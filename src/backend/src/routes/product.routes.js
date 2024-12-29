const express = require("express");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const router = express.Router();

// Lấy tất cả sản phẩm
router.get("/", getAllProducts);

// Thêm sản phẩm mới
router.post("/", addProduct);

// Cập nhật sản phẩm theo ID
router.put("/:id", updateProduct);

// Xóa sản phẩm theo ID
router.delete("/:id", deleteProduct);

module.exports = router;
