const ProductModel = require('../models/product.model');  // Model sản phẩm
const CategoriesModel = require('../models/categories.model');  // Model danh mục
const ManufacturersModel = require('../models/manufacturers.model');  // Model hãng sản xuất

// API lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate('id_danh_muc') // Liên kết với collection 'danhmuc'
      .populate('id_hang_san_xuat'); // Liên kết với collection 'hangsanxuat'

    if (products.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: error.message });
  }
};

// API thêm sản phẩm
const addProduct = async (req, res) => {
  const { ten_san_pham, mo_ta, gia, hinh_anh, id_danh_muc, id_hang_san_xuat, trang_thai } = req.body;
  
  try {
    // Kiểm tra xem danh mục và hãng sản xuất có tồn tại không
    const category = await CategoriesModel.findById(id_danh_muc);
    const manufacturer = await ManufacturersModel.findById(id_hang_san_xuat);

    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    if (!manufacturer) {
      return res.status(404).json({ message: 'Hãng sản xuất không tồn tại' });
    }

    const newProduct = new ProductModel({
      ten_san_pham,
      mo_ta,
      gia,
      hinh_anh,
      id_danh_muc,  // Liên kết với danh mục
      id_hang_san_xuat,  // Liên kết với hãng sản xuất
      trang_thai,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm sản phẩm', error: error.message });
  }
};

/// API sửa sản phẩm
const updateProduct = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const { ten_san_pham, mo_ta, gia, hinh_anh, id_danh_muc, id_hang_san_xuat, trang_thai } = req.body;

  try {
    // Tìm và cập nhật sản phẩm theo ID
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
      ten_san_pham,
      mo_ta,
      gia,
      hinh_anh,
      id_danh_muc,  // Liên kết với danh mục
      id_hang_san_xuat,  // Liên kết với hãng sản xuất
      trang_thai,
    }, { new: true });  // new: true để trả về sản phẩm sau khi cập nhật

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi sửa sản phẩm', error: error.message });
  }
};
// API xóa sản phẩm
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params

  try {
    // Tìm và xóa sản phẩm theo ID
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.json({ message: 'Sản phẩm đã bị xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: error.message });
  }
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
