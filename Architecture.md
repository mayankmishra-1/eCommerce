# E-Commerce Cart and Order Management System - Architecture

## Overview
The system is a full-stack e-commerce application with Role-Based Access Control (RBAC) and transactional cart/order handling. It separates concerns between frontend, backend, and database layers.

## Architecture Diagram
[Frontend] <--> [Backend REST API] <--> [MongoDB Database]

## Components

1. **Frontend (React.js)**
   - Handles UI rendering for Users and Admins
   - Pages: Product Listing, Cart, Checkout, Order History, Admin Panel
   - Axios for API calls with static JWT tokens
   - Role switcher to demonstrate RBAC

2. **Backend (Node.js + Express)**
   - REST API endpoints for products, cart, orders
   - Implements reserved stock logic, checkout, and concurrency handling
   - Admin/User endpoints separated with RBAC middleware
   - MongoDB transactions ensure atomic operations

3. **Database (MongoDB + Mongoose)**
   - Collections: Users, Products, Cart, Orders
   - Products have `stock` and `reservedStock` fields
   - Cart stores product references and quantities
   - Orders store status and items snapshot
   - Optimistic concurrency handled via MongoDB transactions

## Flow

1. User adds product to cart → reservedStock increases
2. Checkout → reservedStock converts into actual stock deduction; order is created
3. Admin can view all orders and update status
4. User can cancel orders → stock and reservedStock restored

## Concurrency & Idempotency
- MongoDB transactions prevent overselling
- Unique idempotency keys prevent duplicate orders