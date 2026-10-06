# Forbidden Patterns — `admin/subscriptions`

## 1. No Client-Side Full-Table Fetch
**FORBIDDEN:** Fetching all subscriptions and paginating on the client.
**ALLOWED:** Always pass `page` + `limit` params to the API.

## 2. Critical Subscription Mutations Require Confirmation + Idempotency
**FORBIDDEN:** Executing upgrade, auto-renew, or payment-method removal without the confirmation boundary and idempotency-key contract.
**ALLOWED:** Confirm the exact user intent first, generate one idempotency key for that intent, and reuse it for retries.

## 3. No Hardcoded Status Styles / No Cross-Role Imports / No Barrel Files
Standard rules apply.
