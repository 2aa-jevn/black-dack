const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const auth = require('../middleware/auth');

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    db.get('SELECT * FROM administrators WHERE email = ?', [email], (err, admin) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: admin.id, email: admin.email },
                process.env.JWT_SECRET || 'black-dack-secret',
                { expiresIn: '7d' }
            );

            res.json({ 
                message: 'Login successful',
                token,
                admin: { id: admin.id, email: admin.email }
            });
        });
    });
});

// Dashboard
router.get('/dashboard', auth, (req, res) => {
    db.all('SELECT COUNT(*) as total FROM products', (err, products) => {
        db.all('SELECT COUNT(*) as total FROM orders', (err, orders) => {
            db.all('SELECT SUM(amount) as total FROM orders WHERE status = "delivered"', (err, sales) => {
                res.json({
                    totalProducts: products[0]?.total || 0,
                    totalSales: sales[0]?.total || 0,
                    pendingOrders: orders[0]?.total || 0,
                    activePromotions: 0
                });
            });
        });
    });
});

module.exports = router;
