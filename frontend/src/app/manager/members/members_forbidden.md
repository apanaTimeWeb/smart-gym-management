# Forbidden Patterns for `manager/members`

To maintain isolation and enterprise-grade architecture in the Manager Members module, the following patterns are strictly forbidden:

## 1. State Authority
- **No Local Fallbacks for Filters:** All search, pagination, and filter states MUST be synced to the URL via `useSearchParams` and `useRouter`. Do not store primary filter state in local `useState` or Context.
- **No Raw API Responses in Context:** The TanStack Query cache (`['manager', 'members']`) is the single source of truth for member data. Do not duplicate the member list or stats in `ManagerUseManagerMembersLogic`.

## 2. Component Boundaries
- **No Giant Modals:** `ManagerMembersModal` must remain split into sections (e.g. Profile Upload, Form Logic). Do not merge them back into a single >300 line file.
- **Dumb Presentation Table:** `ManagerMembersTable` must only dispatch actions or route changes. It must NOT contain inline data fetching or complex data manipulation logic.

## 3. Data Relationships
- **No Orphaned Members:** Never create a member without assigning a plan.
- **Consistent Referencing:** The `id` field of a member must be used consistently across `finance`, `attendance`, and `store` modules. When soft-deleting/exiting a member, related records must NOT be deleted.

## 4. Destructive Actions
- **No Direct `window.confirm`:** Deleting, freezing, or exiting a member MUST use the `useConfirm` hook from `ManagerConfirmProvider`.
- **Protected Actions:** Unsaved changes in the Add/Renew modals MUST trigger `useUnsavedChangesGuard`.

## 5. UI and Theme
- **No Arbitrary Classes:** Never use raw colors like `bg-green-500` or `text-[var(--danger)]`. Only use the tokens defined in `members_theme_contract.md`.
- **Formatting:** All currency and numbers must be routed through `@/lib/formatters`. Do not use `.toLocaleString()` inline.

## 6. Type Safety
- **No `any` Assertions:** The use of `any` (e.g., `Promise<any>`) is strictly banned. All mutations must return explicit contracts (e.g. `Promise<{ success: boolean }>`).
- **No Unsafe Query Extraction:** Do not extract nested data using `(res as any)?.data`. Use type assertions `as { data?: ... }` or typed API contracts.
