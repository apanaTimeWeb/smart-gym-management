# Manager Inquiries — Feature Map

## Module Purpose
Manager Inquiries is the lead and conversion workspace. Managers can browse/search/filter incoming inquiries, review inquiry details, create or edit leads, and convert a qualified inquiry into a member. The module owns inquiry data and plan lookup mocks. Conversion and deletion are business-critical and must remain explicitly confirmed and server-authoritative.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `inquiries_api/` | Feature-owned responsibility for the inquiries module. | `ManagerInquiriesApi.ts; ManagerUseManagerInquiriesMutations.ts; ManagerUseManagerInquiriesQueries.ts` |
| `inquiries_components/` | Feature-owned responsibility for the inquiries module. | `—` |
| `inquiries_hooks/` | Feature-owned responsibility for the inquiries module. | `ManagerBuildInquiriesQueryParams.ts; ManagerUseManagerInquiriesLogic.ts; ManagerUseManagerInquiriesLogic.ts` |
| `inquiries_fixtures/` | Feature-owned responsibility for the inquiries module. | `ManagerInquiriesMockData.ts` |
| `inquiries_mocks/` | Feature-owned responsibility for the inquiries module. | `—` |
| `inquiries_types/` | Feature-owned responsibility for the inquiries module. | `ManagerConvertLeadSchema.ts; ManagerInquiriesSchema.ts; ManagerInquiriesTypes.ts` |
| `inquiries_utils/` | Feature-owned responsibility for the inquiries module. | `ManagerInquiriesConvertConstants.ts; ManagerInquiriesSharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchInquiries | `/manager/inquiries` | Uses the fetchInquiries workflow with typed request/response handling. | `GET /manager/inquiries` | ✅ Implemented |
| fetchInquiryPlans | `/manager/inquiries` | Uses the fetchInquiryPlans workflow with typed request/response handling. | `GET /manager/inquiries/plans` | ✅ Implemented |
| fetchInquiryPlansSnapshot | `/manager/inquiries` | Uses the fetchInquiryPlansSnapshot workflow with typed request/response handling. | `GET /manager/inquiries/plans-snapshot` | ✅ Implemented |
| convertLead | `/manager/inquiries` | Uses the convertLead workflow with typed request/response handling. | `POST /manager/inquiries/:id/convert` | ✅ Implemented |
| fetchInquiryById | `/manager/inquiries` | Uses the fetchInquiryById workflow with typed request/response handling. | `GET /manager/inquiries/:id` | ✅ Implemented |
| fetchInquiryStats | `/manager/inquiries` | Uses the fetchInquiryStats workflow with typed request/response handling. | `GET /manager/inquiries/stats` | ✅ Implemented |
| createInquiry | `/manager/inquiries` | Uses the createInquiry workflow with typed request/response handling. | `POST /manager/inquiries` | ✅ Implemented |
| updateInquiry | `/manager/inquiries` | Uses the updateInquiry workflow with typed request/response handling. | `PATCH /manager/inquiries/:id` | ✅ Implemented |
| deleteInquiry | `/manager/inquiries` | Uses the deleteInquiry workflow with typed request/response handling. | `DELETE /manager/inquiries/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage inquiries
1. Manager searches and filters the inquiry list.
2. The logic hook propagates debounced search, status, date, page, and limit to fetchInquiries().
3. MSW filters the module-owned fixture and returns the correct total.
4. The table renders the returned page and supports detail/edit actions.
### Flow 2: Convert lead
1. Manager opens an inquiry detail and chooses Convert.
2. The conversion form validates required member/plan inputs with RHF + Zod.
3. convertLead(id, body) sends the request.
4. The authoritative member ID/message is consumed and the inquiry cache is reconciled.

## Data and State Architecture
TanStack Query owns inquiries server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchInquiries` | `GET` | `/api/v1/manager/inquiries` | `{ page?, limit?, search?, status?, date? }` | `{ inquiries: Inquiry[]; total: number }` |
| `fetchInquiryPlans` | `GET` | `/api/v1/manager/inquiries/plans` | `—` | `{ name: string }[]` |
| `fetchInquiryPlansSnapshot` | `GET` | `/api/v1/manager/inquiries/plans-snapshot` | `—` | `{ name: string }[]` |
| `convertLead` | `POST` | `/api/v1/manager/inquiries/:id/convert` | `Record<string, unknown>` | `{ memberId: string }` |
| `fetchInquiryById` | `GET` | `/api/v1/manager/inquiries/:id` | `{ id: string }` | `Inquiry` |
| `fetchInquiryStats` | `GET` | `/api/v1/manager/inquiries/stats` | `—` | `InquiryStats` |
| `createInquiry` | `POST` | `/api/v1/manager/inquiries` | `Partial<Inquiry>` | `Inquiry` |
| `updateInquiry` | `PATCH` | `/api/v1/manager/inquiries/:id` | `{ id: string; body: Partial<Inquiry> }` | `Inquiry` |
| `deleteInquiry` | `DELETE` | `/api/v1/manager/inquiries/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total inquiries | `total` | `/api/v1/manager/inquiries/stats` | `data.total` | No | Yes |
| KPI: New | `new` | `/api/v1/manager/inquiries/stats` | `data.new` | No | Yes |
| KPI: Follow-up | `followUp` | `/api/v1/manager/inquiries/stats` | `data.followUp` | No | Yes |
| KPI: Converted | `converted` | `/api/v1/manager/inquiries/stats` | `data.converted` | No | Yes |
| KPI: Lost | `lost` | `/api/v1/manager/inquiries/stats` | `data.lost` | No | Yes |
| Table: Name | `name` | `/api/v1/manager/inquiries` | `data.inquiries[].name` | No | Yes |
| Table: Phone | `phone` | `/api/v1/manager/inquiries` | `data.inquiries[].phone` | No | Yes |
| Table: Email | `email` | `/api/v1/manager/inquiries` | `data.inquiries[].email` | Yes | Yes |
| Table: Interest | `interest` | `/api/v1/manager/inquiries` | `data.inquiries[].interest` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/inquiries` | `data.inquiries[].status` | No | Yes |
| Table: Source | `source` | `/api/v1/manager/inquiries` | `data.inquiries[].source` | Yes | Yes |
| Table: Created at | `createdAt` | `/api/v1/manager/inquiries` | `data.inquiries[].createdAt` | No | Yes |
| Table: Follow-up date | `followUpDate` | `/api/v1/manager/inquiries` | `data.inquiries[].followUpDate` | Yes | Yes |
| Detail: Follow-up logs | `followUpLogs[].note` | `/api/v1/manager/inquiries/:id` | `data.followUpLogs[].note` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
- **Search/filter/page changes must reach the MSW handler; do not hide a broken param path with client-side filtering:** Search/filter/page changes must reach the MSW handler; do not hide a broken param path with client-side filtering.
- **Converted inquiries must consume the backend `memberId`; do not invent a new member ID on the client:** Converted inquiries must consume the backend `memberId`; do not invent a new member ID on the client.
- **Lead conversion is critical and should require explicit confirmation where the UI triggers a destructive state transition:** Lead conversion is critical and should require explicit confirmation where the UI triggers a destructive state transition.
- **Optional email/source/notes/follow-up fields must use displayValue() when rendered as detail data:** Optional email/source/notes/follow-up fields must use displayValue() when rendered as detail data.
- **Plan options from the backend belong in the API/mock layer, not UI constants:** Plan options from the backend belong in the API/mock layer, not UI constants.
- **Preserve failed inquiry form input after a server error:** Preserve failed inquiry form input after a server error.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `inquiries/inquiries_components/ConvertLeadModal/ManagerConvertLeadForm.tsx` | Renders the form fields for converting a lead. |
| `inquiries/inquiries_components/ConvertLeadModal/ManagerConvertLeadModal.tsx` | Renders the Add Member form specifically for converting a lead within the Inquiries page. |
| `inquiries/inquiries_components/ConvertLeadModal/ManagerConvertLeadSuccess.tsx` | Renders the success state after converting a lead. |
| `inquiries/inquiries_components/InquiriesTable/ManagerInquiriesTable.tsx` | Renders the paginated, filterable table of inquiries with row actions, status updates, and bulk selection. |
| `inquiries/inquiries_components/ManagerInquiriesKPIs/ManagerInquiriesKPIs.tsx` | Renders the four KPI stat cards (Total, New, Follow Up, Converted) for the Inquiries module. |
| `inquiries/inquiries_components/ManagerInquiriesMain/ManagerInquiriesMain.tsx` | Framework entry component for the Inquiries module; delegates feature behavior and UI composition to `ManagerInquiriesContent`. |
| `inquiries/inquiries_components/ManagerInquiriesModal/ManagerInquiriesModal.tsx` | Renders the modal form for creating or editing an inquiry lead. Uses React Hook Form + Zod validation. |
| `inquiries/inquiries_components/ManagerInquiriesToolbar/ManagerInquiriesToolbar.tsx` | Renders the search/filter toolbar and bulk-action bar for the Inquiries module. |
| `inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic.ts` | Provides inquiries state and actions to the entire inquiries module hierarchy via module-local state/query layer. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
