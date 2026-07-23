const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

// Get all promotions
router.get('/', (req, res) => {
    db.all('SELECT * FROM promotions WHERE expiration_date > date("now")', (err, promotions) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ promotions });
    });
});

// Create promotion (admin only)
router.post('/', auth, (req, res) => {
    const { code, discount, expiration_date } = req.body;
    
    if (!code || !discount || !expiration_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.run(
        'INSERT INTO promotions (code, discount, expiration_date) VALUES (?, ?, ?)',
        [code.toUpperCase(), discount, expiration_date],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Promotion created',
                id: this.lastID
            });
        }
    );
});

// Validate promotion code
router.post('/validate/:code', (req, res) => {
    const { code } = req.params;
    db.get(
        'SELECT * FROM promotions WHERE code = ? AND expiration_date > date("now")',
        [code.toUpperCase()],
        (err, promotion) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (promotion) {
                res.json({ valid: true, discount: promotion.discount });
            } else {
                res.json({ valid: false });
            }
        }
    );
});

// Delete promotion (admin only)
router.delete('/:id', auth, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM promotions WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Promotion deleted' });
    });
});

module.exports = router;
