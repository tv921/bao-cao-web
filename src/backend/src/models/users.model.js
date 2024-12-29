const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ten_dang_nhap: {
    type: String,
    required: true,
  },
  mat_khau: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo rằng email là duy nhất
  },
  sdt: {
    type: String,
  },
  dia_chi: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
