# Forbidden Patterns — `admin/subscriptions`

## 1. No Client-Side Full-Table Fetch
**FORBIDDEN:** Fetching all subscriptions and paginating on the client.
**ALLOWED:** Always pass `page` + `limit` params to the API.

## 2. No Cancel Without `useConfirm()`
**FORBIDDEN:** Calling cancel API on single click.
**ALLOWED:** Wrap in `useConfirm()` with message: "This will cancel the member's subscription immediately."

## 3. No Hardcoded Status Styles / No Cross-Role Imports / No Barrel Files
Standard rules apply.
