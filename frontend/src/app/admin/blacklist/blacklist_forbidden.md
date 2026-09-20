# Forbidden Patterns — `admin/blacklist`

## 1. No Single-Click Blacklist or Unblacklist
**FORBIDDEN:** Calling the blacklist/unblacklist API on button click without a confirmation gate.
**ALLOWED:** Always wrap in `useConfirm()` with explicit consequence: "This will immediately block the member from all gym services."

## 2. No Empty Reason on Blacklist
**FORBIDDEN:** Submitting a blacklist request with an empty or whitespace-only reason.
**ALLOWED:** Validate `reason.trim().length > 0` before enabling the submit button.

## 3. No Direct `apiFetch` in Components
**ALLOWED:** All API calls go through the module's API client, not directly from `.tsx`.

## 4. No Hardcoded Status Styles
**FORBIDDEN:** Inline `className` ternaries for blacklist status badges.
**ALLOWED:** `BLACKLIST_STATUS_STYLES` constant from `blacklist_utils/`.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
