// Delivery management
const regions = {
    'bamako': {
        name: 'Bamako',
        cost: 0,
        deliveryTime: '2-3 jours'
    },
    'region': {
        name: 'Régions Mali',
        cost: 3000,
        deliveryTime: '5-7 jours'
    },
    'afrique': {
        name: 'Afrique de l\'Ouest',
        cost: 10000,
        deliveryTime: '10-15 jours'
    },
    'international': {
        name: 'International',
        cost: 25000,
        deliveryTime: '15-30 jours'
    }
};

const getDeliveryInfo = (region) => {
    return regions[region] || regions['bamako'];
};

const calculateDelivery = (amount, region) => {
    const delivery = regions[region] || regions['bamako'];
    return {
        region: delivery.name,
        cost: delivery.cost,
        deliveryTime: delivery.deliveryTime,
        total: amount + delivery.cost
    };
};

module.exports = {
    regions,
    getDeliveryInfo,
    calculateDelivery
};
