# Enterprise-Grade, AI-Friendly Backend Architecture Guidelines

## The Core Philosophy
This document outlines the strict architectural rules for building the backend using the approved project framework, primarily **NestJS (TypeScript)** or **Django (Python)**, while preserving the same isolation and architectural principles. The primary goal is **Extreme Isolation**.

Currently, human developers act as orchestrators, while AI (LLMs) writes the code. Because of this, the architecture must be designed to accommodate the AI's constraints (context limits, hallucination risks) and strengths (laser-focused problem solving).

Tomorrow, if you ask an AI to fix a specific bug in "Payment Processing", the primary AI context MUST be restricted to the owning feature module. The preferred code repair is a single file, but multi-file repairs within the feature's dependency graph are allowed when genuinely required. The default writable scope is the owning feature module only.

**Minimum-Context Principle:** Prefer the smallest coherent change set. Single-file repair is the goal when the dependency graph permits it. Multi-file changes are **allowed — and expected** when required by architectural contracts such as transactions (Orchestrator → services → repositories), API contract updates, co-located tests, or shared infrastructure extensions. The AI MUST NOT expand context beyond the minimum required set. If a bug fix genuinely requires touching an Orchestrator, a micro-service, and a repository together, that is correct — not a sign of bad architecture. If it requires touching 10 unrelated files, the architecture is too coupled.

## PROJECT STACK BASELINE — NORMATIVE PROJECT DECISION

This project uses a fixed production stack. AI agents MUST NOT invent, substitute, or introduce alternative infrastructure when implementing or repairing backend code.

### NestJS / TypeScript

- Framework: NestJS
- Language: TypeScript
- ORM: TypeORM
- Database: PostgreSQL
- Cache / distributed state: Redis
- Background job queue: BullMQ backed by Redis
- Durable domain-event transport: Redis Streams
- Real-time horizontal fan-out: Redis Pub/Sub
- Authentication: JWT
- Migration tool: TypeORM migrations
- TypeScript path alias: `@/` → `src/`
- API documentation: OpenAPI / Swagger
- Unit testing: Jest
- API E2E testing: Python pytest
- UI E2E testing: Python Selenium

### Django / Python

When the backend framework is Django:

- Framework: Django
- Language: Python
- ORM: Django ORM
- Database: PostgreSQL
- Cache / distributed state: Redis
- Background task queue: Celery backed by Redis
- Durable domain-event transport: Redis Streams
- Real-time horizontal fan-out: Redis Pub/Sub
- Authentication: JWT
- Migration tool: Django migrations
- API documentation: the Django framework mapping defined by this document

### Fixed Infrastructure Policy

The following are NOT approved alternatives for this project:

- Prisma
- MySQL
- Memcached
- RabbitMQ
- Kafka
- a second ORM
- a second primary cache/message-broker system

Redis responsibilities MUST remain separated:

- Redis cache → caching
- BullMQ + Redis → NestJS background jobs
- Celery + Redis → Django background jobs
- Redis Streams → durable domain events
- Redis Pub/Sub → real-time horizontal fan-out
- Redis distributed locks → distributed locking where explicitly required

Redis Pub/Sub MUST NOT be treated as a durable replacement for Redis Streams.

When a supplied repository uses a conflicting technology, record:

`STACK_CONFLICT`

Do not silently accept or introduce a competing stack.

### 0A. HIERARCHICAL MODULE BOUNDARY — FEATURE MODULE IS THE AI REPAIR UNIT

The backend strictly follows a 3-tier hierarchy:

```text
APPLICATION
  └── DOMAIN / ROLE CONTAINER (e.g. backend-admin)
        └── FEATURE MODULE
              └── SUB-FEATURE / USE CASE
```

**AI Repair Boundary = FEATURE MODULE**
**Role/Domain Container = NOT the default repair boundary**

### 0D. BACKEND NAMESPACE PREFIXING (MANDATORY)

Because the project contains a 1-to-1 mapping of frontend and backend roles, the AI MUST explicitly separate backend folders from frontend folders. 
- **The Rule:** EVERY top-level backend role container or domain folder MUST be prefixed with `backend-`.
- **Primary Examples:** `backend-admin/`, `backend-manager/`, `backend-superadmin/`.
- **E2E / Selenium Testing Folders:** If tests are grouped in a separate root directory, the test root AND the role subfolders inside it MUST carry the namespace to maintain context.
  - Example E2E: `backend-e2e/backend-admin-e2e/`, `backend-e2e/backend-manager-e2e/`
  - Example Selenium: `backend-selenium/backend-admin-selenium/`
- **Why?** If an AI is told to "fix the manager billing bug" and the context contains `src/manager/billing/`, it may hallucinate and write frontend React code inside a backend NestJS file. By strictly enforcing `src/backend-manager/manager-modules/manager-billing/` and `backend-e2e/backend-manager-e2e/`, there is zero ambiguity for the AI or the human developer.

When fixing a bug in `backend-superadmin/superadmin-modules/superadmin-billing`, the AI repair boundary is `billing`, not the entire `superadmin` domain container.

### 0F. ANTI-DOUBLE-PREFIXING RULE (CRITICAL)

Never double-prefix feature names or folders. If a backend module is named `admin-billing`, its child **sub-folders** MUST be named using the **module name only** as prefix (e.g., `billing-controllers/`, `billing-services/`), NEVER using the full role+module (e.g., NEVER `admin-billing-controllers/`). The role prefix applies to **file names** inside those folders (e.g., `admin-billing-invoice-search.service.ts`), NOT to the folder name itself. This is the single canonical rule — there is no alternative.

### 0H. CANONICAL NAMING SINGLE SOURCE OF TRUTH (GAP-14 Fix)

To eliminate all ambiguity between Rule 0F and Rule 2 (file naming), the following is the definitive unified rule:

| Level | Pattern | Correct Example | FORBIDDEN Example |
|---|---|---|---|
| Root feature module folder | `{role}-{module}/` | `admin-members/` | `members/` or `admin-admin-members/` |
| Sub-folders inside a feature module | `{module}-{artifact}/` ONLY | `members-services/` | `admin-members-services/` |
| Files inside those sub-folders | `{role}-{module}-{description}.{type}.ts` | `admin-members-registration.service.ts` | `members-registration.service.ts` |

**The key rule in one sentence:** Folders use the MODULE name as prefix; files use the ROLE+MODULE name as prefix. Never mix them up.

```text
admin-members/                                    ← root: {role}-{module}
├── members-services/                             ← sub-folder: {module}-{artifact}
│   └── admin-members-registration.service.ts     ← file: {role}-{module}-{description}
├── members-controllers/                          ← sub-folder: {module}-{artifact}
│   └── admin-members-command.controller.ts       ← file: {role}-{module}-{description}
└── members-dto/                                  ← sub-folder: {module}-{artifact}
    └── admin-members-create.dto.ts               ← file: {role}-{module}-{description}
```

AI agents MUST consult this table before creating any folder or file name. Any deviation = architecture violation.

### 0B. HARD FEATURE WRITE BOUNDARY

For a feature-specific task, the default writable scope is:

```text
[owning-feature]/**
```

The AI MUST NOT modify sibling feature modules, other domain business modules, or global business folders. Only explicitly documented core/infrastructure files may be modified as exceptions.

### 0C. CHANGE SCOPE FAILURE CONDITION

A feature repair FAILS the architecture gate when the AI:
* changes an unrelated business module;
* creates a new sibling-feature dependency;
* moves feature business logic into a domain-level folder;
* modifies another feature's database queries or mock handlers.

**Clarification — Event-Based Runtime Dependencies:** A direct business-code import from a sibling feature is forbidden and fails this gate. A declared, runtime event-based dependency (Rule 49) is explicitly permitted — emitting or consuming a named event from `event-registry.constants.ts` is NOT a sibling-feature code dependency. The distinction is: direct business-code dependency is forbidden; declared event-based runtime dependency is allowed.

### 0E. ISOLATED CONTEXT IMPLIES MODULAR MONOLITH, NOT MICROSERVICE (CRITICAL)

When an AI is provided with a single feature module or domain folder in isolation (e.g., a developer zips only the `backend-manager` folder or provides only the `dashboard` module), the AI MUST assume the module operates within a **Modular Monolith architecture**, NOT as an independent Microservice.
* **The Rule:** Never attempt to bootstrap independent database connections, isolated global infrastructure (like Config or Redis setup), or framework-level root configurations within a feature module. 
* **Framework-independent contract:** Rely on the global application monolith to provide the core infrastructure.
* **NestJS implementation:** Feature modules should strictly rely on `.forFeature()` registrations and should bundle/export their domain-specific providers into a module so the global Monolithic App can safely consume them. Never use `.forRoot()` / `.forRootAsync()` in a feature module.
* **Django implementation:** Feature apps must rely on `settings.py` for all database and infrastructure configuration. Do not attempt to initialize new database connections or Redis pools inside `apps.py` or feature views.
* **Why:** If the AI assumes the folder is a standalone microservice, it will attempt to instantiate redundant database connection pools and global infrastructure inside the local module, which instantly crashes the global monolith on startup due to duplicated context boundaries.

---

## FRAMEWORK APPLICABILITY GATE \u2014 MANDATORY

Before implementing or auditing code, the AI MUST determine the active backend
framework from the supplied project/repository evidence.

Only the rule set applicable to that framework may be enforced.

NestJS-specific requirements apply only to NestJS/TypeScript.
Django-specific requirements apply only to Django/Python.

The AI MUST NOT combine framework-specific implementations.

If the active framework cannot be determined from supplied evidence,
mark `FRAMEWORK_NOT_VERIFIED` rather than guessing.

> **IMPORTANT:** Supported backend frameworks for this project are ONLY NestJS/TypeScript and Django/Python.
> No Spring Boot/Java implementation is part of the normative project architecture.
> AI MUST NOT introduce any Spring Boot/Java code.

---

## 0G. MULTI-TENANCY CONTRACT — MANDATORY (GAP-23 Fix)

This application is **multi-tenant**. Every feature module across every role MUST enforce tenant isolation at every layer.

### Tenant Identity Contract

| Field | Source | Description |
|---|---|---|
| `gymId` | JWT payload ONLY | Primary tenant identifier (the gym/organization) |
| `branchId` | JWT payload ONLY | Sub-tenant identifier (the gym branch) |

**CRITICAL RULES:**
1. `gymId` and `branchId` MUST be extracted from the authenticated JWT payload — NEVER from the request body, URL query string, or client-supplied headers.
2. Services MUST NOT accept `gymId`/`branchId` as input parameters from controllers — they receive them from the auth context/JWT payload resolved by the auth guard.
3. Route parameters containing a resource ID (e.g., `/members/:memberId`) MUST be verified against the JWT tenant before returning data.

### Repository Tenant Filter Rule (P0 Security Requirement)

Every repository query that retrieves or modifies business data MUST include a tenant filter:

```typescript
// NestJS/TypeORM example
await this.memberRepo.findOne({
  where: {
    id: memberId,
    gymId: jwtPayload.gymId,      // MANDATORY — never omit
    branchId: jwtPayload.branchId, // MANDATORY where applicable
  }
});
```

```python
# Django ORM example
Member.objects.filter(
    id=member_id,
    gym_id=request.user.gym_id,       # MANDATORY
    branch_id=request.user.branch_id,  # MANDATORY where applicable
)
```

**Omitting the tenant filter = P0 Security Failure.** Any query that can return or modify data across tenant boundaries is a critical vulnerability.

### Response DTO Tenant Safety

- Response DTOs MUST NOT expose `gymId`/`branchId` to the client unless explicitly required by the frontend contract.
- Response DTOs MUST NOT include internal IDs or relationship references that could leak cross-tenant information.

### AI Audit Checklist for Tenant Isolation

Before marking any data endpoint PASS, verify ALL of the following:

```text
[ ] JWT payload extraction verified at auth guard level (not from body/query)
[ ] gymId/branchId NEVER accepted from request body params
[ ] Every findOne/findMany/update/delete query includes tenant filter
[ ] Response DTOs do not leak cross-tenant identifiers
[ ] Route param IDs (e.g., :memberId) are validated against JWT tenant
[ ] Tests verify that Tenant A cannot access Tenant B data
[ ] Bulk operations (where clauses) include tenant scope
```

### 0G-D. STRICT SUB-FOLDER PLACEMENT RULE (NO ROOT CLUTTER)

All implementation files (Controllers, Services, DTOs, Mappers, Domain Models, Constants) MUST be placed STRICTLY inside their corresponding prefixed sub-folders (e.g., `{module}-controllers/`, `{module}-dto/`). 
DO NOT place any of these implementation files in the root of the feature module folder. 

For example, in NestJS, the ONLY `.ts` file that belongs in the root of the feature module folder is the `[role]-[module].module.ts` file itself (alongside the mandatory `.md` documentation files like `-backend-feature.md`). Everything else MUST go into sub-folders. This keeps the backend feature module root entirely clean and identical in philosophy to the frontend root folder rule.

---

## 0G-A. APPROVED BACKEND NPM PACKAGE REGISTRY (GAP-22 Fix)

The following are the ONLY approved npm packages for backend feature modules. AI agents MUST NOT introduce packages outside this list without explicit documented approval.

| Concern | Approved Package | FORBIDDEN Alternatives |
|---|---|---|
| Framework | `@nestjs/core`, `@nestjs/common` | Express raw, Fastify standalone |
| ORM | `typeorm` | Prisma, Sequelize, Drizzle |
| Database Driver | `pg` (via TypeORM config) | `mysql2`, `better-sqlite3` |
| Validation | `class-validator`, `class-transformer` | Joi, Zod (backend), Yup |
| Redis Client | `ioredis` | `redis` npm v4 (conflicting API surface) |
| Queue | `bullmq` | `bull` (deprecated), `agenda`, `bee-queue` |
| Logging | `nestjs-pino`, `pino` | Winston, `console.log` direct |
| Config | `@nestjs/config` + Zod env schema | `dotenv` direct usage |
| JWT | `@nestjs/jwt` | `jsonwebtoken` direct usage |
| API Docs | `@nestjs/swagger` | none |
| Unit Testing | `jest`, `@nestjs/testing` | mocha, vitest, jasmine |
| E2E Testing | Python `pytest` + `httpx` | Jest E2E, Supertest |

**Django equivalent packages:** `djangorestframework`, `celery`, `django-redis`, `python-jose` or `djangorestframework-simplejwt`, `pytest-django`, `httpx` for E2E.

---

## 0G-B. SEED FILE SPECIFICATION (GAP-15 Fix)

Seed files MUST follow these rules without exception:

1. **Location:** `{feature-module}/{module}-seeds/`
2. **Naming:** `{role}-{module}-{description}.seed.ts`
   - Example: `admin-members-default-plans.seed.ts`
3. **Idempotency:** MANDATORY — repeated execution MUST NOT create duplicate data. Use `upsert` or explicit existence checks.
4. **Export shape:**
   ```typescript
   export async function seedAdminMembersDefaultPlans(dataSource: DataSource): Promise<void>
   ```
5. **Scope:** ONLY seed reference/initial data required for the application to function. NEVER seed production-exclusive or demo-only data.
6. **Transaction:** Seed operations MUST run inside a transaction for atomicity.

---

## 0G-C. REDIS RESPONSIBILITY DECISION TABLE (GAP-16 Fix)

Before choosing a Redis mechanism, consult this table:

| Scenario | Correct Redis Mechanism | FORBIDDEN Alternatives |
|---|---|---|
| Cache API response for 5–60 min | Redis Cache (ioredis + TTL) | Pub/Sub, Streams |
| Background email / SMS after event | BullMQ job | Pub/Sub (not durable — subscriber must be online) |
| Critical domain event that must not be lost | Redis Streams | Pub/Sub (ephemeral — lost if no active subscriber) |
| Real-time dashboard metric broadcast | Redis Pub/Sub | Streams (overkill for ephemeral fan-out) |
| Prevent double-processing a payment | Redis Distributed Lock | Streams, BullMQ |
| Rate limiting per user / IP | Redis Cache + sliding window TTL | BullMQ |
| Session storage / token blacklist | Redis Cache + TTL | Pub/Sub |

> **CRITICAL:** Redis Pub/Sub is ephemeral. A message published when there are no active subscribers is permanently lost. NEVER use Pub/Sub for critical business events that must survive a service restart or a subscriber being temporarily offline. Use Redis Streams for durable event delivery.

---


Do not create monolithic Services, Controllers, or Views. A generic `UserService` or `MemberController` will quickly grow to 1000+ lines. When you feed a 1000-line file to an AI, token costs explode, and the AI loses focus, increasing the chance of collateral damage.

**The Solution: Use-Case Driven Files**
Break down large files into micro-features. Every file must handle only one specific business flow.
- ❌ **BAD:** `admin-members.service.ts` (Handles registration, billing, attendance, emails — monolithic)
- ✅ **GOOD:** 
  - `admin-members-registration.service.ts`
  - `admin-members-billing.service.ts`
  - `admin-members-attendance.service.ts`
  - `admin-members-notifications.service.ts`

**IMPORTANT FOLDER NAMING (CRITICAL ENFORCEMENT):** ALL folders in the backend MUST use `kebab-case` (e.g., `members-services/`, `billing-dto/`). You are STRICTLY FORBIDDEN from using PascalCase, camelCase, or snake_case for folder names (e.g., NEVER use `ManagerMembersServices/` or `admin_billing`). Always group these micro-files logically into cohesive sub-folders within the module using this casing.

### Sub-Folder Naming Standard (MANDATORY — No Exceptions)

Every feature module sub-folder MUST be named using the module name as prefix followed by the artifact type. The following table is the ONLY permitted naming convention:

| Artifact Type | Mandatory Folder Name | ❌ Forbidden Alternatives |
|---|---|---|
| Services | `{module}-services/` | `service/`, `services/`, `svc/` |
| Controllers | `{module}-controllers/` | `controller/`, `controllers/`, `ctrl/` |
| Repositories | `{module}-repositories/` | `repo/`, `repositories/`, `data/` |
| DTOs | `{module}-dto/` | `dto/`, `dtos/`, `DTO/`, `schemas/` |
| Mappers | `{module}-mappers/` | `mappers/`, `mapper/`, `utils/` |
| Domain Models | `{module}-domain/` | `domain/`, `models/`, `entities/` |
| Types/Interfaces | `{module}-types/` | `types/`, `interfaces/`, `typings/` |
| Constants/Enums | `{module}-constants/` | `constants/`, `enums/`, `config/` |
| Exceptions | `{module}-exceptions/` | `exceptions/`, `errors/`, `exception/` |
| Locales | `{module}-locales/` | `_locales/`, `locale/`, `i18n/` |
| Jobs | `{module}-jobs/` | `jobs/`, `workers/`, `queues/` |
| Adapters | `{module}-adapters/` | `adapters/`, `external/`, `integrations/` |

> **AI AGENT NOTE:** When creating any sub-folder inside a feature module, you MUST consult this table first. Creating a folder not following `{module}-{artifact}/` pattern is an architecture violation and MUST be flagged.

**Examples (role: admin, module: members):**
```text
admin-members/
├── members-services/            ✅ CORRECT
├── members-controllers/         ✅ CORRECT
├── members-repositories/        ✅ CORRECT
├── members-dto/                 ✅ CORRECT
├── members-mappers/             ✅ CORRECT
├── members-domain/              ✅ CORRECT
├── members-types/               ✅ CORRECT
├── members-constants/           ✅ CORRECT (module-level constants)
├── members-exceptions/          ✅ CORRECT
└── members-locales/             ✅ CORRECT
```

## 2. Highly Descriptive, AI-Contextual Filenames & Module Prefixing
Rename all controllers, services, and models to be extremely descriptive based on exactly what they do, AND they must strictly begin with the module name as a prefix.
When you tag a file for AI context (e.g., `@[Filename]`), the AI should instantly know exactly what module it belongs to and what it does, even without seeing the folder path. Duplicate filename collisions are eliminated.
- ❌ **BAD:** `auth.py`, `utils.js`, `helpers.ts`, `SearchBar.tsx`
- ✅ **GOOD:** `admin-billing-jwt-token-generator.utils.ts`, `admin-billing-stripe-payment-webhook.controller.ts`, `admin-attendance-member-registration-validator.py`
* **The Rule (CRITICAL):** Every single file name MUST begin with the parent domain/role name (e.g., `superadmin`, `manager`) followed by the module name as a prefix. This applies to EVERYTHING: modules, controllers, services, DTOs, types, constants, utilities, and tests. *(Exception: Global configuration, constants, types, utilities, and root tooling files like `api-response.types.ts`, `database.config.ts`, or `event-registry.constants.ts` are exempt from the module prefix rule when placed in global infrastructure directories such as `src/core/`, `src/infrastructure/`, or root-level tooling folders like `scripts/`.)* Just as the frontend uses `AdminBillingInvoiceSearchBox.tsx`, the backend MUST use `admin-billing-invoice-search-box.controller.ts`.
* **Component/Class Internal Naming:** The exported class name MUST exactly match the filename logic (converted to PascalCase). For example, `superadmin-auth.module.ts` must export `class SuperadminAuthModule`. `manager-auth.controller.ts` must export `class ManagerAuthController`. This prevents AI hallucination.
* **Business Folders Prefixing (CRITICAL):** NEVER use generic names for ANY structural business folders (e.g., `modules/`, `common/`, `config/`, `database/`, `utils/`, `i18n/`, `middleware/`, etc.) anywhere in the project. ALL business folders MUST be explicitly prefixed with their parent domain/role name.
  - ❌ **BAD:** `backend-superadmin/core/`, `backend-manager/modules/`, `backend-admin/config/`, `backend-trainer/utils/`
  - ✅ **GOOD:** `backend-superadmin/superadmin-core/`, `backend-manager/manager-modules/` ..etc

### Mandatory Role Container Structure (NON-OPTIONAL)

Every backend role container MUST contain exactly two top-level business directories:

- `{role}-core/`
- `{role}-modules/`

Direct feature placement under `backend-{role}/` is **forbidden**.

❌ **FORBIDDEN — AI agents MUST flag this as Architecture Violation:**
```text
backend-admin/
├── admin-core/
├── admin-auth/        <-- VIOLATION: feature directly under backend-admin/
├── admin-members/     <-- VIOLATION: feature directly under backend-admin/
└── admin-billing/     <-- VIOLATION: feature directly under backend-admin/
```

✅ **REQUIRED — the ONLY compliant structure:**
```text
backend-admin/
├── admin-core/
│
└── admin-modules/
    ├── admin-auth/
    ├── admin-members/
    └── admin-billing/
```

The `{role}-modules/` folder is **NOT optional**. All business feature modules MUST be located inside `{role}-modules/`. AI agents MUST NOT place feature modules directly under `backend-{role}/`.

### {role}-core/ Scope Restriction (CRITICAL)

The `{role}-core/` folder is strictly a **framework infrastructure container**. It MUST NOT contain any business logic, domain services, or feature helpers.

**Permitted inside `{role}-core/`:**
- Guards (e.g., JWT auth guards, roles guards)
- Decorators (e.g., `@Roles()`, `@CurrentUser()`)
- Interceptors (e.g., response interceptor, logging interceptor)
- Pipes (e.g., validation pipe wrappers)
- Middleware (e.g., tenant resolution middleware)
- Framework infrastructure (e.g., the role's root NestJS module file)

**FORBIDDEN inside `{role}-core/` — Architecture Violation:**
- Any business logic service (e.g., `admin-members-suspension.service.ts`)
- Any feature-specific helper (e.g., `admin-billing-helper.ts`)
- Any repository (e.g., `admin-auth.repository.ts`)
- Any DTO (e.g., `admin-members-create.dto.ts`)
- Any entity or domain model

```text
❌ VIOLATION:
admin-core/
├── admin-guards/
├── admin-members-suspension.service.ts   <-- business logic FORBIDDEN in core
└── admin-billing-helper.ts              <-- feature helper FORBIDDEN in core

✅ COMPLIANT:
admin-core/
├── admin-guards/
│   └── admin-core-jwt-auth.guard.ts
├── admin-decorators/
│   └── admin-core-current-user.decorator.ts
├── admin-interceptors/
│   └── admin-core-response.interceptor.ts
└── admin-core.module.ts
```

* **Global Infrastructure Exception:** The ONLY allowed generic un-prefixed folders are `src/core/` and `src/infrastructure/` which contain NO business logic, only pure framework plumbing (see Rule 10 Edge Case C). These root-level generic folders may contain standard un-prefixed sub-folders (like `src/core/utils/`, `src/core/dtos/`, `src/core/config/`) provided they are strictly global and cross-cutting. Never put business logic in these generic folders.
  
  **Canonical Mandatory Backend Structure — Complete Physical Module Tree:**

  > The following structure is mandatory. Any deviation is considered architecture non-compliant. AI agents MUST use this tree as the reference template when generating any backend role module.

  ```text
  backend-admin/
  │
  ├── admin-core/                                          <-- Role-level framework infrastructure ONLY
  │   ├── admin-guards/
  │   │   └── admin-core-jwt-auth.guard.ts                <-- RESPONSIBILITY + FLOW comment required
  │   ├── admin-decorators/
  │   │   └── admin-core-current-user.decorator.ts
  │   ├── admin-interceptors/
  │   │   └── admin-core-response.interceptor.ts
  │   └── admin-core.module.ts                            <-- Role root NestJS module
  │
  └── admin-modules/                                      <-- ALL feature modules live here
      │
      ├── admin-auth/                                     <-- Feature module (example)
      │   ├── auth-controllers/
      │   │   ├── admin-auth-command.controller.ts        <-- Write operations (POST/PATCH/DELETE)
      │   │   └── admin-auth-query.controller.ts          <-- Read operations (GET)
      │   ├── auth-services/
      │   │   ├── admin-auth-login.service.ts
      │   │   ├── admin-auth-token-refresh.service.ts
      │   │   └── admin-auth-orchestrator.service.ts      <-- Orchestrator: opens TX, calls services
      │   ├── auth-repositories/
      │   │   ├── admin-auth-read.repository.ts           <-- Concern-based split (Rule 7)
      │   │   └── admin-auth-write.repository.ts          <-- Concern-based split (Rule 7)
      │   ├── auth-mappers/
      │   │   └── admin-auth.mapper.ts                    <-- toDomain() / toEntity() ONLY
      │   ├── auth-domain/
      │   │   └── admin-auth.domain.ts                    <-- Pure domain model — zero ORM imports
      │   ├── auth-dto/
      │   │   ├── admin-auth-login.dto.ts
      │   │   └── admin-auth-token-response.dto.ts
      │   ├── auth-types/
      │   │   └── admin-auth-jwt-payload.type.ts
      │   ├── auth-constants/
      │   │   └── admin-auth.constants.ts
      │   ├── auth-exceptions/
      │   │   └── admin-auth.exceptions.ts
      │   ├── auth-locales/
      │   │   ├── en/
      │   │   │   ├── admin-auth-errors.json
      │   │   │   └── admin-auth-messages.json
      │   │   └── hi/
      │   │       ├── admin-auth-errors.json
      │   │       └── admin-auth-messages.json
      │   ├── admin-auth.module.ts                        <-- NestJS module registration
      │   ├── admin-auth-backend-feature.md               <-- MANDATORY: module doc (Rule 19)
      │   ├── admin-auth-dependencies.md                  <-- MANDATORY: dependency graph (Rule 49)
      │   └── admin-auth-forbidden.md                     <-- MANDATORY: forbidden patterns (Rule 78)
      │
      └── admin-members/                                  <-- Another feature module (same pattern)
          ├── members-controllers/
          ├── members-services/
          ├── members-repositories/
          ├── members-mappers/
          ├── members-domain/
          ├── members-dto/
          ├── members-types/
          ├── members-constants/
          ├── members-exceptions/
          ├── members-locales/
          ├── admin-members.module.ts
          ├── admin-members-backend-feature.md
          ├── admin-members-dependencies.md
          └── admin-members-forbidden.md
  ```

### Mandatory Feature Module Structure

Every feature module MUST contain:
- `{module}-controllers/`
- `{module}-services/`
- `{module}-repositories/`
- `{module}-dto/`
- `{module}-types/`
- `{module}-constants/`
- `{module}-exceptions/`
- `{module}-domain/`
- `{module}-mappers/`

Optional:
- `{module}-locales/`
- `{module}-jobs/`
- `{module}-adapters/`

## 3. Strict Validation & DTO Isolation
Never mix data validation logic (checking if email is valid, password length) with business logic (saving to DB). 
Extract all validation logic (NestJS: Class-Validator DTOs, Django: Forms/Serializers, Config: Zod) into their own isolated files.
- **Why?** If the business logic is fine but the API is rejecting a payload, you only feed the AI `admin-members-create.dto.ts`. The AI won't even see the database logic, guaranteeing 0% chance of breaking the database flow.

## 4. Interface & Type Isolation (The AI's Blueprint)
AI relies heavily on data shapes to write correct code. If the AI knows the exact shape of a `User` or a `PaymentPayload`, it doesn't need to see the database schema or the entire service file.
* **The Rule:** Extract all TypeScript `Interfaces` or `Types` into a dedicated file inside a prefixed types folder (e.g., `billing-types/admin-billing-payment-payload.type.ts`). Never dump them inline or use generic `interfaces.ts` files.
* **Why?** When you want the AI to write a new function, you just feed it the `interfaces` file. The AI instantly knows exactly what properties are available without having to read 500 lines of implementation code.

## 5. Centralized Constants (Single Source of Truth)
Find all hardcoded strings, error messages, magic numbers, and default config values scattered across your backend. Extract them into a module-level `[role]-[module].constants.ts` (or `[role]-[module]-constants.py`).
- ❌ **BAD:** `throw new Error("User age must be over 18")`
- ✅ **GOOD:** `throw new Error(MEMBER_ERRORS.AGE_RESTRICTION)`
- **Why?** Tomorrow, if the business requirement changes from 18 to 21, or if you need to translate error messages to a different language, you only feed the AI `admin-members.constants.ts`. The business logic remains untouched.

## 6. Centralized Custom Exceptions
Handling errors with generic `throw new Error()` makes it hard for AI to write precise unit tests or generic error handlers.
* **The Rule:** Create specific exception classes in an `[role]-[module].exceptions.ts` file (e.g., `class InsufficientFundsException extends Error`).
* **Why?** If an AI is writing an Express error-handling middleware, providing the `exceptions.ts` file gives it a perfect, safe map of every possible error state it needs to catch and format for the frontend.

## 7. Isolated Database/Query Layer (The Repository Pattern)
Never write massive, complex raw SQL or 50-line ORM queries directly inside your business logic services.
Extract complex queries into a dedicated Repository or Query file.
* **The Rule:** The project has a fixed ORM per supported framework. The repository pattern is mandatory.
  - NestJS / TypeScript → TypeORM + PostgreSQL.
  - Django / Python → Django ORM + PostgreSQL.
  - No second ORM is permitted.
  - Prisma is not permitted in this project.
  - ORM-specific implementation MUST remain behind the repository/data-access boundary so business services do not become coupled to ORM-specific APIs.
- **Why?** If the dashboard stats are calculating incorrectly, it's a database query issue. You provide the AI the `repository` file, not the `service` file.

### Repository Naming Standard (MANDATORY)

To maximize AI repair isolation and minimize blast radius, **concern-based repository splitting is encouraged.**

When a module has complex queries, splitting the repository by concern (read, write, search, analytics) creates smaller context windows for AI agents.

✅ **Allowed Concern-Based Splitting:**
- `{role}-{module}-read.repository.ts`
- `{role}-{module}-write.repository.ts`
- `{role}-{module}-search.repository.ts`
- `{role}-{module}-analytics.repository.ts`

If a module is extremely simple, a single `{role}-{module}.repository.ts` is permitted.

**Anti-Fragmentation Rule:**
While concern-based splitting is encouraged, **method-level over-fragmentation is strictly forbidden.** You cannot create a repository for a single find method.

❌ **Forbidden Over-Fragmentation:**
- `member-find-by-id.repository.ts`
- `member-find-by-email.repository.ts`
- `member-find-active.repository.ts`
- `member-update-name.repository.ts`
- `member-delete.repository.ts` (this is method-level fragmentation)

❌ **Forbidden Naming Violations:**
- `member-query.repository.ts` ("query" suffix reserved for CQRS controllers)
- `member.repository.ts` (missing role prefix)

All repositories MUST live inside the module's `{module}-repositories/` sub-folder.

---


> **MODE A (CREATE) STACK BASELINE:** Before creating any backend module in Mode A, the AI MUST read and confirm the project stack from the architecture document or the prompt inputs. Required: (1) ORM + DB engine, (2) message broker/queue, (3) Redis use, (4) auth mechanism, (5) path alias (e.g., `@/`), (6) migration tool. If any of these are not explicitly specified, the AI MUST raise a MISSING_STACK_DEFINITION error before writing any code. Do NOT guess.

## 8. Handling Edge Cases & Complex Scenarios

### Edge Case A: Cross-Module Dependencies (Tight Coupling)
*Scenario:* The `MemberRegistrationService` needs to trigger the `FinanceService` to generate an invoice, and the `EmailService` to send a welcome email. If they are tightly coupled, the AI will need all three files to understand the flow.
*Solution:* **Event-Driven Architecture (Pub/Sub).**
The `MemberRegistrationService` should only save the user and emit an event: `EventBus.emit('MEMBERS.MEMBER.REGISTERED', user)

For events that require durable delivery or cross-instance processing, the application event contract MUST be backed by Redis Streams.

In-process event emitters MUST NOT be treated as the durable transport for critical domain events.

Redis Pub/Sub is reserved for transient real-time fan-out and MUST NOT replace Redis Streams for durable events. The Finance and Email modules listen to this event independently. Now, the modules are 100% decoupled.

### Edge Case B: Database Transactions (All-or-Nothing Operations)
*Scenario:* You split your logic into `BillingService` and `MembershipService`. But creating a member and charging their card MUST happen in the same database transaction.
*Solution:* **Orchestrator Pattern with UnitOfWork Abstraction.** 
Create a higher-level "Facade" or "Orchestrator" whose ONLY job is to open a transaction, call the micro-services passing a `TransactionContext` or `UnitOfWork` abstraction, and commit/rollback. The micro-services themselves must remain pure and decoupled from the raw ORM transaction object. Direct passing of an ORM-specific `tx` object leaks the ORM abstraction into the business service layer.

```text
Orchestrator
   ↓
TransactionContext / UnitOfWork abstraction
   ↓
Repositories
   ↓
ORM
```

#### Orchestrator Naming Convention (MANDATORY)

All Orchestrators MUST use the following naming pattern — no exceptions:

```
{role}-{module}-orchestrator.service.ts
```

**Examples:**
- `admin-members-orchestrator.service.ts`
- `manager-billing-orchestrator.service.ts`
- `superadmin-gyms-orchestrator.service.ts`

❌ **FORBIDDEN orchestrator names — AI agents MUST NOT use these:**
- `facade.service.ts`
- `workflow.service.ts`
- `transaction-handler.service.ts`
- `admin-members-transaction.service.ts`
- `admin-members.facade.ts`

The exported class MUST follow PascalCase matching the filename: `admin-billing-orchestrator.service.ts` → `class AdminBillingOrchestratorService`.

Orchestrators MUST live inside the module's `{module}-services/` sub-folder alongside other micro-services.

### Feature Module File Rule

Every feature module MUST contain exactly one module registration file.

Pattern:
`{role}-{module}.module.ts`

Examples:
- `admin-members.module.ts`
- `manager-billing.module.ts`

Multiple NestJS module files inside a feature module are forbidden.

### Edge Case C: Shared Utility Bloat (The "No Common Folder" Rule)
*Scenario:* Developers dump code into a global `utils/`, `common/`, or `shared/` folder to adhere to the DRY (Don't Repeat Yourself) principle. 
*Solution:* **WET over DRY for AI (Write Everything Twice).**
Strictly ban global `common/` or `shared/` folders. If a helper, enum, or type is used by the Billing module, put it in `backend-manager/manager-modules/manager-billing/billing-mappers/` (or `billing-constants/`, `billing-types/` respectively). If the Attendance module needs the exact same helper, **duplicate the code** into `backend-admin/admin-modules/admin-attendance/attendance-mappers/`. 
* **Crucial Clarification (Domain vs Module):** WET duplication applies strictly at the **module level, not the domain level**. No shared folder is allowed at ANY level. Even if both the `billing` module and `attendance` module live under the same `manager` domain, they MUST get their own independent copies of a shared utility. There is no `manager/shared/` folder.
* **Why?** In an AI-driven codebase, code repetition is entirely acceptable because AI writes the code. If we use a global `common/` folder, an AI might modify a shared function to fix a bug in HR, inadvertently breaking the Finance module. Complete module isolation guarantees 0% cross-module side effects.

> **CRITICAL WARNING TO AI AGENTS:** 
> Do NOT attempt to "DRY up" business logic, utilities, or services by moving them to global folders like `src/shared/` or `src/common/`. 
> Anything containing domain-specific business behavior MUST be duplicated per feature, NEVER globalized. 
> Only pure infrastructure plumbing (like database connection pools) belongs in global core folders.
* **Infrastructure Exception (Framework-Level vs Business-Logic-Level):** The WET-over-DRY / no-shared-folder rule applies strictly to **BUSINESS LOGIC utilities** (domain-specific helpers, formatters, validators). It does **NOT** apply to genuine framework-level infrastructure that every module is architecturally required to **extend OR consistently reference for correctness** (i.e., a single shared registry or config that MUST stay identical across all modules to function correctly — duplicating it would produce inconsistency, not isolation) — e.g. `BaseEntity` (Rule 58), the global `ResponseInterceptor` (Rule 28), `RolesGuard`/`@Roles()` decorator (Rule 83), the structured logger (Rule 14), `AsyncLocalStorage` context propagation (Rule 57), the centralized rate-limit tiers config (Rule 44), the event-registry constants (Rule 50), the Feature Flag Service (Rule 108), and the global database connection pool config (Rule 63). These live in a single, clearly-named `src/core/` or `src/infrastructure/` folder — **NOT** `src/shared/` or `src/common/` (to avoid becoming a dumping ground). This folder is intentionally small, framework-plumbing-only, and rarely touched — it does not carry the same "AI breaks module B while fixing module A" risk because it contains **no business logic**, only structural contracts that every module must extend or reference by architectural design.

### Edge Case D: External Service Adapters (Anti-Corruption Layer)
*Scenario:* When your backend talks to the outside world (Stripe, AWS S3, SendGrid), never put the `axios.post()` or SDK calls directly inside your business logic.
*Solution:* **Create an isolated wrapper or "Adapter"** for third-party tools (e.g., `admin-stripe-payment.adapter.ts`). Your core service should only call generic methods like `paymentAdapter.charge()`.
* **Why?** If Stripe changes their API version, you only give the AI the `admin-stripe-payment.adapter.ts` file. The AI fixes the API call without ever seeing (or risking breaking) your internal checkout logic.

## 9. Avoid Hardcoded HTTP Status Codes
Never hardcode HTTP status code numbers (e.g., `200`, `400`, `500`) in controllers, exceptions, or responses. 
* **The Rule:** Always use a framework-provided enum or a status code library (e.g., `HttpStatus` in NestJS, `http-status-codes` in Node, `rest_framework.status` in Django).
* **Testing Rule:** This applies strictly to E2E and Unit testing as well! In Python `pytest` suites, always use `from http import HTTPStatus` (e.g., `HTTPStatus.OK`, `HTTPStatus.CREATED`) rather than hardcoded integers.
* **Why?** It improves readability, prevents magic numbers, and reduces the risk of typos (e.g., typing `401` when you meant `403`).

## 10. Dynamic / Absolute Imports (No Hardcoded Relative Paths)
*(Applicable to JavaScript/TypeScript Frameworks)*
Never use fragile, hardcoded relative imports (e.g., `../../../utils/helpers`). 
* **The Rule:** Configure the backend framework to use absolute path aliases (e.g., mapping `@/` to the `src/` directory). Always use absolute/aliased imports with `@/` (or your configured alias) instead of traversing directories up and down with `../..`.
* **Why?** It prevents import paths from breaking when files are refactored, moved, or copy-pasted, drastically improving the ability for AI to generate drop-in code without path hallucinations.

---

---

## Django Framework Reference Appendix

For Non-NestJS projects, strictly adhere to the role and module isolation principles. Regardless of the framework, do NOT use generic structural folders like `dtos/`, `services/`, or `controllers/`. File naming MUST follow the role-prefix convention (e.g., `admin-billing-invoice.views.py`).

*(Note: In non-NestJS frameworks like Django, framework-native file naming such as `models.py` or `serializers.py` is permitted, but generic sub-folders must still be module-prefixed.)*

### In Django (Python) — Reference Only
- Avoid massive `views.py`. Create a `my-module-views/` folder and split class-based views into individual files (e.g., `admin-member-registration-view.py`).
- Avoid "fat models". Move complex business logic from `models.py` into a `my-module-services/` directory.
- Keep `serializers.py` strictly for validation and data formatting.


## 11. Co-located Testing (Unit & E2E - Extreme Isolation)
Never put tests in a global `tests/` or `pytest-tests/` directory separate from the application code. 
* **The Rule:** Unit tests (`.spec.ts`) must live directly inside the module they are testing, adjacent to the micro-feature file (e.g., `admin-members-registration.service.spec.ts` next to `admin-members-registration.service.ts`). E2E / black-box API tests are written in Python pytest and live in a separate top-level `backend-e2e/` directory (see Rule 27). Do NOT co-locate pytest files inside the NestJS module folders.
* **Why?** When an AI is asked to add a feature or fix a bug, providing the co-located `.spec.ts` file gives it complete unit-test context. The pytest E2E suite is decoupled from the Node.js runtime entirely.


## 12. Strict API Documentation (Swagger/OpenAPI)
* **The Rule:** Every endpoint MUST be documented using the framework's native OpenAPI/Swagger tools (e.g., `@ApiTags` and `@ApiResponse` in NestJS, `drf-spectacular` in Django).
* **Why:** AI relies heavily on interface contracts. Keeping them mandatory and co-located with the controllers ensures frontend developers (and AI frontend agents) always have a mathematically accurate, up-to-date API contract to work with.

## 13. Environment & Configuration Management
* **The Rule:** Never use raw environment variables (e.g., `process.env.XXX` or `os.environ.get()`) directly inside business logic. Always use a centralized, strongly-typed Config Service or Settings class (e.g., `@nestjs/config` in NestJS, `settings.py` with `django-environ` in Django). The configuration service MUST validate all environment variables at application startup using a strict schema (e.g., Zod or `class-validator`). The app must throw a fatal error and refuse to boot if any required environment variable is missing or incorrectly typed.
* **Why:** If the AI needs to add a new third-party API key or change a timeout value, it should only modify the central configuration schema, not hunt for raw env calls scattered across 50 different micro-services.

## 14. Standardized Logging & Correlation IDs (nestjs-pino / Python structured logging & OpenTelemetry)
* **The Rule:** Never use raw print statements (e.g., `console.log()` or `print()`). The approved loggers per framework are:
  - NestJS: **`nestjs-pino`** (wrapping `pino`). Do not use Winston or any other logger.
  - Django: Python structured logging using the project's approved structured logging configuration. Do not use ad-hoc `print()` calls.

  Both MUST provide: request ID, trace ID, span ID, tenant context where permitted, route, status, response time, and redaction rules.
* **The Log Structure:** Every log entry must automatically attach the current execution context. A standard log output must include:
  - `method` (HTTP method: GET, POST, PATCH, etc.)
  - `route` / `path` (the matched route template, e.g., `/api/v1/members/:id` — **not** the raw URL with substituted values)
  - `statusCode` (HTTP response status)
  - `requestId` (unique per-request UUID, injected at the middleware boundary)
  - `tenantId` (where permitted by data privacy policy — never log tenant-specific personal data alongside it)
  - `traceId` and `spanId` (injected via OpenTelemetry/AsyncLocalStorage)
  - `context` (the exact class or service name emitting the log, e.g., `AdminMembersRegistrationService`)
  - `responseTime` (milliseconds, for access logs)
* **What MUST NEVER appear in any log line:**
  - Raw `req` or `res` objects — these contain auth headers, cookies, request bodies, and response bodies by default.
  - `Authorization` header, Bearer tokens, API keys, session tokens, refresh tokens.
  - Passwords, PINs, OTPs, biometric data, or any credential.
  - Request or response body payloads (even sanitized partials — if in doubt, omit).
  - Raw PII: full phone numbers, Aadhaar numbers, bank account numbers, card numbers, email addresses (partial masking per Rule 35 is the only exception where explicitly required).
* **Why:** When logs are pushed to an aggregator like Datadog, ELK, or CloudWatch, developers can simply search for `traceId="b8174fe8b671..."` to instantly pull up the exact journey of a request across 15 different micro-files. This rule also ensures that a single misconfigured log line cannot constitute a data breach. Standardized loggers also allow global turning on/off of debug statements.


## 15. Dependency Injection & Inversion of Control
* **The Rule:** Avoid instantiating complex service classes directly using `new MyService()` or `MyService()`. Rely on the framework's Dependency Injection system if it has one (NestJS), or construct dependencies at the highest possible level (module/route boundaries) and pass them in.
* **Why:** AI might take shortcuts and manually instantiate classes inside business logic, creating tight coupling. Enforcing Dependency Injection ensures that tests can easily mock out databases, external APIs, and child services.

## 16. Module-Specific API Collections (Postman/Insomnia)
* **The Rule:** Whenever a module is created or finalized, generate a `[role]-[module]-collection.json` file directly inside the module's folder (e.g., `backend-admin/admin-modules/admin-auth/admin-auth-collection.json`). 
* **Why:** This ensures that any developer (or human QA) can instantly import this JSON into Postman and manually test the module's endpoints without having to manually construct the headers, payloads, or figure out the routes. It provides immediate, highly-accessible testing verification.

## 17. Standardized Pagination, Sorting & Filtering (Enterprise Scale - Backend Driven)
* **The Rule:** Any endpoint that returns tabular or list data (e.g., Orders, Members) MUST ALWAYS support backend-driven pagination, sorting (e.g., `sortOrder=ASC/DESC`), and filtering (e.g., `startDate`, `endDate`, `search`, `status`). Never return raw, unpaginated lists if the dataset can grow large. *(Exception: Bounded/non-paginated lookup endpoints are exempt, and should not return pagination metadata as per Rule 28.)*
* **The "No Frontend In-Memory Filtering" Mandate:** The backend MUST provide dedicated query parameters for every search box, dropdown filter, and date picker on the UI. The frontend is STRICTLY FORBIDDEN from fetching a massive array of 5,000 records and using JavaScript `.filter()` or `.sort()` in memory. All searching (`ILIKE` / Full Text) and filtering (`WHERE` clauses) MUST be executed by the database via the backend API.
* **Implementation:** Always use a standardized wrapper or query DTO (e.g., `limit/offset` based pagination extended with filtering/sorting properties) across all controllers. For example, a search box triggers `?search=john&page=1`, which the backend maps to an SQL `ILIKE '%john%'` query.
* **Why:** Returning thousands of unfiltered rows crashes browsers and creates severe security/performance issues. If the AI is asked to add an endpoint for `MemberAnalytics` or `Orders`, it must proactively build in sorting, searching, and date filtering capabilities so the frontend can display robust, server-driven table controls.

## 18. Strict ES Modules (No `require`)
*(Applicable to JavaScript/TypeScript Frameworks)*
* **The Rule:** Never use the `require()` keyword. It is considered dead/legacy in this architecture. You must exclusively use ES module `import` and `export` statements.
* **Why:** ES Modules are the modern standard, they provide strict typing compatibility out of the box in TypeScript, support better static analysis/tree-shaking, and ensure consistent import syntax across the entire codebase.

## 19. Module-Level Feature Documentation
*(Crucial for AI Context & Onboarding)*
* **The Rule:** Every single module must contain a `[role]-[module]-backend-feature.md` file at its root (e.g., `backend-admin/admin-modules/admin-auth/admin-auth-backend-feature.md`). 
* **Why:** Before an AI or a new human developer makes any changes to a module, they will read this file first. It acts as the ultimate localized context guide, instantly explaining the routing, file responsibilities, and logic, drastically reducing the risk of hallucination or breaking existing architecture.

### Documentation Placement Rule

The following files MUST exist directly inside the feature module root:
- `{role}-{module}-backend-feature.md`
- `{role}-{module}-dependencies.md`
- `{role}-{module}-forbidden.md`

These files MUST NOT be placed inside:
- `docs/`
- `documentation/`
- `wiki/`

### Documentation Quality Standard

**The purpose of `-backend-feature.md` is that an AI given ONLY that file + the module folder can fully understand, modify, or debug the module without reading anything else. Generic boilerplate defeats this entirely.**

#### ❌ BAD — What AI agents produce without quality enforcement:
```markdown
## Module Purpose
Handles billing operations.

## Feature Inventory
| Endpoint | Path | Description | DTO |
|---|---|---|---|
| POST /billing/charge | /billing/charge | Handles charging | AdminBillingChargeCreateDto |

## Edge Cases / AI Warnings
- TBD
- Do not bypass the Orchestrator.
```
*Why this fails: "Handles billing operations" tells an AI nothing. "TBD" is worse than no doc. "Do not bypass the Orchestrator" with no context is unactionable.*

#### ✅ GOOD — What every `-backend-feature.md` must look like:
```markdown
## Module Purpose
Processes all wallet top-ups, plan purchases, and refunds for gym members.
Wallet balance is stored in paise (integer). All mutations go through
AdminBillingOrchestratorService to guarantee atomic DB + audit log writes.
Never call AdminBillingWalletRepository directly from outside this module.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `AdminBillingWalletCommandController` | POST | `/billing/wallet/topup` | Top up member wallet with real currency | `AdminBillingWalletTopupDto` | `AdminBillingWalletTopupResponseDto` |
| `AdminBillingPlanCommandController` | POST | `/billing/plans/purchase` | Purchase a membership plan | `AdminBillingPlanPurchaseDto` | `AdminBillingPlanPurchaseResponseDto` |

## Edge Cases / AI Warnings
- Wallet deductions use pessimistic locking (Rule 41) — never remove the
  SELECT FOR UPDATE or concurrent requests will produce negative balances.
- Plan purchase and wallet deduction MUST be in the same transaction
  (AdminBillingOrchestratorService) — splitting them causes partial charge bugs.
- Idempotency-Key header is mandatory on /wallet/topup (Rule 103) —
  removing it will cause double-charges on network retries.
```
*Why this works: An AI can read this and immediately know the invariants, the danger zones, and exactly which rules apply — without reading a single source file.*

**Failure Conditions — A `-backend-feature.md` FAILS quality review if it contains:**
- Any section with "TBD" or "N/A" as the entire content
- Module Purpose under 3 sentences
- Edge Cases with fewer than 3 concrete, module-specific entries
- Generic warnings not tied to a specific rule number (e.g., "be careful with transactions" with no Rule citation)
- Feature Inventory rows where Purpose column is just "Handles X"

**Documentation Freshness Rule:** `-backend-feature.md` MUST be updated in the same commit as any code change to the module. A stale feature doc is worse than no doc — it actively misleads AI agents.

---

### Mandatory `[role]-[module]-backend-feature.md` Template
Every backend module MUST use this minimum structure:

```markdown
# [Module Name] Backend Feature Map

## Module Purpose
[REQUIRED: 3+ sentences. What business problem does this module solve? What are
the key invariants (e.g., "all mutations go through the Orchestrator")? What
should an AI NEVER do in this module?]

## Directory Structure
| File | Responsibility |
|---|---|
| [role]-[module]-command.controller.ts | [REQUIRED: exact HTTP mutations it handles] |
| [role]-[module]-query.controller.ts | [REQUIRED: exact read endpoints it handles] |
| {module}-services/[role]-[module]-orchestrator.service.ts | [REQUIRED: what it orchestrates] |
| {module}-repositories/[role]-[module]-<concern>.repository.ts | [REQUIRED: what queries it owns] |
| {module}-dto/[role]-[module]-create.dto.ts | [REQUIRED: what it validates] |
| {module}-repositories/[role]-[module].entity.ts | [REQUIRED: what DB table it maps to] |

## Feature Inventory
[REQUIRED: One row per endpoint. Purpose must be a full sentence, not "Handles X".]
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|

## Approved External Dependencies
[REQUIRED: Explicitly list all external dependencies. If none, write "None".]
- **Business Feature Dependencies**: [e.g., MemberModule]
- **Infrastructure Dependencies**: [e.g., CacheManager, Database]
- **Runtime/Event Dependencies**: [e.g., BILLING.PAYMENT.FAILED]

## Data and State Architecture
[REQUIRED: Fill every field. Write "none" only if genuinely none.]
- DB Entities: [entity names and their table names]
- Redis Caching Keys: [key patterns and TTLs, e.g., `billing:wallet:{memberId}` TTL 5min]
- Event Emitters: [event names from event-registry.constants.ts, e.g., BILLING.PAYMENT.FAILED]
- Background Jobs: [queue names and what triggers them]
- Idempotency Keys: [which endpoints require Idempotency-Key header — Rule 103]

## Business Flow / Key Sequences
[REQUIRED: For each non-trivial mutation, describe the exact execution chain.]
**Example — Plan Purchase:**
1. AdminBillingPlanCommandController receives POST /billing/plans/purchase
2. Validates AdminBillingPlanPurchaseDto (Rule 3)
3. Calls AdminBillingOrchestratorService.purchasePlan(dto)
4. Orchestrator opens DB transaction
5. Calls AdminBillingWalletRepository.deductBalance() with pessimistic lock (Rule 41)
6. Calls MemberPlanRepository.createPlanRecord()
7. Commits transaction — emits BILLING.PLAN.PURCHASED event
8. EventBus listener triggers NotificationService (decoupled — Rule 8)

## File Responsibility Map
[REQUIRED: One line per file stating its single responsibility and what it must NOT do.]
- `admin-billing-orchestrator.service.ts` — Opens transactions, calls micro-services. MUST NOT contain business logic.
- `admin-billing-wallet.repository.ts` — Raw DB queries for wallet table only. MUST NOT call other repositories.
- `admin-billing-plan-purchase.service.ts` — Plan purchase business logic only. MUST NOT touch wallet directly.

## Permissions and Security
[REQUIRED: List every endpoint with its required role(s) and any resource-level checks.]
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| POST /billing/wallet/topup | MANAGER, ADMIN | Actor must belong to same branch as member |
| GET /billing/history | MANAGER, ADMIN, MEMBER | Member can only see own history |

CODEOWNERS path: `src/backend-[role]/[role]-[module]/` → @[reviewer-handle]

## Edge Cases / AI Warnings
[REQUIRED: Minimum 3 entries. Each must cite a specific Rule number and explain
the exact consequence of violating it — not just "be careful".]
- [Specific invariant]: [What breaks if violated] — see Rule [N]
- [Concurrency risk]: [Race condition scenario] — requires pessimistic lock (Rule 41)
- [Transaction boundary]: [What must be atomic and why] — see Rule 8

## Frozen API Contract
[REQUIRED at API Contract Freeze (Rule 67). Copy the exact frozen contract from the frontend
`_features.md`. Backend AI reads THIS section instead of needing the frontend folder.]

### Request Shape
| Endpoint | Method | Request DTO fields |
|---|---|---|
| [e.g. POST /billing/wallet/topup] | POST | [e.g. memberId: string, amountMinor: number] |

### Response Shape
| Endpoint | Response DTO fields | Notes |
|---|---|---|
| [e.g. POST /billing/wallet/topup] | [e.g. walletId, newBalanceMinor, processedAt] | [any computed/joined fields] |

### UI-Required Fields
[REQUIRED: List every field consumed by the frontend UI — table columns, KPIs, charts, badges,
filters, dropdowns, detail views. Backend MUST return all of them (Rule 82A).]
- Table: [field list]
- KPI cards: [field list]
- Charts: [series names and their data fields]
- Status badges: [field list]

### Pagination / Error Contract
- Pagination: [paginated? yes/no — if yes, include PaginationMeta]
- Validation errors: statusCode 400, errorCode `VALIDATION.DTO.FAILED`, validationErrors array
- Business errors: errorCode `DOMAIN.ENTITY.REASON` format

## Rule Compliance Checklist
- [ ] Rule 7: Approved project ORM used for all DB access (no raw SQL outside parameterized/prepared queries)
- [ ] Rule 19: This file updated in same commit as any code change (Freshness Rule)
- [ ] Rule 23: Heavy tasks (emails, PDFs, bulk ops) moved to background jobs
- [ ] Rule 28: All responses wrapped in canonical envelope via ResponseInterceptor
- [ ] Rule 29: Soft-delete by default. (Exception: Immutable event logs (Rule 118) and financial ledgers (Rule 119) are strictly append-only and exempt from standard soft-delete rules. Furthermore, the 90-day tenant hard-delete (Rule 110) must explicitly archive/retain legally required financial/audit ledgers rather than blindly deleting them.)
- [ ] Rule 115: AI-contextual docstrings added to entities/services/controllers
- [ ] Rule 116: MCP-Ready API Design conventions followed
- [ ] Rule 117: RAG-Ready API Projection (`?format=rag`) implemented
- [ ] Rule 103: Idempotency-Key enforced on all state-mutating endpoints
- [ ] Rule 34: N+1 queries prevented — eager loading used where needed
- [ ] Rule 36: Fail-Fast applied — null checks at service layer, DB constraints enforced
- [ ] Rule 41: Pessimistic locking on all concurrent balance/inventory mutations
- [ ] Rule 48: Read (query) and write (command) controllers are separate files
- [ ] Rule 56: findByIdOrThrow() used — null never propagates silently
- [ ] Rule 62: Explicit return types on all service and repository methods
- [ ] Rule 76: Every file starts with // RESPONSIBILITY: comment
- [ ] Rule 79: Every file has // FLOW: comment below RESPONSIBILITY
- [ ] Rule 80: Framework-appropriate method documentation on all service methods, repositories, and utilities
- [ ] Rule 83: RBAC enforced at controller layer via @Roles() — never inline in services
- [ ] Rule 85: Guard clauses used — no nested if/else beyond 2 levels
- [ ] Rule 82A: Response DTO satisfies complete frontend UI Data Requirements from the Frozen API Contract section in this `-backend-feature.md` — no missing table columns, KPI fields, chart series, or relationship fields
- [ ] Rule 82A-SYNC: Frozen API Contract section in this file is up-to-date with frontend `_features.md` API contract
- [ ] Rule 86: Verb contract naming applied (createX, findXById, findXByIdOrThrow)
- [ ] Rule 87: Every service method ≤ 20 lines, single responsibility
- [ ] Rule 89: Domain objects used in services — ORM entities stay in repository layer
- [ ] Rule 92: All ORM orderBy/where with user input validated against allowlist
- [ ] Rule 93: If module touches auth/billing/webhooks/tenant — CODEOWNERS human review required
```

## 20. Performance & Network Optimization (Compression, Rate Limiting & Caching)
* **The Rule:** Enterprise APIs must protect their bandwidth and server load. 
  1. **Rate Limiting / Redis:** Implement strict rate limiters on all public endpoints (especially Auth and generic GET routes). Use Redis to handle rate limiting and to cache expensive, frequently requested data.
  2. **Response Compression:** Enable gzip/Brotli compression at the framework level (e.g., `compression` middleware in Node.js, `GZipMiddleware` in Django) to drastically reduce JSON response sizes and save bandwidth.
* **Why:** This ensures the backend remains highly available under load and saves massive amounts of egress bandwidth costs.

## 21. Asset Optimization (The WebP Rule)
* **The Rule:** Never store unoptimized images (like `.png`, `.jpg`, `.jpeg`, `.bmp`) on the server disk or cloud storage. When an image is uploaded (e.g., a member profile picture), it must immediately be processed, compressed, and converted to `.webp` format before saving.
* **Why:** WebP reduces image file sizes by up to 80% compared to JPEG/PNG without visible quality loss. This drastically reduces cloud storage costs and speeds up frontend loading times, resulting in a much faster app.

## 22. Security Headers, CORS, & Protection
* **The Rule:** An enterprise app cannot go to production naked. Always implement security middleware (NestJS: Helmet / framework-approved security middleware, Django: SecurityMiddleware / framework-approved security middleware) to set strict HTTP headers. Configure strict CORS policies (only allowing exact frontend domains). Ensure inputs are stripped of executable scripts (XSS protection) and standard ORMs are used to natively prevent SQL injection.

## 23. Background Jobs & Queues (No Hanging Requests)
* **The Rule:** An HTTP request should respond in under 500ms. If a user triggers a heavy task (e.g., "Send 1,000 promotional emails", "Generate a 50-page PDF report", "Process a video"), DO NOT process it in the main HTTP thread.
* **Implementation:**

  NestJS: BullMQ backed by Redis

  Django: Celery backed by Redis

  The controller MUST immediately return `202 Accepted` for intentionally asynchronous operations, while the worker performs the heavy processing.

  RabbitMQ and Kafka are NOT approved project infrastructure.

## 24. Database Migrations (No Auto-Syncing & Backward Compatibility)
* **The Rule:** Database schemas MUST be strictly version-controlled using migrations.

  NestJS: TypeORM migrations

  Django: Django migrations

  Production schema auto-synchronization is forbidden.

  NestJS MUST use: `synchronize: false`

  No Prisma Migrate, Flyway, Liquibase, Hibernate schema-update, or alternate migration system is approved for this project.

### Migration File Naming Convention (GAP-3 Fix)

All migration files MUST use this exact naming pattern:

**NestJS / TypeORM:**
```text
{timestamp}-{RoleModule}-{Description}.ts
```
Example:
```text
1720000000000-AdminMembers-AddGymIdIndex.ts
1720000000001-AdminBilling-AddInvoiceStatusColumn.ts
```
- Timestamp MUST be `Date.now()` (milliseconds) at the time of generation.
- `{RoleModule}` MUST use PascalCase and follow the `{Role}{Module}` convention.
- `{Description}` MUST be a plain-English description of what the migration does.
- Every migration file MUST export exactly: `public up()` and `public down()`.
- `down()` MUST reverse EVERY operation in `up()` exactly — it is not optional.

**Django:**
```text
{NNNN}_{role}_{module}_{description}.py
```
Example:
```text
0001_admin_members_add_gym_id_index.py
0002_admin_billing_add_invoice_status_column.py
```
- Django auto-generates the `{NNNN}` prefix — do not invent it.
- Human-authored migration names must match the snake_case pattern above.

### Migration Audit Checklist
Before marking any migration PASS:
```text
[ ] File name follows the canonical naming pattern above
[ ] up() performs ONLY the documented schema change — no business logic
[ ] down() correctly reverts EVERY operation in up()
[ ] No column dropped and re-added in the same migration (two-phase rule)
[ ] No NOT NULL column added to a non-empty table without a DEFAULT value
[ ] Migration does not touch tables outside its owning feature module
[ ] NestJS: migration included in migrations array of TypeORM config
[ ] Django: makemigrations was run and the auto-generated file is committed
```

* **Backward Compatibility Requirement:** Existing v1 clients must be supported during DB migrations. Migrations must be strictly backward-compatible. Never drop a column in the same migration that adds a `NOT NULL` replacement. Do it in two phases. Avoid single-step destructive migrations.
* **Why:** If the AI needs to add a new column to a table, it should generate a explicit migration file. This guarantees that production databases can be safely upgraded (or rolled back) without data loss or rogue schema syncing breaking the app, and ensures no downtime for legacy clients.



## 25. Graceful Shutdown & Health Probes (Kubernetes/Docker Ready)
* **The Rule:** Enterprise apps are deployed in containers. You must include a `/health` or `/ping` endpoint for Kubernetes/AWS liveness probes. Furthermore, the application must intercept termination signals (`SIGINT`, `SIGTERM`).
* **Why:** When a server restarts or a container is killed, it shouldn't just die instantly, dropping user requests mid-flight. It must stop accepting new requests, finish processing current ones, safely close the database connection, and *then* shut down.

## 26. API Versioning (URI Based)
* **The Rule:** An enterprise API must never be released without a versioning strategy. Always prefix routes with a version (e.g., `/api/v1/users`). In frameworks like NestJS, enable URI versioning globally. *(Exception: Operational endpoints such as `/health`, `/health/live`, `/health/ready`, and `/metrics` are exempt from `/api/vN` business-route versioning and remain at the root.)*
* **Why:** If the business scales and requires mobile apps or external integrations, releasing a breaking `v2` API should not crash the legacy mobile apps that still rely on `v1`.

## 27. API Testing Strategy (Three-Tier: Jest Unit + API E2E + Selenium UI)
* **The Rule:** This project uses a strict three-tier testing strategy:
  1. **Jest `.spec.ts` (Unit Tests):** Co-located with source files (see Rule 11). Tests individual service methods, DTOs, and utilities in isolation with mocked dependencies. This is the AI's primary safety net when modifying a micro-file.
  2. **Python `pytest` (Black-Box E2E / API Tests):** Lives in a top-level `backend-e2e/` directory, completely decoupled from the Node.js runtime. **CRITICAL: While the `backend-e2e/` folder is separated from `src/`, its internal directory structure MUST strictly mirror the domain-driven grouping of the backend (e2e files MUST end with `-e2e.py` to identify them immediately, e.g., `backend-e2e/backend-superadmin-e2e/superadmin-dashboard/test-superadmin-dashboard-e2e.py`). Never dump test files into a flat `backend-e2e/` root folder.** Tests the running API as a true external client — no knowledge of internal implementation. QA engineers and CI pipelines use this tier.
  3. **Python Selenium (UI Behavior Tests):** Lives in a top-level `backend-selenium/` directory. Tests the complete frontend-to-backend user flow as a real browser would. Files MUST end with `-selenium.py` (e.g., `test-superadmin-dashboard-selenium.py`).
* **Strict Boundary:** Jest is NEVER used for API/E2E testing. Pytest is NEVER used for unit testing internal service logic. These three tiers must never overlap.

## Summary Checklist for Developers Providing Context to AI:
1. Identify the exact layer where the bug/feature resides (Validation? DB Query? Business Logic?).
2. Select the **one or two** micro-files associated with that layer.
3. Pass ONLY those files to the AI.
4. Review the AI's isolated changes.
* **For E2E Test Fixes/Updates:** If an API contract changes and the E2E test needs updating, provide the AI with ONLY the specific feature's E2E folder (e.g., `backend-e2e/backend-superadmin-e2e/superadmin-dashboard/`) and the corresponding backend module. Do NOT feed the entire `backend-e2e/` directory to the AI to prevent token explosion.

---

## 28. Standardized Response Envelope (The API Contract)
* **The Rule:** Every API endpoint — success or failure — must return a response in a single, predictable JSON "envelope" shape. Never return raw objects, raw arrays, or ad-hoc structures directly from controllers. Both Success and Error responses must share the EXACT SAME canonical type definition.
* **The Complete Canonical Schema (all 8 fields — single source of truth):**
  ```typescript
  // src/core/types/api-response.types.ts
  export interface ApiResponse<T> {
    success: boolean;                        // true on 2xx, false on all errors
    message: string;                         // human-readable, always present
    data: T | null;                          // response payload OR null on error
    meta?: PaginationMeta;                   // present only on paginated list responses
    error?: string;                          // error name / category (e.g. "NOT_FOUND")
    errorCode?: string;                      // machine-readable DOMAIN.ENTITY.REASON (e.g. "BILLING.SUBSCRIPTION.EXPIRED")
    statusCode?: number;                     // HTTP status code, present on error responses
    validationErrors?: ValidationErrorItem[]; // present on canonical 400 validation failures; 422 only when explicitly approved by the endpoint API contract
  }

  export interface ValidationErrorItem {
    field: string;    // exact DTO property name, supports dot-notation for nested (e.g. 'address.city')
    message: string;  // human-readable error from class-validator
  }
  ```
* **Field Presence Conditions — this table is the contract AI agents must follow:**

  | Field | Success (2xx) | Error (4xx/5xx) | Validation Error (400/422) |
  |---|---|---|---|
  | `success` | `true` | `false` | `false` |
  | `message` | Always present | Always present | Always present |
  | `data` | Present with payload | `null` | `null` |
  | `meta` | Present if paginated | Absent | Absent |
  | `error` | Absent | Present | `"VALIDATION_ERROR"` |
  | `errorCode` | Absent | Present where applicable | `"VALIDATION.DTO.FAILED"` |
  | `statusCode` | Absent | Present | Present (`400`) |
  | `validationErrors` | Absent | Absent | Present (array of field errors) |

* **Rules:**
  - `data` is ALWAYS `null` on error responses. Never put error detail inside `data`.
  - `validationErrors` is ONLY present on validation failures — never on generic errors.
  - `errorCode` follows `DOMAIN.ENTITY.REASON` in `SCREAMING_SNAKE_CASE` (e.g., `BILLING.SUBSCRIPTION.EXPIRED`). The frontend relies on this code to trigger specific UI logic (e.g., redirecting to a payment page). See full definition in Rule 64.
  - `meta` is present only on paginated list responses. For non-paginated lists (e.g., dropdowns), `meta` must be `undefined` — never an empty object `{}`.
* **Implement via:** A global `ResponseInterceptor` (NestJS) that wraps all successful controller returns. A global `ValidationExceptionFilter` (Rule 98) that transforms `400` errors into the `validationErrors` shape. The AI should NEVER shape the raw response manually inside a controller or service.
* **Why:** When an AI frontend agent hits an API, it needs a predictable contract. If success and error payloads have totally different shapes, the frontend's generic `ApiResponse<T>` parser becomes brittle. A singular standard envelope with one canonical schema — covering all 8 fields — eliminates all ambiguity and ensures Rules 64 and 98 are never treated as isolated additions.


---

## 29. Soft Deletes (Never Hard-Delete Production Data)
* **The Rule:** Never use destructive `DELETE` SQL / ORM calls directly on production data. Instead, all entities must have an `is_deleted: boolean` (or `deleted_at: timestamp`) column. A "delete" operation only sets this flag — the data is never physically removed.
* **Exemptions (CRITICAL):** Rule 118 immutable event logs (`events_log`) and Rule 119 financial ledger rows (`ledger_entries`) are append-only and permanently exempt from soft-delete mechanics — they must NEVER carry a `deleted_at` column or be filtered by one. See Rule 110 for the full per-record-type retention hierarchy.
* **Why:**
  1. **Audit & Recovery:** If an admin accidentally deletes 1,000 members, the data is instantly recoverable.
  2. **Referential Integrity:** Foreign keys referencing a "deleted" record remain valid, preventing cascade failures.
  3. **AI Safety:** An AI asked to "implement the delete endpoint" will set a flag, not wipe database rows. This prevents catastrophic, irreversible data loss.
* **Implementation:** Add a global soft-delete query filter at the repository layer so that all standard `find` queries automatically exclude soft-deleted records.

  NestJS (TypeORM): use a base repository class that wraps `createQueryBuilder` with `.andWhere('entity.deletedAt IS NULL')`, or apply `@DeleteDateColumn()` combined with `withDeleted(false)` as the default in base query helpers.

  Django: use a custom QuerySet with a `delete_at__isnull=True` default filter, or `django-softdelete`.

  Soft-delete mechanics MUST be applied at the repository layer only — never in service methods. Column hooks (`@DeleteDateColumn` in TypeORM) apply to governed entities only.
* **Data Privacy / Legal Erasure Exception:** Soft-delete is the normal operational mechanism. Legally required data retention and right-to-erasure workflows (Rule 35, Rule 110) are the ONLY explicit hard-deletion/anonymization exceptions, and must be performed via dedicated background jobs with strict audit logging.

---

## 30. Audit Trail / Activity Log (Who Did What & When)
* **The Rule:** Every meaningful state change to critical entities (Members, Payments, Staff, Settings) MUST be recorded in an `audit_logs` table. At minimum, log: `actor_id`, `actor_role`, `action` (e.g., `MEMBER_UPDATED`), `entity_type`, `entity_id`, `old_value` (JSON), `new_value` (JSON), `ip_address`, `timestamp`.
* **Sensitive Data Redaction (CRITICAL):** The `old_value` and `new_value` JSON payloads MUST be scrubbed of sensitive PII (passwords, payment tokens, government IDs) before saving to the audit log. Audit logs must have strict access control, defined retention limits, and encryption for highly sensitive payloads.
* **Completeness Rule:** Mutations occur from HTTP requests, Background Jobs, Event Consumers, Scheduled Jobs, Webhooks, and Internal Commands. The audit trail architecture MUST integrate with the mutation layer (e.g., repository or orchestrator) rather than relying solely on HTTP interceptors to guarantee completeness.
* **How:** Implement this as a cross-cutting concern using:
  - **NestJS:** An interceptor, event listener, or AOP-style wrapper around repositories that fires after mutating actions.
  - **Django:** Model `post_save` / `post_delete` signals.
* **Why:** Regulators, auditors, and enterprise clients will always ask "who changed this record and when?". Building this from day one costs almost nothing. Retrofitting it onto a live production system costs weeks. It also gives AI agents an immutable history to reason about when debugging.

---

## 31. Idempotency Keys for Critical Mutations
* **The Rule:** Any endpoint that triggers a financial transaction, sends a communication, or creates a resource that must never be duplicated MUST support an `Idempotency-Key` request header.
* **Why:** Networks are unreliable. A client might retry a `POST /payments` request after a timeout, not knowing the first one succeeded. Without idempotency, the member gets double-charged.
* **Superseded by Rule 103:** *Note: Rule 103 expands this requirement from "critical mutations" to ALL state-mutating endpoints (`POST`, `PATCH`, `PUT`, `DELETE`). Rule 103 is the superseding architectural standard and defines the strict atomic/transactional safety contracts that must be implemented. AI agents must follow Rule 103's broader scope and safety constraints.*

---

## 32. Observability: The Three Pillars (Logs, Metrics, Traces)
* **The Rule:** Logging alone is not sufficient for enterprise observability. You MUST implement all three pillars:
  1. **Structured Logs** (Rule 14): Already covered. Use JSON-formatted logs.
  2. **Metrics:** Expose a `/metrics` endpoint (Prometheus format) tracking: request count, request latency histograms, error rates, queue depth, DB connection pool usage. Use libraries like `prom-client` (Node), `django-prometheus` (Django).
  3. **Distributed Traces:** Integrate OpenTelemetry to trace a single request as it flows through controllers → services → repositories → external APIs. Each span should include `correlation_id`, `duration_ms`, and `status`.
* **Why:** When a production request is slow or fails silently, logs tell you WHAT happened, metrics tell you HOW OFTEN it happened, and traces tell you EXACTLY WHERE the bottleneck is. An AI debugging agent with access to all three can diagnose issues orders of magnitude faster.

---

## 33. Secret Management (Never Trust `.env` Files in Production)
* **The Rule:** `.env` files are acceptable in local development ONLY. In staging and production environments, secrets (API keys, DB passwords, JWT secrets) MUST be injected from a dedicated secrets manager:
  - **AWS:** AWS Secrets Manager or Parameter Store
  - **GCP:** Google Secret Manager
  - **Azure:** Azure Key Vault
  - **Self-hosted:** HashiCorp Vault
* **Rules:**
  1. `.env` files must NEVER be committed to source control (enforce with `.gitignore`).
  2. The application must fail fast on startup with a clear error if a required secret is missing.
  3. Secrets must be rotated regularly. The application should support hot-reloading of secrets without a restart.
* **Why:** A leaked `.env` file on GitHub has caused catastrophic security breaches for companies. An AI writing deployment configs must be instructed to always reference the secrets manager, never hardcode credentials.

---

## 34. Database Query Optimization (The N+1 Rule & Index Strategy)
* **The Rule:** The single most common performance killer in any ORM-backed backend is the N+1 query problem. You must proactively prevent it.
  1. **N+1 Prevention:** Always use eager loading / `JOIN` fetching when you know you'll need related data.

     NestJS (TypeORM): use `relations: ['plan']` or `leftJoinAndSelect` in the query builder.

     Django: use `select_related()` for ForeignKey / OneToOne and `prefetch_related()` for ManyToMany / reverse relations.

     Never fetch a list of 100 members and then loop to fetch each one's plan separately.
  2. **Index Strategy:** Indexing should be based on actual query patterns, cardinality, and query plans. Foreign keys and frequently queried columns (in `WHERE` or `ORDER BY` clauses) should be evaluated for indexing. Do not blindly index every column, as this impacts write performance. Indexes should be explicitly defined in migration files — never rely on the ORM to create them automatically.
  3. **Slow Query Logging:** Enable slow query logging in the database (queries > 100ms). Review this log weekly.
* **Why:** An AI asked to write a "Get all members with their plans" repository method will often produce an N+1 query by default. This rule forces a review gate.

---

## 35. GDPR & Data Privacy by Design
* **The Rule:** Data privacy is not a feature — it is a foundation. Implement the following from day one:
  1. **Data Minimization:** Only collect data you absolutely need. Never store sensitive fields (passwords, card numbers) in plaintext. Always hash passwords (bcrypt/argon2) and tokenize payment data.
  2. **Right to Erasure:** The "delete account" flow must be able to fully anonymize or purge a user's PII (Personally Identifiable Information) from all tables, logs, and caches on demand. (Works hand-in-hand with Soft Deletes — Rule 29).
  3. **Data Retention Policy:** Old logs, inactive accounts, and historical records must be automatically purged after a defined retention period (e.g., 3 years). Implement a scheduled background job for this.
  4. **Sensitive Field Masking in Logs:** Never log raw PII. Phone numbers, emails, and names in log lines must be partially masked (e.g., `r***@gmail.com`).
* **Why:** GDPR violations can result in fines up to 4% of global annual revenue. An AI writing a logging statement must be aware it cannot log raw user data.

---

## 36. Defensive Programming & Fail-Fast Principle
* **The Rule:** Never assume inputs are valid at any layer. Every function, service method, and repository call must validate its inputs and fail immediately and loudly if assumptions are violated — rather than silently producing corrupt data downstream.
  - **At the Controller layer:** Validate request shape with DTOs/serializers (Rule 3).
  - **At the Service layer:** Assert that objects received from repositories are not null before operating on them. If a `findById` returns `null`, throw the appropriate custom exception immediately (Rule 6) — don't pass `null` to the next function.
  - **At the Database layer:** Enforce data integrity constraints (NOT NULL, UNIQUE, CHECK constraints, foreign keys) at the database level. Never rely solely on application-level validation.
  - **Critical Operations (Transactions, External APIs, Queues):** Any operation that interacts with unpredictable systems or requires all-or-nothing execution MUST be wrapped in a `try-catch` block.
    1. **Database Transactions:** If a multi-step mutation (e.g., creating a user and charging their card) fails, the `catch` block MUST explicitly rollback the transaction to prevent corrupted, partial data states.
    2. **Debugging & Traceability:** The `catch` block MUST log the exact error using the centralized logger (which automatically attaches the `trace_id`) before returning a controlled error to the frontend. This ensures immediate, pinpoint debugging when transactions or external services fail.
* **Why:** Silent failures are the hardest bugs to find and the most dangerous in production. An AI writing a service method that receives a `null` user and calls `user.email` will produce a `NullPointerException` / `AttributeError` that crashes the request. The Fail-Fast principle ensures errors surface immediately at their origin, with a clear, actionable error message, not silently 10 layers later.


---

## 37. Strict Edge Payload Validation (No Mass Assignment)
* **The Rule:** It is not enough to just validate that `email` and `password` exist in a DTO. Your payload validator MUST strictly strip or reject any unrecognized properties sent by the client. (e.g., in NestJS: `whitelist: true, forbidNonWhitelisted: true`). Additionally, enforce a **default global JSON payload size limit of `1mb`** at the framework middleware level. Individual endpoints that require larger payloads (e.g., file uploads) must explicitly override this limit per-endpoint (see Rule 72).
* **Why:** If a malicious user sends `{ "email": "test@test.com", "role": "admin" }` to the registration endpoint, and you blindly pass the `req.body` to the ORM's save method, you have a Mass Assignment vulnerability. Stripping unknown keys guarantees this is mathematically impossible.

---

## 38. Domain-Driven Module Grouping (The "Route Group" Equivalent)
* **The Rule:** Just like the frontend uses prefixed role containers like `frontend_erp` or `frontend_superadmin` to isolate UI domains, the backend MUST group its modules into top-level role/domain folders before splitting them into specific features.
  - ❌ **BAD:** `src/billing/`, `src/superadmin-stats/`, `src/attendance/` (All dumped into a flat directory).
  - ✅ **GOOD:**
    ```
    src/backend-manager/
    └── manager-modules/
        └── manager-billing/
    src/backend-superadmin/
    └── superadmin-modules/
        └── superadmin-stats/
    src/backend-admin/
    └── admin-modules/
        └── admin-attendance/
    ```
* **Frontend-First Naming Lock:** Since this project follows a frontend-first workflow (UI built with mock data before backend), the frontend feature folder names are the canonical source of truth. When backend development begins, the backend AI/developer MUST reuse the EXACT same folder/module name as the frontend, but translated to kebab-case. Renaming a feature's core semantic meaning during backend development is strictly forbidden.
* **Casing Translation Rule (CRITICAL):** The semantic name stays identical across frontend/backend; ONLY the casing style changes per language/framework convention. The frontend uses `snake_case` and the backend uses `kebab-case` for folders (e.g., frontend `admin_billing`, backend `backend-admin/admin-modules/admin-billing`). This enforces a hard visual boundary between stacks through the mandatory `backend-` namespace prefix (Rule 0D) and the strict casing difference.
* **API Route Grouping & Mirroring:** The API endpoint URLs must strictly mirror this domain grouping (e.g., `/api/v1/superadmin/stats`, `/api/v1/admin/members`). *(Naming Rule: The semantic module name stays identical to the frontend module name — the backend physical namespace only adds the mandatory role prefix. Example: frontend `manager_billing/` → backend folder `manager-billing/`, files `manager-billing-*.ts`, route `/api/v1/manager/billing/...`.)* The **canonical route namespace** is `/api/v1/{role}/{module}/...` for role-scoped routes (e.g., `/api/v1/manager/billing/invoices`) and `/api/v1/{module}/...` for genuinely public/shared endpoints (e.g., `/api/v1/auth/login`). Avoid mixing these two forms within the same module. Furthermore, page-to-endpoint naming must mirror exactly: if the frontend `/auth/` module calls an API, the route MUST be `/api/v1/auth/...`, not `/api/v1/session/...`. This ensures the debugging flow from UI page -> Frontend Folder -> Backend Folder -> Backend Route is 100% identically named (modulo dashes/underscores).
* **1:1 Mirror Mapping:** The backend folder structure (AND the `e2e/` test folder structure) MUST strictly mirror the frontend route structure. If the frontend `frontend_superadmin` domain has 5 feature folders (e.g., `superadmin_broadcasts`, `superadmin_coupons`, `superadmin_affiliates`), the backend `backend-superadmin` domain MUST have exactly 5 matching modules.

#### Top-Level Role Structure (MANDATORY — See also Rule 2)

All backend role containers MUST follow this exact two-directory structure. This is not a recommendation — it is a hard architectural constraint:

```text
backend-{role}/
├── {role}-core/
└── {role}-modules/
```

Feature modules MUST always be children of `{role}-modules/`. Direct placement of any feature module under `backend-{role}/` is forbidden.

❌ **FORBIDDEN:**
```text
backend-manager/
├── manager-core/
├── manager-members/    <-- VIOLATION
├── manager-billing/    <-- VIOLATION
└── manager-attendance/ <-- VIOLATION
```

✅ **REQUIRED:**
```text
backend-manager/
├── manager-core/
└── manager-modules/
    ├── manager-members/
    ├── manager-billing/
    └── manager-attendance/
```

* **Why:** This creates a perfect 1:1 mapped architecture. If a bug occurs in the "Coupons" feature, you provide the AI with exactly two things: `frontend/.../frontend_superadmin/superadmin_coupons/` and `backend/.../backend-superadmin/superadmin-modules/superadmin-coupons/`. The AI gets the complete vertical slice (Frontend UI + Backend Logic) for that specific feature without seeing the rest of the application. This guarantees zero hallucination, massive token savings, and perfect separation of concerns.



---

## 39. True Multi-Tenancy (Database-per-Tenant Architecture)
* **The Rule:** The application MUST be built using a strict **Database-per-Tenant** architecture to guarantee absolute data isolation, high performance, and security. It is unacceptable to dump all gyms' data into a single database with a `tenant_id` column (row-level multi-tenancy).
* **Architecture Strategy:**
  1. **Master Database:** A central database (e.g., `smart_gym_master`) must exist solely to manage global resources: Users, Authentication, Tenants (Gyms), Subscriptions, and Feature Flags.
  2. **Tenant Databases:** Every time a new gym registers, the backend must programmatically create a brand-new database (e.g., `tenant_db_101`) and run all schema migrations on it automatically. *(Note: All these logical databases reside within the same single PostgreSQL server infrastructure unless the infrastructure architecture explicitly defines otherwise; do not spin up new physical servers/VPS per tenant).*
  3. **Dynamic Connection Routing (Request Scoped):** The backend must intercept every incoming API request. Using a global middleware or interceptor, it must extract the `x-tenant-id` (from HTTP headers or JWT payload) and dynamically construct or switch the database connection to point to that specific tenant's database for the lifecycle of that request.
  4. **Strict Tenant Authorization (CRITICAL):** `x-tenant-id` MUST NOT be trusted merely because the client supplied it. The server MUST verify that the authenticated actor is explicitly authorized to access that tenant in the master database before selecting the tenant DataSource. The flow must be: `Request → Authentication → Tenant Authorization → Trusted Tenant Context → DataSource Resolver`.
  5. **Connection Pool Limits:** **⚠️ See Rule 63 before implementing this** — the connection pool budget must be calculated across ALL active tenant DataSources combined, not per-tenant. Blindly applying `max: 20` per tenant DataSource will exhaust the database server's connection limit under load.
* **How to Apply to Different Frameworks:**
  - **NestJS (Node/TypeScript):** Do not use a static, monolithic ORM module root configuration. Use request-scoped providers or custom connection factories that cache and resolve database connection/client instances based on the request's tenant header.
  - **Django (Python):** Use database routers (`db_for_read`, `db_for_write`) paired with thread-local storage or middleware to dynamically route queries to the correct database alias based on the request.
* **Why:** If Gym A and Gym B share the same database tables, a single missing `WHERE tenant_id = X` clause in a business query results in a catastrophic cross-tenant data breach. Database-per-tenant completely eliminates this risk at the infrastructure level. Furthermore, it can reduce dataset size per tenant and improve isolation/performance characteristics, avoiding massive multi-tenant table bottlenecks.
* **Tenant DB vs Query Filters (Belt & Suspenders):** Even though Database-per-Tenant provides physical isolation, ALL ORM queries MUST still strictly include `gymId` and `branchId` filters as mandated by Rule 0G. This double-security approach ensures logic remains perfectly isolated and future-proofs the codebase if tenants are ever merged into a shared DB.

---

## 40. Multi-Medium Sending Architecture (Proof of Delivery)
* **The Rule:** Whenever the system needs to send something to a user as a proof of transaction (e.g., a bill, a receipt, a report, or an alert), the backend MUST architect the payload and services to support at least **two different mediums** (e.g., WhatsApp and Email, or SMS and Email).
* **Mandatory Fallback:** One of the two mediums must always be configured as the mandatory fallback or default. The backend API should accept an explicit `deliveryMedium` parameter (e.g., `WHATSAPP` or `EMAIL`) from the frontend payload and route the message via the chosen service.
* **Why:** This ensures that if one provider fails or a user doesn't have WhatsApp, they can still receive critical proofs via Email or another backup medium.

---

## 41. Transaction Locks & Race Condition Prevention
* **The Rule:** For highly concurrent mutations (e.g., deducting wallet balances, booking limited seats, processing inventory), standard database transactions are not enough to prevent race conditions. You MUST implement **Pessimistic Locking** or **Optimistic Locking**.

  **Pessimistic Locking:**

  NestJS (TypeORM): use `queryRunner.manager.getRepository(Entity).findOne({ where: ..., lock: { mode: 'pessimistic_write' } })` inside a transaction managed by a `QueryRunner`.

  Django: use `select_for_update()` within a `transaction.atomic()` block.

  **Optimistic Locking:** use a `version` or `revision` integer column checked on update — reject writes where the version no longer matches the read version.
* **Why:** If two concurrent requests try to deduct money at the exact same millisecond, a standard transaction might allow both to succeed based on stale read data, causing negative balances. Enforcing this rule ensures AI always explicitly handles concurrency.

---

## 42. Distributed Cron Jobs (No Local Schedulers)
* **The Rule:** Never use local cron jobs (like `setInterval`, `node-cron`, or `@Cron()` without a lock) inside the backend code. You must use a **Distributed Task Scheduler** backed by Redis (like BullMQ in Node, Celery Beat in Python) or a database-backed distributed lock (like Redlock/ShedLock).
* **Why:** In an enterprise environment, your backend will scale horizontally (e.g., 3 instances running behind a load balancer). If you use a local cron job to send "Morning Reminders", all 3 instances will fire it simultaneously, sending 3 duplicate emails. A distributed scheduler provides **single scheduling ownership** across the cluster. However, distributed systems can retry/redeliver, so the job processing itself MUST still be idempotent with deduplication where required.

---

## 43. True E2E Test Database Isolation & Lifecycle Verification
* **The Rule:** End-to-End (E2E) test suites must NEVER run against your local development or production databases. Instead, the test suite setup (e.g., `conftest.py`) must dynamically hit the API to create a brand-new, isolated Test Tenant/Database specifically for that test run. All subsequent tests must inject this test tenant's ID into the `x-tenant-id` headers.
* **The Data Lifecycle Rule:** True E2E tests must verify the full CRUD lifecycle within that isolated database. Tests cannot rely on stub IDs. They must:
  1. **POST**: Create a uniquely identifiable record and extract its real ID from the `201` response.
  2. **GET by ID**: Fetch that exact ID and assert `200 OK`.
  3. **PATCH**: Update that exact ID and assert `200 OK`.
  4. **DELETE**: Delete that exact ID, and then make a follow-up `GET` request to mathematically verify a `404 Not Found` response is returned.
* **Why:** This architecture guarantees 100% test isolation, prevents test data pollution in your main database, and actively proves that your database provisioning systems are actually executing correctly under the hood.

---

## 44. Centralized API Rate Limit Tiers
* **The Rule:** Define distinct rate-limit tiers in a centralized `rate-limit.config.ts`. (e.g., Public Auth: 5 req/min, Authenticated Read: 100 req/min, Export: 2 req/min). Never hardcode rate limits inside controllers.

## 45. Webhook Signature Verification
* **The Rule:** All inbound webhooks (e.g., Payment gateways) MUST verify the provider's documented cryptographic signature mechanism and implement replay-protection requirements (e.g., timestamp bounds checking) before processing. Do not assume HMAC-SHA256 is universally correct; strictly adhere to the third-party provider's official SDK or webhook documentation.

## 46. Strict Input Sanitization Layer
* **The Rule:** Beyond validation, inputs must be sanitized. Strip HTML/script tags from free-text fields. Strip leading/trailing whitespaces. Normalize emails (lowercase) and phone numbers to canonical formats before saving.

## 47. Circuit Breaker Pattern for External Services
* **The Rule:** External adapters (WhatsApp, SMS, Payments) MUST be wrapped in a Circuit Breaker. If the external service fails repeatedly, the breaker opens, rejecting requests instantly with a `503` to prevent thread pool exhaustion, triggering a defined fallback queue.

## 48. CQRS Lite (Query vs Command Controllers)
* **The Rule:** Read operations (GET) and Write operations (POST/PATCH/PUT/DELETE) must be split into separate controllers (e.g., `[role]-[module]-query.controller.ts` and `[role]-[module]-command.controller.ts`). This guarantees AI never accidentally touches mutation logic when fixing a read query.

## 49. Explicit Module Dependency Graph (Including Runtime Events)
* **The Rule:** Every module must have a `[role]-[module]-dependencies.md` detailing which other modules it depends on, and which modules depend on it. This maps downstream impact instantly.
* **Event Dependency Rule:** Event publication/subscription is a runtime dependency. Every published/consumed event MUST be explicitly listed in the module's `[role]-[module]-dependencies.md`. Undeclared event subscriptions are forbidden. Event payload contracts must be strictly validated at the consumer boundary.

## 50. Standardized Event Naming Convention
* **The Rule:** Event names MUST follow `DOMAIN.ENTITY.ACTION` in SCREAMING_SNAKE_CASE (e.g., `BILLING.PAYMENT.FAILED`, `MEMBERS.MEMBER.REGISTERED`, `ATTENDANCE.SESSION.CLOSED`) and be registered in a centralized `event-registry.constants.ts`. Two-part forms like `MEMBER_REGISTERED` or `MEMBER.REGISTERED` are non-compliant.

### Single Event Registry Enforcement (NON-NEGOTIABLE)

There MUST be exactly **one** `event-registry.constants.ts` file in the entire codebase, located at:

```
src/core/event-registry.constants.ts
```

Creation of any secondary event registry file is **strictly forbidden**, regardless of intent:

❌ **FORBIDDEN — these MUST NOT exist:**
- `billing-events.constants.ts`
- `member-events.ts`
- `admin-event-registry.ts`
- Any file attempting to define a subset of domain events outside the central registry

When a new event is needed, the AI MUST add it to the existing `src/core/event-registry.constants.ts` — never create a new file. If a secondary event registry file is discovered during an audit, it MUST be flagged as an architecture violation and its contents merged into the central registry.

> **AI AGENT NOTE:** Before emitting or consuming any event, verify the event name exists in `src/core/event-registry.constants.ts`. If it does not exist, add it there — never inline the string or create a parallel constants file.

## 51. API Changelog & Deprecation Policy
* **The Rule:** When an endpoint changes destructively, do not delete it immediately. Return a `Deprecation` header with a sunset date, track it in `CHANGELOG.md`, and maintain it for the deprecation window.

## 52. JWT Refresh Token Rotation & Revocation
* **The Rule:** Access tokens must be short-lived. Refresh tokens must be stored in HttpOnly cookies. On every refresh, the old token must be rotated/invalidated. A Redis denylist must exist for immediate manual revocation.

## 53. Sensitive Field Encryption at Rest
* **The Rule:** Aadhaar numbers, bank accounts, and medical notes MUST be encrypted at the application layer (AES-256) before hitting the DB. Use an `@Encrypted` decorator or EncryptionService. Hash is not enough.

## 54. Brute Force & Account Lockout Policy
* **The Rule:** After 5 failed login attempts, the account is temporarily locked via Redis. Lockout state must be logged in the audit trail.

## 55. Deterministic Seed Data Strategy
* **The Rule:** Every module must define seed files that are deterministic and idempotent. Placement and naming (`.seed.ts`) MUST strictly follow the canonical specification defined in Section 0G-B (Seed File Specification). A master seed script orchestrates them in dependency order for local testing.

## 56. Strict Null Safety in Repository Returns
* **The Rule:** Repositories must correctly type `findById()` as returning `Entity | null`. AI must use a dedicated `findByIdOrThrow()` method to ensure null exceptions are handled defensively.

## 57. Request Context Propagation (AsyncLocalStorage)
* **The Rule:** Use Node's `AsyncLocalStorage` to store context (tenant_id, user_id, trace_id) at the request boundary. Deep services/repositories must pull from this context rather than prop-drilling parameters through 5 layers of functions.

## 58. Standardized Database Entity Base Abstraction

* **The Rule:** All SOFT-DELETABLE database entities MUST implement the common base abstraction for:
  - `id` (UUID)
  - `createdAt`
  - `updatedAt`
  - `deletedAt`

* **NestJS / TypeORM:** Use the approved common BaseEntity abstraction for soft-deletable entities.

* **Django:** Use the approved abstract base model for soft-deletable entities.

* **Immutable Entity Exception:** Rule 118 `events_log` and Rule 119 `ledger_entries` are immutable records and MUST NOT contain or depend on `deletedAt` / soft-delete behavior.

  Immutable record types may use a dedicated immutable base abstraction containing only the common immutable metadata required by the architecture.

* AI agents MUST NOT manually redefine common base fields inconsistently across entities.

* Base repository soft-delete filtering applies only to entities governed by soft-delete semantics.

* Immutable event and financial records MUST bypass soft-delete filtering while remaining permanently append-only.

## 59. API Response Time SLA Categories
* **The Rule:** Every endpoint must declare its SLA category in a comment (`// SLA: FAST`). FAST (< 200ms), STANDARD (< 500ms), HEAVY (> 500ms). Heavy tasks must be moved to background jobs (Rule 23). Enforce via monitoring middleware.

## 60. Strict Foreign Key Naming Convention
* **The Rule:** Database columns must use `snake_case` (e.g., `member_id`). TypeScript model/entity properties must use `camelCase` (e.g., `memberId`). Explicitly map them in the ORM model definition.

  NestJS (TypeORM): `@Column({ name: 'member_id' })` and `@JoinColumn({ name: 'branch_id' })`.

  Django: snake_case column names are the default; use `db_column=` on a `Field` only when overriding.

  Foreign key constraints MUST follow the canonical 3-part form `FK_[table]_[referenced_table]_[column]` (e.g., `FK_subscriptions_members_member_id`). This is the same pattern as Rule 100 — the 2-part form `FK_[table]_[referenced_table]` is deprecated and non-compliant.

## 61. Dead Letter Queue (DLQ) for Failed Background Jobs
* **The Rule:** Every background job queue (BullMQ/Celery) MUST have a configured Dead Letter Queue. If a job fails all retries, it must be moved to the DLQ (not discarded) so admins can manually inspect and retry it.

## 62. Explicit Return Types on ALL Service Methods
* **The Rule:** Relying on TypeScript implicit `any` or inferred returns is forbidden for async operations. Every service method and repository method MUST have an explicitly declared return type (e.g., `Promise<ManagerMembersDomainModel>`).

## 63. Database Connection Pool Configuration
* **The Rule:** Default ORM connection pools are forbidden. The `database.config.ts` must explicitly define `max` connections (e.g., 20), `acquireTimeout` (30000ms), and `idleTimeoutMillis` (10000ms). **CRITICAL for Multi-Tenancy (Rule 39):** This pool configuration applies to the GLOBAL connection manager, not per-tenant DataSource. With N tenants on the same DB server, the total active connections across all tenant DataSources must be budgeted carefully. Do NOT blindly apply `max: 20` per tenant DataSource or you will exhaust the database server's connection limit.

## 64. Structured Machine-Readable Error Codes
* **The Rule:** Error responses must include a machine-readable `errorCode` string following `DOMAIN.ENTITY.REASON` (e.g., `BILLING.SUBSCRIPTION.EXPIRED`). The frontend relies on this code to trigger specific UI logic (e.g., redirecting to a payment page).

## 65. File Upload Security & Validation
* **The Rule:** All file uploads must undergo MIME type validation (not just extension checking) and enforce strict size limits. Files must never be saved directly to the server disk; upload to cloud storage (e.g., S3). Original filenames must be discarded and replaced with a UUID.

## 66. Strict Database Table Naming Convention
* **The Rule:** All table names must be `plural_snake_case` (e.g., `payment_transactions`). Junction tables must combine the two table names alphabetically (e.g., `member_plans`). Never use legacy prefixes like `tbl_`. Enforce explicitly via `@Entity('table_name')`.

## 67. API Contract Freeze & Cross-Layer Approval (Mutual Contract Freeze)
* **The Rule:** The API contract between the frontend and backend MUST be mutually agreed and frozen before backend implementation code is written. This project follows a **frontend-first workflow** — the sequence is:

```text
Frontend Feature Development
    ↓
UI Data Requirements
    ↓
API Contract (endpoints, request shape, response DTO shape)
    ↓
Frontend TypeScript types + Zod schema
    ↓
MSW handler (frontend mock)
    ↓
Mutual Contract Freeze
    ↓
Backend DTO + OpenAPI/Swagger documentation
    ↓
Backend implementation (services, repositories, DB queries)
```

* **What "Mutual Contract Freeze" means:**
  1. The frontend publishes its `## UI Data Requirements` and `## API Contract` in the feature's `_features.md`.
  2. The backend reviews and agrees that the response DTO shape is feasible from the data model.
  3. **Both layers freeze** — no unilateral renaming of fields, adding required fields, or changing response structure after this point without updating both sides in the same PR.
  4. Only then does the backend write DTOs, Swagger docs, and implementation code.

* **What the backend must NOT do:**
  - Write DTOs in isolation before inspecting the frontend's `UI Data Requirements`.
  - Return a "minimal" response DTO and expect the frontend to adapt — see Rule 82A.
  - Rename fields unilaterally (e.g., `ownerName` → `owner_display_name`) after the contract is frozen.
  - Add or remove required fields without updating the frontend types, Zod schemas, MSW handlers, and tests in the same change.

* **Why:** The previous "backend writes DTOs first" rule conflicted with the frontend-first workflow used in this project. The backend AI writing a DTO without inspecting the frontend's UI Data Requirements produces exactly the minimal-response failure mode that Rule 82A is designed to prevent.

## 68. Health Check Depth Levels
* **The Rule:** Implement 3 levels of health checks: `/health/live` (Process alive? 200 OK), `/health/ready` (DB/Redis reachable? Traffic ready), and `/health/deep` (Full dependency chain check, not exposed publicly).

## 69. Strict Compilation / Type Checking
* **NestJS implementation:** The backend MUST run with `strict: true` in `tsconfig.json`. No `implicitAny`, no `implicitThis`. AI must never add `@ts-ignore` or `@ts-nocheck` to bypass type errors.
* **Django implementation:** The backend MUST enforce strict type hinting (e.g., via `mypy --strict`). AI must never use `# type: ignore` to bypass type errors.

## 70. No Raw `any` from ORM
* **The Rule:** Never allow raw `any` types to escape the ORM layer. Query builder results or raw SQL executions must immediately be mapped to a strictly typed DTO or Entity class.

## 71. UTC Datetime Storage Format
* **The Rule:** ALL dates and times MUST be stored in the database as UTC. The backend must never store local timezones. Any datetime conversion for display purposes should happen purely on the frontend.
* **API Transmission:** All dates and timestamps MUST be serialized and returned in API responses strictly as **ISO-8601 formatted strings** (e.g., `2023-10-25T10:30:00Z`). Never return raw Unix epoch milliseconds or local date strings to the frontend.

## 72. Per-Endpoint Payload Size Limits
* **The Rule:** The default global `1mb` limit (Rule 37) can be overridden per-endpoint for specific use cases. General endpoints must reject payloads >1MB. File-upload endpoints must explicitly declare their own larger limit (e.g., `10mb` for profile images, `50mb` for bulk import CSVs). These overrides must be declared in the endpoint's controller decorator, not scattered in middleware.

## 73. Currency and Number Formatting (Paise/Cents Integer Storage)
* **The Rule:** All monetary amounts MUST be stored and transmitted over the API as integers in the smallest currency unit (e.g., paise for INR, cents for USD). Never use floating-point types (`float`, `double`) or decimals for API transmission to avoid rounding errors. 
* **Frontend Responsibility:** The backend transmits `12345600` (paise). It is strictly the frontend's responsibility to divide by 100 and format it as `₹1,23,456.00` for display.

## 74. Mechanical Enforcement of Isolation (The "Tooling Gate")
* **The Rule:** The backend must explicitly enforce architectural boundaries mechanically. If using Node.js, mandate `eslint-plugin-boundaries` or `no-restricted-imports`. If using Python, mandate `import-linter`. This guarantees that an AI cannot accidentally import an `attendance` repository into a `billing` service. Trust is not enough; the pipeline must block cross-module violations.

## 75. Hard File-Size Ceilings (AI Context Limits)
* **The Rule:** To prevent token explosion and hallucination, backend files must strictly adhere to size limits. If a backend file exceeds its ceiling, the AI must explicitly pause and refactor it by splitting the logic into an Orchestrator/Facade and smaller micro-services.

| File Type | Maximum Lines |
|---|---|
| Controller (`*.controller.ts`) | **200 lines** |
| Service (`*.service.ts`) | **300 lines** |
| Repository (`*.repository.ts`) | **200 lines** |
| Entity/DTO (`*.entity.ts`, `*.dto.ts`) | **150 lines** |
| Module Config (`*.module.ts`) | **100 lines** |
| Utilities/Mappers | **120 lines** |

## 76. Strict File Responsibility Contract
* **The Rule:** Every backend controller, service, or repository MUST start with a single-line comment at the very top of the file explicitly defining its boundary. (e.g., `// RESPONSIBILITY: Processes incoming Stripe webhooks and emits EVENT_PAYMENT_SUCCESS. No direct DB writes.`). This instantly grounds the AI's context when reading the file.

## 77. Dependency-Addition Guardrail
* **The Rule:** An AI agent cannot blindly add new dependencies (`npm install` or `pip install`) without human approval. Before proposing a new library, the AI must check the `package.json` or `requirements.txt` to verify if an existing approved library (e.g., `date-fns` instead of adding `moment`, or a native ORM feature) can suffice for the task.

## 78. Forbidden Patterns File (`[role]-[module]-forbidden.md`)
* **The Rule:** Every backend module must have a `[role]-[module]-forbidden.md` file listing what is explicitly NOT allowed in that specific module.

### `-forbidden.md` Content Quality Standard

**Failure Conditions — A `-forbidden.md` FAILS quality review if it contains:**
- Fewer than 5 entries
- Generic entries not tied to a specific rule number (e.g., "Never bypass the Orchestrator" with no rule citation)
- Entries that apply to every module equally (e.g., "Do not use console.log") — those belong in the global instruction, not here
- Entries with no explanation of the consequence of violation

#### ❌ BAD — Generic, unactionable:
```markdown
# admin-billing-forbidden.md
- Never bypass the Orchestrator for payments.
- Never mutate the DB without pessimistic locking.
- Do not use console.log.
- Do not bypass API interceptors.
```
*Why this fails: "Never bypass the Orchestrator" with no context tells an AI nothing about which specific call paths are forbidden or what breaks if violated.*

#### ✅ GOOD — Specific, rule-cited, consequence-explained:
```markdown
# admin-billing-forbidden.md

## What is NEVER allowed in this module

1. **Never call AdminBillingWalletRepository directly from outside AdminBillingOrchestratorService.**
   Consequence: Wallet deductions outside the Orchestrator bypass the DB transaction
   boundary, causing partial charges where balance is deducted but plan is not activated.
   Rule: 8 — Edge Case B (Orchestrator Pattern), Rule 41 (Pessimistic Locking).

2. **Never remove the SELECT FOR UPDATE lock from deductBalance().**
   Consequence: Concurrent top-up + deduction requests will race, producing negative
   wallet balances that cannot be recovered without manual DB correction.
   Rule: 41 (Transaction Locks & Race Condition Prevention).

3. **Never process a plan purchase and wallet deduction in separate transactions.**
   Consequence: A crash between the two operations leaves the member charged but
   without an active plan — a financial discrepancy requiring manual reconciliation.
   Rule: 8 — Edge Case B (Orchestrator Pattern).

4. **Never omit the Idempotency-Key check on /billing/wallet/topup.**
   Consequence: Network retries from mobile clients will double-charge the member.
   Rule: 31 (Idempotency Keys for Critical Mutations).

5. **Never return raw ManagerMembersEntity or ManagerBillingWalletEntity from billing service methods.**
   Consequence: ORM entity leakage means a DB column rename breaks service-layer
   callers that should be completely unaware of the schema.
   Rule: 89 (Domain Object vs ORM Entity Separation).
```

**Minimum requirement:** Every `-forbidden.md` must have at least **5 entries**, each with a specific consequence and a Rule citation.

---

## 79. Explicit Data Flow Direction Comment (AI Context Chain)
* **The Rule:** Every backend service, controller, and repository source file MUST begin with an explicit responsibility annotation followed immediately by an explicit data-flow annotation.

* **Framework-specific syntax:**

  * TypeScript / JavaScript:
    `// RESPONSIBILITY:`
    immediately followed by
    `// FLOW:`
  * Python / Django:
    `# RESPONSIBILITY:`
    immediately followed by
    `# FLOW:`

* **The semantic requirement is identical across frameworks. Only the source-language comment syntax changes.**

* **Format example — TypeScript / JavaScript:**

  ```text
  // RESPONSIBILITY: Handles member suspension logic. No direct DB writes — emits events only.
  // FLOW: AdminMembersCommandController → AdminMembersSuspensionService → AdminMembersRepository → EventBus.emit('MEMBERS.MEMBER.SUSPENDED')
  ```

* **Format example — Python / Django:**

  ```text
  # RESPONSIBILITY: Handles member suspension logic. No direct DB writes — emits events only.
  # FLOW: AdminMembersCommandController → AdminMembersSuspensionService → AdminMembersRepository → EventBus.emit('MEMBERS.MEMBER.SUSPENDED')
  ```

* The FLOW must represent the actual ownership and execution path.

* Generic, decorative, copied, or inaccurate FLOW comments are non-compliant.

* **Why:** When an AI agent is given a single file to repair, the responsibility + flow annotation must provide enough execution-context information to reduce unnecessary context expansion and hallucinated dependencies.

---

## 80. Mandatory Method Documentation on All Service Methods, Repositories & Utilities

* **The Rule:** Every service method, repository method, adapter method, and utility/private-helper function MUST have exhaustive method documentation.

* **Framework-specific documentation format:**

  * TypeScript / JavaScript → JSDoc block
  * Python / Django → Python docstring

* **The documentation MUST include:**

  1. proper description of what the method does.
  2. Documentation for every non-trivial argument.
  3. The exact return type / return value semantics.
  4. The exact custom exception(s) / error condition(s) it can produce.
  5. For complex business logic, the reason behind important design decisions.

* **TypeScript / JavaScript example (JSDoc):**
  ```typescript
  /**
   * @description Suspends a member by setting their status to SUSPENDED and emitting the lifecycle event.
   * @param memberId - The UUID of the member to suspend.
   * @param actorId - The UUID of the staff member performing the action (for audit log).
   * @returns The updated ManagerMembersDomainModel with status SUSPENDED.
   * @throws MemberNotFoundException if the memberId does not exist.
   * @throws MemberAlreadySuspendedException if the member is already suspended.
   * @remarks Uses a database transaction to ensure the audit log write and status update are atomic.
   */
  async suspendMember(memberId: string, actorId: string): Promise<ManagerMembersDomainModel> { ... }
  ```

* **Python / Django example (docstring):**
  ```python
  def suspend_member(self, member_id: str, actor_id: str) -> ManagerMembersDomainModel:
      """
      Suspends a member by setting their status to SUSPENDED and emitting the lifecycle event.

      Args:
          member_id: The UUID of the member to suspend.
          actor_id: The UUID of the staff member performing the action (for audit log).

      Returns:
          The updated ManagerMembersDomainModel with status SUSPENDED.

      Raises:
          ManagerMembersNotFoundException: If the member_id does not exist.
          ManagerMembersAlreadySuspendedException: If the member is already suspended.

      Note:
          Uses a database transaction to ensure the audit log write and status update are atomic.
      """
      ...
  ```

* Documentation MUST describe the actual behavior. Generic, stale, copied, or misleading documentation is non-compliant.

---

## 81. Mock-First / Stub-First Development (Parallel Workflow Safety)
* **The Rule:** Just as the frontend is built with mock data before the backend exists, the backend MUST follow the reciprocal workflow: **every new endpoint must first be created as a fully-documented, working stub** before real business logic is written.
* **A "stub" means:**
  1. The controller and route exist and are registered.
  2. The Swagger/OpenAPI documentation for that endpoint is complete and accurate.
  3. The endpoint returns a hardcoded, realistic mock payload that exactly matches the final `ApiResponse<T>` envelope (Rule 28).
  4. The endpoint has `// TODO: Replace with real service call` comments.
* **Why this matters for parallel AI development:** If two AI agents are working simultaneously — one on the frontend UI, one on the backend logic — the frontend agent cannot make progress if the endpoint doesn't exist at all. A working stub with realistic mock data allows the frontend to be fully built and tested against the API contract before the backend implementation is written. This prevents entire feature branches from being blocked.
* **Enforcement:** A stub endpoint MUST never be merged to `main` without either: (a) having its real implementation, OR (b) having a GitHub issue linked in a `// STUB: [link]` comment.

---

## 82. Strict Discriminated Union Response Rule (No Ambiguous `data` Shapes)
* **The Rule:** The `data` field in the standardized API envelope (Rule 28) MUST always be a **single, explicitly typed value** — never a polymorphic bag of mixed objects. The shape of `data` on success MUST be identical in structure regardless of the execution path.
  - ❌ **BAD (Ambiguous):** `data: { member: ManagerMembersResponseDto, invoice: AdminBillingInvoiceResponseDto }` — the frontend `ApiResponse<T>` generic breaks because `T` is not a single entity.
  - ✅ **GOOD:** `data: ManagerMembersWithInvoiceDTO` — a single, explicitly defined DTO that contains both.
  - ❌ **BAD (Inconsistent):** One code path returns `data: ManagerMembersResponseDto`, another returns `data: { member: ManagerMembersResponseDto }`.
  - ✅ **GOOD:** Always `data: ManagerMembersResponseDTO` — one shape, all paths.
* **The Discriminated Union Rule for Errors:** Never put different error shapes inside `data`. All error information belongs strictly in the `error` and `errorCode` fields of the envelope (Rule 64). The `data` field must always be `null` on error responses. No exceptions.
* **Why:** The frontend AI agent generating the type-safe API call relies on `ApiResponse<ManagerMembersResponseDto>` mapping exactly. If the backend AI returns `data: { member: ManagerMembersResponseDto }` instead of `data: ManagerMembersResponseDto`, the TypeScript type system on the frontend will silently pass (because of structural typing) but every `res.data.name` call will return `undefined`, creating bugs that are extremely hard to trace.

---

## 82A. Frontend UI Data Contract Completeness
* **The Rule:** Every backend response DTO MUST satisfy the **complete data contract** documented by the consuming frontend feature's `## UI Data Requirements` section. The backend MUST NOT intentionally return a reduced or "minimal" DTO merely because the database entity contains only a subset of the fields currently visible in the UI.

Before implementing an endpoint, the backend AI MUST verify the corresponding frontend feature's
frozen API contract from the `## Frozen API Contract` section inside the backend feature's own
`-backend-feature.md`. At API Contract Freeze (Rule 67), the frontend publishes its complete
data requirements and the backend copies a snapshot into its own `-backend-feature.md` — then
the backend AI can remain inside `src/backend-[role]/...` without needing the frontend folder.

**If the `## Frozen API Contract` section is not yet populated,** the backend AI MUST inspect:
1. Frontend `_features.md` → `## UI Data Requirements`
2. Frontend `_features.md` → `## API Contract`
3. Frontend TypeScript/API types
4. Zod response schema where available

and immediately copy the result into the backend feature's `## Frozen API Contract` section
before implementing any code.

The backend MUST return every field required by the frontend UI, including fields used by:
- Table columns
- KPI cards
- Charts and chart series
- Filters and search
- Sorting and pagination
- Dropdowns and relational references
- Detail views, modals, and drawers
- Status badges and timeline/history displays

### Required Contract Chain

```text
Frontend UI Data Requirements
    ↓
Frontend API Contract
    ↓
Backend Response DTO
    ↓
Service Layer
    ↓
Repository / Query
    ↓
Database
```

### Completeness Rule

Every field consumed by the frontend MUST have:
- An explicitly named Response DTO field
- A defined source or derivation rule (which DB column or JOIN produces it)
- The correct nullability matching the frontend's Zod schema
- An OpenAPI/Swagger `@ApiProperty()` description
- A corresponding value in the stub response during stub-first development (Rule 81)

The backend MUST NOT return `undefined`, omit required fields, rename fields independently, or change nested response structure without updating the frontend contract first (Rule 67).

### No Frontend Reconstruction Rule

Do not force the frontend to reconstruct business-level values such as:
- Owner name derived from owner ID alone
- Plan name derived from plan ID alone
- Member count derived from a separate list query
- Revenue totals derived from individual transaction records
- Status labels assembled from unrelated fields

When the UI contract requires such information, the backend MUST provide it through a **dedicated Response DTO** that assembles the required data via JOINs, aggregations, or dedicated service methods — not by leaving the reconstruction to the frontend.

### Stub Parity Rule

The stub response (Rule 81) MUST contain the **same complete field structure** as the eventual real implementation. A stub is NOT contract-complete if it returns only the fields convenient for initial development. The stub is the frontend's development contract — it must be identical in shape to the final response.

### Minimal DTO Anti-Pattern (Forbidden)

```text
❌ FORBIDDEN:
UI requires: name, ownerName, planName, memberCount, revenue, status
Backend returns: { id, name, status }

✔ REQUIRED:
Backend returns: { id, name, ownerName, planName, memberCount, revenue, status }
with all fields assembled via JOIN or dedicated query.
```

### Contract Change Rule

If a backend implementation cannot provide a field currently required by the frontend:
1. Do NOT silently omit the field from the response.
2. Do NOT fabricate a placeholder value in production.
3. Document the limitation clearly in the `-backend-feature.md`.
4. Propose the contract change explicitly.
5. Update the frontend `## UI Data Requirements`, API Contract, TypeScript types, Zod schema, MSW handler, and tests in the same PR before merging the breaking change.

* **Why:** This prevents the exact failure mode where an MSW response or API returns only a few fields and the remaining table columns, KPI cards, and chart series render empty or `undefined`. The consuming feature's UI data contract prevents the frontend from papering over the gap with hardcoded fallback data — so the backend must provide the complete contract instead.

---

## 83. Centralized RBAC / Permission Guards (Role-Based Access Control)
* **The Rule:** Role and permission checks must NEVER be done inline inside service methods or repository layers (e.g., `if (user.role === 'admin')`). Permission enforcement is strictly a **controller-layer concern** and must be implemented using centralized, declarative guards or decorators.
* **How to implement per framework:**
  - **NestJS:** Use a `@Roles(...)` custom decorator paired with a global `RolesGuard` that reads the JWT payload. Never check `req.user.role` inside a service.
  - **Django:** Use Django REST Framework's `IsAuthenticated` + custom `Permission` classes (e.g., `IsAdminOrManager`). Never check `request.user.is_staff` inside a view's business logic.
* **Fine-Grained Resource Permissions:** For resource-level checks (e.g., "Can this manager see only their branch's members?"), create a dedicated `[role]-[module]-authorization.service.ts`. This service receives the actor and the resource and returns a boolean. The controller calls this service before delegating to the business service.
* **Centralized Role Registry:** All role names and permission strings MUST be defined as enums in a central `auth.roles.constants.ts` file. Never use raw strings like `'admin'` or `'manager'` directly in guards or decorators.
  - ❌ **BAD:** `@Roles('admin', 'superadmin')`
  - ✅ **GOOD:** `@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)`
* **Why:** Client-side visibility is not authorization. The backend MUST independently enforce authentication, role, resource, and tenant authorization. An AI writing a new endpoint will forget to add auth checks if there is no standard, centralized pattern to follow. A declarative decorator is impossible to forget because it's visible at the route definition.

---

## 84. No Barrel File / Re-Export Index Rule & Facade Naming
* **The Rule:** Strictly avoid using `index.ts` or `index.js` files to re-export modules (barrel files). This restriction exists to preserve AI context isolation and prevent dependency expansion. Always import directly from the explicitly named source file.
  - ❌ **BAD:** `import { MemberService } from '@/backend-manager/manager-modules/manager-members'` (where `members/index.ts` re-exports everything)
  - ✅ **GOOD:** `import { MemberRegistrationService } from '@/backend-manager/manager-modules/manager-members/members-services/manager-members-registration.service'`
* **Facade / Re-export Naming:** If a module absolutely requires a facade or re-export file (e.g., to export multiple schemas or mappers from a sub-folder into one file), the file name MUST explicitly end with `-export.ts` to immediately signal its purpose to AI and developers.
  - Example: `manager-attendance-schema-export.ts` (placed inside `attendance-schemas/`).
* **Why barrel files are dangerous in AI-driven codebases:**
  1. **Circular Dependencies:** Barrel files are the #1 cause of circular dependency errors in NestJS and Django projects. An AI adding a new export to a barrel file can silently create a circular import cycle that causes runtime crashes.
  2. **AI Context Pollution:** When an AI imports `from '@/backend-manager/manager-modules/manager-members'`, it loads the entire barrel into context — all services, all DTOs, all repositories. With direct imports, the AI only loads exactly what it needs, drastically reducing hallucination risk.
  3. **Dead Code Masking:** Barrel files make tree-shaking and unused-code detection nearly impossible, hiding dead code from AI and human reviewers alike.
* **Enforcement:** Mechanically enforce via ESLint `no-restricted-imports` or a custom rule that flags imports from `index.ts` paths.

---

## 85. Guard Clause / Early Return Pattern (No Nested Conditional Hell)
* **The Rule:** Deeply nested `if/else` blocks inside service methods are strictly forbidden. Guard clauses keep service methods narrow, predictable, and AI-repairable. All service methods MUST use the **Guard Clause** (Early Return) pattern: validate inputs and exit early at the top of the function, keeping the happy path flat and readable.
  - ❌ **BAD (Nested):**
    ```typescript
    async suspendMember(id: string) {
      const member = await this.repo.findById(id);
      if (member) {
        if (member.status !== 'SUSPENDED') {
          if (member.hasActiveSubscription) {
            // ... actual logic buried 3 levels deep
          } else { throw new Error('No subscription'); }
        } else { throw new Error('Already suspended'); }
      } else { throw new Error('Not found'); }
    }
    ```
  - ✅ **GOOD (Guard Clauses + Repository-Owned Mutation):**
    ```typescript
    async suspendMember(id: string): Promise<ManagerMembersDomainModel> {
      const member = await this.memberRepo.findByIdOrThrow(id);

      if (member.status === MemberStatus.SUSPENDED) {
        throw new ManagerMembersAlreadySuspendedException(id);
      }

      if (!member.hasActiveSubscription) {
        throw new ManagerMembersNoActiveSubscriptionException(id);
      }

      return this.memberRepo.suspendById(id, new Date());
    }
    ```
* **Maximum Nesting Depth:** No function body may have more than **2 levels of indentation** for conditional logic. If a third level is needed, extract it into a private helper method.
* **Why:** An AI given a deeply nested 80-line service method will frequently misread the logic branches and introduce bugs at the wrong `else` block. A flat, guard-clause-driven function is scannable in 5 seconds, making AI edits surgical and safe.

---

## 86. Strict Method Naming Convention (The Verb Contract)
* **The Rule:** All service and repository method names MUST follow a strict, predictable verb-based naming convention. AI agents must never invent arbitrary method names. The convention is:

  | Operation | Service Layer Verb | Repository Layer Verb |
  |---|---|---|
  | Create | `create[Entity](dto)` | `create[Entity](data)` |
  | Read single | `find[Entity]ById(id)` | `findById(id)` |
  | Read single (throws) | `find[Entity]ByIdOrThrow(id)` | `findByIdOrThrow(id)` |
  | Read list | `findAll[Entities](filters)` | `findAll(filters)` |
  | Update | `update[Entity](id, dto)` | `updateById(id, dto)` or a domain-specific named mutation |
  | Soft Delete | `delete[Entity](id)` | `softDelete(id)` |
  | Check existence | `does[Entity]Exist(id)` | `existsById(id)` |
  | Count | `count[Entities](filters)` | `count(filters)` |

Repository mutation methods MUST be intention-revealing.
The generic ORM persistence primitive (`save`, `update`, `create`, etc.) is an implementation detail and MUST NOT be part of the public service-facing contract.
Services call named repository methods. Repositories alone may call the underlying ORM persistence APIs.
This rule MUST remain consistent with Rule 99.

* **The `OrThrow` Pattern:** Repository methods that return a single entity MUST have two variants: `findById(id): Entity | null` (returns null if not found) and `findByIdOrThrow(id): Entity` (throws `EntityNotFoundException` if not found). Services must choose explicitly — never let a `null` propagate silently.
* **Why:** When two different AI agents work on two different modules, they will produce consistent, predictable method signatures. Any AI reading a repository interface instantly knows what methods are available without having to read the implementation. This eliminates the most common AI mistake: calling a method that doesn't exist (hallucinated method names).

---

## 87. Single Responsibility at Method Level (The 20-Line Rule)
* **The Rule:** Just as the frontend mandates hook separation to split logic from UI, the backend mandates that **every service method must do exactly ONE thing**. If a method is doing more than one distinct business operation, it must be split into private helper methods or separate micro-services.
* **The 20-Line Soft Ceiling:** A service method body (excluding method documentation) should rarely exceed ~20 lines. If a method grows beyond this, it is a signal that it is doing too much and must be decomposed.
* **Decomposition Pattern:**
  - ❌ **BAD:** A single `registerMember()` method that validates, saves the member, creates a subscription, charges the card, sends a welcome email, and writes an audit log — all in one 80-line function.
  - ✅ **GOOD:** `registerMember()` is an Orchestrator (Rule 8) that calls: `this.memberRepo.createMember(data)`, then emits `EventBus.emit('MEMBERS.MEMBER.REGISTERED', ...)`. The subscription creation, payment charging, and email are handled by separate listeners.
* **Private Helper Rule:** If a method needs a private helper for a sub-calculation (e.g., calculating a pro-rated amount), the helper must be a `private` method with its own framework-appropriate method documentation (Rule 80) clearly named for its specific task (e.g., `private calculateProRatedAmount()`).
* **Why:** An AI asked to "add audit logging to member registration" should be able to do so by touching exactly ONE file and ONE method — the event listener for `MEMBERS.MEMBER.REGISTERED`. If the entire registration flow is monolithic, the AI must read and modify a 200-line method, risking collateral damage.

---

## 88. Strict Import Order Convention (Mechanical ESLint Enforcement)
* **The Rule:** All backend TypeScript/JavaScript files MUST enforce a strict, consistent import order. Configure ESLint's `import/order` rule to enforce the following groups in this exact sequence:
  1. **Node.js built-ins** (e.g., `node:fs`, `node:path`)
  2. **Framework core** (e.g., `@nestjs/common`, `express`, `django`)
  3. **Third-party packages** (e.g., `class-validator`, `class-transformer`, `bcrypt`, `typeorm`)
  4. **Internal absolute imports — Infrastructure** (e.g., `@/infrastructure/config/`, `@/infrastructure/database/`)
  5. **Internal absolute imports — Module-specific** (e.g., `@/backend-manager/manager-modules/manager-billing/...`)
  6. **Relative imports** (strictly forbidden per Rule 10 — this group must always be empty)
  7. **Type-only imports** (`import type { ... }`) must always be last
* **Blank line separation:** Each group must be separated by a blank line. No mixing of groups.
* **Example:**
  ```typescript
  import { Injectable } from '@nestjs/common';

  import { Repository } from 'typeorm';

  import { DatabaseConfig } from '@/infrastructure/config/database.config';

  import { ManagerMembersEntity } from '@/backend-manager/manager-modules/manager-members/members-repositories/manager-members.entity';
  import { ManagerMembersNotFoundException } from '@/backend-manager/manager-modules/manager-members/members-exceptions/manager-members.exceptions';

  import type { ManagerMembersCreateDto } from '@/backend-manager/manager-modules/manager-members/members-dto/manager-members-create.dto';
  ```
* **Why:** Chaotic import ordering in AI-generated code causes two specific problems: (1) Merge conflicts explode because every AI agent adds imports in a different location, (2) Circular dependency detection becomes nearly impossible because the import graph is visually unreadable. A strict, mechanical ESLint rule makes import diffs surgical and circular deps immediately obvious.

---

## 89. Domain Object vs. ORM Entity Separation (Anti-Persistence-Leakage Rule)
* **The Rule:** Never use ORM Entity classes (e.g., TypeORM `@Entity()` classes, Django ORM models) directly inside business logic services. ORM entities are a **persistence infrastructure concern** — they contain database annotations, lazy-loading relations, and schema metadata that have no place in pure business logic.
* **The Pattern — Two Distinct Objects + Mapper:**
  1. **ORM Model / Entity** (`admin-members.entity.ts` for TypeORM, or the corresponding Django ORM model): Contains only database schema definition. Lives in the repository layer only.
  2. **Domain Model** (`admin-members.domain.ts`): A plain TypeScript class/interface with pure business properties and zero ORM imports. Services and event handlers receive and return this. It is NOT the same as a Response DTO.
  2b. **Response DTO** (`admin-members-response.dto.ts`): The API-serializable shape returned to the caller. Explicitly mapped from the Domain Model. Request DTOs are also distinct — never share one DTO for both directions.
  3. **Mapper** (`admin-members.mapper.ts`): A dedicated class with `toDomain(entity)` and `toEntity(domain)` static methods that translate between the two. Only the repository layer calls the mapper.
* **Absolute Rule:** The exception for a "unified model" is strictly forbidden. Maximum AI isolation requires a predictable, exception-free architecture. A mapper must be used even for simple CRUD modules.
* **Why:** AI agents default to using ORM entities everywhere — passing `ManagerMembersEntity` into services, emitting it over the EventBus, returning it from controllers. This "persistence leakage" means a database schema change (e.g., renaming a column) breaks business logic files that should be completely unaware of the database. A Mapper is the single controlled translation point, and it is the only file the AI needs to touch when the schema changes.

### Mapper Physical Location Rule (MANDATORY)

All mappers MUST live inside the owning module's `{module}-mappers/` sub-folder. No other location is permitted.

```
{role}-{module}/
└── {module}-mappers/
    └── {role}-{module}.mapper.ts
```

**Examples:**
- `admin-members/members-mappers/admin-members.mapper.ts`
- `manager-billing/billing-mappers/manager-billing.mapper.ts`

❌ **FORBIDDEN mapper locations:**
- `admin-members/mappers/admin-members.mapper.ts` (unprefixed folder)
- `admin-members/utils/admin-members.mapper.ts` (wrong folder type)
- `admin-members/admin-members.mapper.ts` (root of module — not allowed)

### Domain Model Physical Location Rule (MANDATORY)

All domain models MUST live inside the owning module's `{module}-domain/` sub-folder. No other location is permitted.

```
{role}-{module}/
└── {module}-domain/
    └── {role}-{module}.domain.ts
```

**Examples:**
- `admin-members/members-domain/admin-member.domain.ts`
- `manager-billing/billing-domain/manager-billing.domain.ts`

❌ **FORBIDDEN domain model locations:**
- `admin-members/models/member.ts` (generic, no prefix)
- `admin-members/domain/member.domain.ts` (unprefixed folder)
- `admin-members/entities/member.domain.ts` (entities/ is for ORM entities only)

> **AI AGENT NOTE:** ORM Entity files (`*.entity.ts`) belong ONLY inside the `{module}-repositories/` folder — never in `{module}-domain/`. The domain folder contains pure business objects with zero ORM imports. Mixing them defeats the entire purpose of Rule 89.

---

## 90. Automated Security Gates in CI/CD Pipeline (Shift-Left Security)
* **The Rule:** All backend AI-generated code is **untrusted input** until proven otherwise. AI code suggestions can frequently introduce security vulnerabilities or performance regressions. The CI/CD pipeline MUST implement non-bypassable automated security gates on every Pull Request before any merge is allowed.
* **Mandatory Gate 1 — SAST (Static Application Security Testing):** Run a SAST scanner (e.g., `Semgrep`, `SonarQube`, `CodeQL`) on every PR. Any `Critical` or `High` severity finding MUST block the merge. AI agents cannot self-certify their own code as secure.
* **Mandatory Gate 2 — SCA (Software Composition Analysis):** Run a dependency vulnerability scanner (e.g., `npm audit`, `safety` for Python, `Snyk`) on every PR. Any new dependency with a known `Critical` CVE must block the merge.
* **Mandatory Gate 3 — Secrets Detection:** Run a secrets scanner (e.g., `GitLeaks`, `Trufflehog`) on every PR diff. A single hardcoded API key or database password in a commit is a catastrophic security breach. This gate must never be skipped.
* **Mandatory Gate 4 — Strict Type Check:**
  - **NestJS:** Run `tsc --noEmit` on every PR. The build must pass with zero type errors — no `@ts-ignore` bypasses allowed (Rule 69).
  - **Django:** Run `mypy --strict` on every PR. The build must pass with zero type errors — no `# type: ignore` bypasses allowed (Rule 69).
* **Why:** The backend requires the same discipline as the frontend but with an added focus on security. An AI writing authentication or payment code must have its output automatically vetted before it reaches production.

---

## 91. Mandatory Backend Pre-Commit Hooks (Blocking Gates Before Commit)
* **The Rule:** The backend repository MUST configure pre-commit hooks using `husky` (Node.js) or `pre-commit` framework (Python) to run fast, blocking checks before every `git commit`. A pre-push hook is an optional additional gate, but pre-commit is mandatory. These hooks run locally on the developer/AI agent's machine — they are the first line of defense before code reaches CI.
* **Required Pre-Commit Checks (must all pass):**
  - **NestJS implementation:**
    1. `tsc --noEmit` — TypeScript type check. Zero errors required.
    2. `eslint --fix` — Auto-fix lint violations; fail if unfixable violations remain.
    3. `prettier --check` — Code format verification.
    4. `gitleaks detect --no-git` — Secret scanning on staged files only (fast).
  - **Django implementation:**
    1. `mypy --strict` — Python type check. Zero errors required.
    2. `ruff check --fix` (or equivalent) — Auto-fix lint violations; fail if unfixable violations remain.
    3. `ruff format --check` (or `black --check`) — Code format verification.
    4. `gitleaks detect --no-git` — Secret scanning on staged files only (fast).
* **Staged Files Only:** Use `lint-staged` (or `pre-commit`) for file-scoped checks; however, strict type checking (`tsc --noEmit` / `mypy`) is intentionally project-wide.
* **Why:** CI/CD gates (Rule 90) catch issues at the PR stage, which means an AI agent can push broken/insecure code to the remote branch. Pre-commit hooks catch the same issues before the push ever happens, providing instant feedback and preventing noise in the PR history.

---

## 92. ORM Raw Input Injection Prevention (The Query Safety Rule)
* **The Rule:** Never interpolate user-controlled input directly into ORM query methods. This is a critical AI-specific risk because AI agents frequently generate "convenient" but insecure query patterns.
* **The Specific Patterns to BAN:**
  - ❌ **BAD (SQL Injection via dynamic sort field):**
    ```typescript
    // NEVER do this — sortField comes from req.query and is unvalidated
    // Works the same way in any ORM with raw query string interpolation
    db.query(`SELECT * FROM members ORDER BY ${req.query.sortField} ASC`);
    ```
  - ✅ **GOOD (Allowlist Pattern):**
    ```typescript
    const ALLOWED_SORT_FIELDS = ['name', 'createdAt', 'status'] as const;
    type SortField = typeof ALLOWED_SORT_FIELDS[number];
    const sortField = ALLOWED_SORT_FIELDS.includes(req.query.sortField as SortField)
      ? req.query.sortField as SortField
      : 'createdAt'; // safe default
    // Pass validated sortField to ORM method or parameterized query
    ```
  - ❌ **BAD (Raw SQL with template literals):**
    ```typescript
    // NEVER — classic SQL injection
    db.query(`SELECT * FROM members WHERE name = '${req.query.name}'`);
    ```
  - ✅ **GOOD (Parameterized query):**
    ```typescript
    const allowedSortFields = {
      name: 'member.name',
      createdAt: 'member.created_at',
      status: 'member.status',
    } as const;

    const sortColumn = allowedSortFields[validatedSortField];

    const members = await repository
      .createQueryBuilder('member')
      .where('member.name = :name', { name: validatedName })
      .orderBy(sortColumn, validatedSortOrder)
      .getMany();
    ```
* **Allowlist-First Mandate:** Any query that uses a user-supplied column name, sort field, or filter key MUST validate it against a strict allowlist defined in the module's constants file before passing it to the ORM.
* **Why:** ORM query builders that accept raw column name strings for `orderBy`, `select`, and `where` do NOT automatically parameterize field names. An AI will generate dynamic field interpolation as a clean, "logical" pattern without realizing it's an injection vulnerability. This rule makes the safe pattern the only acceptable pattern.

---

## 93. Human-in-the-Loop Gate for Security-Critical AI Code
* **The Rule:** Certain backend modules and functions are so security-critical that AI-generated code for them requires mandatory human review before merging — no exceptions, even if all automated gates pass. These are modules where a single bug can cause financial loss, data breach, or unauthorized access.
* **Mandatory Human Review Required For:**
  1. **Authentication & Token Logic** — Any code in `auth/` modules, JWT generation/validation, refresh token rotation (Rule 52), session management.
  2. **Authorization & Permission Guards** — Any new `@Roles()` decorator usage, `RolesGuard` modifications, resource-level authorization services (Rule 83).
  3. **Payment & Financial Mutations** — Any code that triggers charges, refunds, wallet deductions, or invoice generation.
  4. **Database Migration Files** — Any migration that adds `NOT NULL`, drops a column, or modifies a primary key. (Rule 24).
  5. **Webhook Signature Verification** — Any code in webhook handlers that verifies HMAC/cryptographic signatures (Rule 45). A bypass here allows forged payment/delivery events to trigger real financial or state-changing actions — the risk is equivalent to a direct payment mutation.
  6. **Tenant Provisioning & Connection Routing** — Any code that creates a new tenant database, runs migrations programmatically, or resolves the `x-tenant-id` to a DataSource (Rule 39). A bug here risks cross-tenant data leakage — the single most severe failure mode in this architecture. This includes both the provisioning flow AND any modification to the request-scoped connection resolver.
* **Implementation:** In GitHub/GitLab, create a `CODEOWNERS` file mapping these folders to specific human reviewers. PRs touching these paths cannot be merged without a human approval even if all CI gates pass.
* **PR Description Mandate:** Any PR touching these modules MUST include a section titled `## Security Impact Analysis` explaining what changed, what the risk surface is, and why the change is safe.
* **Why:** AI code suggestions can frequently introduce security vulnerabilities, especially in security-critical paths. An AI agent might generate a logically correct but cryptographically weak JWT validation, or a permission guard with a subtle bypass. Automated tools cannot catch all semantic security flaws — a human security review is the final, non-negotiable gate.

---

## 94. Canonical `PaginationMeta` Shape (Response Pagination Envelope Consistency)
* **The Rule:** Rule 28 mandates that the response envelope supports a `meta?: PaginationMeta` field, but never defines its exact shape. Every AI agent left to its own devices will invent a different structure — some return `totalPages`, some return `total`, some return `hasNextPage`, some return all three with different key names. This creates a frontend parsing nightmare.
* **The Canonical `PaginationMeta` Shape — this is the ONLY acceptable definition:**
  ```typescript
  // src/core/types/pagination.types.ts
  export interface PaginationMeta {
    total: number;        // Total number of records matching the query (before pagination)
    page: number;         // Current page number (1-indexed)
    limit: number;        // Number of records per page
    totalPages: number;   // Math.ceil(total / limit) — pre-calculated by the backend
    hasNextPage: boolean; // page < totalPages
    hasPrevPage: boolean; // page > 1
  }
  ```
* **Rules:**
  - `total` is always the count of ALL matching records, not just the current page.
  - `page` is always **1-indexed** (first page = `1`, not `0`).
  - `totalPages`, `hasNextPage`, and `hasPrevPage` MUST be pre-calculated by the backend. The frontend must never compute these from `total` and `limit` — that logic belongs in one place.
  - For non-paginated list endpoints (e.g., dropdown options), `meta` must be `undefined` — never an empty object `{}`.
  - A shared `buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta` utility must exist in `src/core/utils/pagination.utils.ts` and be used by ALL repositories. Never calculate pagination fields inline per-repository.
* **Standard Query DTO:**
  ```typescript
  // src/core/dtos/pagination-query.dto.ts
  export class PaginationQueryDto {
    @IsOptional() @Type(() => Number) @IsInt() @Min(1)
    page?: number = 1;

    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
    limit?: number = 20;
  }
  ```
  All paginated query DTOs MUST extend `PaginationQueryDto`. Never define `page` and `limit` fields independently per-module.
* **Example response:**
  ```json
  {
    "success": true,
    "message": "Members fetched successfully",
    "data": [...],
    "meta": {
      "total": 243,
      "page": 2,
      "limit": 20,
      "totalPages": 13,
      "hasNextPage": true,
      "hasPrevPage": true
    }
  }
  ```
* **Why:** All API consumers MUST treat `PaginationMeta` as the canonical pagination shape. If the backend returns `total_count` instead of `total`, the consumer type breaks silently and pagination controls show `NaN` pages. One canonical shape, defined once, used everywhere.

---

## 95. Enum-Driven Entity Status Fields (No Raw String Columns)
* **Framework-independent contract:** All entity columns that represent a finite set of states (e.g., `status`, `type`, `role`, `medium`, `priority`) MUST use a strictly typed enum structure — never raw string literals. Saving a typo (e.g. `'actve'`) to the database must be a **compile-time or strict validation error**, not a silent data corruption bug discovered in production. Enum values MUST be `SCREAMING_SNAKE_CASE` strings (e.g., `'ACTIVE'`, `'IN_PROGRESS'`) so they are human-readable in raw database queries.

### NestJS implementation
* **Definition:** Use a TypeScript enum. All enums MUST be defined in the module's `[role]-[module].constants.ts` file (Rule 5) — never inline inside the entity file.
* **Database:** Map it to a PostgreSQL enum column.
* **Validation:** DTO validation for enum fields MUST use `@IsEnum(MemberStatus)` from `class-validator` — never `@IsString()`.

Example:
```typescript
export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
}

@Column({
  type: 'enum',
  enum: MemberStatus,
  default: MemberStatus.PENDING,
})
status: MemberStatus;
```

### Django implementation
* **Definition:** Use Django's `models.TextChoices`. Enums must be defined in `constants.py` or closely co-located with the model.
* **Database:** Map it to a `CharField` with `choices=MemberStatus.choices`.
* **Validation:** Serializer validation for enum fields MUST use `ChoiceField(choices=MemberStatus.choices)` or rely on the ModelSerializer mapping.

Example:
```python
class MemberStatus(models.TextChoices):
    ACTIVE = 'ACTIVE', 'Active'
    SUSPENDED = 'SUSPENDED', 'Suspended'
    EXPIRED = 'EXPIRED', 'Expired'
    PENDING = 'PENDING', 'Pending'
    
status = models.CharField(max_length=20, choices=MemberStatus.choices, default=MemberStatus.PENDING)
```

### Database-Level Enforcement
When adding a new enum value, a database migration MUST be generated to update the DB type or constraint. Never rely on ORM auto-sync in production (Rule 24).

* **Why:** AI agents default to `string` columns for status fields because it's the path of least resistance. A single typo (`'actve'` instead of `'active'`) silently corrupts data — the record is saved, no error is thrown, but every `WHERE status = 'ACTIVE'` query silently excludes that record. TypeScript enums make this a compile-time error that is caught before the code ever runs.

---

## 96. Scheduled Job Documentation & Centralized Inventory
* **The Rule:** Rule 42 mandates distributed cron jobs technically, but in a large system with 10+ scheduled jobs across multiple modules, nobody — human or AI — knows what jobs exist, when they run, what data they touch, or what happens if they fail. This is a critical operational blind spot. Every scheduled job MUST be registered in a centralized inventory.
* **Required File (NestJS):** `src/core/scheduled-jobs.registry.ts` — a single file that serves as the master inventory of ALL background scheduled jobs.
* **Required File (Django):** `core/scheduled-jobs-registry.py` (or central Celery Beat schedule configuration) — serves as the master inventory.
  ```typescript
  // Example for NestJS: src/core/scheduled-jobs.registry.ts
  // RESPONSIBILITY: Master inventory of all scheduled jobs. Update this file whenever
  // a new job is added, modified, or removed anywhere in the application.

  export const SCHEDULED_JOBS_REGISTRY = [
    {
      name: 'MembershipExpiryNotifier',
      module: 'members',
      file: 'src/backend-manager/manager-modules/manager-members/members-jobs/manager-members-expiry-notifier.job.ts',
      schedule: '0 9 * * *',          // Every day at 9:00 AM UTC
      description: 'Sends renewal reminder notifications to members whose membership expires in 3 days.',
      touchesEntities: ['members', 'notifications'],
      failureBehavior: 'Logs to DLQ. Member does not receive reminder. Non-critical.',
      idempotent: true,
      lastReviewedBy: 'backend-team',
    },
    {
      name: 'WalletAutoDeductionJob',
      module: 'billing',
      file: 'src/backend-manager/manager-modules/manager-billing/billing-jobs/manager-billing-wallet-auto-deduction.job.ts',
      schedule: '0 0 1 * *',          // 1st of every month at midnight UTC
      description: 'Auto-deducts monthly plan fees from member wallets for active auto-renew subscriptions.',
      touchesEntities: ['wallets', 'subscriptions', 'payment_transactions'],
      failureBehavior: 'CRITICAL — moves to DLQ. Triggers alert to ops team. Member is NOT charged until manual retry.',
      idempotent: true,               // Uses Idempotency-Key per Rule 103
      lastReviewedBy: 'backend-team',
    },
  ] as const;
  ```
* **Mandatory fields per entry:** `name`, `module`, `file`, `schedule` (cron expression), `description` (what it does in plain English), `touchesEntities` (which DB tables it reads/writes), `failureBehavior` (what breaks if the job fails), `idempotent` (boolean — is it safe to run twice?).
* **`-backend-feature.md` Integration:** The "Data and State Architecture" section of every module's `-backend-feature.md` (Rule 19) MUST list all scheduled jobs owned by that module, referencing the registry entry by name.
* **Operational Rules:**
  - A new scheduled job MUST be added to the registry in the same PR as the job implementation. A job without a registry entry is considered undocumented and must be blocked at code review.
  - Any job that touches financial data (`wallets`, `payment_transactions`, `subscriptions`) is automatically subject to the CODEOWNERS human review gate (Rule 93).
  - Every scheduled job MUST have a Dead Letter Queue configured (Rule 61) — no exceptions.
* **Why:** Without a centralized inventory, an AI asked to "add a new cleanup job" has no way of knowing that a similar job already exists in another module, leading to duplicate jobs running simultaneously. More critically, when a production incident occurs at 2 AM and a scheduled job is the suspected cause, the on-call engineer needs to find it in under 60 seconds — not grep through 50 module folders.

---

## 97. API Timeout & Downstream Dependency Timeout Policy
* **The Rule:** Rule 47 covers circuit breakers for when external services fail repeatedly. But circuit breakers only open after failures accumulate. The first line of defense is **explicit timeouts** on every outbound call. An AI will never set timeouts by default — it will write `await axios.get(url)` with no timeout, meaning a slow external service can hold a Node.js thread indefinitely, silently exhausting the connection pool and causing cascading failures across the entire application.
* **Mandatory Timeout Tiers — define these in `src/core/config/timeout.config.ts`:**
  ```typescript
  export const TIMEOUT_CONFIG = {
    // Outbound HTTP calls to external services
    EXTERNAL_API_DEFAULT_MS: 5_000,    // 5s — default for all external HTTP calls
    PAYMENT_GATEWAY_MS: 10_000,        // 10s — payment APIs are slower but critical
    WHATSAPP_API_MS: 4_000,            // 4s — messaging APIs
    SMS_API_MS: 3_000,                 // 3s — SMS APIs

    // Database query timeouts
    DB_QUERY_DEFAULT_MS: 3_000,        // 3s — standard queries
    DB_QUERY_REPORT_MS: 30_000,        // 30s — analytics/report queries
    DB_TRANSACTION_MS: 10_000,         // 10s — multi-step transactions

    // Background job step timeouts
    JOB_STEP_DEFAULT_MS: 30_000,       // 30s — individual job processor step
  } as const;
  ```
* **Enforcement Rules:**
  - Every `axios` / `fetch` / `HttpService` call in an adapter (Rule 8) MUST pass `timeout: TIMEOUT_CONFIG.EXTERNAL_API_DEFAULT_MS` (or the appropriate tier). No raw `axios.get(url)` without a timeout is permitted.
  - ORM/DB query timeouts MUST be configured for all non-trivial queries using the appropriate timeout value from `TIMEOUT_CONFIG`.

    NestJS (TypeORM): configure `statement_timeout` via the `QueryRunner` or pass a raw `SET LOCAL statement_timeout = N` before the query in a transaction block. For repository-level timeouts, use `createQueryBuilder().timeout(TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS)`.

    Django: set `CONN_MAX_AGE` and use `transaction.atomic()` with Django's database options for statement timeouts where the driver supports it.

    Report/analytics queries must explicitly use the `DB_QUERY_REPORT_MS` tier.
  - When a timeout fires, the adapter MUST catch the `ECONNABORTED` / `ETIMEDOUT` error and throw a typed custom exception (Rule 6) — e.g., `PaymentGatewayTimeoutException` — never let the raw Axios error propagate to the service layer.
  - ❌ **BAD:** `await this.httpService.get('https://api.stripe.com/charges').toPromise()`
  - ✅ **GOOD:** `await this.httpService.get('https://api.stripe.com/charges', { timeout: TIMEOUT_CONFIG.PAYMENT_GATEWAY_MS }).toPromise()`
* **SLA Category Integration:** Timeout values must align with the SLA categories defined in Rule 59. The critical-path timeout budget must fit within the endpoint SLA, including application processing overhead. If a downstream call has a 5s timeout, the endpoint cannot be classified as `FAST`.
* **Why:** A single slow WhatsApp API call with no timeout can hold a Node.js async thread for 60+ seconds. Under load, 50 concurrent requests to the same slow endpoint will queue 50 threads, exhausting the connection pool and making the entire application unresponsive — not just the WhatsApp feature. Explicit timeouts are the difference between a degraded feature and a full application outage.

---

## 98. Structured Validation Error Response Shape (The `400` Contract)
* **The Rule:** Rule 3 mandates DTO/Serializer validation, and Rule 28 mandates a standard response envelope. But neither defines what the response looks like when validation fails. Every AI agent will produce a different `400 Bad Request` shape. API consumers need a **predictable, field-keyed error shape** to map inline field errors without any custom parsing logic per-form.
* **NestJS implementation:** Implement a global `ValidationExceptionFilter` (and properly configured `ValidationPipe`) to transform raw `class-validator` errors into the canonical shape.
* **Django implementation:** Implement a custom DRF Exception Handler to transform `ValidationError` into the canonical shape.
* **The Canonical Validation Error Shape:**
  ```typescript
  // This is what EVERY 400 validation error response must look like
  // It fits inside the standard ApiResponse envelope (Rule 28)
  {
    "success": false,
    "message": "Validation failed. Please check the highlighted fields.",
    "data": null,
    "error": "VALIDATION_ERROR",
    "errorCode": "VALIDATION.DTO.FAILED",
    "statusCode": 400,
    "validationErrors": [
      { "field": "email",    "message": "email must be a valid email address" },
      { "field": "phone",    "message": "phone must not be empty" },
      { "field": "age",      "message": "age must not be less than 18" }
    ]
  }
  ```
* **Required TypeScript type:**
  ```typescript
  // src/core/types/validation-error.types.ts
  export interface ValidationErrorItem {
    field: string;    // The exact DTO property name (e.g., 'email', 'address.city')
    message: string;  // Human-readable error message from class-validator
  }

  // Extends the base ApiResponse envelope
  export interface ValidationErrorResponse extends ApiResponse<null> {
    validationErrors: ValidationErrorItem[];
  }
  ```
* **Implementation — Global Validation Exception Filter:**
  - In NestJS: Create a global `ValidationExceptionFilter` that catches `BadRequestException` thrown by the `ValidationPipe` and transforms the raw `class-validator` error array into the canonical `validationErrors` shape above.
  - The `ValidationPipe` must be configured globally with `{ whitelist: true, forbidNonWhitelisted: true, transform: true }` (Rule 37).
  - Nested DTO errors (e.g., `address.city`) must use dot-notation for the `field` key so the frontend can map them to nested form fields.
  - ❌ **BAD:** Returning NestJS's raw default `{ statusCode: 400, message: ["email must be an email"], error: "Bad Request" }`
  - ✅ **GOOD:** The global filter transforms this into `{ success: false, validationErrors: [{ field: "email", message: "email must be a valid email address" }], ... }`
* **API Consumer Contract:** API consumers can map `validationErrors` directly to field-level validation UI. This maps backend validation errors directly to inline field errors without any custom parsing logic per-form.
* **Why:** Without this rule, every module's validation errors look different. The frontend team ends up writing custom error-parsing logic for every form, and AI agents on the frontend generate brittle one-off parsers. One canonical shape means one shared `handleValidationErrors(form, res)` utility handles every form in the entire application.

---

## 99. Immutable Service Layer (No Direct Entity Mutation Outside Repository)
* **The Rule:** Rule 89 separates ORM entities from domain objects. This rule enforces the complementary constraint: **service methods must never directly mutate ORM entity properties and call `save()` themselves**. All entity persistence — including updates — must go through the repository's explicitly defined methods. A service that reaches into an entity and mutates its fields bypasses audit hooks, soft-delete scopes, base entity `updatedAt` logic, and any future middleware attached to the repository layer.
* **The Forbidden Pattern:**
  ```typescript
  // ❌ BAD — Service directly mutates entity and calls save()
  async suspendMember(id: string): Promise<ManagerMembersDomainModel> {
    const member = await this.memberRepo.findByIdOrThrow(id);
    member.status = MemberStatus.SUSPENDED;   // Direct mutation
    member.suspendedAt = new Date();           // Direct mutation
    return this.memberRepo.save(member);       // Bypasses all repository hooks
  }
  ```
* **The Required Pattern — Repository owns all mutations:**
  ```typescript
  // ✅ GOOD — Repository exposes a named, intention-revealing method
  // In admin-members-write.repository.ts:
  async suspendById(id: string, suspendedAt: Date): Promise<ManagerMembersDomainModel> {
    // All mutation logic, audit hooks, and constraint checks live here
    const entity = await this.repo.save({ id, status: MemberStatus.SUSPENDED, suspendedAt });
    return this.mapper.toDomain(entity);
  }

  // In admin-members-suspension.service.ts:
  async suspendMember(id: string): Promise<ManagerMembersDomainModel> {
    await this.memberRepo.findByIdOrThrow(id); // Existence check
    return this.memberRepo.suspendById(id, new Date()); // Repository owns the mutation
  }
  ```
* **Rules:**
  - Services may call `findByIdOrThrow()` to assert existence and read current state.
  - Services may call named repository mutation methods (e.g., `suspendById`, `updateEmail`, `markAsDeleted`).
  - Services must NEVER call the generic `repo.save(entity)` directly after mutating entity properties inline.
  - The generic `save()` method on the repository is `protected` or `private` — only callable from within the repository class itself.
  - Every repository mutation method must have its own framework-appropriate method documentation (Rule 80) and be listed in the module's `-backend-feature.md` File Responsibility Map (Rule 19).
* **The `partial update` exception:** For simple field updates, the repository may expose a generic `updateById(id: string, updateInput: ManagerMembersUpdateInput): Promise<ManagerMembersDomainModel>` that internally maps the application-layer input to the ORM and calls `repo.update(id, entityUpdate)`. The repository must never accept HTTP DTOs like `ManagerMembersUpdateDto` directly, ensuring the domain layer remains decoupled from the API layer.
* **Why:** When an AI is asked to "add an audit log entry whenever a member is suspended", the correct answer is to add it inside `memberRepo.suspendById()`. If suspension logic is scattered across 5 different service methods that all do `member.status = 'SUSPENDED'; repo.save(member)`, the AI must find and modify all 5 — and will inevitably miss one. A single named repository method is the single place to add cross-cutting concerns.

---

## 100. Database Constraint Naming Convention
* **The Rule:** Rules 60 and 66 define column and table naming conventions. But AI agents generate random, unreadable constraint names like `UQ_3f4a8b2c1d` or `FK_abc123` — names that are meaningless in migration files, error logs, and database admin tools. All database constraints MUST follow a strict, human-readable naming convention defined here.
* **The Canonical Naming Patterns:**

  | Constraint Type | Pattern | Example |
  |---|---|---|
  | Primary Key | `PK_[table]` | `PK_members` |
  | Foreign Key | `FK_[table]_[referenced_table]_[column]` | `FK_subscriptions_members_member_id` |
  | Unique Constraint | `UQ_[table]_[column(s)]` | `UQ_members_email`, `UQ_staff_phone_branch_id` |
  | Index | `IDX_[table]_[column(s)]` | `IDX_members_status`, `IDX_payment_transactions_created_at` |
  | Check Constraint | `CHK_[table]_[rule_description]` | `CHK_members_age_min_18`, `CHK_wallets_balance_non_negative` |
  | Composite Index | `IDX_[table]_[col1]_[col2]` | `IDX_members_branch_id_status` |

* **Implementation (TypeORM entity example):**
  ```typescript
  @Entity({ name: 'members' })
  export class ManagerMembersEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    // PK_members
    id: string;

    @Column({ name: 'email', unique: false })
    email: string;
    // UQ constraint: UQ_members_email — declared in migration

    @Column({ name: 'branch_id', type: 'uuid' })
    branchId: string;
    // FK_members_branches_branch_id — declared via @JoinColumn

    @Column({ name: 'status', type: 'enum', enum: MemberStatus, default: MemberStatus.PENDING })
    status: MemberStatus;
    // IDX_members_status — declared in migration

    @Column({ name: 'balance', type: 'bigint', default: 0, comment: 'Cached balance projection (minor units). Source of truth is ledger_entries (Rule 119). Never mutate directly.' })
    // CHK_wallets_balance_non_negative — enforced via migration DDL
    balance: bigint;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id', referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_members_branches_branch_id' })
    branch: BranchEntity;
  }
  // Indexes and composite unique constraints are declared in the migration file,
  // not via @Index/@Unique decorators, to ensure exact constraint names.
  ```
* **Rules:**
  - Constraint names MUST be explicitly declared in the ORM schema/decorator where the ORM supports it; otherwise declared explicitly and immutably in migration/DDL. Never rely on ORM auto-generated names regardless of ORM choice.
  - Constraint names must be unique across the entire database — prefix with the table name to guarantee this.
  - When a constraint is dropped and recreated in a migration (e.g., adding a column to a composite unique constraint), the migration MUST reference the constraint by its exact name. Auto-generated names make this impossible.
  - Check constraints for business invariants (e.g., `balance >= 0`, `age >= 18`) are MANDATORY for all financial and safety-critical columns. Application-level validation (Rule 3) is the first line of defense; DB check constraints are the last.
  - All constraint names must be added to the module's `-backend-feature.md` under the "Data and State Architecture" section so future AI agents know what constraints exist before writing migration files.
* **Why:** When a production `INSERT` fails with `ERROR: duplicate key value violates unique constraint "UQ_3f4a8b2c1d"`, the on-call engineer has no idea which table or column caused it without running a separate DB query. With `UQ_members_email`, the error message is self-documenting. More critically, when an AI writes a migration to drop and recreate a constraint, it must reference the constraint by name — if the name is auto-generated and unknown, the AI will hallucinate a name, causing the migration to fail in production.

---

## Updated Summary Checklist (v5 — Final):
1. Identify the exact layer (Validation? Query? Business Logic? External Adapter? Permission Guard? Mapper?).
2. Select the **one or two** micro-files associated with that layer.
3. Check the module's `-backend-feature.md` for context before giving the AI any files.
4. Pass ONLY those files to the AI along with the feature doc.
5. After the AI writes code, verify:
   - Is there an N+1 query?
   - Is there a missing null check (use `findByIdOrThrow` where needed)?
   - Is a secret hardcoded? (Auto-blocked by pre-commit hook — Rule 91)
   - Is the response wrapped in the standard envelope with a single consistent `data` shape — is `data` a single explicitly typed value, never a polymorphic bag? (Rule 82)
   - Does the response DTO satisfy the **complete** frontend UI Data Requirements — no missing table columns, KPI fields, chart series, dropdown data, or relationship fields? (Rule 82A)
   - Is the permission guard at the controller layer using typed enums? (Rule 83)
   - Is any ORM `orderBy` or `where` using user input without an allowlist? (Rule 92)
   - Does every paginated endpoint use `PaginationQueryDto` and return the canonical `PaginationMeta` shape via `buildPaginationMeta()`? (Rule 94)
   - Are all status/type/role entity columns using strictly typed enums (TypeScript Enum + `@IsEnum()` for NestJS, or `TextChoices` + `ChoiceField` for Django) — never raw `string` columns? (Rule 95)
   - Is every new scheduled job registered in `src/core/scheduled-jobs.registry.ts` with all mandatory fields? (Rule 96)
   - Do all outbound HTTP calls and DB queries have explicit timeouts from `TIMEOUT_CONFIG`? (Rule 97)
   - Does the global `ValidationExceptionFilter` transform `400` errors into the canonical `validationErrors` shape? (Rule 98)
   - Do service methods call named repository mutation methods — never directly mutating entity properties and calling `save()` inline? (Rule 99)
   - Are all DB constraints (FK, UQ, IDX, CHK) explicitly named following the `FK_[table]_[ref]_[col]` convention — never auto-generated? (Rule 100)
   - Does the role container contain the mandatory `{role}-core/` and `{role}-modules/` directories? (Rule 2 — Mandatory Role Container Structure)
   - Are all feature modules located inside `{role}-modules/` rather than directly under `backend-{role}/`? Direct feature placement under `backend-{role}/` is an Architecture Violation. (Rule 2 + Rule 38)
   - Do all AI-generated tests verify real observable behavior — no placeholder assertions, no tests that would pass if the feature were broken? (Rule 101)
   - Are there any barrel file imports or relative path imports?
   - Does every new method follow the verb naming convention with `OrThrow` where needed? (Rule 86)
   - Is every new method ≤ 20 lines using Guard Clauses? (Rule 85/87)
   - Does every new file have language-appropriate RESPONSIBILITY + FLOW annotations and framework-appropriate method documentation on every method? (TypeScript/JavaScript: `// RESPONSIBILITY:` + `// FLOW:` + JSDoc; Python/Django: `# RESPONSIBILITY:` + `# FLOW:` + Python docstrings) (Rules 76/79/80)
   - Is a Mapper used to translate between ORM entities and domain objects? (Rule 89)
   - For mutation endpoints: is an `Idempotency-Key` header supported to prevent double-execution? (Rule 103)
   - For background job queues: is a Dead Letter Queue configured for all retry-exhausted jobs? (Rule 61)
   - If the change touches `auth/`, `billing/`, `webhooks/`, or `tenant-provisioning/`, has a human reviewed it? (Rule 93)
6. Run automated CI gates: SAST, SCA, secrets scan, `tsc --noEmit` (NestJS) or `mypy --strict` (Django). (Rule 90)
7. Generate `pytest` tests for the live API (execution optional/handled by CI) to confirm contract compliance.
8. For security-critical modules, ensure `CODEOWNERS` human approval is obtained. (Rule 93)
9. Review the AI's isolated changes one final time.

---

## 101. AI Test Integrity Gate — Tests Must Prove Real Behavior

A test file existing is NOT sufficient evidence of correctness.

All AI-generated backend tests MUST verify meaningful application behavior and MUST NOT
exist only to satisfy coverage, file-count, or checklist requirements.

The AI MUST NOT create or keep:
- Placeholder assertions.
- Trivial self-evident assertions (e.g. `expect(true).toBe(true)`, `expect(1).toBe(1)`).
- Empty tests.
- Tests that only instantiate a class without verifying behavior.
- Tests that mock the exact business logic under test.
- Tests that assert implementation details when externally observable behavior can be tested.
- Tests whose expected value is copied directly from the implementation rather than the business contract.
- E2E tests that never exercise the actual HTTP endpoint being claimed as covered.

### Unit Test Integrity

For service/repository/validator tests, verify real branches including:
- successful execution
- validation failure
- not-found behavior
- authorization/permission failure where applicable
- business-rule violations
- persistence failure where applicable
- transaction rollback behavior where applicable
- idempotency behavior for critical mutations
- correct repository method invocation
- correct domain/DTO transformation

### API / E2E Test Integrity

Pytest E2E tests MUST verify:
- actual HTTP method and endpoint
- request validation
- canonical response envelope
- response data shape
- required frontend-facing response fields
- status/error behavior
- authentication/authorization
- pagination/filter/sort behavior where applicable
- mutation side effects where observable
- regression behavior for fixed bugs
### Anti-False-Passing Rule

A test is invalid if the test would still pass after the behavior it claims to protect
is deliberately broken.

Before marking a backend feature complete, the AI MUST review its tests and explain
what real defect each important test would catch.

The build passing is not equivalent to behavioral correctness.

### Strict Case Sensitivity for File Names and Imports (Linux/CI Compatibility)

All imports and file paths MUST exactly match the casing of the actual file on disk. While development often happens on Windows/macOS (which have case-insensitive file systems), production deployments and CI pipelines typically run on Linux (which has a strict case-sensitive file system).
- **Rule:** A mismatch between import case (e.g., `trainer-url-config`) and file case (e.g., `Trainer-url-config.ts`) will cause the build to fail in CI/CD.
- **Enforcement:** Always double-check that the casing of module prefixes and filenames in imports matches exactly. If you rename a file, ensure the git index catches the case change (e.g., using git mv).


## 102. Database Table Naming & Prefixing in Monoliths
* **Scope Note:** Rule 102 applies to tables within the master/shared database only. Tenant-isolated databases (Rule 39) contain standard un-prefixed table names within their own isolated schema — Rule 102 domain-prefixes do not apply inside a tenant DB.
* **The Rule:** When multiple sub-domains (e.g. Admin, Superadmin, Auth) share a single monolithic database, all non-shared database tables MUST be explicitly prefixed with their domain name inside the framework's entity/model definition (e.g., `admin_campaigns`, `superadmin_saas_invoices`).
* **NestJS implementation:** Use the `@Entity('prefix_table')` decorator. Always explicitly hardcode the name rather than using implicit global naming strategies.
* **Django implementation:** Use `class Meta: db_table = 'prefix_table'`. Always explicitly hardcode the name rather than relying on app-label prefixing defaults.
* **Why:** A global Naming Strategy (like implicit global naming strategies) blindly prefixes all tables based on folder structure. This breaks **shared tables** (like `tenants` or `audit_logs`) by splitting them into multiple disconnected tables (`admin_tenants`, `superadmin-gyms`, etc.). Explicit hardcoding ensures shared tables remain central (`core_tenants` or `tenants`) while module-specific tables remain safely isolated and clearly identifiable in code.

## Rule 103 — Strict Mutational Idempotency (The `@RequireIdempotencyKey` Rule)

All state-mutating endpoints (`POST`, `PATCH`, `PUT`, `DELETE`) across the entire backend architecture MUST enforce strict idempotency.
This is a non-negotiable enterprise requirement designed to prevent duplicate payments, duplicate record creation, and partial transaction failures from network retries.

### NestJS implementation
Use the centralized `@RequireIdempotencyKey()` decorator/interceptor. The decorator automatically intercepts the request, checks for the `Idempotency-Key` HTTP header, and rejects requests that omit it with a `400 Bad Request`.

### Django implementation
Use the project's centralized middleware/decorator/request enforcement mechanism to enforce the same Idempotency-Key contract.

### Framework-independent requirements
- all POST/PATCH/PUT/DELETE mutations require the key
- missing key is rejected
- request-body hash must match on retry
- same key = same operation
- Atomic Concurrency Lock: perform an atomic check-and-set (e.g., using Redis `SETNX`) to establish an "in-progress" lock. Concurrent requests with the same key MUST wait or be rejected immediately with `409 Conflict`.
- completion recorded only after DB commit (storing the final response payload)
- fail closed if the idempotency store is unavailable (return `503 Service Unavailable`)
- Idempotency must be enforced at the Command Controller level (e.g. `[role]-[module]-command.controller.ts`), never buried inside the service layer.
- `GET` endpoints must NEVER require an idempotency key, as they are natively safe and read-only.

## Rule 104 — WebSockets & Real-Time Communication
* **The Rule:** Any real-time push functionality (like live messaging, active session counts, or live notifications) MUST be implemented using a horizontally scalable WebSocket architecture. 
* **NestJS implementation:** Use a WebSocket transport (e.g., `@nestjs/platform-ws` or `@nestjs/platform-socket.io`) paired with a transport-specific adapter for Redis-backed cross-instance fan-out (e.g., `redis-adapter` for socket.io).
* **Django implementation:** Use Django Channels with a Redis channel layer for cross-instance fan-out.
* **Payload Strictness:** WebSocket emitted events and payloads MUST follow a strict shape similar to the `ApiResponse<T>` envelope, avoiding arbitrary, untyped object broadcasts.

## Rule 105 — Role-Based Data Serialization & Field Masking
* **The Rule:** Data intended to be hidden from specific user roles (e.g., hiding internal revenue metrics from a basic Member, but showing it to a Superadmin) MUST be masked at the serialization layer.
* **NestJS implementation:** Use `class-transformer` decorators such as `@Exclude()` or `@Expose({ groups: ['admin'] })` on the DTO. The controller must pass the current user's role to the serialization interceptor so that the DTO automatically strips forbidden fields before sending the JSON response.
* **Django implementation:** Use DRF serializer Context or dynamic field removal within the Serializer `to_representation` or `__init__` methods based on the `request.user` passed in via context.
* **Why:** This ensures data hiding is centralized and declarative, preventing developers from manually trying to `delete user.revenue` in various service methods, which is error-prone.

## Rule 106 — Strict Cache Invalidation Strategy

* **The Rule:** Every cached query MUST have deterministic cache keys and an explicit invalidation strategy.

* Cache invalidation MUST happen only after the corresponding database transaction successfully commits.

* The Orchestrator / UnitOfWork owns the transaction lifecycle and MUST trigger the cache invalidation through an `afterCommit` mechanism.

* Repositories MUST NOT invalidate cache before transaction commit.

* Repositories MUST NOT contain independent pre-commit cache invalidation side effects.

* Mutation operations MUST provide enough information for the Orchestrator / UnitOfWork to deterministically invalidate all affected cache keys after commit.

* TTL alone is insufficient when explicit invalidation is required.

Required flow:

Read
→ deterministic cache key
→ mutation
→ DB transaction
→ commit
→ afterCommit invalidation
→ next read

## Rule 107 — Internationalization (i18n) & Localization

### Strategy: Module-Co-located Locales + AI-Generated Translations (Zero External Cost)

The backend uses framework-native internationalization (e.g., `nestjs-i18n` for NestJS, or `Django translation framework` for Django) with **co-located locale files inside each module folder** — NOT in a central `src/i18n/` directory. This preserves **Extreme Isolation**: each module owns its own strings and can be moved, deleted, or versioned independently.

**Translations are written by the AI agent at the time it writes the module code.** No external API is needed. The AI already has full context of the Gym Management domain, making translations accurate and idiomatic.

### Stack
- **Library:** `nestjs-i18n` (NestJS) or Django native translation framework (Django)
- **Base language:** English (`en/{role}-{module}-errors.json` and `en/{role}-{module}-messages.json`) — written by developer / AI agent
- **Other languages:** Written by the AI agent in the same commit that creates the module
- **Runtime cost:** Zero — all files are static JSON, bundled with the app

### Framework-independent requirements
- Locale files MUST remain inside the owning feature/module.
- No central global business-locale folder.
- Translation keys MUST be namespaced by module.
- `Accept-Language` MUST be respected by the API.
- Validation/error messages MUST resolve through the centralized i18n mechanism.
- Every active launch language MUST have the required locale files.
- Hardcoded user-facing business strings in backend exceptions/responses are forbidden when an i18n key is required.

### NestJS implementation

**Module-Level File Structure**
Each module owns its own `{module}-locales/` folder:
```text
src/
  backend-admin/
    admin-modules/
      admin-members/
        members-locales/
          en/
            admin-members-errors.json   ← AI writes this when creating the module
            admin-members-messages.json
          nl/    ← FUTURE/NON-ACTIVE — DO NOT GENERATE (not in ACTIVE_LANGUAGES)
            admin-members-errors.json
            admin-members-messages.json
          fr/    ← FUTURE/NON-ACTIVE — DO NOT GENERATE (not in ACTIVE_LANGUAGES)
            admin-members-errors.json
            admin-members-messages.json
        members-controllers/
          admin-members-command.controller.ts
        members-services/
          admin-members-registration.service.ts
  backend-superadmin/
    superadmin-modules/
      superadmin-gyms/
        tenants-locales/
          en/
            superadmin-gyms-errors.json
          nl/    ← FUTURE/NON-ACTIVE — DO NOT GENERATE
            superadmin-gyms-errors.json
scripts/                  ← (Global tooling folder exception allowed under Rule 2)
  merge-locales.ts        ← Merges all module locales into one bundle at build time
```

**AI Agent Translation Rule**
When an AI agent writes a new module or adds new error/message keys, it MUST:
1. Create `members-locales/en/admin-members-errors.json` with the English strings.
2. In the **same commit**, create `members-locales/hi/admin-members-errors.json` (and any other currently `ACTIVE_LANGUAGES`), using its own translation capability. Generate ONLY the `ACTIVE_LANGUAGES`.
3. Translations must be **contextually correct** for a Gym Management SaaS — not literal word-for-word.

```json
// members-locales/en/admin-members-errors.json
{
  "ERRORS": {
    "MEMBER_NOT_FOUND": "Member not found.",
    "PLAN_EXPIRED": "Your gym subscription has expired."
  }
}

// members-locales/nl/admin-members-errors.json  ← FUTURE/NON-ACTIVE example only — DO NOT GENERATE unless nl is in ACTIVE_LANGUAGES
{
  "ERRORS": {
    "MEMBER_NOT_FOUND": "Lid niet gevonden.",
    "PLAN_EXPIRED": "Uw gymabonnement is verlopen."
  }
}
```

**Throwing Errors (Correct Pattern)**
Always throw with a module-scoped translation key — never a hardcoded English string:
```typescript
// ❌ FORBIDDEN
throw new NotFoundException('Member not found.');

// ✅ CORRECT — key maps to {module}-locales/{lang}/{role}-{module}-errors.json
throw new NotFoundException({ key: 'members.ERRORS.MEMBER_NOT_FOUND' });
```

### Django implementation

Use Django's native translation framework and the project's approved Django middleware/translation integration.

**App-Level File Structure**
Each app owns its own `{module}-locales/` folder containing `.po`/`.mo` message files.

**AI Agent Translation Rule**
When an AI agent writes a new module or adds new error/message keys, it MUST generate translations using standard `gettext` syntax and ensure locale messages are updated for ALL active languages using `django-admin makemessages`.

**Throwing Errors / Validation (Correct Pattern)**
Always use `gettext_lazy` (or `_`) for user-facing strings — never a hardcoded English string:
```python
# ❌ FORBIDDEN
raise ValidationError('Member not found.')

# ✅ CORRECT
from django.utils.translation import gettext_lazy as _
raise ValidationError(_('Member not found.'))
```

Do NOT create NestJS interceptors, NestJS decorators, `nestjs-i18n`, `nest build`, JSON locale bundles, or NestJS-specific locale merge scripts (like `merge-locales.ts`) in a Django project.

### Framework gate

The AI MUST implement only the branch corresponding to the verified
active framework.

### Configured Target Languages
This is the **authoritative list of languages** this project supports. There is no central config file — this instruction document IS the config. When an AI agent creates any new module, it MUST generate locale files for every currently active language (`{module}-locales/` JSON for NestJS, or `{module}-locales/` message files for Django).

| Code | Language | Region | Script | Priority |
|------|----------|--------|--------|----------|
| `en` | English | Global | Latin | **Base — always first** |
| `nl` | Dutch | Netherlands, Belgium | Latin | High |
| `fr` | French | France, Belgium, Canada | Latin | High |
| `de` | German | Germany, Austria, Switzerland | Latin | High |
| `hi` | Hindi | India (North) | Devanagari | High |
| `mr` | Marathi | Maharashtra, India | Devanagari | Medium |
| `ta` | Tamil | Tamil Nadu, Sri Lanka | Tamil | Medium |
| `te` | Telugu | Andhra Pradesh, Telangana | Telugu | Medium |
| `kn` | Kannada | Karnataka, India | Kannada | Medium |
| `bn` | Bengali | West Bengal, Bangladesh | Bengali | Medium |
| `gu` | Gujarati | Gujarat, India | Gujarati | Low |
| `ml` | Malayalam | Kerala, India | Malayalam | Low |
| `pa` | Punjabi | Punjab, India/Pakistan | Gurmukhi | Low |

> **Phased Rollout:**
> - `SUPPORTED_LANGUAGES`: The full table above represents all future supported languages.
> - `ACTIVE_LANGUAGES`: We currently only ship `en` (English) + `hi` (Hindi) at launch.

> **Indian Script Note:** Devanagari, Tamil, Telugu, Kannada, Bengali, Gujarati, Malayalam, and Gurmukhi are complex scripts. Ensure the server sends correct UTF-8 encoded strings. The native framework translation system handles this natively — no extra configuration needed.

> **AI AGENT NOTE:** When creating any new module/app, you MUST create its locale files (e.g., `{module}-locales/.../{role}-{module}-errors.json` for NestJS or `{module}-locales/.../{role}-{module}-django.po` for Django) for the `ACTIVE_LANGUAGES`. Generate ONLY the `ACTIVE_LANGUAGES`. Use your own translation capability - do NOT call any external translation API. Keys must be namespaced by module name. Hardcoding English strings in exceptions is a critical violation.

## Rule 108 — Centralized Feature Flags
* **The Rule:** Toggling business logic branches based on environment variables (e.g., `if (process.env.ENABLE_NEW_BILLING)`) is strictly forbidden.
* **Implementation:** Always use a centralized `{role}-core-feature-flag.service.ts` (e.g. `AdminCoreFeatureFlagService`, backed by the master database or an external provider like LaunchDarkly). Feature flags must be evaluated dynamically per-tenant, allowing gradual rollouts, canary deployments, and per-gym toggles without requiring a server restart.


## Rule 109 — Multi-Currency Monetary Amounts

### The Problem
Storing monetary amounts as floats (e.g., `99.99`) causes rounding errors in financial calculations. Hardcoding currency symbols (₹, $, €) breaks international deployments. Formatting amounts in service methods couples business logic to presentation.

### Storage Contract (Backend is Source of Truth)
- **Always store monetary amounts as integers in the smallest currency unit.**
  - INR: store `9999` for ₹99.99 (paise)
  - USD/EUR: store `9999` for $99.99 (cents)
  - JPY: store `100` for ¥100 (yen has no subunit)
- For NestJS/TypeORM, use PostgreSQL `integer` or `bigint` mapping as appropriate.

For Django, use the corresponding integer/big-integer field.

Never use FLOAT/DOUBLE for monetary amounts.
- Every monetary response field MUST be accompanied by its `currency` code (ISO 4217):

```typescript
// ❌ FORBIDDEN — float and no currency
{ "amount": 99.99 }

// ✅ CORRECT — integer smallest unit + ISO 4217 currency code
{ "amount": 9999, "currency": "INR" }
```

### DTO Rule
Every DTO that includes a monetary field MUST include the paired currency code:
```typescript
export class AdminBillingPlanCreateDto {
  @IsInt()
  @Min(0)
  price: number; // in smallest unit (paise, cents, etc.)

  @IsString()
  @IsISO4217CurrencyCode()
  currency: string; // e.g. 'INR', 'USD', 'EUR'
}
```

### Never Hardcode Currency Symbols
```typescript
// ❌ FORBIDDEN
return `₹${amount / 100}`;

// ✅ CORRECT — pass raw integer + currency code to frontend; let frontend format
return { amount, currency };
```

> **AI AGENT NOTE:** Every monetary field in a DTO or Entity MUST be stored as an `INT` or `BIGINT` in the smallest currency unit (paise/cents). Every monetary response object MUST include a paired `currency: string` (ISO 4217 code). Never divide by 100 or format amounts on the backend — that is the frontend's responsibility using `Intl.NumberFormat`.


## Rule 110 — Tenant Data Export & Offboarding

### The Problem
When a B2B tenant (e.g., Gym) churns and requests their data, a synchronous API call to dump the database will timeout (HTTP 504) for large datasets. Furthermore, non-technical users cannot read raw JSON or SQL dumps.

### Implementation Strategy
All data exports MUST be processed asynchronously via background jobs and delivered as a compressed ZIP of CSV files.
- **Role Constraint:** This functionality belongs strictly to the **Superadmin** (or top-level Gym Admin) role container. Do NOT implement data export routes inside manager, frontdesk, or member modules.

1. **Data Format (Denormalized & Deeply Resolved):** Generate `.csv` files for all core entities. **CRITICAL:** Do NOT export raw database tables with isolated UUID foreign keys. Non-technical business owners cannot perform SQL JOINs. Whether it is a simple Gym or a complex enterprise gym with deep relationships (e.g., Member -> Membership Plan -> Trainer -> Training Session), you MUST use ORM-specific query builders (e.g., TypeORM QueryBuilder for NestJS or the corresponding Django ORM query facilities) to flatten the data completely. All foreign keys MUST be resolved into human-readable reference names (e.g., `Trainer Name`, `Plan Name`, `Class Name`) and included explicitly in the CSV row. Compress these CSVs into a single `.zip` file.
2. **Trigger:** `POST /api/v1/superadmin/export-data` MUST respond immediately with `202 Accepted` and enqueue a job.
3. **Background Job (Project Message Infrastructure):** A worker processes the job using:
   - NestJS → BullMQ backed by Redis
   - Django → Celery backed by Redis

Redis Pub/Sub MUST NOT be used as the durable job queue.
4. **Storage:** The worker saves the `.zip` securely to the local server disk (e.g., in a protected volume) OR uploads to a private S3 bucket if configured.
5. **Delivery:** The backend generates a secure, time-limited **download token/URL** (valid for 24-48 hours) and sends an email to the admin. If using local storage, the URL points to a protected backend route (e.g., `GET /api/v1/superadmin/download-export?token=xyz`) that streams the file.
6. **Real-time Notification:** Upon successful email dispatch, the backend MUST emit a WebSocket event (e.g., `EXPORT.DATA.COMPLETED`) to the Superadmin so the dashboard can reflect the "Email Sent" status.

### Data Retention & Hard Deletion
- When a tenant cancels, their account is **Soft Deleted** (suspended).
- Maintain a **90-day grace period** in case they return.

#### Explicit Retention Hierarchy (applies to all tenant off-boarding)

| Record Type | After Soft-Delete (90-day grace) | After 90-day Hard-Delete | Authority |
|---|---|---|---|
| `members`, `staff`, `plans`, `attendances` | Soft-deleted (accessible) | Hard-deleted | Rule 29 / 110 |
| `audit_logs` | Retained read-only | Anonymized (actor/entity ids pseudonymized) | GDPR / Rule 29 |
| `events_log` (Rule 118) | Retained read-only | Retained — append-only; archive to regulated storage | Rule 118 / 119 |
| `ledger_entries` (Rule 119) | Retained read-only | Retained — must archive; never deleted | Financial law |
| Tenant database | Active | Rows purged per above; schema preserved 30 additional days, then dropped | Rule 39 |
| S3/local export zips | Deleted after 48h download window | N/A | Rule 110 |

An AI agent MUST apply this retention hierarchy. Blanket deletion of all tenant data is a Rule 118/119 violation.
- A distributed scheduled job, executed through the Rule 42 distributed scheduler (NEVER a local @Cron() or similar), MUST permanently hard-delete all tenant data (including generated `.zip` files on disk/S3) after 90 days to comply with GDPR Right to Erasure / Data Portability laws. *(Exception: See Rule 29 for retention hierarchy. Legally required financial/audit ledgers must be explicitly archived/retained rather than blindly deleted.)*

> **AI AGENT NOTE:** Never implement data export as a synchronous API. Always use a Background Job / Message Broker, stream data to CSV, save to secure local disk or S3, email a time-limited download link, and emit a WebSocket completion event. Raw JSON/SQL dumps are forbidden for tenant exports.


## Rule 111 — Persistent WebSockets (Notifications & Chats)

### The Problem
WebSockets are "fire-and-forget". If the backend emits an event (`socket.emit('notification')` or `socket.emit('chat_message')`) while the user is offline or experiencing a network blip, that message is lost forever.

### The Rule
Never emit a critical WebSocket event (like "Export Ready", "Payment Received", or a "Chat Message") without **first saving it to the database**.

1. **Save First:** Insert a record into the `Notifications` or `Chats` table within your database transaction.
2. **Transactional Outbox / Relay:**

The transaction MUST write the persistent notification/chat record AND the corresponding outbox event atomically.

A background relay worker MUST read committed outbox events and publish the real-time notification through Redis Pub/Sub.

For NestJS, the relay worker MUST use BullMQ + Redis where background job processing is required.

For Django, the relay worker MUST use Celery + Redis where background job processing is required.

Do NOT use PostgreSQL LISTEN/NOTIFY as the sole durable event mechanism.

Do NOT rely on:

`await db.commit(); socket.emit(...)`

as the reliability mechanism.

Redis Pub/Sub provides transient real-time fan-out.
The database remains the source of truth for offline recovery.
3. **Recovery:** This ensures that if the user is online, they get the live WebSocket blast. If they are offline, they will see the message when they open the app and the frontend fetches historical data via REST (`GET /api/v1/{role}/notifications` or `GET /api/v1/{role}/chats`).
4. **Soft Delete Mandatory:** All notifications and chat messages MUST use **Soft Deletion** (e.g., `deleted_at: timestamp` or `is_deleted: true`). Never hard-delete chat histories or notifications, as they are crucial for audits, tenant data exports, and dispute resolutions (subject only to the legal-erasure exception defined in Rule 29 / Rule 110).

## Rule 112 — Complete Isolation for E2E and Selenium Testing

### The Philosophy
The "Extreme Isolation" and "WET over DRY" principles apply just as strictly to API E2E (pytest) and Selenium UI testing suites as they do to the backend source code. 

### Implementation Constraints

1. **Strict 1-to-1 Folder Mirroring (The "Suffix Rule"):** The E2E and Selenium directory structure MUST be an exact 1-to-1 mirror of the backend domain structure, but with the specific testing type appended to the folder name.
   - **Root Level:** `src/backend-superadmin/` ➔ `backend-e2e/backend-superadmin-e2e/` (API) or `backend-selenium/backend-superadmin-selenium/` (UI)
   - **Feature Level:** `src/backend-superadmin/superadmin-modules/superadmin-dashboard/` ➔ `backend-e2e/backend-superadmin-e2e/superadmin-modules/superadmin-dashboard/` (API) or `backend-selenium/backend-superadmin-selenium/superadmin-modules/superadmin-dashboard/` (UI)
   - This exact 1-to-1 path mirroring ensures that developers and AI agents always know exactly where the E2E or Selenium test for a specific module lives.
   - ❌ **BAD:** `e2e/admin/` or `selenium/members/`
   - ✅ **GOOD:** `backend-e2e/backend-admin-e2e/` and `backend-selenium/backend-superadmin-selenium/`

2. **Strict File Naming Convention (Suffix Enforced):** Every E2E and Selenium test file MUST encode the role and module name to prevent any ambiguity. Additionally, they MUST end with the explicit suffix (`-e2e.py` or `-selenium.py`) to instantly identify their purpose.
   - **E2E (API) Format:** `test-[role]-[module]-e2e.py` (e.g., `test-superadmin-dashboard-e2e.py`)
   - **Selenium (UI) Format:** `test-[role]-[module]-selenium.py` (e.g., `test-superadmin-dashboard-selenium.py`)
   - ❌ **BAD:** `test_dashboard.py` or `api_test.py`
   - ✅ **GOOD:** `test-admin-members-e2e.py` (lives inside `backend-e2e/backend-admin-e2e/admin-modules/admin-members/`)

3. **WET Over DRY (Module-Level "AI Zip" Principle):** E2E and Selenium tests must be 100% self-contained at the **MODULE level**, exactly like the backend source code. You MUST NOT create a shared `helpers/` or `utils/` folder even within a specific role (e.g., no `backend-manager-e2e/helpers/`). If the `manager-dashboard` test and `manager-billing` test both need a login helper, you MUST duplicate the helper directly into BOTH the `manager-dashboard` and `manager-billing` test folders.
   - **Why:** If a bug occurs in the Dashboard E2E test, a developer must be able to ZIP *only* the `backend-e2e/backend-manager-e2e/manager-modules/manager-dashboard/` folder and feed it to an AI agent. If the test relies on parent or sibling helper directories, the AI loses context, wastes tokens, and breaks other modules.
   - ❌ **BAD:** `backend-e2e/backend-manager-e2e/helpers/auth-helper.py`
   - ✅ **GOOD:** `backend-e2e/backend-manager-e2e/manager-modules/manager-dashboard/manager-auth-helper.py` AND `backend-e2e/backend-manager-e2e/manager-modules/manager-billing/manager-auth-helper.py`

4. **No Cross-Module Imports:** A test script in `backend-manager-e2e/manager-modules/manager-dashboard/` MUST NOT import a fixture, constant, or helper from `backend-manager-e2e/manager-modules/manager-billing/`, nor from `backend-admin-e2e`. Isolation is absolute down to the sub-feature level. Tests are completely siloed to minimize context windows and prevent cascading failures.

5. **Test-Specific Forbidden Patterns (`_test-forbidden.md`):** Every top-level testing role container — both in `backend-e2e/backend-[role]-e2e/` and `backend-selenium/backend-[role]-selenium/` — MUST contain a `_test-forbidden.md` file documenting exactly what external dependencies are forbidden, what databases it is NOT allowed to mock directly, and the consequences of violating these boundaries. Both files are mandatory deliverables. (*Note: `_test-forbidden.md` and global test config files are explicitly exempt from the Rule 2 role-prefixing requirement.*)

6. **Self-Contained Artifacts:** Any mock data (JSON fixtures, mock images, test PDFs) required by Selenium or E2E tests must be stored inside the specific feature's test folder. Do not use a global `tests_data/` folder at the root.

7. **True Test Database (No Database Mocking):** E2E tests MUST be executed against a completely isolated, dedicated `test` database instance. E2E tests must trigger real network requests, hit real controllers, and execute real SQL/ORM queries. Mocking or stubbing the database in E2E tests is strictly forbidden. 

8. **Anti-False-Passing (No "Always-Pass" Dummy Code):** AI agents MUST NOT generate trivial, superficial tests (e.g., `assert True` or just checking if a route returns 200 without inspecting the payload or database side effects) simply to appease test coverage or impress the user. A test is ONLY valid if it asserts the true business logic, validates exact payload shapes, and verifies database state changes. If the test would still pass after the actual business logic is deliberately broken, the test is invalid and will be rejected.

9. **Selenium Strict Locators (The data-testid Contract):** Every Selenium or UI interaction MUST strictly rely on `data-testid` attributes as the primary and only locator for interactive elements. The frontend is architecturally required (Rule 22) to provide a strictly formatted `data-testid` for all interactive elements and states. The UI changes frequently, and tests shouldn't crash because a single CSS class name changed. Do not write fallback locators that use brittle XPaths or CSS classes, as this encourages AI agents to ignore missing `data-testid` contracts.
   - ❌ **BAD:** Hardcoding a brittle locator: `driver.find_element(By.CSS_SELECTOR, ".submit-btn-active")`
   - ✅ **GOOD:** Strictly using the immutable contract: `driver.find_element(By.CSS_SELECTOR, "[data-testid='admin_members-addform-submit']")`

**Why:** E2E and Selenium tests frequently become a tangled, brittle web of shared fixtures and helpers. If an AI agent modifies a shared authentication helper to fix a broken Manager test, it risks silently breaking the entire Admin E2E suite. Complete isolation ensures that test fixes remain highly localized and AI context is minimized. Tests must be real and resilient, not just "green" checkboxes.

## Rule 113 — No AI Runtime Verification Requirement
* **The Rule:** AI agents are NOT required to execute code, run servers, or perform runtime verification to validate their changes, as they often lack the necessary local environment variables, database connections, or API keys.
* **The Expectation:** Instead of failing or complaining about missing environments, the AI MUST rely on its deep knowledge of the framework, TypeScript, and these architectural guidelines to write syntactically and logically correct code. The AI should aim to write code that is "correct by construction" so that when the human developer runs it locally, it works with zero or minimal issues. Do not attempt to spin up local servers or run `npm run start` if the environment is incomplete.

## Rule 114 — Dashboard & UI Data APIs (Avoid "Mega APIs")
* **The Rule:** Never create a single "Mega API" endpoint that fetches an entire dashboard's worth of data (e.g., all KPIs, all charts, and all recent table lists) in one massive response payload. You MUST fragment complex dashboards into **widget-based / feature-sliced APIs** (e.g., `/dashboard/kpis`, `/dashboard/charts`, `/dashboard/recent-members`).
* **Why:**
  1. **Fault Isolation (Debugging):** If the database query for the revenue chart fails, it should not crash the entire dashboard. The user should still see their KPIs and Tables, with only the chart showing an error state. Mega APIs make identifying the failing query extremely difficult.
  2. **Progressive Rendering:** The frontend should be able to render fast data (KPIs) instantly while displaying skeleton loaders for slower data (complex aggregations/charts). A Mega API forces the frontend to wait for the *slowest* query before rendering *anything*.
  3. **Caching & Scalability:** Widget-based APIs allow you to cache heavy/slow queries (like charts) in Redis for 1 hour, while keeping fast queries (like today's attendance) strictly real-time. Mega APIs force an all-or-nothing caching strategy which does not scale for Enterprise apps.



## Rule 115 - Exhaustive, AI-Contextual Documentation for EVERYTHING (The "No-Guessing" Rule)
* **The Rule:** EVERY module-level backend construct MUST carry exhaustive, multi-line documentation. Applies to: Classes, Controllers, Services, DTOs, Entities, Repository methods, Event handlers, Middleware, Guards. Intentionally excluded: delivery artifacts (`stage-*.md`, `INTEGRATION_GUIDE.md`), locale files, seed scripts, and test fixtures. The documentation syntax is framework-specific:
  - **TypeScript / JavaScript classes, methods, DTOs, services, controllers** → JSDoc block comments
  - **Python / Django classes, methods, DTO-equivalent constructs, services, controllers** → Python docstrings
  - **Database columns** → ORM/schema-level documentation mechanism where supported (e.g., TypeORM `@Column({ comment: '...' })` for NestJS, Django model field `help_text='...'` for Django); otherwise documented in migration/DDL
  - **Config variables** → Zod / class-validator configuration-schema documentation and `.env.example` annotations
* **Why:** When an AI reads an entity property `is_active`, it shouldn't guess if it means "email verified" or "billing active". The documentation must explicitly declare it.
* **What MUST be included in every documented construct:**
  1. **Intent:** Deep explanation of the business context.
  2. **Edge Cases:** Explicit mapping of failure states and constraints.
  3. **Side Effects:** Mention cache invalidations, webhooks, or event emissions.
  4. **AI Notes (Crucial):** Required documentation metadata, warnings, or routing instructions for future AIs.

## Rule 116 - MCP-Ready API Design & AI Introspection
* **The Rule:** The backend must be designed to be "Self-Discoverable" by autonomous AI agents via the **Model Context Protocol (MCP)**. 
* **NestJS implementation:** Every REST endpoint, DTO, and Response object/schema must be heavily annotated using Swagger decorators (`@ApiProperty`, `@ApiOperation`, `@ApiResponse`).
* **Django implementation:** Every REST endpoint, Serializer, and Response object/schema must be heavily annotated using OpenAPI decorators (e.g., `drf-spectacular`'s `@extend_schema`).
* **Framework-independent requirement:** The resulting OpenAPI/Swagger schema must be 100% strictly typed with no missing fields, explicitly documenting the response payload structure.
* **Why:** This allows an MCP Server to ingest the backend's API specification and dynamically convert all your endpoints into **LLM Tools**. An AI agent can then connect to your backend and intuitively execute commands (e.g., `create_member`, `fetch_dashboard_kpis`) natively, treating your backend as an extension of its own brain rather than just static code.

## Rule 117 - RAG-Ready API Projections (LLM / Chatbot Optimization)
* **The Problem:** Standard REST JSON responses contain excessive noise (UUIDs, nested metadata, timestamps) that waste LLM tokens and degrade AI comprehension when used by an internal Chatbot.
* **The Rule:** The backend must support "RAG-Ready" API projections for AI agents and Chatbots. However, you MUST NOT create a generic root-level `_rag` namespace, as this violates Rule 0D (Strict API Namespacing). RAG endpoints must remain strictly within their role and module boundary.
* **Implementation:** You must expose these endpoints either via a dedicated sub-route within the module (e.g., `/api/v1/manager/members/rag`) or via a strict query parameter on the primary endpoint (e.g., `/api/v1/manager/members?format=rag`). These RAG-ready endpoints must return highly compressed, "Token-Optimized Markdown" or flattened textual representations of the data instead of deep JSON trees. (e.g., Returning `"Member: Rahul | Status: Active | Plan Expires: 5 Days"` instead of a 50-line JSON object).
* **Why:** This drastically reduces token costs and hallucinations when feeding user context into the LLM context window.

## Rule 118 - Event-Driven Immutable Analytics (Zero-Overwrite Strategy)
* **The Problem:** Standard CRUD operations (like updating a subscription status from 'Active' to 'Cancelled') overwrite historical state, completely destroying the ability to perform deep, time-series analytics (e.g., "How many users cancelled exactly on day 14?").
* **The Rule:** For any critical domain entity (Billing, Attendance, Subscription, Member Lifecycle), apply a **Zero-Overwrite** rule for analytics. 
* **Implementation:** Every critical state change MUST publish an immutable Domain Event (e.g., `BILLING.SUBSCRIPTION.CANCELLED`) to a message broker (Redis Streams) and store it in an append-only `events_log` or timeseries table. 
* **Why:** All AI Analytics engines, forecasting models, and **historical/state-transition analytics (e.g., member lifecycle, revenue trends, forecasting) MUST query this immutable event log**. Current operational widgets (e.g., live attendance, active sessions) MAY query the transactional read model directly (see Rule 114). Dashboards that mix both widget types must source each widget from its appropriate layer (CQRS read-replica pattern) instead of running heavy `JOIN` operations on the live transactional database. This ensures the transactional DB stays fast and analytics are 100% historically accurate.

## Rule 119 - The Double-Entry Financial Ledger (For Billing & Wallets)

**Cached Balance Projection Pattern:**
While the ledger is the absolute source of truth and balances must never be mutated directly via API calls (`UPDATE members SET balance = X`), entities MAY contain a `balance` column (e.g., `balance: bigint`) for **fast read-model caching**. This cached balance column is updated strictly by the backend either synchronously in the same database transaction as the ledger insert, or asynchronously via event handlers. An API consumer must never be allowed to pass a `balance` value in a request payload to update this column.
* **The Problem:** AI agents typically write naive database queries for financial transactions (e.g., `UPDATE members SET wallet_balance = wallet_balance - 500`). In a production environment, concurrent requests or failed network calls lead to race conditions, lost money, and untraceable missing funds.
* **The Rule:** NEVER update a financial balance directly. Any monetary transaction (POS purchase, subscription prorating, refund, wallet top-up) MUST follow the **Immutable Double-Entry Ledger Pattern**. 
* **Implementation:** You must insert rows into a `ledger_entries` table for every transaction. Ledger rows are immutable (no `UPDATE` or `DELETE`); corrections require a reversal journal entry. The schema must require: `journal_id` (unique reference for atomicity), `account_id`, `direction` (DEBIT | CREDIT), and `amount_minor_units` (always > 0). The transaction must guarantee `total_debits == total_credits`. The current balance is dynamically calculated. 
* **Why:** This provides a strong accounting control and makes unbalanced journals detectable/preventable when enforced transactionally, providing a perfect, tamper-proof audit trail for accounting.

