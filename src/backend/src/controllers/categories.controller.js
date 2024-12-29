const CategoriesModel = require('../models/categories.model');  // Model danh mục

// API lấy tất cả danh mục
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.find();

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }

    res.json(categories); // Trả về danh sách tất cả danh mục
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: error.message });
  }
};


// API thêm danh mục
const addCategory = async (req, res) => {
  const { ten_danh_muc, mo_ta } = req.body; // Lấy dữ liệu từ body

  try {
    const newCategory = new CategoriesModel({
      ten_danh_muc,
      mo_ta,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory); // Trả về danh mục đã được thêm
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm danh mục', error: error.message });
  }
};


// API sửa danh mục
const updateCategory = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const { ten_danh_muc, mo_ta } = req.body; // Lấy dữ liệu từ body

  try {
    // Tìm và cập nhật danh mục theo ID
    const updatedCategory = await CategoriesModel.findByIdAndUpdate(id, {
      ten_danh_muc,
      mo_ta,
    }, { new: true }); // new: true để trả về danh mục sau khi cập nhật

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi sửa danh mục', error: error.message });
  }
};


/// API xóa danh mục
const deleteCategory = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params

  try {
    // Tìm và xóa danh mục theo ID
    const deletedCategory = await CategoriesModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    res.json({ message: 'Danh mục đã bị xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: error.message });
  }
};


module.exports = { getAllCategories, addCategory, updateCategory, deleteCategory };
