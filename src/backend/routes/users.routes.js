const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authenticateUser = require('../middlewares/authenticateUser');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy tất cả người dùng
 *     description: Trả về danh sách tất cả người dùng
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Đăng ký người dùng mới
 *     description: API để đăng ký tài khoản mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Đăng nhập
 *     description: Người dùng đăng nhập vào hệ thống
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_dang_nhap:
 *                 type: string
 *                 example: "user123"
 *               mat_khau:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai tài khoản hoặc mật khẩu
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /api/users/user-info:
 *   get:
 *     tags:
 *       - Users
 *     summary: Lấy thông tin người dùng
 *     description: Trả về thông tin cá nhân của người dùng (cần token)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Không có quyền truy cập
 */
router.get("/user-info", authenticateUser, userController.getUserInfo);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Đăng xuất người dùng
 *     description: Đăng xuất tài khoản và hủy token
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
router.post("/logout", userController.logoutUser);

/**
 * @swagger
 * /api/users/user-info:
 *   put:
 *     tags:
 *       - Users
 *     summary: Cập nhật thông tin người dùng
 *     description: Cập nhật thông tin cá nhân của người dùng (cần token)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_dang_nhap:
 *                 type: string
 *                 example: "user123"
 *               email:
 *                 type: string
 *                 example: "user123@example.com"
 *               sdt:
 *                 type: string
 *                 example: "0123456789"
 *               dia_chi:
 *                 type: string
 *                 example: "123 Đường ABC"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/user-info", authenticateUser, userController.updateUserInfo);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Xóa người dùng (chỉ dành cho admin)
 *     description: Xóa một người dùng theo ID (chỉ admin có quyền thực hiện)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       403:
 *         description: Không có quyền thực hiện
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
