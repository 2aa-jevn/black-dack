const express = require('express');
const router = express.Router();
const { getDeliveryInfo, calculateDelivery } = require('../utils/delivery');

// Get delivery regions
router.get('/regions', (req, res) => {
    res.json({
        regions: [
            { code: 'bamako', name: 'Bamako', cost: 0 },
            { code: 'region', name: 'Régions Mali', cost: 3000 },
            { code: 'afrique', name: 'Afrique de l\'Ouest', cost: 10000 },
            { code: 'international', name: 'International', cost: 25000 }
        ]
    });
});

// Calculate delivery cost
router.post('/calculate', (req, res) => {
    const { amount, region } = req.body;
    
    if (!amount || !region) {
        return res.status(400).json({ error: 'Amount and region required' });
    }

    const delivery = calculateDelivery(amount, region);
    res.json(delivery);
});

module.exports = router;
