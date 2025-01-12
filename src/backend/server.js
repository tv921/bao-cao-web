const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/categories.routes");
const manufacturerRoutes = require("./routes/manufacturers.routes");
const userRoutes = require("./routes/users.routes"); // Nhập khẩu đúng route user
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const order = require("./models/order.model");

const dotenv = require("dotenv");

const payOS = require("./utils/payos");

const app = express();

// Middleware
app.use(cors()); // Cho phép tất cả các nguồn yêu cầu
app.use(bodyParser.json()); // Phân tích dữ liệu JSON trong yêu cầu

app.use(
  "/images",
  express.static(path.join(__dirname, "../../frontend/public/images")),
); // Cung cấp quyền truy cập vào thư mục 'public/images'
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

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("public"));
app.use("/payment", require("./controllers/payment-controller"));
app.use("/order", require("./controllers/order-controller"));

app.post("/create-payment-link", async (req, res) => {
  const { userId, totalPrice } = req.body; // Lấy userId và totalPrice từ body

  if (!userId || !totalPrice) {
    return res.status(400).send("Thiếu thông tin giỏ hàng hoặc người dùng.");
  }

  const YOUR_DOMAIN = "http://localhost:5000"; // Địa chỉ của bạn, có thể thay đổi

  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: totalPrice, // Dùng tổng tiền từ giỏ hàng
    description: "Thanh toán đơn hàng",
    returnUrl: `${YOUR_DOMAIN}/success.html`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
  };

  try {
    console.log("Request Body:", body);
    const paymentLinkResponse = await payOS.createPaymentLink(body); // Giả sử bạn có phương thức này
    console.log("Response from payOS:", paymentLinkResponse);
    res.status(200).json({ checkoutUrl: paymentLinkResponse.checkoutUrl });
  } catch (error) {
    console.error("Error during payment link creation:", error);
    res.status(500).send("Có lỗi xảy ra khi tạo liên kết thanh toán");
  }
});

// Cấu hình cổng server
const port = 5000; // Thay giá trị này nếu cần
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
