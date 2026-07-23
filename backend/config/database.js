const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || './database/black-dack.db';

// Create database directory if it doesn't exist
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeTables();
    }
});

function initializeTables() {
    const schema = fs.readFileSync(path.join(__dirname, '../..', 'database/schema.sql'), 'utf8');
    const statements = schema.split(';').filter(s => s.trim());
    
    statements.forEach(statement => {
        db.run(statement, (err) => {
            if (err && !err.message.includes('already exists')) {
                console.error('Schema error:', err);
            }
        });
    });
}

module.exports = db;
