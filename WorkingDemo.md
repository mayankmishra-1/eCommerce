# Demo - E-Commerce Cart & Order Management System

This demo highlights all key features of the system for both **Admin** and **User** roles.

---

## 1. Role Setup

- Use the **Role Switcher** at the top of the frontend.
- Switch between:
  - **ADMIN** → Selects Admin token with admin access modules.
  - **USER** → Selects User token with user access modules.

---

## 2. Admin Flow

1. Switch to **ADMIN** token.
2. Open **Admin Panel** (`/admin`):
   - View all products.
   - Add new products (name, price, stock).
   - Update stock of existing products.
3. Open **Orders** (`/orders`):
   - View all user orders.
   - Update order status (PENDING → CONFIRMED → SHIPPED → DELIVERED).

---

## 3. User Flow

1. Switch to **USER** token.
2. Open **Product Listing** (`/`):
   - Browse products.
   - Click **Add to Cart** to reserve stock.
3. Open **Cart Page** (`/cart`):
   - Update item quantities.
   - Remove items.
   - Checkout (reserves and deducts stock, creates order).
4. Open **Order History** (`/orders`):
   - View all placed orders.
   - Cancel orders with status CONFIRMED (restores stock).

---

This flow demonstrates all **functional requirements**