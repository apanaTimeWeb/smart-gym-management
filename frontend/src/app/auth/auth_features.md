# Auth Module — Feature Documentation

## Overview
The Auth module is responsible for the authentication lifecycle of the application. It handles user login, secure token management (JWT/refresh tokens), logout procedures, and cookie-based sessions.

---

## Directory Structure & Core Features

```
auth/
├── auth_api/          # Centralized API fetchers and interceptors for auth actions
├── login/             # Login page, forms, and authentication state logic
├── logout/            # Secure logout routines and state clearing
├── refresh/           # Silent token refresh mechanisms
├── set-cookie/        # Secure cookie handling utilities (HTTP-only)
└── token/             # Token parsing, decoding, and validation utilities
```

### Core Flows
- **/auth/login**: Primary entry point for users to authenticate into the system.
- **Token Refresh**: Background silent refresh triggered by the API interceptor on `401 Unauthorized`.
- **Logout**: Clears all local state, invalidates tokens server-side, and redirects.

---

## State & Data
- **Centralized Config**: Authentication endpoints are defined in `auth_url_config.ts`.
- **State Management**: Authentication state (user session, roles) is typically synced with a global store (e.g., Zustand) or Context to be consumed by other modules.

---

## Architectural Rules Checklist (AI Context)
- [x] **Micro-modularization**: Component files must not exceed 250-350 lines. Break down into sub-components.
- [x] **Prefixing**: ALL file names must start with `Auth...` (e.g., `AuthLoginForm.tsx`).
- [x] **Logic Separation**: Heavy logic must be extracted into `use[ComponentName].ts` hooks.
- [x] **Theme Contract**: No arbitrary Tailwind pixel/hex values. Use CSS variables defined in the theme contract.
- [x] **Data Fetching**: Use Server Components for secure operations where applicable, Client components for form interactivity.
- [x] **Imports**: Absolute imports ONLY (`@/app/auth/...`).
