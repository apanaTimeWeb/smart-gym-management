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
**FORBIDDEN:** Calling `migrationsApi.startMigration()` directly on button click without a confirmation gate.
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
**REASON:** All API communication must go through `migrations_\1.ts`.
**ALLOWED:** Import and call `migrationsApi.fetchMigrations()` or `migrationsApi.startMigration()` only from custom hooks or Zustand store actions.

---

## 5. No Relative Imports
**FORBIDDEN:** `import { MigrationLog } from '../../migrations_\1/...'`
**REASON:** Relative paths break when files move and increase AI hallucination risk across modules.
**ALLOWED:** Always use absolute paths: `import type { MigrationLog } from '@/app/superadmin/migrations/migrations_types/SuperadminMigrationsTypes'`

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
**ALLOWED:** Always import directly from the named file: `import { migrationsApi } from '@/app/superadmin/migrations/migrations_api/SuperadminMigrationsApi'`

---

## 8. No Leaving the `startMigration` Stub in Production
**FORBIDDEN:** Shipping `migrations_\1.ts` to production with `Promise.resolve(...)` mock responses.
**REASON:** The current stub silently succeeds without hitting any backend endpoint, creating a false sense of safety.
**REQUIRED:** Migration triggers must continue through the module API client and module-owned MSW handler. Never add a TODO-based production stub or direct fixture access from the UI.
