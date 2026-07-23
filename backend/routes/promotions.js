// Promotions routes
const express = require('express');
const router = express.Router();

// @route   GET /api/promotions
// @desc    Get all promotions
// @access  Public
router.get('/', (req, res) => {
    res.json({
        promotions: []
    });
});

// @route   POST /api/promotions
// @desc    Create new promotion code
// @access  Private (Admin)
router.post('/', (req, res) => {
    const { code, discount, expirationDate } = req.body;
    res.json({
        message: 'Promotion created',
        promotion: {
            code,
            discount,
            expirationDate
        }
    });
});

// @route   DELETE /api/promotions/:id
// @desc    Delete promotion
// @access  Private (Admin)
router.delete('/:id', (req, res) => {
    res.json({ message: 'Promotion deleted' });
});

module.exports = router;
