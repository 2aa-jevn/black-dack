const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

// Get all products
router.get('/', (req, res) => {
    db.all('SELECT * FROM products', (err, products) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ products });
    });
});

// Get product by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ product });
    });
});

// Create product (admin only)
router.post('/', auth, (req, res) => {
    const { name, price, category, image, description } = req.body;
    
    if (!name || !price || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.run(
        'INSERT INTO products (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)',
        [name, price, category, image, description],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Product created',
                id: this.lastID
            });
        }
    );
});

// Update product (admin only)
router.put('/:id', auth, (req, res) => {
    const { id } = req.params;
    const { name, price, category, image, description, availability } = req.body;
    
    db.run(
        'UPDATE products SET name = ?, price = ?, category = ?, image = ?, description = ?, availability = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, price, category, image, description, availability, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Product updated' });
        }
    );
});

// Delete product (admin only)
router.delete('/:id', auth, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product deleted' });
    });
});

module.exports = router;
