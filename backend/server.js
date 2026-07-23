const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur BLACK DACK API',
        version: '1.0.0',
        tagline: 'Créé pour être unique.',
        status: 'operational'
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/api/delivery', require('./routes/delivery'));
app.use('/api/payment', require('./routes/payment'));

// Documentation endpoint
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'BLACK DACK API',
        version: '1.0.0',
        endpoints: [
            { method: 'GET', path: '/api/products', description: 'Get all products' },
            { method: 'GET', path: '/api/products/:id', description: 'Get product by ID' },
            { method: 'POST', path: '/api/admin/login', description: 'Admin login' },
            { method: 'POST', path: '/api/orders', description: 'Create order' },
            { method: 'GET', path: '/api/delivery/regions', description: 'Get delivery regions' },
            { method: 'GET', path: '/api/payment/methods', description: 'Get payment methods' }
        ]
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🖤 BLACK DACK Server');
    console.log('='.repeat(50));
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 API Docs: http://localhost:${PORT}/api/docs`);
    console.log(`💻 Frontend: Open frontend/index.html`);
    console.log(`🔐 Admin: http://localhost:5000/api/admin`);
    console.log('='.repeat(50) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;
