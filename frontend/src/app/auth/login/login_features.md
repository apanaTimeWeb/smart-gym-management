# Login — Feature Map

## Module Purpose
The Login page is the unified authentication entry point for all ERP roles (Manager, Trainer,
Admin). It accepts email + password, calls the backend auth API, and on success calls the
internal Next.js `/auth/set-cookie` route to store the JWT in an HTTP-only cookie. Role-based
redirection happens server-side in `page.tsx` after cookie is set. This module has no sidebar,
no header — it uses a standalone full-page layout.

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — redirects already-authenticated users |
| `login_components/LoginForm.tsx` | Client Component — email/password form with validation |
| `login_components/LoginHero.tsx` | Left-panel branding/illustration (static) |
| `login_components/LoginErrorBoundary.tsx` | Catches rendering crashes in login UI |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Login Form | `/auth/login` | Authenticate user, set cookie | `POST /auth/login` → internal `/auth/set-cookie` | ✅ Live |
| Role Redirect | `/auth/login` | Send user to correct dashboard | Server-side cookie read | ✅ Live |
| Password Toggle | `/auth/login` | Show/hide password field | Client-side only | ✅ Live |

## Data and State Architecture
- Server-state: None — form uses local React Hook Form state
- Zustand stores: None
- Context providers: None
- Local-storage keys: None — token stored in HTTP-only cookie only
- MSW handler: N/A

## User Flows
1. Unauthenticated user visits any protected route → redirected to `/auth/login`
2. User enters email + password → Zod validates on submit
3. `LoginForm` calls `POST /auth/login` → on success calls `/auth/set-cookie`
4. Cookie set → `router.push()` to role-specific dashboard (`/manager/dashboard`, `/admin/dashboard`, etc.)
5. On error → inline form error shown from `response.message`, no hardcoded strings

## Component Responsibility Map
- `LoginForm` — owns form state (React Hook Form + Zod), handles submit, shows loading spinner on button. MUST NOT store token in localStorage.
- `LoginHero` — pure static display. MUST NOT contain any logic.
- `LoginErrorBoundary` — catches rendering crashes only, not API errors.

## Permissions and Security
| Action | Required Role |
|---|---|
| Access login page | Public (unauthenticated) |

- Tokens are NEVER stored in `localStorage` or `sessionStorage`.
- JWT lives exclusively in `gymsmart_token` HTTP-only, Secure, SameSite=Strict cookie.
- Already-authenticated users are redirected away from `/auth/login` by `page.tsx` server-side.

## Loading, Empty, Error States
- **Loading:** Submit button shows `Loader2` spinner + `disabled` state during API call
- **Empty:** N/A
- **Error:** Inline error message below form from `response.message`; `LoginErrorBoundary` for render crashes

## Edge Cases / AI Warnings
- **Never store token in localStorage** — this is the single most critical security rule for this module. HTTP-only cookie only.
- **Role redirect logic** — redirection target is determined by the decoded role in the cookie, read server-side in `page.tsx`. Never hardcode redirect paths in `LoginForm`.
- **`\"use client\"` placement** — must be the absolute first line of `LoginForm.tsx`, before any comments or imports.

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — auth module is standalone, no cross-role imports
- [x] Rule 6: Logic/UI Separation — submit logic in `LoginForm`, hero is pure display
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server redirect, `LoginForm` = Client
- [x] Rule 13: Feature Map — this document, updated same commit as code changes
- [x] Rule 14: Backend-driven messages — error shown from `response.message`
- [x] Rule 16: Form uses React Hook Form + Zod
- [x] Rule 23: Password visibility toggle implemented
- [x] Rule 26: Loading button state on submit
