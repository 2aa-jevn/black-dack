// Admin routes
const express = require('express');
const router = express.Router();

// @route   POST /api/admin/login
// @desc    Login administrateur
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // TODO: Implémenter l'authentification avec JWT
    res.json({
        message: 'Login endpoint - à implémenter',
        email
    });
});

// @route   GET /api/admin/dashboard
// @desc    Get dashboard info
// @access  Private
router.get('/dashboard', (req, res) => {
    res.json({
        totalProducts: 0,
        totalSales: 0,
        pendingOrders: 0,
        activePromotions: 0
    });
});

module.exports = router;
