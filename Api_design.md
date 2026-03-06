# API Design

## Base URL
`http://localhost:5000/api`

## Product APIs
- **POST /product** (Admin)
  - Add a new product
  - Request Body: { name, price, stock }
- **PUT /product/stock** (Admin)
  - Update stock of existing product
  - Request Body: { productId, stock }
- **GET /product** (Admin/User)
  - List all products

## Cart APIs
- **POST /cart/add** (User)
  - Add product to cart
  - Request Body: { productId, quantity }
- **PUT /cart/update** (User)
  - Update cart item quantity
  - Request Body: { productId, quantity }
- **DELETE /cart/remove** (User)
  - Remove item from cart
  - Request Body: { productId }
- **GET /cart** (User)
  - Get user's cart items

## Checkout API
- **POST /checkout** (User)
  - Place order
  - Request Body: { idempotencyKey }

## Order APIs
- **GET /orders** (Admin/User)
  - Admin: view all orders
  - User: view own orders
- **PUT /orders/cancel** (User)
  - Cancel order
  - Request Body: { orderId }
- **PUT /orders/status** (Admin)
  - Update order status
  - Request Body: { orderId, status }

## Notes
- Authorization via static JWT
- All operations are transaction-safe