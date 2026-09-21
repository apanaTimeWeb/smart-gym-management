# system-ops Backend Feature Map

## Module Purpose
The System Ops container groups Superadmin operational business features. Backups, infrastructure, jobs, and migrations are independent feature units nested under this container, while the container itself owns only the landing summary contract. It must not absorb child feature business logic.

## Directory Structure
| File | Responsibility |
|---|---|
| `backups/backup-schedule-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backup-schedule-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/backups.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/dtos/backups-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/dtos/backups-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/dtos/backups-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/responses/backups-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-download.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-health.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-restore.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-schedule.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-status.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-trigger.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/services/backups-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/types/backups.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `backups/types/backups.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/dtos/infrastructure-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/dtos/infrastructure-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/dtos/infrastructure-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/infrastructure.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/responses/infrastructure-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-api-health.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-flush-global.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-flush-tenant.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-redis.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-status.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-tenants.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/services/infrastructure-uptime.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/types/infrastructure.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `infrastructure/types/infrastructure.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/dtos/jobs-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/dtos/jobs-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/dtos/jobs-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/jobs.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/responses/jobs-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-bulk-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-bulk-retry.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-cancel.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-clear-completed.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-queue-health.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-retry-all.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-retry.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-status.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/services/jobs-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/types/jobs.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `jobs/types/jobs.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/dtos/migrations-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/dtos/migrations-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/dtos/migrations-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/migrations.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/responses/migrations-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-status.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-trigger.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/services/migrations-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/types/migrations.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `migrations/types/migrations.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/system-ops-summary.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `system-ops-container.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `system-ops-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `system-ops.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `system-ops.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `system-ops.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `system-ops.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `types/system-ops.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `types/system-ops.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `backups-command.controller.ts` | POST | `/superadmin/system-ops/backups` | Implements the `POST /superadmin/system-ops/backups` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-command.controller.ts` | PATCH | `/superadmin/system-ops/backups:id` | Implements the `PATCH /superadmin/system-ops/backups:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-command.controller.ts` | DELETE | `/superadmin/system-ops/backups:id` | Implements the `DELETE /superadmin/system-ops/backups:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-command.controller.ts` | PATCH | `/superadmin/system-ops/backups:id/status` | Implements the `PATCH /superadmin/system-ops/backups:id/status` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-query.controller.ts` | GET | `/superadmin/system-ops/backups` | Implements the `GET /superadmin/system-ops/backups` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-query.controller.ts` | GET | `/superadmin/system-ops/backups:id` | Implements the `GET /superadmin/system-ops/backups:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-special.controller.ts` | GET | `superadmin/system-ops/backups/health` | Implements the `GET superadmin/system-ops/backups/health` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-special.controller.ts` | POST | `superadmin/system-ops/backups/schedule` | Implements the `POST superadmin/system-ops/backups/schedule` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-special.controller.ts` | POST | `superadmin/system-ops/backups/trigger` | Implements the `POST superadmin/system-ops/backups/trigger` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-special.controller.ts` | GET | `superadmin/system-ops/backups/:id/download` | Implements the `GET superadmin/system-ops/backups/:id/download` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `backups-special.controller.ts` | POST | `superadmin/system-ops/backups/:id/restore` | Implements the `POST superadmin/system-ops/backups/:id/restore` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-command.controller.ts` | POST | `/superadmin/system-ops/infrastructure` | Implements the `POST /superadmin/system-ops/infrastructure` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-command.controller.ts` | PATCH | `/superadmin/system-ops/infrastructure:id` | Implements the `PATCH /superadmin/system-ops/infrastructure:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-command.controller.ts` | DELETE | `/superadmin/system-ops/infrastructure:id` | Implements the `DELETE /superadmin/system-ops/infrastructure:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-command.controller.ts` | PATCH | `/superadmin/system-ops/infrastructure:id/status` | Implements the `PATCH /superadmin/system-ops/infrastructure:id/status` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-query.controller.ts` | GET | `/superadmin/system-ops/infrastructure` | Implements the `GET /superadmin/system-ops/infrastructure` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-query.controller.ts` | GET | `/superadmin/system-ops/infrastructure:id` | Implements the `GET /superadmin/system-ops/infrastructure:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-special.controller.ts` | GET | `superadmin/system-ops/infrastructure/redis` | Implements the `GET superadmin/system-ops/infrastructure/redis` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-special.controller.ts` | GET | `superadmin/system-ops/infrastructure/uptime` | Implements the `GET superadmin/system-ops/infrastructure/uptime` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-special.controller.ts` | POST | `superadmin/system-ops/infrastructure/redis/flush-global` | Implements the `POST superadmin/system-ops/infrastructure/redis/flush-global` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-special.controller.ts` | POST | `superadmin/system-ops/infrastructure/redis/flush-tenant` | Implements the `POST superadmin/system-ops/infrastructure/redis/flush-tenant` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-special.controller.ts` | GET | `superadmin/system-ops/infrastructure/api-health` | Implements the `GET superadmin/system-ops/infrastructure/api-health` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `infrastructure-special.controller.ts` | GET | `gyms` | Implements the `GET gyms` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-command.controller.ts` | POST | `/superadmin/system-ops/jobs` | Implements the `POST /superadmin/system-ops/jobs` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-command.controller.ts` | PATCH | `/superadmin/system-ops/jobs:id` | Implements the `PATCH /superadmin/system-ops/jobs:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-command.controller.ts` | DELETE | `/superadmin/system-ops/jobs:id` | Implements the `DELETE /superadmin/system-ops/jobs:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-command.controller.ts` | PATCH | `/superadmin/system-ops/jobs:id/status` | Implements the `PATCH /superadmin/system-ops/jobs:id/status` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-query.controller.ts` | GET | `/superadmin/system-ops/jobs` | Implements the `GET /superadmin/system-ops/jobs` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-query.controller.ts` | GET | `/superadmin/system-ops/jobs:id` | Implements the `GET /superadmin/system-ops/jobs:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | GET | `superadmin/system-ops/jobs/queue-health` | Implements the `GET superadmin/system-ops/jobs/queue-health` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/retry-all` | Implements the `POST superadmin/system-ops/jobs/retry-all` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/:id/retry` | Implements the `POST superadmin/system-ops/jobs/:id/retry` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/:id/cancel` | Implements the `POST superadmin/system-ops/jobs/:id/cancel` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/clear-completed` | Implements the `POST superadmin/system-ops/jobs/clear-completed` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/bulk-retry` | Implements the `POST superadmin/system-ops/jobs/bulk-retry` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `jobs-special.controller.ts` | POST | `superadmin/system-ops/jobs/bulk-delete` | Implements the `POST superadmin/system-ops/jobs/bulk-delete` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-command.controller.ts` | POST | `/superadmin/system-ops/migrations` | Implements the `POST /superadmin/system-ops/migrations` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-command.controller.ts` | PATCH | `/superadmin/system-ops/migrations:id` | Implements the `PATCH /superadmin/system-ops/migrations:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-command.controller.ts` | DELETE | `/superadmin/system-ops/migrations:id` | Implements the `DELETE /superadmin/system-ops/migrations:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-command.controller.ts` | PATCH | `/superadmin/system-ops/migrations:id/status` | Implements the `PATCH /superadmin/system-ops/migrations:id/status` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-query.controller.ts` | GET | `/superadmin/system-ops/migrations` | Implements the `GET /superadmin/system-ops/migrations` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-query.controller.ts` | GET | `/superadmin/system-ops/migrations:id` | Implements the `GET /superadmin/system-ops/migrations:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `migrations-special.controller.ts` | POST | `superadmin/system-ops/migrations/trigger` | Implements the `POST superadmin/system-ops/migrations/trigger` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `system-ops-special.controller.ts` | GET | `superadmin/system-ops/summary` | Implements the `GET superadmin/system-ops/summary` contract for this feature. | DTO validated at controller boundary | Feature response contract |
## Approved External Dependencies
- **Business Feature Dependencies**: None by direct import. Cross-feature runtime coupling must use registered events.
- **Infrastructure Dependencies**: Core configuration, authentication/authorization, PostgreSQL/TypeORM, Redis where applicable, canonical response/error infrastructure.
- **Runtime/Event Dependencies**: Only events explicitly listed in this feature's dependency document.

## Data and State Architecture
- DB Entities: Listed directly by the feature module and TypeORM registration.
- Redis Caching Keys: Feature-specific keys only; no global business cache helper.
- Event Emitters: Only centralized registry names.
- Background Jobs: Only named queue work documented by this feature.
- Idempotency Keys: Required for applicable resource/financial/communication mutations.

## Business Flow / Key Sequences
For each mutation, the controller validates the request, the use-case service applies business rules, the repository owns PostgreSQL mutation/query details, and the mapper/response DTO exposes only contract-approved fields. Heavy work is queued rather than performed in the HTTP request.

## File Responsibility Map
Every file has one responsibility. Controllers own HTTP wiring only; DTOs own edge validation; services own use-case decisions; repositories own ORM access; mappers own domain/response translation; adapters own external APIs.

## Permissions and Security
All Superadmin endpoints require the Superadmin role at the controller boundary. Resource-specific operations must additionally verify the requested resource belongs to the authorized scope before performing mutations.

## Edge Cases / AI Warnings
- Cross-feature direct business imports violate the feature write boundary and can introduce hidden coupling — see Rules 0B/0C and Rule 49.
- DTO acceptance does not prove behavior; every accepted field must reach the intended use case and persistence/query path — see Rule 82A.
- Soft-deleted records must never silently reappear in standard reads — see Rule 29.
- User-controlled sorting/filtering must resolve only through allowlists — see Rule 92.

## Frozen API Contract

<!-- Exact source: frontend system-ops/superadmin_system_ops_features.md -->

# Superadmin System Ops — Feature Map

## Module Purpose
The System Ops container groups Superadmin operational business features. Backups, infrastructure, jobs, and migrations are independent feature units nested under this container, while the container itself owns only the landing summary contract. It must not absorb child feature business logic.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `system-ops_components/` | Renders the route UI, skeleton, and interactive links to operational detail modules. | `SuperadminSystemOpsDashboardClient.tsx`, `SuperadminSystemOpsDashboardSkeleton.tsx` |
| `system-ops_api/` | Performs the System Ops summary request through the global API transport. | `SuperadminSystemOpsApi.ts` |
| `system-ops_types/` | Runtime-validated summary schema and inferred types. | `SuperadminSystemOpsTypes.ts` |
| `system-ops_constants/` and `system-ops_utils/` | TanStack Query hook and presentation-only card definitions. | `SuperadminSystemOpsDashboardConstants.ts`, `useSuperadminSystemOpsSummary.ts` |
| `system-ops_mocks/fixtures/` | Holds realistic server data for the summary. | `SuperadminSystemOpsMockFixtures.ts` |
| `system-ops_mocks/handlers/` | Provides MSW response behavior and resettable state. | `SuperadminSystemOpsMockHandlers.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global API transport only.
- `@/lib/formatters` — global formatting infrastructure only.
- `@/app/superadmin/system-ops/*_url_config.ts` — owning detail-module navigation contracts only.
### Business Feature Dependencies
- None.
### Role-Level Business Dependencies
- None.

## Feature Inventory
| Feature | Route | What the User Can Do | API | Status |
|---|---|---|---|---|
| System Ops Summary | `/superadmin/system-ops` | Review summary state and open Infrastructure, Jobs, Backups, or Migrations | `GET /api/superadmin/system-ops/summary` | Implemented with MSW |

## Rule Compliance Checklist
- [x] No fake operational status literals remain in the component.
- [x] Server state uses TanStack Query.
- [x] API boundary validates response data with Zod.
- [x] Module-owned MSW fixture/handler exists.
- [x] Route loading and error boundaries exist.
- [x] No sibling business imports.

## User Flows & Interactions
### Flow 1: Review System Status
1. User opens `/superadmin/system-ops`.
2. `SuperadminSystemOpsDashboardClient` loads the TanStack Query summary.
3. Loading renders the route skeleton; success renders API-provided operational cards.
4. User selects Infrastructure, Jobs, Backups, or Migrations.
5. Navigation uses the corresponding module URL contract.

### Flow 2: Recover From Summary Failure
1. Summary request fails.
2. `error.tsx` presents module-specific recovery UI.
3. User activates Retry.
4. The route retries the query and either renders fresh summary data or presents the failure state again.

## Edge Cases and AI Warnings
1. Never hardcode operational health values in JSX; all operational status values must come from the module API/mock contract.
2. Do not import infrastructure/jobs/backups business logic into the summary module; link to the owning feature routes instead.
3. A failed detail feature is a downstream dependency issue; do not redesign that module while repairing the summary page.
4. Keep query keys stable and namespaced; do not move server summary data into Zustand or Context.
5. Retry must actually rerun the failed request and restore the summary UI when the mock/backend succeeds.
6. Do not expose raw backend stack traces, request payloads, tokens, or internal error objects in the summary UI.

## Data and State Architecture

- **Actual feature root:** `system-ops`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `system-ops_utils/useSuperadminSystemOpsSummary.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureUptime.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureData.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureTenants.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureV1.ts`, `infrastructure/infrastructure_utils/useSuperadminInfrastructureActions.ts`, `jobs/jobs_utils/useSuperadminJobsSelection.ts`, `jobs/jobs_utils/useSuperadminJobsPage.ts`, `jobs/jobs_utils/useSuperadminJobsMutations.ts`, `jobs/jobs_utils/useSuperadminJobsV1.ts`, `backups/backups_utils/useSuperadminBackupsSchedule.ts`, `backups/backups_utils/useSuperadminBackupsActions.ts`, `backups/backups_utils/useSuperadminBackupsData.ts`, `backups/backups_utils/useSuperadminBackupsV1.ts`, `migrations/migrations_utils/useSuperadminMigrationsPage.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'infrastructure', 'uptime-history']`, `['superadmin', 'infrastructure', 'nodes', normalizedParams]`, `['superadmin', 'infrastructure', 'redis']`, `['superadmin', 'infrastructure', 'tenants']`, `['superadmin', 'infrastructure_api_health']`, `['superadmin', 'infrastructure']`, `['superadmin', 'jobs', queryParams]`, `['superadmin', 'jobs']`, `['superadmin', 'jobs_queue_health']`, `['superadmin', 'backups']`, `['superadmin', 'backups', params]`, `['superadmin', 'backups_health']`

## API Contract

- **API files:** `system-ops_api/SuperadminSystemOpsApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`, `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`, `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`, `jobs/jobs_api/SuperadminJobsApi.ts`, `backups/backups_api/SuperadminBackupsHealthApi.ts`, `backups/backups_api/SuperadminBackupsApi.ts`, `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Detected API symbols:** `fetchSuperadminSystemOpsSummary` — `system-ops_api/SuperadminSystemOpsApi.ts`; `fetchInfrastructureNodes` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchRedisTelemetry` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchUptimeHistory` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushGlobalCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `flushTenantCache` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchTenants` — `infrastructure/infrastructure_api/SuperadminInfrastructureApi.ts`; `fetchInfrastructureApiHealth` — `infrastructure/infrastructure_api/SuperadminInfrastructureApiHealthApi.ts`; `fetchJobsQueueHealth` — `jobs/jobs_api/SuperadminJobsQueueHealthApi.ts`; `fetchJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryAllJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `retryJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `cancelJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `deleteJob` — `jobs/jobs_api/SuperadminJobsApi.ts`; `clearCompletedJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkRetryJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `bulkDeleteJobs` — `jobs/jobs_api/SuperadminJobsApi.ts`; `fetchBackupsHealth` — `backups/backups_api/SuperadminBackupsHealthApi.ts`; `fetchBackups` — `backups/backups_api/SuperadminBackupsApi.ts`; `createBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `restoreBackupSnapshot` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupDownloadUrl` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `updateBackupSchedule` — `backups/backups_api/SuperadminBackupsApi.ts`; `fetchMigrations` — `migrations/migrations_api/SuperadminMigrationsApi.ts`; `startMigration` — `migrations/migrations_api/SuperadminMigrationsApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `migrations/page.tsx`, `backups/page.tsx`, `jobs/page.tsx`, `infrastructure/page.tsx`, `system-ops_components/SuperadminSystemOpsDashboardClient.tsx`, `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx`, `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx`, `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx`, `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx`, `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx`, `jobs/jobs_components/SuperadminJobsView.tsx`, `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx`, `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx`, `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx`, `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx`, `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx`, `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsTriggerModal.tsx`, `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx`, `backups/backups_components/SuperadminBackupsTable.tsx`, `backups/backups_components/SuperadminBackupsScheduleModal.tsx`, `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx`, `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx`, `backups/backups_components/SuperadminBackupsClient.tsx`, `backups/backups_components/SuperadminBackupsRestoreModal.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 1

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`, `migrations/loading.tsx`, `backups/loading.tsx`, `jobs/loading.tsx`, `infrastructure/loading.tsx`
- **`error.tsx`:** `error.tsx`, `migrations/error.tsx`, `backups/error.tsx`, `jobs/error.tsx`, `infrastructure/error.tsx`
- **Empty-state components:** `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx`, `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx`, `migrations/migrations_components/SuperadminMigrationsEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Framework route artifact for system-ops. |
| `migrations/page.tsx` | Server component entry point for the Superadmin Migrations module. |
| `backups/page.tsx` | Pure Server Component for the backups page. Renders the interactive client component. |
| `jobs/page.tsx` | page.tsx acts as a Server Component entry point. |
| `infrastructure/page.tsx` | Pure Server Component for the infrastructure page. Renders the interactive client component. |
| `system-ops_components/SuperadminSystemOpsDashboardClient.tsx` | Renders System Ops summary cards from TanStack Query server data and links to the owning detail features. No API calls. |
| `system-ops_components/SuperadminSystemOpsDashboardSkeleton.tsx` | Renders the route-level structural skeleton for the System Operations dashboard. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1RecentIncidentsPanel.tsx` | Renders the Superadmin infrastructure V1 Recent incidents view. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1EndpointHealthTable.tsx` | Renders the Superadmin infrastructure V1 Service endpoint health view. |
| `infrastructure/infrastructure_components/SuperadminFlushTenantModal.tsx` | Renders the infrastructure tenant-selection dialog and owns its confirmed cache-flush mutation lifecycle. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureClient.tsx` | Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query. |
| `infrastructure/infrastructure_components/SuperadminInfrastructureV1ServiceHealthSummaryCards.tsx` | Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards. |
| `infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart.tsx` | Renders the historical uptime chart from Infrastructure API data; no generated business values are created in the component. |
| `jobs/jobs_components/SuperadminJobsV1QueueSummaryCards.tsx` | Renders the Superadmin jobs V1 JobsQueueSummary summary cards. |
| `jobs/jobs_components/SuperadminJobsV1QueueHealthTable.tsx` | Renders the Superadmin jobs V1 Queue health view. |
| `jobs/jobs_components/SuperadminJobsView.tsx` | SuperadminJobsView.tsx — orchestrator for the Background Jobs page. |
| `jobs/jobs_components/SuperadminJobsV1RecentFailuresPanel.tsx` | Renders the Superadmin jobs V1 Recent job failures view. |
| `jobs/jobs_components/SuperadminJobsStatsBar/SuperadminJobsStatsBar.tsx` | Renders the 4 KPI metric cards at the top of the Jobs page. |
| `jobs/jobs_components/SuperadminJobsTable/SuperadminJobsTable.tsx` | Renders the jobs data table — rows, status badges, action buttons, and inspect modal trigger. |
| `jobs/jobs_components/SuperadminJobsHeader/SuperadminJobsHeader.tsx` | Renders the page title, filter toolbar, and bulk action buttons for the Jobs page. |
| `jobs/jobs_components/SuperadminJobInspectModal/SuperadminJobInspectModal.tsx` | Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload. |
| `jobs/jobs_components/SuperadminJobsEmptyState/SuperadminJobsEmptyState.tsx` | Renders the empty state for the jobs table. |
| `backups/backups_components/SuperadminBackupsTriggerModal.tsx` | Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook. |
| `backups/backups_components/SuperadminBackupsV1GymHealthTable.tsx` | Renders the Superadmin backups V1 Backup health by gym view. |
| `backups/backups_components/SuperadminBackupsTable.tsx` | Renders the Backups Table component and its associated UI logic. |
| `backups/backups_components/SuperadminBackupsScheduleModal.tsx` | View-only modal for editing the Superadmin backup schedule. Server state and mutation lifecycle are owned by useSuperadminBackupsSchedule. |
| `backups/backups_components/SuperadminBackupsV1HealthSummaryCards.tsx` | Renders the Superadmin backups V1 BackupsHealthSummary summary cards. |
| `backups/backups_components/SuperadminBackupsV1RestoreTestHistoryPanel.tsx` | Renders the Superadmin backups V1 Restore test history view. |
| `backups/backups_components/SuperadminBackupsClient.tsx` | SuperadminBackupsClient.tsx renders the Database Backups page. Purely a view layer — backup data is fetched via useSuperadminBackupsData and rendered from query state. |
| `backups/backups_components/SuperadminBackupsRestoreModal.tsx` | Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook. |
| `backups/backups_components/SuperadminBackupsEmptyState/SuperadminBackupsEmptyState.tsx` | Renders the empty state UI for the Backups table when no backups exist. |
| `migrations/migrations_components/SuperadminMigrationStatusBadge.tsx` | Renders one semantic migration status badge with its status-specific icon. |
| `migrations/migrations_components/SuperadminMigrationsEmptyState.tsx` | Renders the empty state for the Superadmin migration history table. |
| `migrations/migrations_components/SuperadminMigrationsClient.tsx` | Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.

## Rule Compliance Checklist


- [ ] Rule 7: TypeORM is the sole approved ORM.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is global and automatic.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency for applicable critical mutations.
- [ ] Rule 34: N+1/index review for required relations and filters.
- [ ] Rule 36: Fail-fast null/constraint checks.
- [ ] Rule 41: Concurrency protection where state is contested.
- [ ] Rule 48: Query/command controller separation.
- [ ] Rule 62: Explicit return types.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc.
- [ ] Rule 82A: Complete frontend UI data contract.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 86/87: Intention-revealing names and small single-responsibility methods.
- [ ] Rule 89: ORM entities stay behind repositories.
- [ ] Rule 92: Query allowlists.

