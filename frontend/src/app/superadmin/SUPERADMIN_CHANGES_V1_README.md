# Smart Gym 360 — Superadmin Changes V1

## Replace instructions
1. Back up your current `src/app/superadmin/` folder.
2. Extract this V1 package at the frontend project root.
3. Replace only the existing `src/app/superadmin/` directory with the packaged one.
4. Do not copy any Admin, Manager, Trainer, or other role business folders from this V1 package; this archive contains Superadmin changes only.
5. From the project root run `npm run build`.
6. For the mocked V1 business panels during development/demo, keep the existing MSW/demo setup enabled. The Superadmin V1 mock bootstrap only registers Superadmin-owned handlers and contains no business fixture data.

## What V1 adds
This release expands Superadmin with platform-level SaaS business intelligence and operations: monthly income movement, retention indicators, tenant comparison, critical alerts, advanced tenant filters, saved views, bulk actions, tenant 360, plan comparison/versioning/add-ons/migration preview, payment recovery and financial adjustment review, retention/cohort/adoption/acquisition analytics, report comparisons, activation insights, cancellation reasons, franchise/branch comparison, support service insights, rollout/release controls, infrastructure and job health, backup verification, audit investigation, governance settings, delegated Superadmin access, integrations/webhooks/developer access, tenant offboarding, tax/compliance coverage, and saved tenant segments.

## Architecture
The V1 feature data path is:

`UI → TanStack Query → module API client → global apiFetch transport → module-owned MSW handler/fixture in development → feature-owned hardcoded fallback where global MSW registration is unavailable → real backend in production`

New feature-specific files remain under `src/app/superadmin/<feature>/`. No non-Superadmin business module is required by the V1 feature layer.

## User-facing naming
New V1 screens use plain-language labels rather than SaaS abbreviations. Technical field names may remain in TypeScript/API contracts because they are implementation contracts.

Examples: `Monthly income`, `Income kept from existing gyms`, `Income kept without upgrades`, `Gym retention`, `Revenue lost`, `Customer churn`, `Developer keys`, `Extra sign-in`, and `Stuck jobs`.

## Verification
See `SUPERADMIN_CHANGES_V1_CHECKLIST.md` for the feature-by-feature checklist and `SUPERADMIN_CHANGES_V1_VERIFICATION.md` for source/static verification results and the runtime verification limitation.


## Superadmin communication boundary
The Superadmin WhatsApp center is strictly tenant-facing. It targets tenant owners, tenant admins, and tenant managers. It does not contain gym-member audiences, member fee reminders, member renewal records, or member-level personalization. Member communication belongs in the Admin / Manager experience.

## Free WhatsApp workflow
The WhatsApp center uses free click-to-chat links with pre-filled, personalized tenant messages. The operator opens each chat, presses WhatsApp's Send action, and records Sent or Skipped in the queue. Templates cover billing, onboarding, maintenance/service notices, security, platform updates, and custom tenant announcements.
