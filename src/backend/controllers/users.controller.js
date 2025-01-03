const UserModel = require("../models/users.model");

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách người dùng",
      error: error.message,
    });
  }
};

// Thêm người dùng mới
const addUser = async (req, res) => {
  const { ten_dang_nhap, mat_khau, email, sdt, dia_chi } = req.body;

  if (!ten_dang_nhap || !mat_khau || !email) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
  }

  try {
    // Kiểm tra email có tồn tại chưa
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo người dùng mới
    const newUser = new UserModel({
      ten_dang_nhap,
      mat_khau,
      email,
      sdt,
      dia_chi,
    });

    // Lưu người dùng vào database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Lỗi khi thêm người dùng", error: error.message });
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { ten_dang_nhap, mat_khau, email, sdt, dia_chi, trang_thai } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ten_dang_nhap, mat_khau, email, sdt, dia_chi, trang_thai },
      { new: true }, // Trả về người dùng sau khi cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật người dùng", error: error.message });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.json({ message: "Người dùng đã bị xóa" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa người dùng", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
