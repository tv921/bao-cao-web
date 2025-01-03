const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/categories.routes");
const manufacturerRoutes = require("./routes/manufacturers.routes");
const userRoutes = require("./routes/users.routes"); // Nhập khẩu đúng route user
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const reviewRoutes = require('./routes/review.routes');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors()); // Cho phép tất cả các nguồn yêu cầu
app.use(bodyParser.json()); // Phân tích dữ liệu JSON trong yêu cầu
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images'))); // Cung cấp quyền truy cập vào thư mục 'public/images'
// Chuỗi kết nối MongoDB
const mongoUri = "mongodb://localhost:27017/laptop_store"; // Thay "laptop_store" bằng tên cơ sở dữ liệu của bạn

// Kết nối MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.log("Kết nối MongoDB thất bại", err));

// Sử dụng các route
app.use("/api/users", userRoutes);

// Định nghĩa các route khác
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/manufacturers", manufacturerRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// Cấu hình cổng server
const port = 5000; // Thay giá trị này nếu cần
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
