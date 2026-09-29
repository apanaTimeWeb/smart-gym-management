# Stage 1 — Frontend Reverse Engineering & Frozen Backend Requirement Baseline

## 1. Inputs
- INPUT 1 — Frontend role/domain ZIP: `frontend_landing_v3_fix.zip` (read-only).
- INPUT 2 — Existing backend scope ZIP: the supplied v3 repair archive.
- INPUT 3 — Normative backend documents: `BACKEND_ARCHITECTURE_AND_DEVELOPMENT_RULES_V1.md` and `BACKEND_ROLE_MODULE_CREATE_AUDIT_REPAIR_FROM_FRONTEND_V6_3.md`.
- INPUT 4 — External API E2E/Selenium ZIP: NOT SUPPLIED; existing external-suite audit status is `BLOCKED_BY_SUPPLIED_SCOPE`.

## 2. Mode / Scope
`MODE B — AUDIT + REPAIR`.
Role discovered: `landing`. Module discovered: `landing`. Frontend files recursively inspected: `74`.
Frontend source was never modified.

## 3. Frontend Network Inventory
The supplied frontend has exactly two production backend mutation operations in the Landing API client:
1. `POST /api/landing/bookings` — booking submission.
2. `POST /api/landing/contact` — contact submission.

Each request sends `Idempotency-Key`. Booking serializes the selected date through `serializePublicLandingDateToUtc()` and the API schema requires an offset-aware ISO-8601 datetime.

The frontend also contains an MSW contract for the same plural booking path and contact path. Newsletter submission uses a mail client and therefore does not establish a backend API requirement.

## 4. Forms / UI Backend Dependencies
- Booking form: name, email, phone, date, type; success, backend-error, retry, and start-new states.
- Contact form: name, email, message; success, backend-error, retry, and start-new states.
- No backend list/table/KPI/chart/lookup/pagination/search/filter/sort data contract is consumed by Landing.

## 5. Canonical Frontend Response Contract
The strict frontend response schema requires:
`success`, `message`, `data:null`, with optional `meta`, `error`, `errorCode`, `statusCode`, `validationErrors`.

Booking/contact failure handling reads the backend `message` when it is an explicitly backend-originated error.

## 6. SOURCE CONFLICT
`landing_features.md` contains an older inventory sentence referring to the singular booking path, while the detailed API contract, `PublicLandingUrlConfig`, `PublicLandingApi.ts`, tests, and MSW handlers use `/api/landing/bookings`. The current detailed contract is treated as the direct runtime evidence. This conflict is documented, not silently reconciled, and the backend now supports the actual plural frontend path.

## 7. Frozen Requirement Baseline

| ID | Frontend-derived requirement | Backend trace | Status |
|---|---|---|---|
| REQ-001 | Landing route is /landing. | PublicLandingUrlConfig.PAGES.LANDING | VERIFIED |
| REQ-002 | Booking uses POST /api/landing/bookings. | PublicLandingUrlConfig.BACKEND_API.BOOKING + plural compatibility controller | VERIFIED |
| REQ-003 | Booking accepts name, email, phone, date, and type. | LandingCreateBookingDto + orchestrator mapping | VERIFIED |
| REQ-004 | Booking type is trial | membership | class. | LandingBookingType enum + DTO + DB enum/check | VERIFIED |
| REQ-005 | Booking date is sent as an offset-aware UTC ISO-8601 timestamp. | Frontend serializer/schema + DTO IsISO8601 + TIMESTAMPTZ storage | VERIFIED |
| REQ-006 | Booking requires Idempotency-Key. | Frontend API client + command/compatibility idempotency interceptor | VERIFIED |
| REQ-007 | Booking success response is canonical with data:null. | Response interceptor + LandingApiSuccessResponseDto | VERIFIED |
| REQ-008 | Booking errors expose backend message/error contract. | LandingValidationExceptionFilter + frontend failure handling | VERIFIED |
| REQ-009 | Booking retry reuses the same idempotency key for the same intent. | Frontend hook + Rule 103 durable replay | VERIFIED |
| REQ-010 | Booking start-new resets intent and idempotency key. | Frontend hook; backend keeps keys immutable per intent | VERIFIED |
| REQ-011 | Contact uses POST /api/landing/contact. | PublicLandingUrlConfig.BACKEND_API.CONTACT + compatibility controller | VERIFIED |
| REQ-012 | Contact accepts name, email, and message. | LandingCreateContactDto + orchestrator mapping | VERIFIED |
| REQ-013 | Contact requires Idempotency-Key. | Frontend API client + command/compatibility idempotency interceptor | VERIFIED |
| REQ-014 | Contact success response is canonical with data:null. | Response interceptor + LandingApiSuccessResponseDto | VERIFIED |
| REQ-015 | Contact errors expose backend message/error contract. | LandingValidationExceptionFilter + frontend failure handling | VERIFIED |
| REQ-016 | Contact retry reuses the same idempotency key for the same intent. | Frontend hook + Rule 103 durable replay | VERIFIED |
| REQ-017 | Contact start-new resets intent and idempotency key. | Frontend hook; backend keeps keys immutable per intent | VERIFIED |
| REQ-018 | Canonical response envelope has success, message, data and optional meta/error/errorCode/statusCode/validationErrors. | Frontend strict Zod schema + backend response/filter types | VERIFIED |
| REQ-019 | Validation failures use validationErrors with field/message entries and data:null. | Frontend schema + backend validation filter | VERIFIED |
| REQ-020 | Successful booking/contact messages are backend-controlled and user-visible. | LANDING_ERRORS + frontend mutation successMessage | VERIFIED |
| REQ-021 | Landing booking/contact are public anonymous mutations. | Frontend public route + backend public tenant resolution | VERIFIED |
| REQ-022 | UI state coverage exposes exact booking/contact test ids for success/error/retry/start-new. | Frontend components/tests + Selenium deliverables | VERIFIED |
| REQ-023 | Do not invent a backend newsletter endpoint; newsletter uses a frontend mail client. | Frontend source contains mail-client submission, no backend API call | VERIFIED |
| REQ-024 | No backend list/table/KPI/chart/search/filter/sort/pagination capability is currently consumed by Landing. | Recursive frontend network/UI inventory | VERIFIED |

Result: **24/24 frontend-derived backend requirements verified in the repaired backend scope.**

## 8. Negative / Non-Requirements
- No backend newsletter endpoint was invented.
- No backend dashboard/analytics/lookup API was invented for static Landing sections.
- No frontend source was changed to make a backend mismatch disappear.

## 9. Contract Freeze
`CONTRACT_FREEZE_STATUS: COMPLETE`. The frontend evidence and repaired backend now agree on the current public contract.
