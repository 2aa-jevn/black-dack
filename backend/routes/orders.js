// Orders routes
const express = require('express');
const router = express.Router();

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private (Admin)
router.get('/', (req, res) => {
    res.json({
        orders: []
    });
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public
router.get('/:id', (req, res) => {
    res.json({
        order: null
    });
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post('/', (req, res) => {
    const { clientName, phone, product, quantity, amount } = req.body;
    res.json({
        message: 'Order created',
        order: {
            clientName,
            phone,
            product,
            quantity,
            amount,
            status: 'pending'
        }
    });
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private (Admin)
router.put('/:id', (req, res) => {
    const { status } = req.body;
    res.json({
        message: 'Order updated',
        status
    });
});

module.exports = router;
