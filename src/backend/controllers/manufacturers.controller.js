const ManufacturersModel = require('../models/manufacturers.model');  // Model hãng sản xuất

// API lấy tất cả hãng sản xuất
const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await ManufacturersModel.find();

    if (manufacturers.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy hãng sản xuất' });
    }

    res.json(manufacturers); // Trả về danh sách tất cả hãng sản xuất
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy hãng sản xuất', error: error.message });
  }
};


// API thêm hãng sản xuất
const addManufacturer = async (req, res) => {
  const { ten_hang_san_xuat, mo_ta } = req.body; // Lấy dữ liệu từ body

  try {
    const newManufacturer = new ManufacturersModel({
      ten_hang_san_xuat,
      mo_ta,
    });

    const savedManufacturer = await newManufacturer.save();
    res.status(201).json(savedManufacturer); // Trả về hãng sản xuất đã được thêm
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm hãng sản xuất', error: error.message });
  }
};


// API sửa hãng sản xuất
const updateManufacturer = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params
  const { ten_hang_san_xuat, mo_ta } = req.body; // Lấy dữ liệu từ body

  try {
    // Tìm và cập nhật hãng sản xuất theo ID
    const updatedManufacturer = await ManufacturersModel.findByIdAndUpdate(id, {
      ten_hang_san_xuat,
      mo_ta,
    }, { new: true }); // new: true để trả về hãng sản xuất sau khi cập nhật

    if (!updatedManufacturer) {
      return res.status(404).json({ message: 'Hãng sản xuất không tồn tại' });
    }

    res.json(updatedManufacturer);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi sửa hãng sản xuất', error: error.message });
  }
};


// API xóa hãng sản xuất
const deleteManufacturer = async (req, res) => {
  const { id } = req.params; // Lấy ID từ params

  try {
    // Tìm và xóa hãng sản xuất theo ID
    const deletedManufacturer = await ManufacturersModel.findByIdAndDelete(id);

    if (!deletedManufacturer) {
      return res.status(404).json({ message: 'Hãng sản xuất không tồn tại' });
    }

    res.json({ message: 'Hãng sản xuất đã bị xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa hãng sản xuất', error: error.message });
  }
};


module.exports = { getAllManufacturers, addManufacturer, updateManufacturer, deleteManufacturer };
