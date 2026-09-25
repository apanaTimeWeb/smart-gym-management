# features Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_modules/features feature. It exposes 12 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `features_dtos/superadmin-features-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features_dtos/superadmin-features-query.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features_dtos/superadmin-features-release-note-create.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features_dtos/superadmin-features-release-note-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features_dtos/superadmin-features-update.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features_responses/superadmin-features-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `features_services/superadmin-features-create.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-delete.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-find.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-list.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-main.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-release-note.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-rollout-insights.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-toggle.service.spec.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `features_services/superadmin-features-toggle.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_services/superadmin-features-update.service.ts` | Owns one business/use-case flow; MUST NOT expose HTTP concerns or ORM-specific entities outside the repository boundary. |
| `features_types/superadmin-features.enums.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `features_types/superadmin-features.interfaces.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-features-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-features-contract-snapshot.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-features-contract-snapshot.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-features-feature-flag.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-features-history-entry.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-features-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-features-release-note-command.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-features-release-note.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-features-release-note.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-features-release-note.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-features-response-data.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-features-rollout-insights-query.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-features-rollout-insights-response.dto.ts` | Validates and documents the transport shape; MUST NOT persist data or contain business workflows. |
| `superadmin-features.constants.ts` | Owns module constants/types; MUST remain free of side-effectful business workflows. |
| `superadmin-features.entity.ts` | Maps persistence state to the approved ORM model; MUST NOT be returned directly as an API contract. |
| `superadmin-features.exceptions.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |
| `superadmin-features.mapper.ts` | Transforms persistence/domain data into contract DTOs; MUST NOT execute database queries. |
| `superadmin-features.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |
| `superadmin-features.repository.ts` | Owns database queries/mutations for this feature; MUST NOT contain controller or UI logic. |
| `superadmin-features.seeder.ts` | Owns the narrowly scoped responsibility implied by its filename; MUST remain within the feature boundary. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-features-command.controller.ts::createFlag` | POST | `flags` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the createFlag operation. | `SuperadminFeaturesCreateDto` | `SuperadminFeaturesResponseDto` |
| `superadmin-features-command.controller.ts::updateFlag` | PATCH | `flags/:id` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the updateFlag operation. | `SuperadminFeaturesUpdateDto` | `SuperadminFeaturesResponseDto` |
| `superadmin-features-command.controller.ts::toggleFlag` | POST | `flags/:id/toggle` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the toggleFlag operation. | `—` | `SuperadminFeaturesResponseDto` |
| `superadmin-features-command.controller.ts::deleteFlag` | DELETE | `flags/:id` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the deleteFlag operation. | `—` | `void` |
| `superadmin-features-query.controller.ts::history` | GET | `flags/:id/history` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the history operation. | `—` | `[SuperadminFeaturesHistoryEntryDto]` |
| `superadmin-features-query.controller.ts::findOne` | GET | `:id` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the findOne operation. | `—` | `SuperadminFeaturesResponseDto` |
| `superadmin-features-release-note-command.controller.ts::createReleaseNote` | POST | `superadmin/features/notes` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the createReleaseNote operation. | `SuperadminFeaturesReleaseNoteCreateDto` | `SuperadminFeaturesReleaseNoteDto` |
| `superadmin-features-release-note-command.controller.ts::updateReleaseNote` | PATCH | `superadmin/features/notes/:id` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the updateReleaseNote operation. | `SuperadminFeaturesReleaseNoteUpdateDto` | `SuperadminFeaturesReleaseNoteDto` |
| `superadmin-features-release-note-command.controller.ts::deleteReleaseNote` | DELETE | `superadmin/features/notes/:id` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the deleteReleaseNote operation. | `—` | `null` |
| `superadmin-features-rollout-insights-query.controller.ts::findFeaturesRolloutInsights` | GET | `superadmin/features/rollout-insights` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the findFeaturesRolloutInsights operation. | `—` | `SuperadminFeaturesRolloutInsightsResponseDto` |
| `superadmin-features-rollout-insights-query.controller.ts::findFeaturesRolloutInsights` | GET | `api/superadmin/features/rollout-insights` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the findFeaturesRolloutInsights operation. | `—` | `SuperadminFeaturesRolloutInsightsResponseDto` |
| `superadmin-features-rollout-insights-query.controller.ts::findFeaturesData` | GET | `superadmin/features` | This endpoint validates transport input, invokes the owning features use case, and returns the declared contract for the findFeaturesData operation. | `—` | `SuperadminFeaturesResponseDataDto` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_database, superadmin_core_pagination
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: superadmin-features-contract-snapshot.entity → `superadmin_features_contract_snapshots`, superadmin-features-release-note.entity → `superadmin_feature_release_notes`, superadmin-features.entity → `superadmin_feature_flags`
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: `/superadmin/features/flags`, `/superadmin/features/flags/:id`, `/superadmin/features/flags/:id/toggle`, `/superadmin/features/notes`, `/superadmin/features/notes/:id`

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `POST /superadmin/features/flags` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/features/flags/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/features/flags/:id/toggle` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/features/flags/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features/flags/:id/history` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `POST /superadmin/features/notes` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `PATCH /superadmin/features/notes/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `DELETE /superadmin/features/notes/:id` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features/rollout-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /api/superadmin/features/rollout-insights` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /superadmin/features` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

This section is a source snapshot derived from the supplied frontend feature documentation. It is not inferred from backend implementation and must be re-reviewed when the frontend contract changes.

### Request Shape / API Operations

#### Source: `features/superadmin_features_features.md`

- **API files:** `features_api/SuperadminFeaturesRolloutInsightsApi.ts`, `features_api/SuperadminFeaturesApi.ts`
- **Detected API symbols:** `fetchFeatureRolloutInsights` — `features_api/SuperadminFeaturesRolloutInsightsApi.ts`; `fetchTenants` — `features_api/SuperadminFeaturesApi.ts`; `fetchFeatures` — `features_api/SuperadminFeaturesApi.ts`; `fetchFeatureFlagHistory` — `features_api/SuperadminFeaturesApi.ts`; `createFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `updateFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `activateFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `suspendFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `deleteFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `createReleaseNote` — `features_api/SuperadminFeaturesApi.ts`; `updateReleaseNote` — `features_api/SuperadminFeaturesApi.ts`; `deleteReleaseNote` — `features_api/SuperadminFeaturesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

#### Source: `features/superadmin_features_rollout_insights_features.md`

- **API files:** `features_api/SuperadminFeaturesRolloutInsightsApi.ts`, `features_api/SuperadminFeaturesApi.ts`
- **Detected API symbols:** `fetchFeatureRolloutInsights` — `features_api/SuperadminFeaturesRolloutInsightsApi.ts`; `fetchTenants` — `features_api/SuperadminFeaturesApi.ts`; `fetchFeatures` — `features_api/SuperadminFeaturesApi.ts`; `fetchFeatureFlagHistory` — `features_api/SuperadminFeaturesApi.ts`; `createFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `updateFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `activateFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `suspendFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `deleteFeatureFlag` — `features_api/SuperadminFeaturesApi.ts`; `createReleaseNote` — `features_api/SuperadminFeaturesApi.ts`; `updateReleaseNote` — `features_api/SuperadminFeaturesApi.ts`; `deleteReleaseNote` — `features_api/SuperadminFeaturesApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

### UI-Required Data Evidence

#### Source: `features/superadmin_features_features.md`

- **Data-bearing components:** `page.tsx`, `features_components/SuperadminFeaturesTierMatrix.tsx`, `features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx`, `features_components/SuperadminFeaturesV1RolloutControlPanel.tsx`, `features_components/SuperadminFeatureRolloutModal.tsx`, `features_components/SuperadminFeaturesClient.tsx`, `features_components/SuperadminFeatureHistoryModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

#### Source: `features/superadmin_features_rollout_insights_features.md`

- **Data-bearing components:** `page.tsx`, `features_components/SuperadminFeaturesTierMatrix.tsx`, `features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx`, `features_components/SuperadminFeaturesV1RolloutControlPanel.tsx`, `features_components/SuperadminFeatureRolloutModal.tsx`, `features_components/SuperadminFeaturesClient.tsx`, `features_components/SuperadminFeatureHistoryModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

### Static Freeze Status

- Frontend source/API contract evidence has been copied into this backend-local document.
- Runtime contract verification remains `NOT VERIFIED` where the host application is unavailable.
- The frontend is read-only for this repair; backend changes must conform to the supplied frontend contract unless a documented source conflict exists.


### Response Shape
| Endpoint | Response DTO / shape | Requirement |
|---|---|---|
| ``/api/gyms`` | ``ApiResponse<SuperadminFeaturesTenant[]>`` | `REQ-022` / ``fetchTenants`` |
| ``/superadmin/features`` | ``ApiResponse<{` | `REQ-023` / ``fetchFeatures`` |
| ``{superadmin}/flags/{id}/history`` | ``ApiResponse<SuperadminFeatureHistoryEntry[]>`` | `REQ-024` / ``fetchFeatureFlagHistory`` |
| ``{superadmin}/flags`` | ``ApiResponse<FeatureFlag>`` | `REQ-025` / ``createFeatureFlag`` |
| ``{superadmin}/flags/{id}`` | ``ApiResponse<FeatureFlag>`` | `REQ-026` / ``updateFeatureFlag`` |
| ``{superadmin}/flags/{id}/toggle`` | ``ApiResponse<FeatureFlag>`` | `REQ-027` / ``activateFeatureFlag`` |
| ``{superadmin}/flags/{id}/toggle`` | ``ApiResponse<FeatureFlag>`` | `REQ-028` / ``suspendFeatureFlag`` |
| ``{superadmin}/flags/{id}`` | ``ApiResponse<void>`` | `REQ-029` / ``deleteFeatureFlag`` |
| ``{superadmin}/notes`` | ``ApiResponse<ReleaseNote>`` | `REQ-030` / ``createReleaseNote`` |
| ``{superadmin}/notes/{id}`` | ``ApiResponse<ReleaseNote>`` | `REQ-031` / ``updateReleaseNote`` |
| ``{superadmin}/notes/{id}`` | ``ApiResponse<void>`` | `REQ-032` / ``deleteReleaseNote`` |
| ``/api/superadmin/features/rollout-insights`` | ``ApiResponse<SuperadminFeaturesV1Data>`` | `REQ-033` / ``fetchFeatureRolloutInsights`` |

### UI-Required Fields
The following evidence is copied from the supplied frontend feature documentation and is treated as read-only contract evidence:

- **Data-bearing components:** `page.tsx`, `features_components/SuperadminFeaturesTierMatrix.tsx`, `features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx`, `features_components/SuperadminFeaturesV1RolloutControlPanel.tsx`, `features_components/SuperadminFeatureRolloutModal.tsx`, `features_components/SuperadminFeaturesClient.tsx`, `features_components/SuperadminFeatureHistoryModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

- **Data-bearing components:** `page.tsx`, `features_components/SuperadminFeaturesTierMatrix.tsx`, `features_components/SuperadminFeaturesV1ReleaseAndRollbackSection.tsx`, `features_components/SuperadminFeaturesV1RolloutControlPanel.tsx`, `features_components/SuperadminFeatureRolloutModal.tsx`, `features_components/SuperadminFeaturesClient.tsx`, `features_components/SuperadminFeatureHistoryModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.


### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [x] Rule 7: TypeORM is the only approved ORM in this backend.
- [x] Rule 19: This feature document contains concrete endpoints, state, flows, permissions, edge cases, and contract evidence.
- [x] Rule 28: Successful responses are wrapped by the global response interceptor.
- [x] Rule 29: Delete paths use soft-delete semantics.
- [x] Rule 31: Frontend-exposed critical mutations use `RequireIdempotencyKey`.
- [x] Rule 48: Query and command controllers are physically separated where CRUD endpoints exist.
- [x] Rule 62: Service/repository return types are explicit.
- [x] Rule 76/79: Responsibility/Flow headers exist on authored source files.
- [x] Rule 82A: V1 response classes preserve the complete frontend contract.
- [x] Rule 83: RBAC is enforced at the controller boundary.
- [x] Rule 89: ORM access stays behind repositories.
- [x] Rule 92: Dynamic filtering/sorting uses server-defined allowlists.
- [x] Rule 101: Tests must assert observable behavior; placeholder tests are not accepted.

