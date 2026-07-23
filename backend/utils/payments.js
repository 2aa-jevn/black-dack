// Payment utilities for Mali
const payments = {
    ORANGE_MONEY: 'orange_money',
    MOOV_MONEY: 'moov_money',
    COD: 'cod' // Cash on Delivery
};

const paymentMethods = {
    [payments.ORANGE_MONEY]: {
        name: 'Orange Money',
        icon: '📱',
        description: 'Paiement via Orange Money',
        countries: ['Mali', 'Sénégal', 'Côte d\'Ivoire'],
        active: false // TODO: Integrate Orange Money API
    },
    [payments.MOOV_MONEY]: {
        name: 'Moov Money',
        icon: '💳',
        description: 'Paiement via Moov Money',
        countries: ['Mali', 'Burkina Faso'],
        active: false // TODO: Integrate Moov Money API
    },
    [payments.COD]: {
        name: 'Paiement à la livraison',
        icon: '💰',
        description: 'Payez à la réception',
        countries: ['Mali'],
        active: true
    }
};

const validatePaymentMethod = (method) => {
    return Object.keys(paymentMethods).includes(method);
};

const getPaymentMethods = () => {
    return Object.entries(paymentMethods).map(([key, value]) => ({
        id: key,
        ...value
    }));
};

module.exports = {
    payments,
    paymentMethods,
    validatePaymentMethod,
    getPaymentMethods
};
