# Rollback Strategy

## Checkout Failure
- If checkout fails (e.g., transaction abort):
  1. reservedStock is not converted to actual stock deduction.
  2. Cart remains intact for retry.

## Order Cancellation
- On user-initiated cancellation:
  1. Stock and reservedStock are restored atomically.
  2. Order status updated to CANCELLED.

## MongoDB Transactions
- Any failure in the transaction triggers rollback automatically.
- Ensures data consistency across Products, Cart, and Orders.

## Idempotency
- Prevents double order creation on repeated clicks.
- Combines with rollback to prevent stock inconsistencies.