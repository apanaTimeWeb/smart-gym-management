# Superadmin Invoices — Feature Map

## Module Purpose
The Superadmin Invoices module manages platform-level billing — the invoices issued to
gym tenants for their SaaS subscriptions. Superadmins can view all invoices across all
tenants, mark overdue invoices, trigger manual invoice generation, and download PDF copies.
This module covers SaaS billing only — it does not touch gym-internal member payment records,
which are managed by the Manager finance module.

## Directory Structure
| File | Responsibility |
|---|---|
| `page.tsx` | Server Component — auth guard |
| `loading.tsx` | Table skeleton — 10 row placeholders |
| `error.tsx` | Error boundary with retry |
| `invoices_components/SuperadminInvoicesClient.tsx` | Root Client Component — table + filter bar |
| `invoices_components/SuperadminInvoicesTable.tsx` | Paginated invoice table |
| `invoices_components/SuperadminInvoicesTableRow.tsx` | Single invoice row — tenant, amount, due date, status, actions |
| `invoices_components/SuperadminInvoicesFilterBar.tsx` | Filter by status (ALL / PAID / PENDING / OVERDUE) + date range |
| `invoices_components/SuperadminInvoicesDetailDrawer.tsx` | Invoice detail — line items, payment history |
| `invoices_components/SuperadminInvoicesGenerateModal.tsx` | Manually generate invoice for a tenant |
| `invoices_types/SuperadminInvoicesTypes.ts` | `Invoice`, `InvoiceStatus`, `InvoiceLineItem`, `GenerateInvoiceDto` |
| `invoices_utils/SuperadminInvoicesConstants.ts` | `INVOICE_STATUS_STYLES`, `OVERDUE_THRESHOLD_DAYS` |

## Feature Inventory
| Feature | Path | Purpose | Main API Calls | Status |
|---|---|---|---|---|
| Invoice List | `/superadmin/invoices` | All tenant invoices, paginated | `GET /superadmin/invoices?page=&status=&from=&to=` | ✅ Live |
| View Invoice Detail | `/superadmin/invoices` | Full invoice with line items | `GET /superadmin/invoices/:id` | ✅ Live |
| Generate Invoice | `/superadmin/invoices` | Manually create invoice for tenant | `POST /superadmin/invoices` | ✅ Live |
| Mark Paid | `/superadmin/invoices` | Mark pending invoice as paid | `PATCH /superadmin/invoices/:id/mark-paid` | ✅ Live |
| Download PDF | `/superadmin/invoices` | Download invoice as PDF | `GET /superadmin/invoices/:id/pdf` | ✅ Live |
| Filter by Status | `/superadmin/invoices` | Filter PAID / PENDING / OVERDUE | — (query param) | ✅ Live |

## Data and State Architecture
- TanStack Query keys: `['superadmin', 'invoices', { page, status, from, to }]`, `['superadmin', 'invoices', invoiceId]`
- Mutations: `useGenerateInvoice`, `useMarkInvoicePaid`
- Zustand stores: None
- Context providers: None
- Local-state: `statusFilter`, `dateRange`, `page` — local to `SuperadminInvoicesClient`

## User Flows
1. Superadmin opens `/superadmin/invoices` → paginated invoice list loads
2. Superadmin filters by "OVERDUE" → list scoped to overdue invoices
3. Superadmin clicks invoice row → `SuperadminInvoicesDetailDrawer` → line items + payment history
4. Superadmin clicks "Mark Paid" → `useConfirm()` → `PATCH /superadmin/invoices/:id/mark-paid`
5. Superadmin clicks "Download PDF" → `GET /superadmin/invoices/:id/pdf` → browser download
6. Superadmin clicks "Generate Invoice" → `SuperadminInvoicesGenerateModal` → tenant + amount → `POST`

## Component Responsibility Map
- `SuperadminInvoicesClient` — filter + pagination state. MUST NOT contain row logic.
- `SuperadminInvoicesTable` — renders rows from query. MUST NOT manage filter state.
- `SuperadminInvoicesTableRow` — display + action buttons. Amount MUST use `formatCurrency()` from `@/lib/formatters`.
- `SuperadminInvoicesDetailDrawer` — read-only detail. MUST NOT allow mutations from drawer.
- `SuperadminInvoicesGenerateModal` — form only. MUST use RHF + Zod.

## Permissions and Security
| Action | Required Role |
|---|---|
| View all invoices | `SUPERADMIN` |
| Generate invoice | `SUPERADMIN` |
| Mark invoice paid | `SUPERADMIN` |
| Download PDF | `SUPERADMIN` |
| ❌ Delete invoices | Forbidden — invoices are immutable audit records |
| ❌ View gym-internal member payments | Manager finance module |

## Loading, Empty, Error States
- **Loading:** `loading.tsx` — 10 table row skeletons
- **Empty (no invoices):** "No invoices found"
- **Empty (filtered):** "No invoices match your filters" with clear filter link
- **Error:** `error.tsx` with retry

## Edge Cases / AI Warnings
- **Currency formatting** — all monetary amounts MUST use `formatCurrency()` from `@/lib/formatters`. Never format inline.
- **INVOICE_STATUS_STYLES** — maps `PAID | PENDING | OVERDUE` to badge classes; must live in constants.
- **PDF download** — use `window.open(url, '_blank')` or an anchor with `download` attribute; never fetch binary into state.
- **Mark Paid confirmation** — financial mutation; MUST use `useConfirm()` before firing.
- **Overdue detection** — `OVERDUE_THRESHOLD_DAYS` is a named constant; never write `> 30` inline.

## UI Data Requirements

The following types map directly to the UI components and define the shape of the data:

```typescript
export type SaaSInvoice = z.infer<typeof SaaSInvoiceSchema>;

export type InvoiceLineItem = z.infer<typeof InvoiceLineItemSchema>;

export type SuperadminInvoicesTenant = z.infer<typeof SuperadminInvoicesTenantSchema>;
```

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization
- [x] Rule 3: Module prefix naming — `SuperadminInvoices*`
- [x] Rule 7: Type isolation — all types in `SuperadminInvoicesTypes.ts`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 15B: Forms use React Hook Form + Zod
- [x] Rule 26: Mark Paid uses `useConfirm()`
- [x] Rule 40: `_forbidden.md` present
- [x] Rule 55: No `key={index}` — stable invoice IDs used
- [x] Rule 63: Zero cross-module imports
- [x] Rule 73: `import type` for all type-only imports

---

## Edge Cases and AI Warnings

- **Delete Invoice is permanent and irreversible:** Never use `window.confirm()` for Invoice deletion. If a delete feature exists or is added, it MUST use a type-to-confirm modal with the exact string "DELETE" to prevent accidental data loss.
- **Invoices Table Row Clicks:** The `Invoices` list view uses clickable table rows (`<tr className="cursor-pointer">`) for navigation. Ensure that any inline action buttons (like Edit or Delete) inside the table call `e.stopPropagation()` so they don't accidentally trigger the row navigation.
- **Section-Level Error Boundaries in Invoices:** Do not allow a single failed API fetch in Invoices to unmount the entire page. Major components (like the Invoices data table or metrics) must be wrapped in `<SuperadminErrorBoundary variant="inline">`.
- **Backend-Driven Messages for Invoices Mutations:** Do not hardcode success or error toasts like "User created". Always display the `message` string provided by the backend's JSON response envelope when creating, updating, or deleting Invoices.
- **No Client-Side Pagination for Invoices:** If the dataset grows large, do not fetch all Invoices and paginate on the client. always implement robust server-side pagination, sorting, and filtering via query parameters using useSuperadminUrlState.


## API Contract
All calls are isolated to `superadmin_invoices_api.ts`.

- `return apiFetch<ApiResponse<SaaSInvoice[]>>(`${InvoicesUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(SaaSInvoiceSchema) });`
- `apiFetch<ApiResponse<SaaSInvoice>>(InvoicesUrlConfig.BACKEND_API.MANUAL_PAYMENT, {`
- `apiFetch<ApiResponse<{ downloadUrl: string }>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/${id}/download`, { dataSchema: z.object({ downloadUrl: z.string() }) }),`
- `return apiFetch<ApiResponse<{ downloadUrl: string }>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/export${q}`, { dataSchema: z.object({ downloadUrl: z.string() }) });`
- `apiFetch<ApiResponse<null>>(`${InvoicesUrlConfig.BACKEND_API.BASE}/${id}/resend`, {`
- `return apiFetch<ApiResponse<InvoicesTenant[]>>(GymsUrlConfig.BACKEND_API.BASE);`


## State Architecture
- Server State: TanStack Query
- UI State: React `useState` or Zustand
