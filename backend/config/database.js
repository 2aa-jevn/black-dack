const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || './database/black-dack.db';

const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeTables();
    }
});

function initializeTables() {
    const schema = fs.readFileSync(path.join(__dirname, '../..', 'database/schema.sql'), 'utf8');
    const statements = schema.split(';').filter(s => s.trim());
    
    let completed = 0;
    statements.forEach(statement => {
        db.run(statement, (err) => {
            completed++;
            if (err && !err.message.includes('already exists')) {
                console.error('Schema error:', err);
            }
            if (completed === statements.length) {
                seedInitialData();
            }
        });
    });
}

function seedInitialData() {
    // Add default admin
    const adminEmail = 'admin@blackdack.com';
    const adminPassword = 'Admin123!';
    
    db.get('SELECT * FROM administrators WHERE email = ?', [adminEmail], (err, admin) => {
        if (!admin) {
            const hashedPassword = bcrypt.hashSync(adminPassword, 10);
            db.run(
                'INSERT INTO administrators (email, password) VALUES (?, ?)',
                [adminEmail, hashedPassword],
                (err) => {
                    if (err) {
                        console.error('Error creating admin:', err);
                    } else {
                        console.log('✅ Default admin created');
                        console.log(`   Email: ${adminEmail}`);
                        console.log(`   Password: ${adminPassword}`);
                        console.log('   ⚠️  Change password after first login!');
                    }
                    addSampleProducts();
                }
            );
        } else {
            addSampleProducts();
        }
    });
}

function addSampleProducts() {
    const products = [
        {
            name: 'BD SIGNATURE JEANS - Edition 001',
            price: 15000,
            category: 'black-denim',
            image: 'assets/images/placeholder-denim.jpg',
            description: 'Denim noir premium avec détails dorés. Édition limitée numérotée 001/100. Création artisanale.',
            availability: 'En stock',
            edition: '001/100'
        },
        {
            name: 'BD SIGNATURE JEANS - Edition 002',
            price: 15000,
            category: 'black-denim',
            image: 'assets/images/placeholder-denim.jpg',
            description: 'Denim noir premium avec broderies artisanales. Édition limitée numérotée 002/100.',
            availability: 'En stock',
            edition: '002/100'
        },
        {
            name: 'Robe Élégante - Collection 001',
            price: 25000,
            category: 'black-woman',
            image: 'assets/images/placeholder-woman.jpg',
            description: 'Robe élégante avec inspiration africaine contemporaine. Design moderne et sophistiqué.',
            availability: 'En stock',
            edition: '001/50'
        },
        {
            name: 'Robe Moderne - Collection 002',
            price: 28000,
            category: 'black-woman',
            image: 'assets/images/placeholder-woman.jpg',
            description: 'Design moderne avec finitions artisanales premium. Pièce unique de la collection BLACK WOMAN.',
            availability: 'En stock',
            edition: '002/50'
        }
    ];

    db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
        if (row.count === 0) {
            products.forEach(product => {
                db.run(
                    'INSERT INTO products (name, price, category, image, description, availability, edition) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [product.name, product.price, product.category, product.image, product.description, product.availability, product.edition],
                    (err) => {
                        if (err) console.error('Error adding product:', err);
                    }
                );
            });
            console.log('✅ Sample products added');
        }
    });
}

module.exports = db;
