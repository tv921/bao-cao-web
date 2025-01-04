const ProductModel = require('../models/product.model'); // Model sản phẩm
const CategoryModel = require('../models/categories.model'); // Model danh mục
const ManufacturerModel = require('../models/manufacturers.model'); // Model hãng sản xuất

// API lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: error.message });
  }
};

// API lấy sản phẩm theo danh mục và giới hạn 4 sản phẩm
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await ProductModel.find({ id_danh_muc: categoryId })
      .limit(4); // Giới hạn số lượng sản phẩm trả về là 4

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Trong controller addProduct
const addProduct = async (req, res) => {
  try {
    const { ten_san_pham, mo_ta, gia, id_danh_muc, id_hang_san_xuat, trang_thai } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ten_san_pham || !gia || !id_danh_muc || !id_hang_san_xuat) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin sản phẩm.' });
    }

    // Xử lý ảnh
    let hinh_anh = '';
    if (req.files && req.files.length > 0) {
      hinh_anh = '/images/' + req.files[0].filename; // URL ảnh
    }

    // Tạo sản phẩm mới
    const newProduct = new ProductModel({
      ten_san_pham,
      mo_ta,
      gia,
      hinh_anh,
      trang_thai,
      id_danh_muc,
      id_hang_san_xuat,
    });

    const savedProduct = await newProduct.save();

    // Trả về thông tin sản phẩm, bao gồm đường dẫn ảnh
    res.status(201).json({
      message: 'Sản phẩm đã được thêm thành công!',
      hinh_anh_url: hinh_anh, // Trả về đường dẫn ảnh
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error: error.message });
  }
};

/// API sửa sản phẩm
const updateProduct = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const { ten_san_pham, mo_ta, gia, id_danh_muc, id_hang_san_xuat } = req.body;
    const hinh_anh = req.files.find((file) => file.fieldname === 'images')?.path.replace(path.join(__dirname, '../../frontend/public'), '').replace(/\\/g, '/') || '';

  try {
    // Tìm và cập nhật sản phẩm theo ID
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
      ten_san_pham,
      mo_ta,
      gia,
      hinh_anh,
      id_danh_muc,  // Liên kết với danh mục
      id_hang_san_xuat,  // Liên kết với hãng sản xuất
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

const searchProducts = async (req, res) => {
  try {
    const { searchTerm } = req.query; // Lấy từ query parameter

    // Kiểm tra nếu searchTerm là chuỗi hợp lệ
    if (typeof searchTerm !== 'string') {
      return res.status(400).json({ message: 'Từ khóa tìm kiếm phải là một chuỗi' });
    }

    // Tạo điều kiện tìm kiếm
    const searchConditions = {
      ten_san_pham: { $regex: searchTerm, $options: 'i' } // Tìm kiếm theo tên sản phẩm, không phân biệt chữ hoa chữ thường
    };

    const products = await ProductModel.find(searchConditions);

    if (products.length === 0) {
      return res.status(404).json({ message: `Không tìm thấy sản phẩm nào cho từ khóa "${searchTerm}"` });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm', error: error.message });
  }
};




module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory, searchProducts};
