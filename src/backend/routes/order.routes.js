const express = require('express');
const router  = express.Router();

const {getAllOrders, createOrder, updateOrder, deleteOrder, checkoutOrder, getOrderById} = require('../controllers/orders.controller');

router.get('/', getAllOrders);

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

router.post('/checkout/:userId', checkoutOrder);

router.get('/:userId', getOrderById);

module.exports = router;