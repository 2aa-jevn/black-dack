// Orders routes with delivery and payment support
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');
const { calculateDelivery } = require('../utils/delivery');

// Get all orders (admin only)
router.get('/', auth, (req, res) => {
    db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, orders) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ orders });
    });
});

// Get order by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM orders WHERE id = ?', [id], (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ order });
    });
});

// Create order
router.post('/', (req, res) => {
    const { client_name, client_email, phone, product_id, quantity, amount, delivery_region, payment_method, promo_code } = req.body;
    
    if (!client_name || !phone || !product_id || !quantity || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    let finalAmount = amount;
    let deliveryCost = 0;

    // Calculate delivery cost
    if (delivery_region) {
        const delivery = calculateDelivery(amount, delivery_region);
        deliveryCost = delivery.cost;
        finalAmount = delivery.total;
    }

    // TODO: Apply promo code discount
    if (promo_code) {
        // Query promotions table and apply discount
    }

    db.run(
        'INSERT INTO orders (client_name, client_email, phone, product_id, quantity, amount, delivery_region, delivery_cost, total_amount, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [client_name, client_email, phone, product_id, quantity, amount, delivery_region, deliveryCost, finalAmount, payment_method, 'pending'],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Order created successfully',
                orderId: this.lastID,
                totalAmount: finalAmount,
                deliveryCost: deliveryCost
            });
        }
    );
});

// Update order status (admin only)
router.put('/:id/status', auth, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'preparing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    db.run(
        'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Order status updated', status });
        }
    );
});

// Update payment status (admin only)
router.put('/:id/payment', auth, (req, res) => {
    const { id } = req.params;
    const { payment_status } = req.body;
    
    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(payment_status)) {
        return res.status(400).json({ error: 'Invalid payment status' });
    }

    db.run(
        'UPDATE orders SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [payment_status, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Payment status updated', payment_status });
        }
    );
});

// Get order statistics (admin only)
router.get('/stats/summary', auth, (req, res) => {
    db.all(
        `SELECT 
            COUNT(*) as total_orders,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
            SUM(total_amount) as total_revenue
         FROM orders`,
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(row[0]);
        }
    );
});

module.exports = router;
