# Role-Based Access Control (RBAC)

## Roles
1. **ADMIN**
   - Can add products
   - Update stock
   - View all orders
   - Update order status
2. **USER**
   - Can add/remove/update cart items
   - Place order
   - Cancel order
   - View orders

## Enforcement
- Backend middleware checks JWT token
- Static token determines role
- Routes are protected based on role:
  - Admin routes: /product, /orders/status
  - User routes: /cart/*, /checkout, /orders
- Frontend UI shows/hides pages based on role (Role Switcher)