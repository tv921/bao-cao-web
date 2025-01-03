
const express = require('express');
const router  = express.Router();
const { getAllCarts, createCart, updateCart, deleteCart } = require("../controllers/carts.controller");

router.get('/', getAllCarts);

router.post('/', createCart);

router.put('/:id', updateCart);

router.delete('/:id', deleteCart);

module.exports = router;