# Frozen Auth Contract — Backend v1

This document records the backend-facing Auth contract discovered from the supplied frontend source before backend implementation. It is a snapshot, not a replacement for the source frontend.

## Backend endpoints

| Method | Endpoint | Consumer | Contract |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Server-side Auth session boundary | `{ email, password }` -> `{ accessToken, refreshToken, user }` inside canonical envelope |
| POST | `/api/v1/auth/refresh` | Server-side Auth refresh boundary | Bearer refresh token -> `{ accessToken, refreshToken? }` inside canonical envelope |
| GET | `/api/v1/auth/me` | Server-side Auth session identity verification | Verified access token -> `AuthUser` inside canonical envelope |
| POST | `/api/v1/auth/logout` | Server-side Auth logout boundary | Verified access token/session -> `data: null` inside canonical envelope |

## AuthUser

Required fields are `id`, `name`, `email`, and `role`; `tenantId` is optional. Allowed roles are `SUPERADMIN`, `ADMIN`, `MANAGER`, and `TRAINER`.

## Login validation

`email` must be a valid email address. `password` must be a string with a minimum length of 6. Unknown request properties must be rejected by the backend global validation contract.

## Token handling

The frontend's production Auth routes keep access/refresh tokens in HTTP-only secure cookies and validate backend envelopes server-side. The backend itself persists only a SHA-256 refresh-token hash.

## Contract rule

After this freeze, backend field names and response structure must not change unilaterally. Breaking contract changes must update the frontend types/schemas, mock handlers, and backend tests together.
