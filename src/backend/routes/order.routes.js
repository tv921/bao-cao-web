const express = require('express');
const router  = express.Router();

const {getAllOrders, createOrder, updateOrder, deleteOrder, checkoutOrder, getOrderById, approveOrder} = require('../controllers/orders.controller');

router.get('/', getAllOrders);

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

router.post('/checkout/:userId', checkoutOrder);

router.get('/:userId', getOrderById);

router.put('/approve/:orderId', approveOrder);

module.exports = router;