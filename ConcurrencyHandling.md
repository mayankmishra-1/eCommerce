# Concurrency Handling

## Problem
Multiple users can checkout simultaneously, leading to potential overselling.

## Solution
1. **MongoDB Transactions**
   - Each cart and order operation runs inside a MongoDB session.
   - Reserved stock update, cart update, and stock deduction are atomic.

2. **Stock Check**
   - During cart update and checkout:
     - Check available stock before modifying reservedStock.
     - Abort transaction if stock insufficient.

3. **Idempotency**
   - Checkout requests carry a unique idempotency key.
   - Duplicate submissions are ignored.

## Result
- Prevents overselling.
- Guarantees consistent stock updates.
- Maintains reservedStock integrity.