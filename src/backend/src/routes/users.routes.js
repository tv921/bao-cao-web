const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

// Route để lấy tất cả người dùng
router.get("/users", userController.getAllUsers);

// Route để thêm người dùng mới
router.post("/users", userController.addUser);

// Route để cập nhật thông tin người dùng
router.put("/users/:id", userController.updateUser);

// Route để xóa người dùng
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
