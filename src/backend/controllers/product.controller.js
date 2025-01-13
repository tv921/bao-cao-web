const ProductModel = require('../models/product.model'); // Model sản phẩm
const CategoryModel = require('../models/categories.model'); // Model danh mục
const ManufacturerModel = require('../models/manufacturers.model'); // Model hãng sản xuất
const Product = require("../models/product.model");
const path = require('path');
// API lấy tất cả sản phẩm
// const getAllProducts = async (req, res) => {
//   try {
//     const products = await ProductModel.find()

//     if (!products || products.length === 0) {
//       return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: error.message });
//   }
// };

// API để lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate('id_danh_muc', 'ten_danh_muc')  // Populate thông tin danh mục
      .populate('id_hang_san_xuat', 'ten_hang_san_xuat');  // Populate thông tin hãng sản xuất
    
    res.json(products);  // Trả về danh sách sản phẩm
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err.message });
  }
};

// API lấy sản phẩm theo danh mục và giới hạn 4 sản phẩm
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await ProductModel.find({ id_danh_muc: categoryId })
      .limit(6); // Giới hạn số lượng sản phẩm trả về là 4

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const addProduct = async (req, res) => {
  try {
    const { 
      ten_san_pham, 
      mo_ta, 
      gia, 
      id_danh_muc, 
      id_hang_san_xuat, 
      trang_thai, 
      cau_hinh 
    } = req.body;

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
      cau_hinh,  // Thêm thông tin cấu hình vào sản phẩm
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

// Controller update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_san_pham, mo_ta, gia, id_danh_muc, id_hang_san_xuat, cau_hinh } = req.body;

    // Kiểm tra nếu có file ảnh mới thì lấy tên ảnh
    let hinh_anh = null;

    // Nếu có file ảnh mới
    if (req.files && req.files.length > 0) {
      hinh_anh = `/images/${req.files[0].filename}`;  // Lấy tên file ảnh mới
    } else {
      // Nếu không có file ảnh mới, lấy ảnh cũ từ cơ sở dữ liệu
      const existingProduct = await ProductModel.findById(id);
      
      // Kiểm tra xem sản phẩm có tồn tại không
      if (!existingProduct) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }

      console.log("Existing product:", existingProduct); // Debug thông tin sản phẩm

      // Giữ nguyên giá trị ảnh cũ nếu có
      hinh_anh = existingProduct.hinh_anh || '';  // Nếu không có ảnh cũ thì trả về chuỗi rỗng
    }

    // Cập nhật sản phẩm trong cơ sở dữ liệu
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        ten_san_pham,
        mo_ta,
        gia,
        id_danh_muc,
        id_hang_san_xuat,
        cau_hinh: JSON.parse(cau_hinh), // Chuyển JSON string thành object nếu cần
        hinh_anh, // Lưu đường dẫn ảnh dưới dạng tương đối
      },
      { new: true } // Trả về sản phẩm đã được cập nhật
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: err.message });
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
// Lấy chi tiết sản phẩm theo ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate('id_danh_muc', 'ten_danh_muc') // Lấy thông tin danh mục
      .populate('id_hang_san_xuat', 'ten_hang_san_xuat'); // Lấy thông tin hãng sản xuất

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
// Tìm sản phẩm theo hãng sản xuất
const getProductsByManufacturer = async (req, res) => {
  try {
    const manufacturerName = req.params.manufacturerName;

    // Tìm hãng sản xuất trong database theo tên
    const manufacturer = await ManufacturerModel.findOne({ ten_hang_san_xuat: manufacturerName });

    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    // Lấy tất cả sản phẩm của hãng sản xuất bằng cách tìm theo _id của hãng
    const products = await ProductModel.find({ id_hang_san_xuat: manufacturer._id });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this manufacturer' });
    }

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};






module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory, searchProducts, getProductById, getProductsByManufacturer };
