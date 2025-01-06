const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts.controller');

router.get('/', cartController.getAllCarts);

router.get('/:userId', cartController.getCartByUserId);

router.post('/add', cartController.addToCart);

router.delete('/remove/:userId/:productId', cartController.removeItem);

module.exports = router;
