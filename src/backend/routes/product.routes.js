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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lấy danh sách sản phẩm theo danh mục
 *     description: Trả về danh sách các sản phẩm thuộc danh mục được chỉ định.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID của danh mục sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm theo danh mục
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get('/category/:categoryId', getProductsByCategory);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Tìm kiếm sản phẩm
 *     description: Trả về danh sách sản phẩm phù hợp với từ khóa tìm kiếm.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Từ khóa tìm kiếm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm phù hợp
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/search', searchProducts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lấy tất cả sản phẩm
 *     description: Trả về danh sách tất cả sản phẩm.
 *     responses:
 *       200:
 *         description: Danh sách tất cả sản phẩm
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Thêm sản phẩm mới
 *     description: Thêm một sản phẩm mới vào danh sách.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Ảnh của sản phẩm.
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Tên sản phẩm.
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Giá sản phẩm.
 *       - in: formData
 *         name: categoryId
 *         type: string
 *         description: ID danh mục sản phẩm.
 *       - in: formData
 *         name: manufacturer
 *         type: string
 *         description: Hãng sản xuất.
 *     responses:
 *       201:
 *         description: Sản phẩm đã được thêm thành công
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ
 */
router.post("/", upload.any(), addProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Cập nhật sản phẩm theo ID
 *     description: Cập nhật thông tin của một sản phẩm dựa trên ID.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần cập nhật
 *         schema:
 *           type: string
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Ảnh mới của sản phẩm.
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Tên mới của sản phẩm.
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Giá mới của sản phẩm.
 *       - in: formData
 *         name: categoryId
 *         type: string
 *         description: ID danh mục mới của sản phẩm.
 *       - in: formData
 *         name: manufacturer
 *         type: string
 *         description: Hãng sản xuất mới.
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.put("/:id", upload.any(), updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Xóa sản phẩm theo ID
 *     description: Xóa một sản phẩm dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lấy chi tiết sản phẩm theo ID
 *     description: Trả về thông tin chi tiết của một sản phẩm dựa trên ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products/manufacturer/{manufacturerName}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Lấy danh sách sản phẩm theo hãng sản xuất
 *     description: Trả về danh sách các sản phẩm thuộc hãng sản xuất được chỉ định.
 *     parameters:
 *       - in: path
 *         name: manufacturerName
 *         required: true
 *         description: Tên hãng sản xuất
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm theo hãng sản xuất
 *       404:
 *         description: Không tìm thấy hãng sản xuất
 */
router.get('/manufacturer/:manufacturerName', getProductsByManufacturer);

module.exports = router;