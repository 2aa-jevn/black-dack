// Products routes
const express = require('express');
const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
    res.json({
        products: []
    });
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', (req, res) => {
    res.json({
        product: null
    });
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin)
router.post('/', (req, res) => {
    const { name, price, category, image, description } = req.body;
    res.json({
        message: 'Product created',
        product: { name, price, category, image, description }
    });
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put('/:id', (req, res) => {
    res.json({ message: 'Product updated' });
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin)
router.delete('/:id', (req, res) => {
    res.json({ message: 'Product deleted' });
});

module.exports = router;
