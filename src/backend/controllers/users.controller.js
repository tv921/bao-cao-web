const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// API để lấy thông tin người dùng (sử dụng token để xác thực)
const getUserInfo = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ token
    const userId = req.user.id;

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId).select('ten_dang_nhap email'); // Chỉ lấy ten_dang_nhap và email

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Trả về thông tin người dùng
    res.status(200).json({
      ten_dang_nhap: user.ten_dang_nhap,
      email: user.email,
    });
  } catch (error) {
    console.error('Error while getting user info:', error);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { ten_dang_nhap, email, mat_khau, sdt, dia_chi, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    const newUser = new User({
      ten_dang_nhap,
      email,
      mat_khau: hashedPassword,
      sdt,
      dia_chi,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const loginUser = async (req, res) => {
  const { email, mat_khau } = req.body;
  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo token chứa thông tin vai trò (role)
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Thêm role
      'secretkey',
      { expiresIn: '1h' }
    );

    // Trả về token
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    console.error("Error during login:", error);  // In lỗi chi tiết ra console
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};


// Đăng xuất người dùng
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};

// Cập nhật thông tin người dùng
const updateUserInfo = async (req, res) => {
  try {
    const { ten_dang_nhap, email, sdt, dia_chi, role } = req.body; // Các thông tin muốn cập nhật
    const userId = req.user.id; // ID người dùng từ token

    // Tìm và cập nhật thông tin người dùng
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ten_dang_nhap, email, sdt, dia_chi, role }, // Cập nhật tất cả các trường có thể
      { new: true, runValidators: true } // Trả về bản ghi đã cập nhật và áp dụng validate
    ).select("ten_dang_nhap email sdt dia_chi role");

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({
      message: "Cập nhật thông tin thành công",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while updating user info:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    // Lọc người dùng có role là "user"
    const users = await User.find({ role: "user" }); // Không sử dụng .select để lấy tất cả các trường
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Tìm người dùng trong cơ sở dữ liệu
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      // Nếu không tìm thấy người dùng, trả về lỗi
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Nếu xóa thành công, trả về thông báo
    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    // In ra lỗi để dễ dàng debug
    console.error("Error deleting user:", error);

    // Kiểm tra nếu lỗi liên quan đến việc không thể đọc thuộc tính 'role' 
    if (error.message.includes("role")) {
      return res.status(500).json({ message: "Lỗi khi xóa người dùng, không tìm thấy vai trò." });
    }

    // Trả về lỗi chung
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};


module.exports = { registerUser, loginUser, logoutUser, getUserInfo, updateUserInfo, getAllUsers, deleteUser };


