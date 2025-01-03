// src/routes/categories.routes.js
const express = require('express');
const { getAllManufacturers, addManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturers.controller');

const router = express.Router();

// Định nghĩa các route
router.get('/', getAllManufacturers);
router.post('/', addManufacturer);             
router.put('/:id', updateManufacturer);        
router.delete('/:id', deleteManufacturer);     

module.exports = router;
