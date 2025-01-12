const express = require('express');
const router  = express.Router();

<<<<<<< HEAD
const {getAllOrders, createOrder, updateOrder, deleteOrder, checkoutOrder, getOrderById, approveOrder} = require('../controllers/orders.controller');
=======
const {getAllOrders, createOrder, updateOrder, deleteOrder, checkoutOrder, getOrderById} = require('../controllers/orders.controller');
>>>>>>> 68a496a9c7ed62d6bdeba114dd486927c8e7fd6a

router.get('/', getAllOrders);

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

router.post('/checkout/:userId', checkoutOrder);

router.get('/:userId', getOrderById);

<<<<<<< HEAD
router.put('/approve/:orderId', approveOrder);

=======
>>>>>>> 68a496a9c7ed62d6bdeba114dd486927c8e7fd6a
module.exports = router;