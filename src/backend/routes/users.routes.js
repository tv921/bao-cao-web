const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authenticateUser = require('../middlewares/authenticateUser');

// Route để lấy tất cả người dùng
router.get("/", userController.getAllUsers);

// Route để đăng ký người dùng mới
router.post("/register", userController.registerUser);  // Thêm route đăng ký

// Route để đăng nhập người dùng
router.post("/login", userController.loginUser);  // Thêm route đăng nhập

// Route để lấy thông tin người dùng (sử dụng token)
router.get("/user-info", userController.getUserInfo);  // Đảm bảo sử dụng token để lấy thông tin người dùng

// Route để đăng xuất người dùng
router.post("/logout", userController.logoutUser);  // Thêm route đăng xuất

// Route để cập nhật thông tin người dùng
router.put("/user-info", userController.updateUserInfo);  // Cập nhật thông tin người dùng, không cần id trong URL vì thông tin đã có trong token

// Route để xóa người dùng (chỉ dành cho admin)
router.delete("/:id", userController.deleteUser);  // Đảm bảo chỉ admin mới có quyền xóa người dùng

module.exports = router;
