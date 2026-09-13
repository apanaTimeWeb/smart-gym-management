# Manager Communications — Forbidden Patterns

## Cross-Role Imports
- NEVER import from `/admin`, `/trainer`, `/superadmin`, or any other role folder.
- Allowed shared imports: `src/components/ui/`, `src/lib/`, `@/app/manager/manager_components/ManagerShared/` (visual primitives only), `@/app/manager/manager_utils/`.

## No Direct Member Data Mutation
- This module is READ-ONLY with respect to member data. It fetches member segments for targeting but NEVER modifies member records.
- Do NOT import `ManagerMembersApi` or any members mutation hook here.

## No Hardcoded Recipient Lists
- Never hardcode a list of phone numbers or emails in JSX or hooks. All recipients must come from `fetchSegmentRecipients()` or `ManagerCommunicationsMockData.ts`.

## No Automated Bulk WhatsApp Sending
- WhatsApp prevents automated bulk messaging. `ManagerBulkMessageModal` correctly requires per-recipient manual send.
- Do NOT attempt to automate this with loops or `window.open` in a loop.
- `ManagerBulkMessageModal` lives in `communications/communications_components/ManagerBulkMessageModal/`. Never move it to a global shared folder.

## No New External Messaging SDKs
- Do NOT install `nodemailer`, `twilio`, `sendgrid`, or any server-side messaging SDK in this frontend module.

## No Raw Mock Data in Components or Hooks
- All fixture/mock data MUST live in `communications_fixtures/ManagerCommunicationsMockData.ts`.
- Never define `MOCK_*` arrays inside JSX, hooks, or logic files.

## No Arbitrary Style Values
- Never use arbitrary CSS variable utility classes like `bg-[var(--custom-token)]`, `text-[var(--custom-token)]`, raw rgba shadows, or Tailwind color utilities like `bg-green-500`.
- Use only semantic tokens defined in `communications_theme_contract.md`.

## No `any` Types
- `any`, `@ts-ignore`, `@ts-nocheck` are strictly forbidden in this module.

## No Relative Imports
- All imports must be absolute (`@/app/manager/...`, `@/lib/...`, etc.).

## Do Not Store Server State in Zustand
- `useManagerCommunicationsStore` is for UI state only (active tab, composer fields, drawer open/close, pagination).
- Campaign history, KPIs, churned members, and automations must be managed by TanStack Query.

## Do Not Bypass the URL State Layer
- Tab selection, history filters (search, channel), pagination page, and churn filters (search, reason, page) must be reflected in URL query parameters.
- Do not hold searchable/filterable/paginated state in Zustand or local `useState` only.

## No Multiple Competing State Sources
- Do not duplicate the same filter in URL + Zustand + local state simultaneously. URL is the source of truth; Zustand mirrors only for in-session fallback.

## No Direct Number Formatting
- Never use `.toFixed()`, `.toLocaleString()`, or manual `₹` concatenation.
- Always use `formatCurrency()`, `formatNumber()`, `formatPercentage()` from `@/lib/formatters`.

## No Scattered Toast Messages
- Toast success/error strings must come from a centralized message source, not be scattered in mutation `onSuccess`/`onError` callbacks as inline string literals.

## Key Components That Must Not Be Changed Without Review
- `ManagerBulkMessageModal.tsx` — controls the manual per-recipient WhatsApp UX. Any change here could accidentally enable automated bulk sends.
- `useManagerChurnRecoveryLogic.ts` — owns the win-back flow. Adding side effects here could unintentionally modify member records.
- `ManagerCommunicationsApi.ts` — API contract boundary. Changes here affect all callers simultaneously.
- `communications_types/communications_types.ts` — all consumers depend on this type contract. Breaking changes here require a full module audit.
