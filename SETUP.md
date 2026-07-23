# Installation & Setup Guide

## 📋 Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- SQLite3

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start the server
npm start
```

The API will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Option 1: Using Python's built-in server
python -m http.server 8000

# Option 2: Using Node.js http-server
npx http-server -p 8000

# Option 3: Open directly in browser
open index.html
```

## 🔐 Default Admin Credentials

**Email:** `admin@blackdack.com`  
**Password:** `Admin123!`

⚠️ **Change these credentials immediately after first login!**

## 🗄️ Database

The SQLite database is automatically created in `database/black-dack.db` on first run.

### Database Schema

- `administrators` - Admin users
- `products` - Product catalog
- `orders` - Customer orders
- `promotions` - Discount codes
- `sizes` - Product sizes

## 📡 API Endpoints

### Authentication

```bash
POST /api/admin/login
Body: { email, password }
Response: { token, admin }
```

### Products

```bash
GET /api/products              # Get all products
GET /api/products/:id          # Get product details
POST /api/products             # Create product (admin)
PUT /api/products/:id          # Update product (admin)
DELETE /api/products/:id       # Delete product (admin)
```

### Orders

```bash
GET /api/orders                # Get all orders (admin)
GET /api/orders/:id            # Get order details
POST /api/orders               # Create order
PUT /api/orders/:id/status     # Update status (admin)
PUT /api/orders/:id/payment    # Update payment status (admin)
GET /api/orders/stats/summary  # Get statistics (admin)
```

### Delivery

```bash
GET /api/delivery/regions      # Get delivery regions
POST /api/delivery/calculate   # Calculate delivery cost
```

### Payments

```bash
GET /api/payment/methods       # Get payment methods
POST /api/payment/create       # Create payment
POST /api/payment/verify       # Verify payment
```

### Promotions

```bash
GET /api/promotions            # Get active promotions
POST /api/promotions           # Create promotion (admin)
POST /api/promotions/validate/:code  # Validate code
DELETE /api/promotions/:id     # Delete promotion (admin)
```

## 🛠️ Development

### Run with auto-reload

```bash
cd backend
npm run dev
```

### View API Documentation

Visit: `http://localhost:5000/api/docs`

## 🔄 Environment Variables

```env
PORT=5000
NODE_ENV=development
DB_PATH=./database/black-dack.db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## 📦 Deployment

### Production Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Change default admin credentials
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS
- [ ] Enable CORS properly
- [ ] Setup database backup
- [ ] Monitor server logs

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
git push heroku main
```

### Deploy to DigitalOcean

```bash
# See deployment.md for detailed instructions
```

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database locked

```bash
# Delete database and restart
rm database/black-dack.db
npm start
```

### CORS errors

Make sure the frontend is on the same origin or update CORS settings in `server.js`

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [SQLite Documentation](https://www.sqlite.org)
- [JWT Documentation](https://jwt.io)

## 💬 Support

For issues or questions, contact the BLACK DACK team.

---

**BLACK DACK** - Créé pour être unique. 🖤
