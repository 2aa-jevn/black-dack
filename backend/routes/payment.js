const express = require('express');
const router = express.Router();
const { getPaymentMethods, validatePaymentMethod } = require('../utils/payments');
const db = require('../config/database');

// Get available payment methods
router.get('/methods', (req, res) => {
    res.json({ methods: getPaymentMethods() });
});

// Create payment (for COD and future integrations)
router.post('/create', (req, res) => {
    const { orderId, method, amount } = req.body;
    
    if (!orderId || !method || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validatePaymentMethod(method)) {
        return res.status(400).json({ error: 'Invalid payment method' });
    }

    // For COD, just mark as pending
    if (method === 'cod') {
        db.run(
            'UPDATE orders SET payment_method = ?, payment_status = ? WHERE id = ?',
            [method, 'pending', orderId],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ 
                    message: 'Payment initialized',
                    orderId,
                    method,
                    status: 'pending'
                });
            }
        );
    } else {
        // TODO: Implement Orange Money and Moov Money APIs
        res.json({ 
            message: 'Payment method coming soon',
            method
        });
    }
});

// Verify payment (for webhooks)
router.post('/verify', (req, res) => {
    const { orderId, method } = req.body;
    
    db.get(
        'SELECT * FROM orders WHERE id = ?',
        [orderId],
        (err, order) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json({ 
                orderId,
                status: order.payment_status,
                method: order.payment_method
            });
        }
    );
});

module.exports = router;
