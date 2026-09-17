# Saved Tenant Segments — Feature Map

## Module Purpose
This Superadmin-only module provides reusable tenant audience groups for platform operations, reporting, messaging, and retention workflows. It solves the problem of repeatedly rebuilding the same tenant filters by giving the platform team named saved groups and quick presets. A Superadmin can review segment rules, tenant counts, update dates, and where each segment is used. It does not own tenant records themselves; those remain server data in the owning tenant modules and are never copied into segment UI constants.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `segments_components/` | Segment overview, saved groups, and quick presets | `SuperadminSegmentsClient.tsx`, `SuperadminSegmentsPageHeader.tsx`, `SuperadminSegmentsSummaryCards.tsx`, `SuperadminSegmentsSavedGroupsPanel.tsx`, `SuperadminSegmentsQuickPresetsPanel.tsx` |
| `segments_api/` | API boundary | `superadmin_segments_api.ts` |
| `segments_types/` | Zod contract and types | `SuperadminSegmentsTypes.ts` |
| `segments_mocks/fixtures/` | Realistic saved-segment and preset fixtures | `SuperadminSegmentsMockFixtures.ts` |
| `segments_mocks/handlers/` | MSW handler | `SuperadminSegmentsMockHandlers.ts` |
| `segments_utils/` | TanStack Query orchestration | `useSuperadminSegmentsPage.ts` |

## Feature Inventory
| Feature | Route | What the Superadmin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Saved Groups | `/superadmin/segments` | Review saved audience groups, rules, counts, usage, and updates | `GET /api/superadmin/segments` | Implemented in source; runtime build not verified here |
| Quick Presets | `/superadmin/segments` | Review common tenant questions such as high-value, low-use, and at-risk groups | `GET /api/superadmin/segments` | Implemented in source; runtime build not verified here |

## User Flows & Interactions
1. Superadmin opens the page and retrieves the saved segment response.
2. Zod validates the response at the API boundary.
3. Saved Groups shows named segments and their tenant counts.
4. Quick Presets shows ready-made segment definitions for future audience actions.

## Data and State Architecture
- Query key: `['superadmin', 'segments', 'overview']`.
- Server state: TanStack Query.
- UI state: local only.
- Fixture/handler ownership stays inside `segments_mocks/`.

## API Contract
| Function | Method | Endpoint | Request | Response `data` |
|---|---|---|---|---|
| `fetchSegmentsData()` | GET | `/api/superadmin/segments` | None | `SuperadminSegmentsResponse` |

## UI Data Requirements
| UI Element | Required Field(s) | Response Path | Nullable? |
|---|---|---|---|
| Segment ID | `id` | `data.segments[].id` | No |
| Segment name | `name` | `data.segments[].name` | No |
| Segment description | `description` | `data.segments[].description` | Yes |
| Rule count | `rules` | `data.segments[].rules` | No |
| Gym count | `tenantCount` | `data.segments[].tenantCount` | No |
| Last updated | `updatedAt` | `data.segments[].updatedAt` | Yes |
| Used in | `usedIn` | `data.segments[].usedIn` | No |
| Preset name | `name` | `data.presets[].name` | No |
| Preset rule | `rule` | `data.presets[].rule` | No |

## Permissions and Security
- Required role: `SUPERADMIN`.
- Tenant records are not stored in the module as fake business data.
- Any future segment mutation must use the module API contract and audited permissions.
- No cross-role business imports.

## Loading, Empty, and Error States
- `loading.tsx` uses the page-shaped skeleton.
- `error.tsx` provides retryable branded feedback.
- Nullable description and update date use the canonical en dash fallback.

## Edge Cases and AI Warnings
- **Do not store tenant records in segment fixtures:** only audience metadata belongs here.
- **Nullable description:** some saved groups may not have a description.
- **Nullable update date:** an older or imported segment can have no recorded update date.
- **Counts are server data:** never replace a missing count with a component-level fake number.
- **Status/color logic must stay centralized:** do not create inline status palettes in this module.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `SuperadminSegmentsClient.tsx` | Orchestrates query loading/error/success. |
| `SuperadminSegmentsPageHeader.tsx` | Renders title and the page action area. |
| `SuperadminSegmentsSummaryCards.tsx` | Renders segment totals. |
| `SuperadminSegmentsSavedGroupsPanel.tsx` | Renders saved segment cards and metadata. |
| `SuperadminSegmentsQuickPresetsPanel.tsx` | Renders preset segment definitions. |

## External Infrastructure Dependencies
- `@/lib/api`
- `@/lib/formatters`
- `@tanstack/react-query`
- `msw`
- Superadmin shared UI primitives.

## Final Component Additions
- `SuperadminSegmentsSavedGroupsEmptyState.tsx` — renders the saved-group empty state.
- `SuperadminSegmentsQuickPresetsEmptyState.tsx` — renders the quick-preset empty state.

The saved-group summary safely reports zero for an empty dataset instead of using an invalid maximum value.
