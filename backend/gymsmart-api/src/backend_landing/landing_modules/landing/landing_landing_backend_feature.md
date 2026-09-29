# Landing Backend Feature Map — v4 final

## 1. Evidence Boundary
The current repair is MODE B (Audit + Repair). The supplied frontend archive was inspected recursively and remains read-only. The role/domain is `landing`; the writable backend implementation boundary is the supplied Landing role container's Landing feature plus explicitly documented core/infrastructure contracts required to satisfy Rule 103 and the canonical response contract.

Frontend archive inspected: `74` files.
Current frontend contract evidence is taken from:
- `src/app/frontend_public/landing/landing_api/PublicLandingApi.ts`
- `src/app/frontend_public/landing/landing_url_config.ts`
- `src/app/frontend_public/landing/landing_schemas/PublicLandingApiResponseSchema.ts`
- `src/app/frontend_public/landing/landing_schemas/PublicLandingBookingSchema.ts`
- `src/app/frontend_public/landing/landing_schemas/PublicLandingContactSchema.ts`
- Booking/contact hooks, components, tests, and MSW handlers.

## 2. Module Purpose
Public Landing submission boundary for booking and contact lead capture before authentication. The current frontend does not call a backend list, KPI, chart, lookup, pagination, search, filter, sort, newsletter, file, webhook, or realtime endpoint.

## 3. Actual Frontend API Contract
| Flow | HTTP | Frontend path | Required header | Request | Success response |
|---|---|---|---|---|---|
| Booking | POST | `/api/landing/bookings` | `Idempotency-Key` | `name`, `email`, `phone`, `date` as offset-aware ISO-8601 UTC string, `type` = `trial | membership | class` | `{success:true,message,data:null}` plus optional canonical fields |
| Contact | POST | `/api/landing/contact` | `Idempotency-Key` | `name`, `email`, `message` | `{success:true,message,data:null}` plus optional canonical fields |

The detailed frontend feature contract explicitly identifies `/api/landing/bookings` for booking. An older inventory sentence elsewhere names `/landing/booking`; this is a `SOURCE_CONFLICT`. The detailed API contract, URL config, API client, tests, and MSW handlers are treated as the direct runtime evidence for the current contract. No frontend file was changed.

## 4. Backend Route Mapping
| Backend route | Purpose |
|---|---|
| `POST /api/v1/landing/booking` | Canonical versioned booking command. |
| `POST /api/v1/landing/contact` | Canonical versioned contact command. |
| `POST /api/landing/booking` | Singular compatibility alias. |
| `POST /api/landing/bookings` | **Frontend-required plural compatibility alias.** |
| `POST /api/landing/contact` | Frontend-required unversioned contact path. |

Compatibility aliases delegate to the same orchestrators; business semantics are not duplicated.

## 5. Request / Response Semantics
- `LandingCreateBookingDto`: trims/sanitizes name, normalizes email/phone, requires strict ISO-8601 date with offset, requires enum booking type, rejects non-whitelisted fields through the global ValidationPipe.
- `LandingCreateContactDto`: trims/sanitizes name/message, normalizes email, and rejects non-whitelisted fields.
- Both mutation flows require `Idempotency-Key` before controller execution.
- Redis NX provides in-flight concurrency control; durable PostgreSQL `idempotency_records` holds request hash and deterministic replay response.
- A stored response is replayable even if the durable row is still marked `processing=true`; a row without a stored response remains an in-progress conflict.
- The response interceptor flattens `LandingCommandResult` into `{success:true,message,data:null}` and does not double-wrap an already canonical envelope.
- Validation/business errors are canonicalized by `LandingValidationExceptionFilter` with `data:null`, machine-readable `errorCode`, `statusCode`, and field-level `validationErrors` when applicable.

## 6. Persistence Architecture
Tenant-local PostgreSQL tables:
- `landing_bookings`
- `landing_contacts`
- `audit_logs`
- `idempotency_records`

Booking/contact mutation and audit row are committed in one UnitOfWork transaction. Idempotency reservation stores the deterministic response in the same transaction; post-commit completion changes only the processing flag.

## 7. Security / Tenant Isolation
Anonymous Landing traffic is restricted to the configured public tenant. Client-selected arbitrary tenant IDs are rejected for public traffic. Tenant DataSource resolution occurs after trusted tenant resolution. Public mutation rate limiting and strict idempotency protection apply at the controller boundary.

## 8. Testing Artifacts
- Co-located Jest unit specs cover idempotency decisions and response envelope mapping.
- API E2E: `backend_e2e/backend_landing_e2e/landing/test_landing_api.py`.
- Selenium: `backend_selenium/backend_landing_selenium/landing/test_landing_ui.py` and `test_landing_ui_edge.py`.
- Selenium locators are copied from exact frontend `data-testid` evidence; execution requires the real frontend URL and browser environment.

## 9. Required Invariants / Do-Not-Break Handoff
- Frontend booking path `/api/landing/bookings` must remain supported.
- Frontend contact path `/api/landing/contact` must remain supported.
- `Idempotency-Key` is mandatory on every Landing state-changing endpoint.
- Same key + same request hash replays the deterministic response; same key + different hash conflicts.
- Public requests cannot select arbitrary tenant databases.
- Booking date remains an offset-aware UTC ISO-8601 instant at the API/database boundary.
- Successful booking/contact responses keep `data:null`.
- No sibling feature module may be introduced as a direct code dependency.
- Frontend source remains read-only for this workflow.

## 10. Contract Freeze
`CONTRACT_FREEZE_STATUS: COMPLETE` for the supplied frontend/backend pair. The historical route sentence conflict is explicitly recorded above and does not change the verified current contract.
