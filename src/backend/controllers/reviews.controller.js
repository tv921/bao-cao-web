const Review = require('../models/review,model');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy đánh giá', error: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo đánh giá', error: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật đánh giá', error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa đánh giá', error: error.message });
    }
};

module.exports = {getAllReviews, createReview, updateReview, deleteReview};