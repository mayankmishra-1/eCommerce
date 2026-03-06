# Assumptions

1. **Authentication**
   - JWT tokens are pre-generated and static.
   - No login/register APIs are implemented as per assignment requirements.

2. **Stock Management**
   - `availableStock = stock - reservedStock`
   - Cart operations do not directly reduce stock.

3. **Checkout**
   - Payment is assumed to succeed (no payment gateway integration).
   - Idempotency key ensures duplicate order prevention.

4. **Cart Expiry**
   - Cart expiry is assumed to be handled via cron job.

5. **Roles**
   - Two roles exist: ADMIN and USER.
   - Role determines API access and UI access (via static JWT).

6. **Data Integrity**
   - Backend ensures no overselling via MongoDB transactions.