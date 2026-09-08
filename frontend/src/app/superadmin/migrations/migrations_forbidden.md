# Forbidden Patterns — `superadmin/migrations`

This file defines what is explicitly **NOT ALLOWED** anywhere inside `src/app/superadmin/migrations/`.
AI agents and developers MUST abort any change that introduces one of the following patterns.

---

## 1. No Raw SQL Input in the UI
**FORBIDDEN:** Any `<textarea>` or `<input>` that accepts raw SQL and sends it to the backend.
**REASON:** The migrations UI is for monitoring and triggering pre-defined versioned schemas only.
Allowing free-form SQL input creates a critical injection attack surface.
**ALLOWED:** Only trigger pre-defined migration versions by name/version string.

---

## 2. No Instant Single-Click Schema Deployment
**FORBIDDEN:** Calling `migrationsApi.triggerMigration()` directly on button click without a confirmation gate.
**REASON:** A schema deployment affects ALL tenant databases simultaneously and is irreversible.
A mis-click could corrupt hundreds of production databases.
**ALLOWED:** Always wrap the trigger action in `useConfirm()` from `SuperadminConfirmProvider` with an explicit message: *"This will apply the schema change to ALL active tenant databases. This cannot be undone."*

---

## 3. No Hardcoded Toast Messages in Components
**FORBIDDEN:** `toast.success('Migration deployed successfully')` hardcoded in the UI component.
**REASON:** Violates Rule 14 — frontend must display the `message` from the backend response envelope.
**ALLOWED:** `toast.success(res.message || 'Migration triggered')` — always prefer `res.message` first.

---

## 4. No Direct `apiFetch` Calls from UI Components
**FORBIDDEN:** Calling `apiFetch(...)` directly inside `.tsx` component files.
**REASON:** All API communication must go through `superadmin_migrations_api.ts`.
**ALLOWED:** Import and call `migrationsApi.fetchMigrations()` or `migrationsApi.triggerMigration()` only from custom hooks or Zustand store actions.

---

## 5. No Relative Imports
**FORBIDDEN:** `import { MigrationLog } from '../../superadmin_migrations_types/...'`
**REASON:** Relative paths break when files move and increase AI hallucination risk across modules.
**ALLOWED:** Always use absolute paths: `import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types'`

---

## 6. No Audit Log Deletion
**FORBIDDEN:** Adding any UI control, button, or API call that deletes or modifies existing migration records.
**REASON:** Migration logs are an immutable audit trail of what schema versions were applied and when.
Deleting them destroys the ability to diagnose production incidents.
**ALLOWED:** Only reading (GET) and triggering new migrations (POST) are permitted from this module.

---

## 7. No Barrel Files
**FORBIDDEN:** Creating `index.ts` or `index.js` files that re-export from multiple files.
**REASON:** Barrel files cause circular dependency risks and make it impossible to provide isolated context to AI agents.
**ALLOWED:** Always import directly from the named file: `import { migrationsApi } from '@/app/superadmin/migrations/superadmin_migrations_api/superadmin_migrations_api'`

---

## 8. No Leaving the `triggerMigration` Stub in Production
**FORBIDDEN:** Shipping `superadmin_migrations_api.ts` to production with `Promise.resolve(...)` mock responses.
**REASON:** The current stub silently succeeds without hitting any backend endpoint, creating a false sense of safety.
**ALLOWED:** Replace the stub with real `apiFetch` calls before any production deployment. Add a `// TODO: wire to backend` comment if the backend endpoint is not yet ready, and configure an MSW handler for development.
