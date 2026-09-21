# Frontend-Derived Backend Contract — Landing V1

## Scope
The supplied frontend archive is the `landing` role/domain. This backend package therefore implements the Landing vertical slice rather than inventing an unrelated `superadmin` business domain.

## Requirement IDs

| Req ID | Frontend Evidence | Backend Requirement | Evidence Strength |
|---|---|---|---|
| REQ-001 | `landing_api/landing_api.ts` + `LandingBookingForm.test.tsx` | `POST /api/v1/landing/booking` accepts name, email, phone, UTC ISO date, and type; returns canonical null-data envelope with booking success message. | DIRECT |
| REQ-002 | `landing_api/landing_api.ts` + `LandingContactForm.test.tsx` | `POST /api/v1/landing/contact` accepts name, email, message; returns canonical null-data envelope with contact success message. | DIRECT |
| REQ-003 | `landing_components/LandingFooter/useLandingNewsletter.ts` | No newsletter subscription API is required by the supplied frontend; the current flow uses mail-client handoff. | DIRECT |
| REQ-004 | `landing_url_config.ts` + API tests/MSW | Runtime frontend path is `/landing/booking` and `/landing/contact`; compatibility endpoints are retained alongside versioned canonical routes. | DIRECT |

## Booking Request Contract

- `name`: string, trimmed, HTML stripped, 1–100 characters.
- `email`: normalized lowercase email, max 320 characters; `.com` is not required.
- `phone`: whitespace removed and exactly 10 digits.
- `date`: UTC ISO-8601 date-time serialized from the frontend's local `YYYY-MM-DD` value.
- `type`: exact enum values `trial`, `membership`, `class`.

## Contact Request Contract

- `name`: string, trimmed, HTML stripped, 1–100 characters.
- `email`: normalized lowercase email, max 320 characters.
- `message`: string, HTML stripped, 1–5000 characters.

## Response Contract

Both mutations return:

```json
{
  "success": true,
  "message": "...",
  "data": null
}
```

Validation failures use `VALIDATION.DTO.FAILED` and the canonical `validationErrors` array. Business failures use machine-readable `LANDING.<ENTITY>.<REASON>` error codes.

## Route Conflict Resolution

The supplied feature documentation lists `/api/landing/bookings` for booking, but the actual frontend URL configuration, API client, tests, and MSW handler use `/landing/booking`. The backend implements both unversioned compatibility aliases (`/api/landing/booking` and `/api/landing/bookings`) and the canonical versioned route (`/api/v1/landing/booking`) so the source conflict does not silently break either documented/runtime contract.
