# BLACK DACK - API Documentation

## 🌐 Base URL

```
https://api.blackdack.com/api
```

## 🔐 Authentication

Most admin endpoints require JWT token in Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📚 Endpoints

### 🔑 Authentication

#### Login
```
POST /admin/login
Content-Type: application/json

{
  "email": "admin@blackdack.com",
  "password": "your_password"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "admin": {
    "id": 1,
    "email": "admin@blackdack.com"
  }
}
```

### 🛍️ Products

#### Get All Products
```
GET /products

Response:
{
  "products": [
    {
      "id": 1,
      "name": "BD SIGNATURE JEANS",
      "price": 15000,
      "category": "black-denim",
      "description": "...",
      "availability": "En stock",
      "edition": "001/100"
    }
  ]
}
```

#### Get Product by ID
```
GET /products/1

Response:
{
  "product": { ... }
}
```

#### Create Product (Admin)
```
POST /products
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "New Product",
  "price": 20000,
  "category": "black-woman",
  "image": "url_to_image",
  "description": "Product description"
}

Response:
{
  "message": "Product created",
  "id": 5
}
```

#### Update Product (Admin)
```
PUT /products/1
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 25000,
  "availability": "En stock"
}
```

#### Delete Product (Admin)
```
DELETE /products/1
Authorization: Bearer TOKEN
```

### 📦 Orders

#### Get All Orders (Admin)
```
GET /orders
Authorization: Bearer TOKEN

Response:
{
  "orders": [
    {
      "id": 1,
      "client_name": "Amadou",
      "phone": "+223 XX XX XX XX",
      "product_id": 1,
      "quantity": 2,
      "amount": 30000,
      "delivery_region": "bamako",
      "delivery_cost": 0,
      "total_amount": 30000,
      "payment_method": "cod",
      "status": "pending"
    }
  ]
}
```

#### Get Order by ID
```
GET /orders/1

Response:
{
  "order": { ... }
}
```

#### Create Order
```
POST /orders
Content-Type: application/json

{
  "client_name": "Amadou Diallo",
  "client_email": "amadou@example.com",
  "phone": "+223 XX XX XX XX",
  "product_id": 1,
  "quantity": 1,
  "amount": 15000,
  "delivery_region": "bamako",
  "payment_method": "cod"
}

Response:
{
  "message": "Order created successfully",
  "orderId": 1,
  "totalAmount": 15000,
  "deliveryCost": 0
}
```

#### Update Order Status (Admin)
```
PUT /orders/1/status
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "status": "preparing"
}

Valid statuses: pending, preparing, shipped, delivered, cancelled
```

#### Update Payment Status (Admin)
```
PUT /orders/1/payment
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "payment_status": "completed"
}

Valid statuses: pending, completed, failed
```

#### Get Order Statistics (Admin)
```
GET /orders/stats/summary
Authorization: Bearer TOKEN

Response:
{
  "total_orders": 42,
  "completed": 35,
  "pending": 5,
  "total_revenue": 847000
}
```

### 🎟️ Promotions

#### Get All Promotions
```
GET /promotions

Response:
{
  "promotions": [
    {
      "id": 1,
      "code": "BLACK10",
      "discount": 10,
      "expiration_date": "2024-12-31"
    }
  ]
}
```

#### Create Promotion (Admin)
```
POST /promotions
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "code": "SUMMER20",
  "discount": 20,
  "expiration_date": "2024-08-31"
}
```

#### Validate Promotion Code
```
POST /promotions/validate/BLACK10

Response:
{
  "valid": true,
  "discount": 10
}
```

#### Delete Promotion (Admin)
```
DELETE /promotions/1
Authorization: Bearer TOKEN
```

### 🚚 Delivery

#### Get Delivery Regions
```
GET /delivery/regions

Response:
{
  "regions": [
    { "code": "bamako", "name": "Bamako", "cost": 0 },
    { "code": "region", "name": "Régions Mali", "cost": 3000 },
    { "code": "afrique", "name": "Afrique de l'Ouest", "cost": 10000 },
    { "code": "international", "name": "International", "cost": 25000 }
  ]
}
```

#### Calculate Delivery Cost
```
POST /delivery/calculate
Content-Type: application/json

{
  "amount": 50000,
  "region": "bamako"
}

Response:
{
  "region": "Bamako",
  "cost": 0,
  "deliveryTime": "2-3 jours",
  "total": 50000
}
```

### 💳 Payment

#### Get Payment Methods
```
GET /payment/methods

Response:
{
  "methods": [
    {
      "id": "orange_money",
      "name": "Orange Money",
      "icon": "📱",
      "active": false
    },
    {
      "id": "cod",
      "name": "Paiement à la livraison",
      "icon": "💰",
      "active": true
    }
  ]
}
```

#### Create Payment
```
POST /payment/create
Content-Type: application/json

{
  "orderId": 1,
  "method": "cod",
  "amount": 15000
}

Response:
{
  "message": "Payment initialized",
  "orderId": 1,
  "method": "cod",
  "status": "pending"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here",
  "details": "Optional additional details"
}
```

### Common Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing/invalid token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

- 100 requests per minute for public endpoints
- 1000 requests per minute for authenticated endpoints

## CORS

CORS is enabled for all origins in development. For production, update CORS settings.

---

**BLACK DACK API v1.0** - Créé pour être unique. 🖤
