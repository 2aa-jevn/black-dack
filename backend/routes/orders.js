const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

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
    const { client_name, phone, product_id, quantity, amount, promo_code } = req.body;
    
    if (!client_name || !phone || !product_id || !quantity || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.run(
        'INSERT INTO orders (client_name, phone, product_id, quantity, amount, status) VALUES (?, ?, ?, ?, ?, ?)',
        [client_name, phone, product_id, quantity, amount, 'pending'],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Order created',
                orderId: this.lastID
            });
        }
    );
});

// Update order status (admin only)
router.put('/:id', auth, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'preparing', 'delivered', 'cancelled'];
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
            res.json({ message: 'Order updated' });
        }
    );
});

module.exports = router;
