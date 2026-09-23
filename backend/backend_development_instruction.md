# Enterprise-Grade, AI-Friendly NestJS Backend Architecture Guidelines

## The Core Philosophy
This document outlines the strict architectural rules for building the backend using **NestJS (TypeScript)**. The primary goal is **Extreme Isolation**.

Currently, human developers act as orchestrators, while AI (LLMs) writes the code. Because of this, the architecture must be designed to accommodate the AI's constraints (context limits, hallucination risks) and strengths (laser-focused problem solving).

Tomorrow, if you ask an AI to fix a specific bug in "Payment Processing", the primary AI context MUST be restricted to the owning feature module. The preferred code repair is a single file, but multi-file repairs within the feature's dependency graph are allowed when genuinely required. The default writable scope is the owning feature module only.

**Minimum-Context Principle:** Prefer the smallest coherent change set. Single-file repair is the goal when the dependency graph permits it. Multi-file changes are **allowed — and expected** when required by architectural contracts such as transactions (Orchestrator → services → repositories), API contract updates, co-located tests, or shared infrastructure extensions. The AI MUST NOT expand context beyond the minimum required set. If a bug fix genuinely requires touching an Orchestrator, a micro-service, and a repository together, that is correct — not a sign of bad architecture. If it requires touching 10 unrelated files, the architecture is too coupled.

### 0A. HIERARCHICAL MODULE BOUNDARY — FEATURE MODULE IS THE AI REPAIR UNIT

The backend strictly follows a 3-tier hierarchy:

```text
APPLICATION
  └── DOMAIN / ROLE CONTAINER (e.g. backend_admin)
        └── FEATURE MODULE
              └── SUB-FEATURE / USE CASE
```

**AI Repair Boundary = FEATURE MODULE**
**Role/Domain Container = NOT the default repair boundary**

### 0D. BACKEND NAMESPACE PREFIXING (MANDATORY)

Because the project contains a 1-to-1 mapping of frontend and backend roles, the AI MUST explicitly separate backend folders from frontend folders. 
- **The Rule:** EVERY top-level backend role container or domain folder MUST be prefixed with `backend_`.
- **Primary Examples:** `backend_admin/`, `backend_manager/`, `backend_superadmin/`.
- **E2E / Selenium Testing Folders:** If tests are grouped in a separate root directory, the test root AND the role subfolders inside it MUST carry the namespace to maintain context.
  - Example E2E: `src/backend_e2e/backend_admin_e2e/`, `src/backend_e2e/backend_manager_e2e/`
  - Example Selenium: `src/backend_selenium/backend_admin_selenium/`
- **Why?** If an AI is told to "fix the manager billing bug" and the context contains `src/manager/billing/`, it may hallucinate and write frontend React code inside a backend NestJS file. By strictly enforcing `src/backend_manager/billing/` and `src/backend_e2e/backend_manager_e2e/`, there is zero ambiguity for the AI or the human developer.

When fixing a bug in `modules/superadmin/billing`, the AI repair boundary is `billing`, not the entire `superadmin` domain container.

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

When an AI is provided with a single feature module or domain folder in isolation (e.g., a developer zips only the `backend_manager` folder or provides only the `dashboard` module), the AI MUST assume the module operates within a **Modular Monolith architecture**, NOT as an independent Microservice.
* **The Rule:** Never attempt to bootstrap independent database connections, independent framework `.forRoot()` / `.forRootAsync()` configurations, or isolated global infrastructure (like Config or Redis setup) within a feature module. 
* **Implementation:** Rely on the global application monolith to provide the core infrastructure. Feature modules should strictly rely on `.forFeature()` registrations, and should bundle/export their domain-specific providers into a module so the global Monolithic App can safely consume them.
* **Why:** If the AI assumes the folder is a standalone microservice, it will attempt to instantiate redundant database connection pools and global infrastructure inside the local module, which instantly crashes the global monolith on startup due to duplicated context boundaries.

---

## 1. Micro-Modularization & Feature-Sliced Logic (Crucial)
Do not create monolithic Services, Controllers, or Views. A generic `UserService` or `MemberController` will quickly grow to 1000+ lines. When you feed a 1000-line file to an AI, token costs explode, and the AI loses focus, increasing the chance of collateral damage.

**The Solution: Use-Case Driven Files**
Break down large files into micro-features. Every file must handle only one specific business flow.
- ❌ **BAD:** `members.service.ts` (Handles registration, billing, attendance, emails)
- ✅ **GOOD:** 
  - `member-registration.service.ts`
  - `member-billing.service.ts`
  - `member-attendance.service.ts`
  - `member-notifications.service.ts`

**IMPORTANT FOLDER NAMING:** Always group these micro-files logically into cohesive sub-folders within the module (e.g., `modules/members/services/`, `modules/members/controllers/`).

## 2. Highly Descriptive, AI-Contextual Filenames & Module Prefixing
Rename all controllers, services, and models to be extremely descriptive based on exactly what they do, AND they must strictly begin with the module name as a prefix.
When you tag a file for AI context (e.g., `@[Filename]`), the AI should instantly know exactly what module it belongs to and what it does, even without seeing the folder path. Duplicate filename collisions are eliminated.
- ❌ **BAD:** `auth.py`, `utils.js`, `helpers.ts`, `SearchBar.tsx`
- ✅ **GOOD:** `billing-jwt-token-generator.utils.ts`, `billing-stripe-payment-webhook.controller.ts`, `attendance-member-registration-validator.py`
* **The Rule (CRITICAL):** Every single file name MUST begin with the parent domain/role name (e.g., `superadmin`, `manager`) followed by the module name as a prefix. This applies to EVERYTHING: modules, controllers, services, DTOs, types, constants, utilities, and tests. Just as the frontend uses `AdminBillingInvoiceSearchBox.tsx`, the backend MUST use `admin-billing-invoice-search-box.controller.ts`.
* **Component/Class Internal Naming:** The exported class name MUST exactly match the filename logic (converted to PascalCase). For example, `superadmin-auth.module.ts` must export `class SuperadminAuthModule`. `manager-auth.controller.ts` must export `class ManagerAuthController`. This prevents AI hallucination.
* **Top-Level & Structural Folder Prefixing (CRITICAL):** NEVER use generic names for ANY structural folders (e.g., `core/`, `modules/`, `common/`, `config/`, `database/`, `utils/`, `i18n/`, `middleware/`, etc.) anywhere in the project. ALL folders MUST be explicitly prefixed with their parent domain/role name. This rule applies universally to ALL folders, not just a few specific ones.
  - ❌ **BAD:** `backend_superadmin/core/`, `backend_manager/modules/`, `backend_admin/config/`, `backend_trainer/utils/`
  - ✅ **GOOD:** `backend_superadmin/superadmin_core/`, `backend_manager/manager_modules/`, `backend_admin/admin_config/`, `backend_trainer/trainer_utils/` ..etc
  This ensures that when an AI or developer is instructed to look into ANY folder, the folder name itself uniquely identifies its exact role and domain, completely eliminating cross-domain context confusion.
  
  **Canonical Example of Complete Prefixing Architecture:**
  ```text
  backend_admin/
  ├── admin_core/                                <-- (Top-level prefixed)
  │   ├── admin_guards/                          <-- (Sub-folder prefixed)
  │   │   └── admin-core-jwt-auth.guard.ts       <-- (Role: admin, Module: core, Resp: jwt-auth)
  │   └── admin-core.module.ts                   <-- (Main Core Module)
  │
  └── admin_modules/                             <-- (Top-level prefixed)
      └── admin_billing/                         <-- (Feature Folder prefixed)
          ├── billing_controllers/               <-- (Sub-folder prefixed with module name)
          │   └── admin-billing-invoice.controller.ts
          ├── billing_dto/                       <-- (Sub-folder prefixed with module name)
          │   └── admin-billing-create-invoice.dto.ts
          └── admin-billing.module.ts            <-- (Main Feature Module)
  ```

## 3. Strict Validation & DTO Isolation
Never mix data validation logic (checking if email is valid, password length) with business logic (saving to DB). 
Extract all validation logic (Zod schemas, Class-Validator DTOs, Django Forms/Serializers) into their own isolated files.
- **Why?** If the business logic is fine but the API is rejecting a payload, you only feed the AI `create-member.dto.ts`. The AI won't even see the database logic, guaranteeing 0% chance of breaking the database flow.

## 4. Interface & Type Isolation (The AI's Blueprint)
AI relies heavily on data shapes to write correct code. If the AI knows the exact shape of a `User` or a `PaymentPayload`, it doesn't need to see the database schema or the entire service file.
* **The Rule:** Extract all TypeScript `Interfaces`, `Types`, or Python `TypedDicts`/`Pydantic Models` into a dedicated `[module-name].interfaces.ts` file.
* **Why?** When you want the AI to write a new function, you just feed it the `interfaces` file. The AI instantly knows exactly what properties are available without having to read 500 lines of implementation code.

## 5. Centralized Constants (Single Source of Truth)
Find all hardcoded strings, error messages, magic numbers, and default config values scattered across your backend. Extract them into a module-level `[ModuleName].constants.ts` (or `.py`).
- ❌ **BAD:** `throw new Error("User age must be over 18")`
- ✅ **GOOD:** `throw new Error(MEMBER_ERRORS.AGE_RESTRICTION)`
- **Why?** Tomorrow, if the business requirement changes from 18 to 21, or if you need to translate error messages to a different language, you only feed the AI `members.constants.ts`. The business logic remains untouched.

## 6. Centralized Custom Exceptions
Handling errors with generic `throw new Error()` makes it hard for AI to write precise unit tests or generic error handlers.
* **The Rule:** Create specific exception classes in an `[module-name].exceptions.ts` file (e.g., `class InsufficientFundsException extends Error`).
* **Why?** If an AI is writing an Express error-handling middleware, providing the `exceptions.ts` file gives it a perfect, safe map of every possible error state it needs to catch and format for the frontend.

## 7. Isolated Database/Query Layer (The Repository Pattern)
Never write massive, complex raw SQL or 50-line ORM queries directly inside your business logic services.
Extract complex queries into a dedicated Repository or Query file (e.g., `member-analytics.repository.ts`).
* **The Rule:** If the backend is built with JavaScript/TypeScript, it MUST use the project's single approved ORM. The repository pattern is mandatory; the specific ORM implementation is an architectural project decision and MUST NOT be changed per module.
  - If Prisma is selected for the project, ALL modules use Prisma.
  - If TypeORM is selected for the project, ALL modules use TypeORM.
  - If another approved ORM is selected, ALL modules use that ORM consistently.
  AI agents MUST NOT introduce a second ORM into an existing backend. The ORM implementation MUST remain behind the repository/data-access boundary so business services do not become coupled to ORM-specific APIs.
- **Why?** If the dashboard stats are calculating incorrectly, it's a database query issue. You provide the AI the `repository` file, not the `service` file.

---

## 8. Handling Edge Cases & Complex Scenarios

### Edge Case A: Cross-Module Dependencies (Tight Coupling)
*Scenario:* The `MemberRegistrationService` needs to trigger the `FinanceService` to generate an invoice, and the `EmailService` to send a welcome email. If they are tightly coupled, the AI will need all three files to understand the flow.
*Solution:* **Event-Driven Architecture (Pub/Sub).**
The `MemberRegistrationService` should only save the user and emit an event: `EventBus.emit('MEMBERS.MEMBER.REGISTERED', user)`. The Finance and Email modules listen to this event independently. Now, the modules are 100% decoupled.

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

### Edge Case C: Shared Utility Bloat (The "No Common Folder" Rule)
*Scenario:* Developers dump code into a global `utils/`, `common/`, or `shared/` folder to adhere to the DRY (Don't Repeat Yourself) principle. 
*Solution:* **WET over DRY for AI (Write Everything Twice).**
Strictly ban global `common/` or `shared/` folders. If a utility, enum, or type is used by the Finance module, put it in `modules/finance/utils/`. If the HR module needs the exact same utility, **duplicate the code** into `modules/hr/utils/`. 
* **Crucial Clarification (Domain vs Module):** WET duplication applies strictly at the **module level, not the domain level**. No shared folder is allowed at ANY level. Even if both the `billing` module and `attendance` module live under the same `erp` domain, they MUST get their own independent copies of a shared utility. There is no `erp/_shared/` folder.
* **Why?** In an AI-driven codebase, code repetition is entirely acceptable because AI writes the code. If we use a global `common/` folder, an AI might modify a shared function to fix a bug in HR, inadvertently breaking the Finance module. Complete module isolation guarantees 0% cross-module side effects.

> **CRITICAL WARNING TO AI AGENTS:** 
> Do NOT attempt to "DRY up" business logic, utilities, or services by moving them to global folders like `src/shared/` or `src/common/`. 
> Anything containing domain-specific business behavior MUST be duplicated per feature, NEVER globalized. 
> Only pure infrastructure plumbing (like database connection pools) belongs in global core folders.
* **Infrastructure Exception (Framework-Level vs Business-Logic-Level):** The WET-over-DRY / no-shared-folder rule applies strictly to **BUSINESS LOGIC utilities** (domain-specific helpers, formatters, validators). It does **NOT** apply to genuine framework-level infrastructure that every module is architecturally required to **extend OR consistently reference for correctness** (i.e., a single shared registry or config that MUST stay identical across all modules to function correctly — duplicating it would produce inconsistency, not isolation) — e.g. `BaseEntity` (Rule 58), the global `ResponseInterceptor` (Rule 28), `RolesGuard`/`@Roles()` decorator (Rule 83), the structured logger (Rule 14), `AsyncLocalStorage` context propagation (Rule 57), the centralized rate-limit tiers config (Rule 44), the event-registry constants (Rule 50), and the global database connection pool config (Rule 63). These live in a single, clearly-named `src/core/` or `src/infrastructure/` folder — **NOT** `src/shared/` or `src/common/` (to avoid becoming a dumping ground). This folder is intentionally small, framework-plumbing-only, and rarely touched — it does not carry the same "AI breaks module B while fixing module A" risk because it contains **no business logic**, only structural contracts that every module must extend or reference by architectural design.

### Edge Case D: External Service Adapters (Anti-Corruption Layer)
*Scenario:* When your backend talks to the outside world (Stripe, AWS S3, SendGrid), never put the `axios.post()` or SDK calls directly inside your business logic.
*Solution:* **Create an isolated wrapper or "Adapter"** for third-party tools (e.g., `stripe-payment.adapter.ts`). Your core service should only call generic methods like `paymentAdapter.charge()`.
* **Why?** If Stripe changes their API version, you only give the AI the `stripe-payment.adapter.ts` file. The AI fixes the API call without ever seeing (or risking breaking) your internal checkout logic.

## 9. Avoid Hardcoded HTTP Status Codes
Never hardcode HTTP status code numbers (e.g., `200`, `400`, `500`) in controllers, exceptions, or responses. 
* **The Rule:** Always use a framework-provided enum or a status code library (e.g., `HttpStatus` in NestJS, `http-status-codes` in Node, `rest_framework.status` in Django).
* **Testing Rule:** This applies strictly to E2E and Unit testing as well! In Python `pytest` suites, always use `from http import HTTPStatus` (e.g., `HTTPStatus.OK`, `HTTPStatus.CREATED`) rather than hardcoded integers.
* **Why?** It improves readability, prevents magic numbers, and reduces the risk of typos (e.g., typing `401` when you meant `403`).

## 10. Dynamic / Absolute Imports (No Hardcoded Relative Paths)
*(Applicable to JavaScript/TypeScript Frameworks)*
Never use fragile, hardcoded relative imports (e.g., `../../../utils/helpers`). 
* **The Rule:** Configure the backend framework to use absolute path aliases (e.g., mapping `@/` to the `src/` directory). Always use dynamic imports with `@/` (or your configured alias) instead of traversing directories up and down with `../..`.
* **Why?** It prevents import paths from breaking when files are refactored, moved, or copy-pasted, drastically improving the ability for AI to generate drop-in code without path hallucinations.

---

---

## Framework Reference Appendix (Non-NestJS Projects Only)

> **This section is a reference appendix for teams migrating from or using a non-NestJS stack.**
> The primary standard in this document is **NestJS (TypeScript)**. All numbered rules (1–101)
> above are NestJS-specific. If your project uses Django, Express, or Spring Boot, translate the
> architectural *principles* (Extreme Isolation, Use-Case Driven Files, Repository Pattern,
> DTO Isolation, Event-Driven Decoupling, Co-located Tests) to your framework's idioms using
> the mappings below. The specific tooling (e.g. `nestjs-pino`, `class-validator`, `@Roles()`,
> `AsyncLocalStorage`) will differ — pick the nearest equivalent in your framework.

### In NestJS (TypeScript) — Primary Standard
- Break down monolithic `@Injectable()` classes.
- Use `CQRS` (Command Query Responsibility Segregation) or just separate `xxx.service.ts` files.
- Put DTOs in a `dtos/` folder.
- Keep `@Controller()` classes incredibly thin; they should only receive the request and immediately pass it to a micro-service.

### In Django (Python) — Reference Only
- Avoid massive `views.py`. Create a `views/` folder and split class-based views into individual files (e.g., `member_registration_view.py`).
- Avoid "fat models". Move complex business logic from `models.py` into a `services/` directory.
- Keep `serializers.py` strictly for validation and data formatting.

### In Express.js (Node.js) — Reference Only
- Avoid putting logic inside route definitions.
- `routes/` should only map URLs to Controllers.
- `controllers/` handle HTTP (req, res).
- `services/` handle the heavy lifting and should be highly split up (e.g., `paymentService.js`, `refundService.js`).


## 11. Co-located Testing (Unit & E2E - Extreme Isolation)
Never put tests in a global `tests/` or `pytest_tests/` directory separate from the application code. 
* **The Rule:** Unit tests (`.spec.ts`) must live directly inside the module they are testing, adjacent to the micro-feature file (e.g., `member-registration.service.spec.ts` next to `member-registration.service.ts`). E2E / black-box API tests are written in Python pytest and live in a separate top-level `backend_e2e/` directory (see Rule 27). Do NOT co-locate pytest files inside the NestJS module folders.
* **Why?** When an AI is asked to add a feature or fix a bug, providing the co-located `.spec.ts` file gives it complete unit-test context. The pytest E2E suite is decoupled from the Node.js runtime entirely.


## 12. Strict API Documentation (Swagger/OpenAPI)
* **The Rule:** Every endpoint MUST be documented using the framework's native OpenAPI/Swagger tools (e.g., `@ApiTags` and `@ApiResponse` in NestJS, `drf-spectacular` in Django, or `swagger-jsdoc` in Express).
* **Why:** AI relies heavily on interface contracts. Keeping them mandatory and co-located with the controllers ensures frontend developers (and AI frontend agents) always have a mathematically accurate, up-to-date API contract to work with.

## 13. Environment & Configuration Management
* **The Rule:** Never use raw environment variables (e.g., `process.env.XXX` or `os.environ.get()`) directly inside business logic. Always use a centralized, strongly-typed Config Service or Settings class (e.g., `@nestjs/config` in NestJS, `settings.py` with `django-environ` in Django). The configuration service MUST validate all environment variables at application startup using a strict schema (e.g., Zod or `class-validator`). The app must throw a fatal error and refuse to boot if any required environment variable is missing or incorrectly typed.
* **Why:** If the AI needs to add a new third-party API key or change a timeout value, it should only modify the central configuration schema, not hunt for raw env calls scattered across 50 different micro-services.

## 14. Standardized Logging & Correlation IDs (nestjs-pino & OpenTelemetry)
* **The Rule:** Never use raw print statements (e.g., `console.log()` or `print()`). The canonical logger for this NestJS project is **`nestjs-pino`** (wrapping `pino`). Do not use Winston or any other logger.
* **The Log Structure:** Every log entry must automatically attach the current execution context. A standard log output must include:
  - `method` (HTTP method: GET, POST, PATCH, etc.)
  - `route` / `path` (the matched route template, e.g., `/api/v1/members/:id` — **not** the raw URL with substituted values)
  - `statusCode` (HTTP response status)
  - `requestId` (unique per-request UUID, injected at the middleware boundary)
  - `tenantId` (where permitted by data privacy policy — never log tenant-specific personal data alongside it)
  - `traceId` and `spanId` (injected via OpenTelemetry/AsyncLocalStorage)
  - `context` (the exact class or service name emitting the log, e.g., `MemberRegistrationService`)
  - `responseTime` (milliseconds, for access logs)
* **What MUST NEVER appear in any log line:**
  - Raw `req` or `res` objects — these contain auth headers, cookies, request bodies, and response bodies by default.
  - `Authorization` header, Bearer tokens, API keys, session tokens, refresh tokens.
  - Passwords, PINs, OTPs, biometric data, or any credential.
  - Request or response body payloads (even sanitized partials — if in doubt, omit).
  - Raw PII: full phone numbers, Aadhaar numbers, bank account numbers, card numbers, email addresses (partial masking per Rule 35 is the only exception where explicitly required).
* **Why:** When logs are pushed to an aggregator like Datadog, ELK, or CloudWatch, developers can simply search for `traceId="b8174fe8b671..."` to instantly pull up the exact journey of a request across 15 different micro-files. This rule also ensures that a single misconfigured log line cannot constitute a data breach. Standardized loggers also allow global turning on/off of debug statements.


## 15. Dependency Injection & Inversion of Control
* **The Rule:** Avoid instantiating complex service classes directly using `new MyService()` or `MyService()`. Rely on the framework's Dependency Injection system if it has one (NestJS, Spring Boot), or construct dependencies at the highest possible level (module/route boundaries) and pass them in.
* **Why:** AI might take shortcuts and manually instantiate classes inside business logic, creating tight coupling. Enforcing Dependency Injection ensures that tests can easily mock out databases, external APIs, and child services.

## 16. Module-Specific API Collections (Postman/Insomnia)
* **The Rule:** Whenever a module is created or finalized, generate a `[module-name]_collection.json` file directly inside the module's folder (e.g., `modules/auth/auth_collection.json`). 
* **Why:** This ensures that any developer (or human QA) can instantly import this JSON into Postman and manually test the module's endpoints without having to manually construct the headers, payloads, or figure out the routes. It provides immediate, highly-accessible testing verification.

## 17. Standardized Pagination, Sorting & Filtering (Enterprise Scale - Backend Driven)
* **The Rule:** Any endpoint that returns tabular or list data (e.g., Orders, Members) MUST ALWAYS support backend-driven pagination, sorting (e.g., `sortOrder=ASC/DESC`), and filtering (e.g., `startDate`, `endDate`, `search`, `status`). Never return raw, unpaginated lists if the dataset can grow large.
* **The "No Frontend In-Memory Filtering" Mandate:** The backend MUST provide dedicated query parameters for every search box, dropdown filter, and date picker on the UI. The frontend is STRICTLY FORBIDDEN from fetching a massive array of 5,000 records and using JavaScript `.filter()` or `.sort()` in memory. All searching (`ILIKE` / Full Text) and filtering (`WHERE` clauses) MUST be executed by the database via the backend API.
* **Implementation:** Always use a standardized wrapper or query DTO (e.g., `limit/offset` based pagination extended with filtering/sorting properties) across all controllers. For example, a search box triggers `?search=john&page=1`, which the backend maps to an SQL `ILIKE '%john%'` query.
* **Why:** Returning thousands of unfiltered rows crashes browsers and creates severe security/performance issues. If the AI is asked to add an endpoint for `MemberAnalytics` or `Orders`, it must proactively build in sorting, searching, and date filtering capabilities so the frontend can display robust, server-driven table controls.

## 18. Strict ES Modules (No `require`)
*(Applicable to JavaScript/TypeScript Frameworks)*
* **The Rule:** Never use the `require()` keyword. It is considered dead/legacy in this architecture. You must exclusively use ES module `import` and `export` statements.
* **Why:** ES Modules are the modern standard, they provide strict typing compatibility out of the box in TypeScript, support better static analysis/tree-shaking, and ensure consistent import syntax across the entire codebase.

## 19. Module-Level Feature Documentation
*(Crucial for AI Context & Onboarding)*
* **The Rule:** Every single module must contain a `[module_name]_backend_feature.md` file at its root (e.g., `modules/auth/auth_backend_feature.md`). 
* **Why:** Before an AI or a new human developer makes any changes to a module, they will read this file first. It acts as the ultimate localized context guide, instantly explaining the routing, file responsibilities, and logic, drastically reducing the risk of hallucination or breaking existing architecture.

### Documentation Quality Standard

**The purpose of `_backend_feature.md` is that an AI given ONLY that file + the module folder can fully understand, modify, or debug the module without reading anything else. Generic boilerplate defeats this entirely.**

#### ❌ BAD — What AI agents produce without quality enforcement:
```markdown
## Module Purpose
Handles billing operations.

## Feature Inventory
| POST /billing/charge | /billing/charge | Handles charging | CreateChargeDto |

## Edge Cases / AI Warnings
- TBD
- Do not bypass the Orchestrator.
```
*Why this fails: "Handles billing operations" tells an AI nothing. "TBD" is worse than no doc. "Do not bypass the Orchestrator" with no context is unactionable.*

#### ✅ GOOD — What every `_backend_feature.md` must look like:
```markdown
## Module Purpose
Processes all wallet top-ups, plan purchases, and refunds for gym members.
Wallet balance is stored in paise (integer). All mutations go through
BillingOrchestratorService to guarantee atomic DB + audit log writes.
Never call BillingWalletRepository directly from outside this module.

## Feature Inventory
| POST /billing/wallet/topup | WalletCommandController | Top up member wallet | WalletTopupDto |
| POST /billing/plans/purchase | PlanCommandController | Purchase a plan | PlanPurchaseDto |

## Edge Cases / AI Warnings
- Wallet deductions use pessimistic locking (Rule 41) — never remove the
  SELECT FOR UPDATE or concurrent requests will produce negative balances.
- Plan purchase and wallet deduction MUST be in the same transaction
  (BillingOrchestratorService) — splitting them causes partial charge bugs.
- Idempotency-Key header is mandatory on /wallet/topup (Rule 31) —
  removing it will cause double-charges on network retries.
```
*Why this works: An AI can read this and immediately know the invariants, the danger zones, and exactly which rules apply — without reading a single source file.*

**Failure Conditions — A `_backend_feature.md` FAILS quality review if it contains:**
- Any section with "TBD" or "N/A" as the entire content
- Module Purpose under 3 sentences
- Edge Cases with fewer than 3 concrete, module-specific entries
- Generic warnings not tied to a specific rule number (e.g., "be careful with transactions" with no Rule citation)
- Feature Inventory rows where Purpose column is just "Handles X"

**Documentation Freshness Rule:** `_backend_feature.md` MUST be updated in the same commit as any code change to the module. A stale feature doc is worse than no doc — it actively misleads AI agents.

---

### Mandatory `[module_name]_backend_feature.md` Template
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
| [module]-command.controller.ts | [REQUIRED: exact HTTP mutations it handles] |
| [module]-query.controller.ts | [REQUIRED: exact read endpoints it handles] |
| services/[module]-orchestrator.service.ts | [REQUIRED: what it orchestrates] |
| repositories/[module].repository.ts | [REQUIRED: what queries it owns] |
| dtos/[module]-create.dto.ts | [REQUIRED: what it validates] |
| [module].entity.ts | [REQUIRED: what DB table it maps to] |

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
- Idempotency Keys: [which endpoints require Idempotency-Key header — Rule 31]

## Business Flow / Key Sequences
[REQUIRED: For each non-trivial mutation, describe the exact execution chain.]
**Example — Plan Purchase:**
1. PlanCommandController receives POST /billing/plans/purchase
2. Validates PlanPurchaseDto (Rule 3)
3. Calls BillingOrchestratorService.purchasePlan(dto)
4. Orchestrator opens DB transaction
5. Calls BillingWalletRepository.deductBalance() with pessimistic lock (Rule 41)
6. Calls MemberPlanRepository.createPlanRecord()
7. Commits transaction — emits BILLING.PLAN.PURCHASED event
8. EventBus listener triggers NotificationService (decoupled — Rule 8A)

## File Responsibility Map
[REQUIRED: One line per file stating its single responsibility and what it must NOT do.]
- `billing-orchestrator.service.ts` — Opens transactions, calls micro-services. MUST NOT contain business logic.
- `billing-wallet.repository.ts` — Raw DB queries for wallet table only. MUST NOT call other repositories.
- `billing-plan-purchase.service.ts` — Plan purchase business logic only. MUST NOT touch wallet directly.

## Permissions and Security
[REQUIRED: List every endpoint with its required role(s) and any resource-level checks.]
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| POST /billing/wallet/topup | MANAGER, ADMIN | Actor must belong to same branch as member |
| GET /billing/history | MANAGER, ADMIN, MEMBER | Member can only see own history |

CODEOWNERS path: `src/modules/[domain]/[module]/` → @[reviewer-handle]

## Edge Cases / AI Warnings
[REQUIRED: Minimum 3 entries. Each must cite a specific Rule number and explain
the exact consequence of violating it — not just "be careful".]
- [Specific invariant]: [What breaks if violated] — see Rule [N]
- [Concurrency risk]: [Race condition scenario] — requires pessimistic lock (Rule 41)
- [Transaction boundary]: [What must be atomic and why] — see Rule 8B

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
- [ ] Rule 29: Soft deletes only — no hard DELETE calls
- [ ] Rule 31: Idempotency-Key supported on all financial mutation endpoints
- [ ] Rule 34: N+1 queries prevented — eager loading used where needed
- [ ] Rule 36: Fail-Fast applied — null checks at service layer, DB constraints enforced
- [ ] Rule 41: Pessimistic locking on all concurrent balance/inventory mutations
- [ ] Rule 48: Read (query) and write (command) controllers are separate files
- [ ] Rule 56: findByIdOrThrow() used — null never propagates silently
- [ ] Rule 62: Explicit return types on all service and repository methods
- [ ] Rule 76: Every file starts with // RESPONSIBILITY: comment
- [ ] Rule 79: Every file has // FLOW: comment below RESPONSIBILITY
- [ ] Rule 80: JSDoc on all service methods, repositories, and utilities
- [ ] Rule 83: RBAC enforced at controller layer via @Roles() — never inline in services
- [ ] Rule 85: Guard clauses used — no nested if/else beyond 2 levels
- [ ] Rule 82A: Response DTO satisfies complete frontend UI Data Requirements from the Frozen API Contract section in this `_backend_feature.md` — no missing table columns, KPI fields, chart series, or relationship fields
- [ ] Rule 82A-SYNC: Frozen API Contract section in this file is up-to-date with frontend `_features.md` API contract
- [ ] Rule 86: Verb contract naming applied (createX, findXById, findXByIdOrThrow)
- [ ] Rule 87: Every service method ≤ 20 lines, single responsibility
- [ ] Rule 89: Domain objects used in services — ORM entities stay in repository layer
- [ ] Rule 92: All ORM orderBy/where with user input validated against allowlist
- [ ] Rule 93: If module touches auth/billing/webhooks/tenant — CODEOWNERS human review required
```

## 20. Performance & Network Optimization (Compression, Rate Limiting & Caching)
* **The Rule:** Enterprise APIs must protect their bandwidth and server load. 
  1. **Rate Limiting / Redis:** Implement strict rate limiters on all public endpoints (especially Auth and generic GET routes). Use Redis (or similar caching layers like Memcached) to handle rate limiting and to cache expensive, frequently requested data.
  2. **Response Compression:** Enable gzip/Brotli compression at the framework level (e.g., `compression` middleware in Node.js, `GZipMiddleware` in Django, or `server.compression.enabled` in Spring Boot) to drastically reduce JSON response sizes and save bandwidth.
* **Why:** This ensures the backend remains highly available under load and saves massive amounts of egress bandwidth costs.

## 21. Asset Optimization (The WebP Rule)
* **The Rule:** Never store unoptimized images (like `.png`, `.jpg`, `.jpeg`, `.bmp`) on the server disk or cloud storage. When an image is uploaded (e.g., a member profile picture), it must immediately be processed, compressed, and converted to `.webp` format before saving.
* **Why:** WebP reduces image file sizes by up to 80% compared to JPEG/PNG without visible quality loss. This drastically reduces cloud storage costs and speeds up frontend loading times, resulting in a much faster app.

## 22. Security Headers, CORS, & Protection
* **The Rule:** An enterprise app cannot go to production naked. Always implement security middleware (e.g., `Helmet.js` in Node, `SecurityMiddleware` in Django, or `Spring Security`) to set strict HTTP headers. Configure strict CORS policies (only allowing exact frontend domains). Ensure inputs are stripped of executable scripts (XSS protection) and standard ORMs are used to natively prevent SQL injection.

## 23. Background Jobs & Queues (No Hanging Requests)
* **The Rule:** An HTTP request should respond in under 500ms. If a user triggers a heavy task (e.g., "Send 1,000 promotional emails", "Generate a 50-page PDF report", "Process a video"), DO NOT process it in the main HTTP thread.
* **Why:** Use a Message Queue or Task Broker (e.g., BullMQ for Node, Celery for Python/Django, or Spring AMQP/RabbitMQ). The controller should immediately return `202 Accepted: Job Started`, and the background worker handles the heavy lifting safely. This prevents server timeouts and crashed requests.

## 24. Database Migrations (No Auto-Syncing & Backward Compatibility)
* **The Rule:** In development, auto-syncing tools (like Prisma schema push, TypeORM `synchronize: true`, or Hibernate `update`) are fine. But in an enterprise environment, database schemas must be strictly version-controlled using **Migrations** (e.g., Prisma Migrate, Django `makemigrations`, Flyway/Liquibase for Java, Alembic for Python). 
* **Backward Compatibility Requirement:** Existing v1 clients must be supported during DB migrations. Migrations must be strictly backward-compatible. Never drop a column in the same migration that adds a `NOT NULL` replacement. Do it in two phases. Avoid single-step destructive migrations.
* **Why:** If the AI needs to add a new column to a table, it should generate a explicit migration file. This guarantees that production databases can be safely upgraded (or rolled back) without data loss or rogue schema syncing breaking the app, and ensures no downtime for legacy clients.

## 25. Graceful Shutdown & Health Probes (Kubernetes/Docker Ready)
* **The Rule:** Enterprise apps are deployed in containers. You must include a `/health` or `/ping` endpoint for Kubernetes/AWS liveness probes. Furthermore, the application must intercept termination signals (`SIGINT`, `SIGTERM`).
* **Why:** When a server restarts or a container is killed, it shouldn't just die instantly, dropping user requests mid-flight. It must stop accepting new requests, finish processing current ones, safely close the database connection, and *then* shut down.

## 26. API Versioning (URI Based)
* **The Rule:** An enterprise API must never be released without a versioning strategy. Always prefix routes with a version (e.g., `/api/v1/users`). In frameworks like NestJS, enable URI versioning globally.
* **Why:** If the business scales and requires mobile apps or external integrations, releasing a breaking `v2` API should not crash the legacy mobile apps that still rely on `v1`.

## 27. API Testing Strategy (Two-Tier: Jest Unit + Pytest E2E)
* **The Rule:** This project uses a strict two-tier testing strategy:
  1. **Jest `.spec.ts` (Unit Tests):** Co-located with source files (see Rule 11). Tests individual service methods, DTOs, and utilities in isolation with mocked dependencies. This is the AI's primary safety net when modifying a micro-file.
  2. **Python `pytest` (Black-Box E2E / API Tests):** Lives in a top-level `backend_e2e/` directory, completely decoupled from the Node.js runtime. **CRITICAL: While the `backend_e2e/` folder is separated from `src/`, its internal directory structure MUST strictly mirror the domain-driven grouping of the backend (e.g., `backend_e2e/backend_superadmin_e2e/dashboard/test_dashboard_api.py`). Never dump test files into a flat `backend_e2e/` root folder.** Tests the running API as a true external client — no knowledge of internal implementation. QA engineers and CI pipelines use this tier.
* **Strict Boundary:** Jest is NEVER used for API/E2E testing. Pytest is NEVER used for unit testing internal service logic. These two tiers must never overlap.

## Summary Checklist for Developers Providing Context to AI:
1. Identify the exact layer where the bug/feature resides (Validation? DB Query? Business Logic?).
2. Select the **one or two** micro-files associated with that layer.
3. Pass ONLY those files to the AI.
4. Review the AI's isolated changes.
* **For E2E Test Fixes/Updates:** If an API contract changes and the E2E test needs updating, provide the AI with ONLY the specific feature's E2E folder (e.g., `backend_e2e/backend_superadmin_e2e/dashboard/`) and the corresponding backend module. Do NOT feed the entire `backend_e2e/` directory to the AI to prevent token explosion.

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
* **Why:**
  1. **Audit & Recovery:** If an admin accidentally deletes 1,000 members, the data is instantly recoverable.
  2. **Referential Integrity:** Foreign keys referencing a "deleted" record remain valid, preventing cascade failures.
  3. **AI Safety:** An AI asked to "implement the delete endpoint" will set a flag, not wipe database rows. This prevents catastrophic, irreversible data loss.
* **Implementation:** Add a global query filter (e.g., Prisma's `where: { deletedAt: null }` applied in a base repository method, Django's `django-softdelete`, or a `WHERE is_deleted = false` scope in a base repository class) so that all standard `find` queries automatically exclude soft-deleted records. For ORM-specific soft-delete column hooks (TypeORM `@DeleteDateColumn`, Prisma middleware), apply them at the repository layer only — never in services.

---

## 30. Audit Trail / Activity Log (Who Did What & When)
* **The Rule:** Every meaningful state change to critical entities (Members, Payments, Staff, Settings) MUST be recorded in an `audit_logs` table. At minimum, log: `actor_id`, `actor_role`, `action` (e.g., `MEMBER_UPDATED`), `entity_type`, `entity_id`, `old_value` (JSON), `new_value` (JSON), `ip_address`, `timestamp`.
* **Completeness Rule:** Mutations occur from HTTP requests, Background Jobs, Event Consumers, Scheduled Jobs, Webhooks, and Internal Commands. The audit trail architecture MUST integrate with the mutation layer (e.g., repository or orchestrator) rather than relying solely on HTTP interceptors to guarantee completeness.
* **How:** Implement this as a cross-cutting concern using:
  - **NestJS/Express:** An interceptor, event listener, or AOP-style wrapper around repositories that fires after mutating actions.
  - **Django:** Model `post_save` / `post_delete` signals.
  - **Spring Boot:** AOP (Aspect-Oriented Programming) with `@AfterReturning` advice.
* **Why:** Regulators, auditors, and enterprise clients will always ask "who changed this record and when?". Building this from day one costs almost nothing. Retrofitting it onto a live production system costs weeks. It also gives AI agents an immutable history to reason about when debugging.

---

## 31. Idempotency Keys for Critical Mutations
* **The Rule:** Any endpoint that triggers a financial transaction, sends a communication, or creates a resource that must never be duplicated MUST support an `Idempotency-Key` request header. The server caches the result of the first request with that key. If the same key is received again (e.g., due to a network retry), it returns the original cached result without re-executing the operation.
* **Why:** Networks are unreliable. A client (mobile app, frontend, partner API) might retry a `POST /payments` request after a timeout, not knowing the first one succeeded. Without idempotency, the member gets double-charged. This is a critical rule for any fintech or e-commerce feature.
* **Implementation:** Store `(idempotency_key, response_payload)` in Redis with a TTL of 24 hours. Check before processing. Return cached response if key already exists.

---

## 32. Observability: The Three Pillars (Logs, Metrics, Traces)
* **The Rule:** Logging alone is not sufficient for enterprise observability. You MUST implement all three pillars:
  1. **Structured Logs** (Rule 14): Already covered. Use JSON-formatted logs.
  2. **Metrics:** Expose a `/metrics` endpoint (Prometheus format) tracking: request count, request latency histograms, error rates, queue depth, DB connection pool usage. Use libraries like `prom-client` (Node), `django-prometheus` (Django), or Spring Boot Actuator.
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
  1. **N+1 Prevention:** Always use eager loading / `JOIN` fetching when you know you'll need related data (e.g., `prefetch_related` in Django, Prisma `include`, TypeORM `relations`). Never fetch a list of 100 members and then loop to fetch each one's plan separately.
  2. **Index Strategy:** Every foreign key column, every column used in a `WHERE` clause, and every column used in an `ORDER BY` clause MUST have a database index. Indexes should be explicitly defined in migration files — never rely on the ORM to create them automatically.
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
* **The Rule:** Just like modern frontend frameworks (e.g., Next.js) use `(group)` folders to isolate UI domains like `(erp)` or `(superadmin)`, the backend MUST group its modules into top-level domain folders before splitting them into specific features.
  - ❌ **BAD:** `src/modules/billing/`, `src/modules/superadmin-stats/`, `src/modules/attendance/` (All dumped into a flat `modules/` directory).
  - ✅ **GOOD:** `src/modules/erp/billing/`, `src/modules/superadmin/stats/`, `src/modules/members-app/attendance/`.
* **Frontend-First Naming Lock:** Since this project follows a frontend-first workflow (UI built with mock data before backend), the frontend feature folder names are the canonical source of truth. When backend development begins, the backend AI/developer MUST reuse the EXACT same folder/module name as the frontend. Renaming a feature during backend development is strictly forbidden without updating the frontend folder to match first.
* **Casing Translation Rule:** The semantic name stays identical across frontend/backend; only the casing style changes per language/framework convention (e.g., frontend `auth` folder → backend `auth/` folder with `AuthModule` classes — never changing to a different semantic word like `identity`).
* **API Route Grouping & Mirroring:** The API endpoint URLs must strictly mirror this domain grouping (e.g., `/api/erp/billing`, `/api/superadmin/stats`). Furthermore, page-to-endpoint naming must mirror exactly: if the frontend `/auth/` module calls an API, the route MUST be `/api/v1/auth/...`, not `/api/v1/session/...`. This ensures the debugging flow from UI page -> Frontend Folder -> Backend Folder -> Backend Route is 100% identically named.
* **1:1 Mirror Mapping:** The backend folder structure (AND the `e2e/` test folder structure) MUST strictly mirror the frontend route structure. If the frontend `(superadmin)` domain has 5 feature folders (e.g., `broadcasts`, `coupons`, `affiliates`), the backend `superadmin` domain MUST have exactly 5 matching modules. 
* **Why:** This creates a perfect 1:1 mapped architecture. If a bug occurs in the "Coupons" feature, you provide the AI with exactly two things: `frontend/.../superadmin/coupons/` and `backend/.../superadmin/coupons/`. The AI gets the complete vertical slice (Frontend UI + Backend Logic) for that specific feature without seeing the rest of the application. This guarantees zero hallucination, massive token savings, and perfect separation of concerns.

---

## 39. True Multi-Tenancy (Database-per-Tenant Architecture)
* **The Rule:** The application MUST be built using a strict **Database-per-Tenant** architecture to guarantee absolute data isolation, high performance, and security. It is unacceptable to dump all gyms or whatever the project is ' data into a single database with a `tenant_id` column (row-level multi-tenancy).
* **Architecture Strategy:**
  1. **Master Database:** A central database (e.g., `gymsmart_master`) must exist solely to manage global resources: Users, Authentication, Tenants (Gyms), Subscriptions, and Feature Flags.
  2. **Tenant Databases:** Every time a new gym registers, the backend must programmatically create a brand-new database (e.g., `tenant_db_101`) and run all schema migrations on it automatically. *(Note: All these logical databases reside within the same single MySQL/PostgreSQL server instance; do not spin up new physical servers/VPS per tenant).*
  3. **Dynamic Connection Routing (Request Scoped):** The backend must intercept every incoming API request. Using a global middleware or interceptor, it must extract the `x-tenant-id` (from HTTP headers or JWT payload) and dynamically construct or switch the database connection to point to that specific tenant's database for the lifecycle of that request.
  4. **Strict Tenant Authorization (CRITICAL):** `x-tenant-id` MUST NOT be trusted merely because the client supplied it. The server MUST verify that the authenticated actor is explicitly authorized to access that tenant in the master database before selecting the tenant DataSource. The flow must be: `Request → Authentication → Tenant Authorization → Trusted Tenant Context → DataSource Resolver`.
  5. **Connection Pool Limits:** **⚠️ See Rule 63 before implementing this** — the connection pool budget must be calculated across ALL active tenant DataSources combined, not per-tenant. Blindly applying `max: 20` per tenant DataSource will exhaust the database server's connection limit under load.
* **How to Apply to Different Frameworks:**
  - **NestJS (Node/TypeScript):** Do not use a static, monolithic ORM module root configuration. Use request-scoped providers or custom connection factories that cache and resolve database connection/client instances based on the request's tenant header.
  - **Django (Python):** Use database routers (`db_for_read`, `db_for_write`) paired with thread-local storage or middleware to dynamically route queries to the correct database alias based on the request.
  - **Spring Boot (Java):** Implement `AbstractRoutingDataSource` and use a `ThreadLocal` context holder populated via a HandlerInterceptor to route database connections dynamically.
* **Why:** If Gym A and Gym B share the same database tables, a single missing `WHERE tenant_id = X` clause in a business query results in a catastrophic cross-tenant data breach. Database-per-tenant completely eliminates this risk at the infrastructure level. Furthermore, queries are infinitely faster because a table only contains the data of one specific gym, avoiding massive billion-row bottlenecks.

---

## 40. Multi-Medium Sending Architecture (Proof of Delivery)
* **The Rule:** Whenever the system needs to send something to a user as a proof of transaction (e.g., a bill, a receipt, a report, or an alert), the backend MUST architect the payload and services to support at least **two different mediums** (e.g., WhatsApp and Email, or SMS and Email).
* **Mandatory Fallback:** One of the two mediums must always be configured as the mandatory fallback or default. The backend API should accept an explicit `deliveryMedium` parameter (e.g., `WHATSAPP` or `EMAIL`) from the frontend payload and route the message via the chosen service.
* **Why:** This ensures that if one provider fails or a user doesn't have WhatsApp, they can still receive critical proofs via Email or another backup medium.

---

## 41. Transaction Locks & Race Condition Prevention
* **The Rule:** For highly concurrent mutations (e.g., deducting wallet balances, booking limited seats, processing inventory), standard database transactions are not enough to prevent race conditions. You MUST implement **Pessimistic Locking** (e.g., `SELECT ... FOR UPDATE` via Prisma's `$transaction` with `isolationLevel`, raw SQL in a repository, or `select_for_update()` in Django) or **Optimistic Locking** (using a version/revision column checked on update).
* **Why:** If two concurrent requests try to deduct money at the exact same millisecond, a standard transaction might allow both to succeed based on stale read data, causing negative balances. Enforcing this rule ensures AI always explicitly handles concurrency.

---

## 42. Distributed Cron Jobs (No Local Schedulers)
* **The Rule:** Never use local cron jobs (like `setInterval`, `node-cron`, or `@Cron()` without a lock) inside the backend code. You must use a **Distributed Task Scheduler** backed by Redis (like BullMQ in Node, Celery Beat in Python) or a database-backed distributed lock (like Redlock/ShedLock).
* **Why:** In an enterprise environment, your backend will scale horizontally (e.g., 3 instances running behind a load balancer). If you use a local cron job to send "Morning Reminders", all 3 instances will fire it simultaneously, sending 3 duplicate emails to the user. A distributed scheduler guarantees a job only runs exactly once across the entire cluster.

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
* **The Rule:** All inbound webhooks (e.g., Payment gateways) MUST verify the cryptographic signature (HMAC-SHA256) before processing. Furthermore, check timestamps to prevent replay attacks.

## 46. Strict Input Sanitization Layer
* **The Rule:** Beyond validation, inputs must be sanitized. Strip HTML/script tags from free-text fields. Strip leading/trailing whitespaces. Normalize emails (lowercase) and phone numbers to canonical formats before saving.

## 47. Circuit Breaker Pattern for External Services
* **The Rule:** External adapters (WhatsApp, SMS, Payments) MUST be wrapped in a Circuit Breaker. If the external service fails repeatedly, the breaker opens, rejecting requests instantly with a `503` to prevent thread pool exhaustion, triggering a defined fallback queue.

## 48. CQRS Lite (Query vs Command Controllers)
* **The Rule:** Read operations (GET) and Write operations (POST/PATCH/DELETE) must be split into separate controllers (e.g., `[module]-query.controller.ts` and `[module]-command.controller.ts`). This guarantees AI never accidentally touches mutation logic when fixing a read query.

## 49. Explicit Module Dependency Graph (Including Runtime Events)
* **The Rule:** Every module must have a `[module]_dependencies.md` detailing which other modules it depends on, and which modules depend on it. This maps downstream impact instantly.
* **Event Dependency Rule:** Event publication/subscription is a runtime dependency. Every published/consumed event MUST be explicitly listed in `[module]_dependencies.md`. Undeclared event subscriptions are forbidden. Event payload contracts must be strictly validated at the consumer boundary.

## 50. Standardized Event Naming Convention
* **The Rule:** Event names MUST follow `DOMAIN.ENTITY.ACTION` in SCREAMING_SNAKE_CASE (e.g., `BILLING.PAYMENT.FAILED`, `MEMBERS.MEMBER.REGISTERED`, `ATTENDANCE.SESSION.CLOSED`) and be registered in a centralized `event-registry.constants.ts`. Two-part forms like `MEMBER_REGISTERED` or `MEMBER.REGISTERED` are non-compliant.

## 51. API Changelog & Deprecation Policy
* **The Rule:** When an endpoint changes destructively, do not delete it immediately. Return a `Deprecation` header with a sunset date, track it in `CHANGELOG.md`, and maintain it for the deprecation window.

## 52. JWT Refresh Token Rotation & Revocation
* **The Rule:** Access tokens must be short-lived. Refresh tokens must be stored in HttpOnly cookies. On every refresh, the old token must be rotated/invalidated. A Redis denylist must exist for immediate manual revocation.

## 53. Sensitive Field Encryption at Rest
* **The Rule:** Aadhaar numbers, bank accounts, and medical notes MUST be encrypted at the application layer (AES-256) before hitting the DB. Use an `@Encrypted` decorator or EncryptionService. Hash is not enough.

## 54. Brute Force & Account Lockout Policy
* **The Rule:** After 5 failed login attempts, the account is temporarily locked via Redis. Lockout state must be logged in the audit trail.

## 55. Deterministic Seed Data Strategy
* **The Rule:** Every module must have a co-located `[module].seeder.ts` that is deterministic and idempotent. A master seed script orchestrates them in dependency order for local testing.

## 56. Strict Null Safety in Repository Returns
* **The Rule:** Repositories must correctly type `findById()` as returning `Entity | null`. AI must use a dedicated `findByIdOrThrow()` method to ensure null exceptions are handled defensively.

## 57. Request Context Propagation (AsyncLocalStorage)
* **The Rule:** Use Node's `AsyncLocalStorage` to store context (tenant_id, user_id, trace_id) at the request boundary. Deep services/repositories must pull from this context rather than prop-drilling parameters through 5 layers of functions.

## 58. Standardized Database Entity Base Abstraction
* **The Rule:** All database entities MUST implement a common standard abstraction for `id` (UUID), `createdAt` (timestamp with timezone), `updatedAt` (timestamp with timezone), and `deletedAt` (nullable timestamp for soft deletes). For TypeORM, use a common `BaseEntity` class inheritance. For Prisma, use a common mixin/schema middleware, or explicit schema base models. AI must never manually define these fields per entity from scratch without reusing the core abstraction.
* **Base Repository Enforcement:** The global query filter for soft deletes (from Rule 29) MUST be implemented as a base repository method that ALL repositories extend from. Never duplicate the soft-delete query scope logic per-repository.

## 59. API Response Time SLA Categories
* **The Rule:** Every endpoint must declare its SLA category in a comment (`// SLA: FAST`). FAST (< 200ms), STANDARD (< 500ms), HEAVY (> 500ms). Heavy tasks must be moved to background jobs (Rule 23). Enforce via monitoring middleware.

## 60. Strict Foreign Key Naming Convention
* **The Rule:** Database columns must use `snake_case` (e.g., `member_id`). TypeScript model/entity properties must use `camelCase` (e.g., `memberId`). Explicitly map them in the ORM model definition (e.g., Prisma `@map("member_id")`, TypeORM `@Column({ name: 'member_id' })`). Foreign key constraints MUST follow the canonical 3-part form `FK_[table]_[referenced_table]_[column]` (e.g., `FK_subscriptions_members_member_id`). This is the same pattern as Rule 100 — the 2-part form `FK_[table]_[referenced_table]` is deprecated and non-compliant.

## 61. Dead Letter Queue (DLQ) for Failed Background Jobs
* **The Rule:** Every background job queue (BullMQ/Celery) MUST have a configured Dead Letter Queue. If a job fails all retries, it must be moved to the DLQ (not discarded) so admins can manually inspect and retry it.

## 62. Explicit Return Types on ALL Service Methods
* **The Rule:** Relying on TypeScript implicit `any` or inferred returns is forbidden for async operations. Every service method and repository method MUST have an explicitly declared return type (e.g., `Promise<MemberDomainModel>`).

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
UI Data Requirements (Frontend Rule 13 / Rule 75A)
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

* **Why:** The previous "backend writes DTOs first" rule conflicted with the frontend-first workflow used in this project. The backend AI writing a DTO without inspecting the frontend's UI Data Requirements produces exactly the minimal-response failure mode that Rules 75A and 82A are designed to prevent.

## 68. Health Check Depth Levels
* **The Rule:** Implement 3 levels of health checks: `/health/live` (Process alive? 200 OK), `/health/ready` (DB/Redis reachable? Traffic ready), and `/health/deep` (Full dependency chain check, not exposed publicly).

## 69. Strict `tsconfig.json` Enforcement
* **The Rule:** The backend MUST run with `strict: true`. No `implicitAny`, no `implicitThis`. AI must never add `@ts-ignore` or `@ts-nocheck` to bypass type errors.

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

## 78. Forbidden Patterns File (`[moduleName]_forbidden.md`)
* **The Rule:** Every backend module must have a `[moduleName]_forbidden.md` file listing what is explicitly NOT allowed in that specific module.

### `_forbidden.md` Content Quality Standard

**Failure Conditions — A `_forbidden.md` FAILS quality review if it contains:**
- Fewer than 5 entries
- Generic entries not tied to a specific rule number (e.g., "Never bypass the Orchestrator" with no rule citation)
- Entries that apply to every module equally (e.g., "Do not use console.log") — those belong in the global instruction, not here
- Entries with no explanation of the consequence of violation

#### ❌ BAD — Generic, unactionable:
```markdown
# billing_forbidden.md
- Never bypass the Orchestrator for payments.
- Never mutate the DB without pessimistic locking.
- Do not use console.log.
- Do not bypass API interceptors.
```
*Why this fails: "Never bypass the Orchestrator" with no context tells an AI nothing about which specific call paths are forbidden or what breaks if violated.*

#### ✅ GOOD — Specific, rule-cited, consequence-explained:
```markdown
# billing_forbidden.md

## What is NEVER allowed in this module

1. **Never call BillingWalletRepository directly from outside BillingOrchestratorService.**
   Consequence: Wallet deductions outside the Orchestrator bypass the DB transaction
   boundary, causing partial charges where balance is deducted but plan is not activated.
   Rule: 8B (Orchestrator Pattern), Rule 41 (Pessimistic Locking).

2. **Never remove the SELECT FOR UPDATE lock from deductBalance().**
   Consequence: Concurrent top-up + deduction requests will race, producing negative
   wallet balances that cannot be recovered without manual DB correction.
   Rule: 41 (Transaction Locks & Race Condition Prevention).

3. **Never process a plan purchase and wallet deduction in separate transactions.**
   Consequence: A crash between the two operations leaves the member charged but
   without an active plan — a financial discrepancy requiring manual reconciliation.
   Rule: 8B (Orchestrator Pattern).

4. **Never omit the Idempotency-Key check on /billing/wallet/topup.**
   Consequence: Network retries from mobile clients will double-charge the member.
   Rule: 31 (Idempotency Keys for Critical Mutations).

5. **Never return raw MemberEntity or WalletEntity from billing service methods.**
   Consequence: ORM entity leakage means a DB column rename breaks service-layer
   callers that should be completely unaware of the schema.
   Rule: 89 (Domain Object vs ORM Entity Separation).
```

**Minimum requirement:** Every `_forbidden.md` must have at least **5 entries**, each with a specific consequence and a Rule citation.

---

## 79. Explicit Data Flow Direction Comment (AI Context Chain)
* **The Rule:** Just as the frontend mandates `// DATA FLOW: API → hook → Context → Component` on every hook file (Frontend Rule 39), every backend **service, controller, and repository** file MUST begin with an explicit data flow annotation comment below the responsibility comment.
* **Format:**
  ```
  // RESPONSIBILITY: Handles member suspension logic. No direct DB writes — emits events only.
  // FLOW: MemberCommandController → MemberSuspensionService → MemberRepository → EventBus.emit('MEMBER.SUSPENDED')
  ```
* **Why:** When an AI agent is given a single file to fix a bug, the `// FLOW:` comment instantly tells it the full chain of execution — what came before this file, and what happens after — without the AI needing to read any other file. This eliminates the single biggest cause of AI hallucination: not knowing what calls what.

---

## 80. Mandatory JSDoc on All Service Methods, Repositories & Utilities
* **The Rule:** Every service method, repository method, adapter method, and utility function MUST be prefixed with a JSDoc block. This mirrors Frontend Rule 37 which mandates JSDoc on all hooks and utilities.
* **What the JSDoc must include:**
  1. A one-line `@description` of what the method does.
  2. `@param` for every non-trivial argument.
  3. `@returns` with the exact type.
  4. `@throws` with the exact custom exception(s) it can throw (from Rule 6).
  5. For complex business logic: a `@remarks` note explaining the *why* behind a design decision (e.g., "Uses pessimistic lock because concurrent wallet deductions caused negative balances in load testing").
* **Example:**
  ```typescript
  /**
   * @description Suspends a member by setting their status to SUSPENDED and emitting the lifecycle event.
   * @param memberId - The UUID of the member to suspend.
   * @param actorId - The UUID of the staff member performing the action (for audit log).
   * @returns The updated MemberDomainModel with status SUSPENDED.
   * @throws MemberNotFoundException if the memberId does not exist.
   * @throws MemberAlreadySuspendedException if the member is already suspended.
   * @remarks Uses a database transaction to ensure the audit log write and status update are atomic.
   */
  async suspendMember(memberId: string, actorId: string): Promise<MemberDomainModel> { ... }
  ```
* **Why:** An AI fixing a bug in a billing service shouldn't need to read 300 lines to understand what `chargeWallet()` can throw. The JSDoc block is the file's self-contained API contract, drastically reducing token usage and hallucination risk.

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
  - ❌ **BAD (Ambiguous):** `data: { member: MemberEntity, invoice: InvoiceEntity }` — the frontend `ApiResponse<T>` generic breaks because `T` is not a single entity.
  - ✅ **GOOD:** `data: MemberWithInvoiceDTO` — a single, explicitly defined DTO that contains both.
  - ❌ **BAD (Inconsistent):** One code path returns `data: MemberEntity`, another returns `data: { member: MemberEntity }`.
  - ✅ **GOOD:** Always `data: MemberEntity` — one shape, all paths.
* **The Discriminated Union Rule for Errors:** Never put different error shapes inside `data`. All error information belongs strictly in the `error` and `errorCode` fields of the envelope (Rule 64). The `data` field must always be `null` on error responses. No exceptions.
* **Why:** The frontend AI agent generating the type-safe API call relies on `ApiResponse<MemberEntity>` mapping exactly. If the backend AI returns `data: { member: MemberEntity }` instead of `data: MemberEntity`, the TypeScript type system on the frontend will silently pass (because of structural typing) but every `res.data.name` call will return `undefined`, creating bugs that are extremely hard to trace.

---

## 82A. Frontend UI Data Contract Completeness
* **The Rule:** Every backend response DTO MUST satisfy the **complete data contract** documented by the consuming frontend feature's `## UI Data Requirements` section (Frontend Rule 13 / Rule 75A). The backend MUST NOT intentionally return a reduced or "minimal" DTO merely because the database entity contains only a subset of the fields currently visible in the UI.

Before implementing an endpoint, the backend AI MUST verify the corresponding frontend feature's
frozen API contract from the `## Frozen API Contract` section inside the backend feature's own
`_backend_feature.md`. At API Contract Freeze (Rule 67), the frontend publishes its complete
data requirements and the backend copies a snapshot into its own `_backend_feature.md` — then
the backend AI can remain inside `/backend/[feature]/**` without needing the frontend folder.

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
3. Document the limitation clearly in the `_backend_feature.md`.
4. Propose the contract change explicitly.
5. Update the frontend `## UI Data Requirements`, API Contract, TypeScript types, Zod schema, MSW handler, and tests in the same PR before merging the breaking change.

* **Why:** This prevents the exact failure mode where an MSW response or backend API returns only a few fields and the remaining table columns, KPI cards, and chart series render empty or `undefined`. Frontend Rule 75A prevents the frontend from papering over the gap with hardcoded fallback data — so the backend must provide the complete contract instead.

---

## 83. Centralized RBAC / Permission Guards (Role-Based Access Control)
* **The Rule:** Role and permission checks must NEVER be done inline inside service methods or repository layers (e.g., `if (user.role === 'admin')`). Permission enforcement is strictly a **controller-layer concern** and must be implemented using centralized, declarative guards or decorators.
* **How to implement per framework:**
  - **NestJS:** Use a `@Roles(...)` custom decorator paired with a global `RolesGuard` that reads the JWT payload. Never check `req.user.role` inside a service.
  - **Django:** Use Django REST Framework's `IsAuthenticated` + custom `Permission` classes (e.g., `IsAdminOrManager`). Never check `request.user.is_staff` inside a view's business logic.
  - **Express:** Implement a `requireRoles(...roles)` middleware factory that is mounted per-route. Never check roles inside a controller handler.
* **Fine-Grained Resource Permissions:** For resource-level checks (e.g., "Can this manager see only their branch's members?"), create a dedicated `[module]-authorization.service.ts`. This service receives the actor and the resource and returns a boolean. The controller calls this service before delegating to the business service.
* **Centralized Role Registry:** All role names and permission strings MUST be defined as enums in a central `auth.roles.constants.ts` file. Never use raw strings like `'admin'` or `'manager'` directly in guards or decorators.
  - ❌ **BAD:** `@Roles('admin', 'superadmin')`
  - ✅ **GOOD:** `@Roles(UserRole.ADMIN, UserRole.SUPERADMIN)`
* **Why:** Just as the frontend mandates `usePermissions()` for hiding restricted UI elements (Frontend Rule 25), the backend must enforce the same contract at the API layer. An AI writing a new endpoint will forget to add auth checks if there is no standard, centralized pattern to follow. A declarative decorator is impossible to forget because it's visible at the route definition.

---

## 84. No Barrel File / Re-Export Index Rule
* **The Rule:** Strictly avoid using `index.ts` or `index.js` files to re-export modules (barrel files). This mirrors Frontend Rule 32. Always import directly from the explicitly named source file.
  - ❌ **BAD:** `import { MemberService } from '@/modules/members'` (where `members/index.ts` re-exports everything)
  - ✅ **GOOD:** `import { MemberRegistrationService } from '@/modules/members/services/member-registration.service'`
* **Why barrel files are dangerous in AI-driven codebases:**
  1. **Circular Dependencies:** Barrel files are the #1 cause of circular dependency errors in NestJS and Express projects. An AI adding a new export to a barrel file can silently create a circular import cycle that causes runtime crashes.
  2. **AI Context Pollution:** When an AI imports `from '@/modules/members'`, it loads the entire barrel into context — all services, all DTOs, all repositories. With direct imports, the AI only loads exactly what it needs, drastically reducing hallucination risk.
  3. **Dead Code Masking:** Barrel files make tree-shaking and unused-code detection nearly impossible, hiding dead code from AI and human reviewers alike.
* **Enforcement:** Mechanically enforce via ESLint `no-restricted-imports` or a custom rule that flags imports from `index.ts` paths.

---

## 85. Guard Clause / Early Return Pattern (No Nested Conditional Hell)
* **The Rule:** Deeply nested `if/else` blocks inside service methods are strictly forbidden. This mirrors Frontend Rule 51 which bans ternary hell. All service methods MUST use the **Guard Clause** (Early Return) pattern: validate inputs and exit early at the top of the function, keeping the happy path flat and readable.
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
    async suspendMember(id: string): Promise<MemberDomain> {
      const member = await this.memberRepo.findByIdOrThrow(id);

      if (member.status === MemberStatus.SUSPENDED) {
        throw new MemberAlreadySuspendedException(id);
      }

      if (!member.hasActiveSubscription) {
        throw new NoActiveSubscriptionException(id);
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
* **The Rule:** Just as the frontend mandates hook separation to split logic from UI (Frontend Rule 6), the backend mandates that **every service method must do exactly ONE thing**. If a method is doing more than one distinct business operation, it must be split into private helper methods or separate micro-services.
* **The 20-Line Soft Ceiling:** A service method body (excluding JSDoc) should rarely exceed ~20 lines. If a method grows beyond this, it is a signal that it is doing too much and must be decomposed.
* **Decomposition Pattern:**
  - ❌ **BAD:** A single `registerMember()` method that validates, saves the member, creates a subscription, charges the card, sends a welcome email, and writes an audit log — all in one 80-line function.
  - ✅ **GOOD:** `registerMember()` is an Orchestrator (Rule 8B) that calls: `this.memberRepo.createMember(data)`, then emits `EventBus.emit('MEMBERS.MEMBER.REGISTERED', ...)`. The subscription creation, payment charging, and email are handled by separate listeners.
* **Private Helper Rule:** If a method needs a private helper for a sub-calculation (e.g., calculating a pro-rated amount), the helper must be a `private` method with its own JSDoc (Rule 80) clearly named for its specific task (e.g., `private calculateProRatedAmount()`).
* **Why:** An AI asked to "add audit logging to member registration" should be able to do so by touching exactly ONE file and ONE method — the event listener for `MEMBERS.MEMBER.REGISTERED`. If the entire registration flow is monolithic, the AI must read and modify a 200-line method, risking collateral damage.

---

## 88. Strict Import Order Convention (Mechanical ESLint Enforcement)
* **The Rule:** All backend TypeScript/JavaScript files MUST enforce a strict, consistent import order. This mirrors Frontend Rule 49. Configure ESLint's `import/order` rule to enforce the following groups in this exact sequence:
  1. **Node.js built-ins** (e.g., `node:fs`, `node:path`)
  2. **Framework core** (e.g., `@nestjs/common`, `express`, `django`)
  3. **Third-party packages** (e.g., `@prisma/client`, `class-validator`, `bcrypt`)
  4. **Internal absolute imports — Infrastructure** (e.g., `@/config/`, `@/database/`)
  5. **Internal absolute imports — Module-specific** (e.g., `@/modules/billing/...`)
  6. **Relative imports** (strictly forbidden per Rule 10 — this group must always be empty)
  7. **Type-only imports** (`import type { ... }`) must always be last
* **Blank line separation:** Each group must be separated by a blank line. No mixing of groups.
* **Example:**
  ```typescript
  import * as crypto from 'node:crypto';

  import { Injectable } from '@nestjs/common';

  import { PrismaService } from '@/core/database/prisma.service';
  import * as bcrypt from 'bcrypt';

  import { DatabaseConfig } from '@/config/database.config';

  import { MemberEntity } from '@/modules/members/entities/member.entity';
  import { MemberNotFoundException } from '@/modules/members/exceptions/member.exceptions';

  import type { CreateMemberDto } from '@/modules/members/dtos/member-create.dto';
  ```
* **Why:** Chaotic import ordering in AI-generated code causes two specific problems: (1) Merge conflicts explode because every AI agent adds imports in a different location, (2) Circular dependency detection becomes nearly impossible because the import graph is visually unreadable. A strict, mechanical ESLint rule makes import diffs surgical and circular deps immediately obvious.

---

## 89. Domain Object vs. ORM Entity Separation (Anti-Persistence-Leakage Rule)
* **The Rule:** Never use ORM Entity classes (e.g., TypeORM `@Entity()` classes, Django ORM models) directly inside business logic services. ORM entities are a **persistence infrastructure concern** — they contain database annotations, lazy-loading relations, and schema metadata that have no place in pure business logic.
* **The Pattern — Two Distinct Objects + Mapper:**
  1. **ORM Model / Entity** (`member.entity.ts` or Prisma schema model): Contains only database schema definition. Lives in the repository layer only.
  2. **Domain Object / DTO** (`member.domain.ts` or `member.dto.ts`): A plain TypeScript class/interface with pure business properties and zero ORM imports. This is what services, controllers, and event handlers receive and return.
  3. **Mapper** (`member.mapper.ts`): A dedicated class with `toDomain(entity)` and `toEntity(domain)` static methods that translate between the two. Only the repository layer calls the mapper.
* **Absolute Rule:** The exception for a "unified model" is strictly forbidden. Maximum AI isolation requires a predictable, exception-free architecture. A mapper must be used even for simple CRUD modules.
* **Why:** AI agents default to using ORM entities everywhere — passing `MemberEntity` into services, emitting it over the EventBus, returning it from controllers. This "persistence leakage" means a database schema change (e.g., renaming a column) breaks business logic files that should be completely unaware of the database. A Mapper is the single controlled translation point, and it is the only file the AI needs to touch when the schema changes.

---

## 90. Automated Security Gates in CI/CD Pipeline (Shift-Left Security)
* **The Rule:** All backend AI-generated code is **untrusted input** until proven otherwise. Research shows ~45% of AI code suggestions can introduce security vulnerabilities. The CI/CD pipeline MUST implement non-bypassable automated security gates on every Pull Request before any merge is allowed.
* **Mandatory Gate 1 — SAST (Static Application Security Testing):** Run a SAST scanner (e.g., `Semgrep`, `SonarQube`, `CodeQL`) on every PR. Any `Critical` or `High` severity finding MUST block the merge. AI agents cannot self-certify their own code as secure.
* **Mandatory Gate 2 — SCA (Software Composition Analysis):** Run a dependency vulnerability scanner (e.g., `npm audit`, `safety` for Python, `Snyk`) on every PR. Any new dependency with a known `Critical` CVE must block the merge.
* **Mandatory Gate 3 — Secrets Detection:** Run a secrets scanner (e.g., `GitLeaks`, `Trufflehog`) on every PR diff. A single hardcoded API key or database password in a commit is a catastrophic security breach. This gate must never be skipped.
* **Mandatory Gate 4 — TypeScript Strict Compile Check:** Run `tsc --noEmit` on every PR. The build must pass with zero type errors — no `@ts-ignore` bypasses allowed (Rule 69).
* **Why:** Frontend Rule 61 mandates mechanical tooling gates for the frontend. The backend requires the exact same discipline but with an added focus on security. An AI writing authentication or payment code must have its output automatically vetted before it reaches production.

---

## 91. Mandatory Backend Pre-Commit Hooks (Blocking Gates Before Commit)
* **The Rule:** This mirrors Frontend Rule 61's `husky + lint-staged` mandate. The backend repository MUST configure pre-commit hooks using `husky` (Node.js) or `pre-commit` framework (Python) to run fast, blocking checks before every `git commit`. A pre-push hook is an optional additional gate, but pre-commit is mandatory. These hooks run locally on the developer/AI agent's machine — they are the first line of defense before code reaches CI.
* **Required Pre-Commit Checks (must all pass):**
  1. `tsc --noEmit` — TypeScript type check. Zero errors required.
  2. `eslint --fix` — Auto-fix lint violations; fail if unfixable violations remain.
  3. `prettier --check` — Code format verification.
  4. `gitleaks detect --no-git` — Secret scanning on staged files only (fast).
* **Staged Files Only:** Use `lint-staged` to run checks only on the files in the current commit. Running checks on the entire codebase on every commit is too slow and will cause developers/AI agents to bypass the hooks.
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
    // Prisma
    prisma.member.findMany({ where: { name: req.query.name } });
    // Raw SQL with parameterization
    db.query('SELECT * FROM members WHERE name = $1', [req.query.name]);
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
* **Why:** Industry research confirms that ~45% of AI-generated code can introduce vulnerabilities, and the risk is highest in security-critical paths. An AI agent might generate a logically correct but cryptographically weak JWT validation, or a permission guard with a subtle bypass. Automated tools cannot catch all semantic security flaws — a human security review is the final, non-negotiable gate.

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
* **Why:** The frontend's `PaginationMeta` TypeScript type (Frontend Rule 59) must map 1:1 to this shape. If the backend returns `total_count` instead of `total`, the frontend type breaks silently and pagination controls show `NaN` pages. One canonical shape, defined once, used everywhere.

---

## 95. Enum-Driven Entity Status Fields (No Raw String Columns)
* **The Rule:** All entity columns that represent a finite set of states (e.g., `status`, `type`, `role`, `medium`, `priority`) MUST use a TypeScript `enum` — never raw string literals. Saving `member.status = 'actve'` (a typo) to the database must be a **compile-time error**, not a silent data corruption bug discovered in production.
* **The Pattern:**
  ```typescript
  // In the module's constants file: members.constants.ts
  export enum MemberStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    EXPIRED = 'EXPIRED',
    PENDING = 'PENDING',
  }
  ```
  ```typescript
  // In the entity/model: member.entity.ts (TypeORM) or Prisma schema
  // TypeORM:
  // @Column({ type: 'enum', enum: MemberStatus, default: MemberStatus.PENDING })
  // status: MemberStatus;
  //
  // Prisma schema:
  // status MemberStatus @default(PENDING)
  ```
* **Rules:**
  - ❌ **BAD:** A plain string column for status — accepts any string, including typos.
  - ❌ **BAD:** Inline union type (`'active' | 'suspended'`) — not reusable, not a runtime guard.
  - ✅ **GOOD:** ORM enum column mapped to the `MemberStatus` enum — compile-time AND database-level enforcement.
  - All enums MUST be defined in the module's `[module].constants.ts` file (Rule 5) — never inline inside the entity file.
  - Enum values MUST be `SCREAMING_SNAKE_CASE` strings (e.g., `'ACTIVE'`, `'IN_PROGRESS'`) so they are human-readable in raw database queries.
  - When adding a new enum value, a database migration MUST be generated to update the DB enum type. Never rely on ORM auto-sync in production (Rule 24).
  - DTO validation for enum fields MUST use `@IsEnum(MemberStatus)` from `class-validator` — never `@IsString()`.
* **Database-Level Enforcement:** For PostgreSQL, use `type: 'enum'` which creates a native PG enum type. For MySQL, use `type: 'enum'` which creates a column-level CHECK constraint. Both enforce valid values at the DB layer as a second line of defense.
* **Why:** AI agents default to `string` columns for status fields because it's the path of least resistance. A single typo (`'actve'` instead of `'active'`) silently corrupts data — the record is saved, no error is thrown, but every `WHERE status = 'ACTIVE'` query silently excludes that record. TypeScript enums make this a compile-time error that is caught before the code ever runs.

---

## 96. Scheduled Job Documentation & Centralized Inventory
* **The Rule:** Rule 42 mandates distributed cron jobs technically, but in a large system with 10+ scheduled jobs across multiple modules, nobody — human or AI — knows what jobs exist, when they run, what data they touch, or what happens if they fail. This is a critical operational blind spot. Every scheduled job MUST be registered in a centralized inventory.
* **Required File:** `src/core/scheduled-jobs.registry.ts` — a single file that serves as the master inventory of ALL background scheduled jobs across the entire application.
  ```typescript
  // src/core/scheduled-jobs.registry.ts
  // RESPONSIBILITY: Master inventory of all scheduled jobs. Update this file whenever
  // a new job is added, modified, or removed anywhere in the application.

  export const SCHEDULED_JOBS_REGISTRY = [
    {
      name: 'MembershipExpiryNotifier',
      module: 'members',
      file: 'src/modules/erp/members/jobs/membership-expiry-notifier.job.ts',
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
      file: 'src/modules/erp/billing/jobs/wallet-auto-deduction.job.ts',
      schedule: '0 0 1 * *',          // 1st of every month at midnight UTC
      description: 'Auto-deducts monthly plan fees from member wallets for active auto-renew subscriptions.',
      touchesEntities: ['wallets', 'subscriptions', 'payment_transactions'],
      failureBehavior: 'CRITICAL — moves to DLQ. Triggers alert to ops team. Member is NOT charged until manual retry.',
      idempotent: true,               // Uses Idempotency-Key per Rule 31
      lastReviewedBy: 'backend-team',
    },
  ] as const;
  ```
* **Mandatory fields per entry:** `name`, `module`, `file`, `schedule` (cron expression), `description` (what it does in plain English), `touchesEntities` (which DB tables it reads/writes), `failureBehavior` (what breaks if the job fails), `idempotent` (boolean — is it safe to run twice?).
* **`_backend_feature.md` Integration:** The "Data and State Architecture" section of every module's `_backend_feature.md` (Rule 19) MUST list all scheduled jobs owned by that module, referencing the registry entry by name.
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
  - Every `axios` / `fetch` / `HttpService` call in an adapter (Rule 8D) MUST pass `timeout: TIMEOUT_CONFIG.EXTERNAL_API_DEFAULT_MS` (or the appropriate tier). No raw `axios.get(url)` without a timeout is permitted.
  - ORM/DB query timeouts MUST be configured for all non-trivial queries using the appropriate timeout value from `TIMEOUT_CONFIG`. For Prisma, use `$transaction` with a timeout option; for raw queries, set statement_timeout at the connection or query level. Report/analytics queries must explicitly use the `DB_QUERY_REPORT_MS` tier.
  - When a timeout fires, the adapter MUST catch the `ECONNABORTED` / `ETIMEDOUT` error and throw a typed custom exception (Rule 6) — e.g., `PaymentGatewayTimeoutException` — never let the raw Axios error propagate to the service layer.
  - ❌ **BAD:** `await this.httpService.get('https://api.stripe.com/charges').toPromise()`
  - ✅ **GOOD:** `await this.httpService.get('https://api.stripe.com/charges', { timeout: TIMEOUT_CONFIG.PAYMENT_GATEWAY_MS }).toPromise()`
* **SLA Category Integration:** Timeout values must align with the SLA categories defined in Rule 59. The critical-path timeout budget must fit within the endpoint SLA, including application processing overhead. If a downstream call has a 5s timeout, the endpoint cannot be classified as `FAST`.
* **Why:** A single slow WhatsApp API call with no timeout can hold a Node.js async thread for 60+ seconds. Under load, 50 concurrent requests to the same slow endpoint will queue 50 threads, exhausting the connection pool and making the entire application unresponsive — not just the WhatsApp feature. Explicit timeouts are the difference between a degraded feature and a full application outage.

---

## 98. Structured Validation Error Response Shape (The `400` Contract)
* **The Rule:** Rule 3 mandates DTO validation, and Rule 28 mandates a standard response envelope. But neither defines what the response looks like when validation fails. Every AI agent will produce a different `400 Bad Request` shape — some return `{ message: "validation failed" }`, some return `{ errors: ["email must be an email"] }`, some return NestJS's raw default `{ statusCode: 400, message: [...], error: "Bad Request" }`. The frontend's inline field error display (Frontend Rule 15B) requires a **predictable, field-keyed error shape**.
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
* **Frontend Contract:** The frontend's React Hook Form + Zod integration (Frontend Rule 15B) must handle this shape by iterating `validationErrors` and calling `form.setError(item.field, { message: item.message })` for each entry. This maps backend validation errors directly to inline field errors without any custom parsing logic per-form.
* **Why:** Without this rule, every module's validation errors look different. The frontend team ends up writing custom error-parsing logic for every form, and AI agents on the frontend generate brittle one-off parsers. One canonical shape means one shared `handleValidationErrors(form, res)` utility handles every form in the entire application.

---

## 99. Immutable Service Layer (No Direct Entity Mutation Outside Repository)
* **The Rule:** Rule 89 separates ORM entities from domain objects. This rule enforces the complementary constraint: **service methods must never directly mutate ORM entity properties and call `save()` themselves**. All entity persistence — including updates — must go through the repository's explicitly defined methods. A service that reaches into an entity and mutates its fields bypasses audit hooks, soft-delete scopes, base entity `updatedAt` logic, and any future middleware attached to the repository layer.
* **The Forbidden Pattern:**
  ```typescript
  // ❌ BAD — Service directly mutates entity and calls save()
  async suspendMember(id: string): Promise<MemberDomainModel> {
    const member = await this.memberRepo.findByIdOrThrow(id);
    member.status = MemberStatus.SUSPENDED;   // Direct mutation
    member.suspendedAt = new Date();           // Direct mutation
    return this.memberRepo.save(member);       // Bypasses all repository hooks
  }
  ```
* **The Required Pattern — Repository owns all mutations:**
  ```typescript
  // ✅ GOOD — Repository exposes a named, intention-revealing method
  // In member.repository.ts:
  async suspendById(id: string, suspendedAt: Date): Promise<MemberDomainModel> {
    // All mutation logic, audit hooks, and constraint checks live here
    const entity = await this.repo.save({ id, status: MemberStatus.SUSPENDED, suspendedAt });
    return this.mapper.toDomain(entity);
  }

  // In member-suspension.service.ts:
  async suspendMember(id: string): Promise<MemberDomainModel> {
    await this.memberRepo.findByIdOrThrow(id); // Existence check
    return this.memberRepo.suspendById(id, new Date()); // Repository owns the mutation
  }
  ```
* **Rules:**
  - Services may call `findByIdOrThrow()` to assert existence and read current state.
  - Services may call named repository mutation methods (e.g., `suspendById`, `updateEmail`, `markAsDeleted`).
  - Services must NEVER call the generic `repo.save(entity)` directly after mutating entity properties inline.
  - The generic `save()` method on the repository is `protected` or `private` — only callable from within the repository class itself.
  - Every repository mutation method must have its own JSDoc (Rule 80) and be listed in the module's `_backend_feature.md` File Responsibility Map (Rule 19).
* **The `partial update` exception:** For simple field updates, the repository may expose a generic `updateById(id: string, updateInput: MemberUpdateInput): Promise<MemberDomainModel>` that internally maps the application-layer input to the ORM and calls `repo.update(id, entityUpdate)`. The repository must never accept HTTP DTOs like `UpdateMemberDto` directly, ensuring the domain layer remains decoupled from the API layer.
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

* **Implementation (Prisma-equivalent naming in `schema.prisma`):**
  ```prisma
  model Member {
    id       String @id @default(uuid()) @map("id") // PK_members
    email    String @map("email")
                   // @@unique(["email"], name: "UQ_members_email")
    branchId String @map("branch_id")
                   // FK: FK_members_branches_branch_id
    status   MemberStatus @default(PENDING) @map("status")
                   // IDX: IDX_members_status
    balance  BigInt @default(0) @map("balance")
                   // CHK: CHK_wallets_balance_non_negative (enforced via DB migration check)
    branch   Branch @relation(fields: [branchId], references: [id],
                              map: "FK_members_branches_branch_id")

    @@unique([email], name: "UQ_members_email")
    @@index([status], name: "IDX_members_status")
    @@index([branchId, status], name: "IDX_members_branch_id_status")
    @@map("members")
  }
  ```
* **Rules:**
  - All constraint names MUST be explicitly declared in the entity definition — never rely on ORM auto-generated names.
  - Constraint names must be unique across the entire database — prefix with the table name to guarantee this.
  - When a constraint is dropped and recreated in a migration (e.g., adding a column to a composite unique constraint), the migration MUST reference the constraint by its exact name. Auto-generated names make this impossible.
  - Check constraints for business invariants (e.g., `balance >= 0`, `age >= 18`) are MANDATORY for all financial and safety-critical columns. Application-level validation (Rule 3) is the first line of defense; DB check constraints are the last.
  - All constraint names must be added to the module's `_backend_feature.md` under the "Data and State Architecture" section so future AI agents know what constraints exist before writing migration files.
* **Why:** When a production `INSERT` fails with `ERROR: duplicate key value violates unique constraint "UQ_3f4a8b2c1d"`, the on-call engineer has no idea which table or column caused it without running a separate DB query. With `UQ_members_email`, the error message is self-documenting. More critically, when an AI writes a migration to drop and recreate a constraint, it must reference the constraint by name — if the name is auto-generated and unknown, the AI will hallucinate a name, causing the migration to fail in production.

---

## Updated Summary Checklist (v5 — Final):
1. Identify the exact layer (Validation? Query? Business Logic? External Adapter? Permission Guard? Mapper?).
2. Select the **one or two** micro-files associated with that layer.
3. Check the module's `_backend_feature.md` for context before giving the AI any files.
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
   - Are all status/type/role entity columns using TypeScript enums with `@IsEnum()` DTO validation — never raw `string` columns? (Rule 95)
   - Is every new scheduled job registered in `src/core/scheduled-jobs.registry.ts` with all mandatory fields? (Rule 96)
   - Do all outbound HTTP calls and DB queries have explicit timeouts from `TIMEOUT_CONFIG`? (Rule 97)
   - Does the global `ValidationExceptionFilter` transform `400` errors into the canonical `validationErrors` shape? (Rule 98)
   - Do service methods call named repository mutation methods — never directly mutating entity properties and calling `save()` inline? (Rule 99)
   - Are all DB constraints (FK, UQ, IDX, CHK) explicitly named following the `FK_[table]_[ref]_[col]` convention — never auto-generated? (Rule 100)
   - Do all AI-generated tests verify real observable behavior — no placeholder assertions, no tests that would pass if the feature were broken? (Rule 101)
   - Are there any barrel file imports or relative path imports?
   - Does every new method follow the verb naming convention with `OrThrow` where needed? (Rule 86)
   - Is every new method ≤ 20 lines using Guard Clauses? (Rule 85/87)
   - Does every new file have `// RESPONSIBILITY:` + `// FLOW:` + JSDoc on every method? (Rules 76/79/80)
   - Is a Mapper used to translate between ORM entities and domain objects? (Rule 89)
   - For mutation endpoints: is an `Idempotency-Key` header supported to prevent double-execution? (Rule 31)
   - For background job queues: is a Dead Letter Queue configured for all retry-exhausted jobs? (Rule 61)
   - If the change touches `auth/`, `billing/`, `webhooks/`, or `tenant-provisioning/`, has a human reviewed it? (Rule 93)
6. Run automated CI gates: SAST, SCA, secrets scan, `tsc --noEmit`. (Rule 90)
7. Run `pytest` against the live API to confirm contract compliance.
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
- **Rule:** A mismatch between import case (e.g., `trainer_url_config`) and file case (e.g., `Trainer_url_config.ts`) will cause the build to fail in CI/CD.
- **Enforcement:** Always double-check that the casing of module prefixes and filenames in imports matches exactly. If you rename a file, ensure the git index catches the case change (e.g., using git mv).


## 102. Database Table Naming & Prefixing in Monoliths
* **The Rule:** When multiple sub-domains (e.g. Admin, Superadmin, Auth) share a single monolithic database, all non-shared database tables MUST be explicitly prefixed with their domain name inside the Entity decorator (e.g., `@Entity('admin_campaigns')`, `@Entity('superadmin_saas_invoices')`).
* **Implementation:** Always use **Explicit Hardcoding** (Option 1) in the `@Entity()` decorator rather than relying on a custom TypeORM Naming Strategy.
* **Why:** A global Naming Strategy blindly prefixes all tables based on folder structure. This breaks **shared tables** (like `tenants` or `audit_logs`) by splitting them into multiple disconnected tables (`admin_tenants`, `superadmin_tenants`, etc.). Explicit hardcoding ensures shared tables remain central (`core_tenants` or `tenants`) while module-specific tables remain safely isolated and clearly identifiable in code.

## Rule 112 — Strict Mutational Idempotency (The `@RequireIdempotencyKey` Rule)

All state-mutating endpoints (`POST`, `PATCH`, `PUT`, `DELETE`) across the entire backend architecture MUST enforce strict idempotency by applying the `@RequireIdempotencyKey()` decorator to the controller method. 
This is a non-negotiable enterprise requirement designed to prevent duplicate payments, duplicate record creation, and partial transaction failures from network retries.

- The `@RequireIdempotencyKey()` decorator automatically intercepts the request, checks for the `Idempotency-Key` HTTP header, and rejects requests that omit it with a `400 Bad Request`.
- Idempotency must be enforced at the Command Controller level (e.g. `[module]-command.controller.ts`), never buried inside the service layer.
- `GET` endpoints must NEVER require an idempotency key, as they are natively safe and read-only.

## Rule 113 — WebSockets & Real-Time Communication
* **The Rule:** Any real-time push functionality (like live messaging, active session counts, or live notifications) MUST be implemented using a horizontally scalable WebSocket architecture. 
* **Implementation:** Use a Redis Pub/Sub adapter (e.g., `@nestjs/platform-ws` or `socket.io` with `redis-adapter`) to ensure that WebSocket events scale across multiple backend instances.
* **Payload Strictness:** WebSocket emitted events and payloads MUST follow a strict shape similar to the `ApiResponse<T>` envelope, avoiding arbitrary, untyped object broadcasts.

## Rule 114 — Role-Based Data Serialization & Field Masking
* **The Rule:** Data intended to be hidden from specific user roles (e.g., hiding internal revenue metrics from a basic Member, but showing it to a Superadmin) MUST be masked at the serialization layer.
* **Implementation:** Use `class-transformer` decorators such as `@Exclude()` or `@Expose({ groups: ['admin'] })` on the DTO. The controller must pass the current user's role to the serialization interceptor so that the DTO automatically strips forbidden fields before sending the JSON response.
* **Why:** This ensures data hiding is centralized and declarative, preventing developers from manually trying to `delete user.revenue` in various service methods, which is error-prone.

## Rule 115 — Strict Cache Invalidation Strategy
* **The Rule:** Caching data in Redis (Rule 20) is mandatory for high-traffic read operations, but stale data in an enterprise app is dangerous. Every cached query MUST have a strict, programmatic invalidation strategy.
* **Implementation:** All cached queries must use explicit, deterministic Cache Keys (e.g., `member:{id}:profile`). Any mutation method in the repository MUST explicitly invalidate the corresponding cache keys immediately after the database transaction commits. Do not rely solely on time-to-live (TTL).

## Rule 116 — Internationalization (i18n) & Localization

### Strategy: Module-Co-located Locales + AI-Generated Translations (Zero External Cost)

The backend uses `nestjs-i18n` with **co-located locale files inside each NestJS module folder** — NOT in a central `src/i18n/` directory. This preserves **Extreme Isolation**: each module owns its own strings and can be moved, deleted, or versioned independently.

**Translations are written by the AI agent at the time it writes the module code.** No external API is needed. The AI already has full context of the Gym Management domain, making translations accurate and idiomatic.

### Stack
- **Library:** `nestjs-i18n`
- **Base language:** English (`en.json`) — written by developer / AI agent
- **Other languages:** Written by the AI agent in the same commit that creates the module
- **Runtime cost:** Zero — all files are static JSON, bundled with the app

### Module-Level File Structure
Each module owns its own `_locales/` folder:
```
src/
  modules/
    admin/
      members/
        _locales/
          en/
            errors.json   ← AI writes this when creating the module
            messages.json
          nl/
            errors.json   ← AI translates this in the same commit
            messages.json
          fr/
            errors.json
            messages.json
        members.controller.ts
        members.service.ts
    superadmin/
      tenants/
        _locales/
          en/
            errors.json
          nl/
            errors.json
scripts/
  merge-locales.ts        ← Merges all module _locales into one bundle at build time
```

### AI Agent Translation Rule
When an AI agent writes a new module or adds new error/message keys, it MUST:
1. Create `_locales/en/errors.json` with the English strings.
2. In the **same commit**, create `_locales/nl/errors.json`, `_locales/fr/errors.json`, etc. for all configured target languages, using its own translation capability.
3. Translations must be **contextually correct** for a Gym Management SaaS — not literal word-for-word.

```json
// _locales/en/errors.json
{
  "ERRORS": {
    "MEMBER_NOT_FOUND": "Member not found.",
    "PLAN_EXPIRED": "Your gym subscription has expired."
  }
}

// _locales/nl/errors.json  ← AI writes this, context-aware
{
  "ERRORS": {
    "MEMBER_NOT_FOUND": "Lid niet gevonden.",
    "PLAN_EXPIRED": "Uw gymabonnement is verlopen."
  }
}
```

### Throwing Errors (Correct Pattern)
Always throw with a module-scoped translation key — never a hardcoded English string:
```typescript
// ❌ FORBIDDEN
throw new NotFoundException('Member not found.');

// ✅ CORRECT — key maps to _locales/{lang}/errors.json
throw new NotFoundException({ key: 'members.ERRORS.MEMBER_NOT_FOUND' });
```

### The Interceptor
The global `I18nValidationExceptionFilter` (from `nestjs-i18n`) automatically reads the `Accept-Language` header from the request and resolves the namespaced key to the correct translated string before sending the `ApiResponse<T>` to the client.

### `scripts/merge-locales.ts` (Build-Time Merge Script)
This script walks every `_locales/` folder in the project, merges all JSON files by language, and outputs a single bundle per language. Run it as part of the build step.

```typescript
// scripts/merge-locales.ts
// Usage: npx ts-node scripts/merge-locales.ts
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

const OUTPUT_DIR = 'dist/i18n';
const mergedByLang: Record<string, Record<string, any>> = {};

const localeFiles = glob.sync('src/modules/**/_locales/**/*.json');

for (const file of localeFiles) {
  const parts = file.split(path.sep);
  const localesIdx = parts.indexOf('_locales');
  const lang = parts[localesIdx + 1];           // 'en', 'nl', etc.
  const namespace = parts[localesIdx - 1];      // module name as namespace
  const content = JSON.parse(fs.readFileSync(file, 'utf-8'));

  mergedByLang[lang] ??= {};
  mergedByLang[lang][namespace] = { ...mergedByLang[lang][namespace], ...content };
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
for (const [lang, data] of Object.entries(mergedByLang)) {
  fs.writeFileSync(`${OUTPUT_DIR}/${lang}.json`, JSON.stringify(data, null, 2));
  console.log(`✅ Merged ${lang}.json`);
}
```

Add to `package.json`:
```json
{
  "scripts": {
    "i18n:merge": "npx ts-node scripts/merge-locales.ts",
    "build": "npm run i18n:merge && nest build"
  }
}
```

### Developer Workflow
1. AI agent writes a new module and creates `_locales/en/` JSON files.
2. AI agent, in the **same response**, creates all target-language `_locales/{lang}/` files using its own translation capability.
3. Run `npm run i18n:merge` (or let CI do it automatically at build time).
4. Commit all `_locales/` files alongside the module code.
5. **Never** put locale files in a central `src/i18n/` folder — that breaks module isolation.

### Configured Target Languages
This is the **authoritative list of languages** this project supports. There is no central config file — this instruction document IS the config. When an AI agent creates any new module, it MUST generate `_locales/` files for every language in this list.

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

> **Phased Rollout:** Do not ship all languages at launch. Start with `en` + `hi` (covers ~40% of India). Add `nl`, `fr`, `de` for European markets. Add remaining Indian regional languages as the product expands into those regions. Update this table when a new language is officially launched.

> **Indian Script Note:** Devanagari, Tamil, Telugu, Kannada, Bengali, Gujarati, Malayalam, and Gurmukhi are complex scripts. Ensure the server sends correct UTF-8 encoded strings. `nestjs-i18n` handles this natively — no extra configuration needed.

> **AI AGENT NOTE:** When creating any new NestJS module, you MUST create its `_locales/en/errors.json` AND all configured target-language files (e.g., `_locales/nl/errors.json`) in the same commit. Use your own translation capability — do NOT call any external translation API. Keys must be namespaced by module name (e.g., `members.ERRORS.NOT_FOUND`). Hardcoding English strings in exceptions is a critical violation.

## Rule 117 — Centralized Feature Flags
* **The Rule:** Toggling business logic branches based on environment variables (e.g., `if (process.env.ENABLE_NEW_BILLING)`) is strictly forbidden.
* **Implementation:** Always use a centralized `FeatureFlagService` (backed by the master database or an external provider like LaunchDarkly). Feature flags must be evaluated dynamically per-tenant, allowing gradual rollouts, canary deployments, and per-gym toggles without requiring a server restart.


## Rule 118 — Multi-Currency Monetary Amounts

### The Problem
Storing monetary amounts as floats (e.g., `99.99`) causes rounding errors in financial calculations. Hardcoding currency symbols (₹, $, €) breaks international deployments. Formatting amounts in service methods couples business logic to presentation.

### Storage Contract (Backend is Source of Truth)
- **Always store monetary amounts as integers in the smallest currency unit.**
  - INR: store `9999` for ₹99.99 (paise)
  - USD/EUR: store `9999` for $99.99 (cents)
  - JPY: store `100` for ¥100 (yen has no subunit)
- Use `INT` or `BIGINT` column type in TypeORM. Never use `DECIMAL` or `FLOAT` for money.
- Every monetary response field MUST be accompanied by its `currency` code (ISO 4217):

``````typescript
// ❌ FORBIDDEN — float and no currency
{ "amount": 99.99 }

// ✅ CORRECT — integer smallest unit + ISO 4217 currency code
{ "amount": 9999, "currency": "INR" }
``````

### DTO Rule
Every DTO that includes a monetary field MUST include the paired currency code:
``````typescript
export class CreatePlanDto {
  @IsInt()
  @Min(0)
  price: number; // in smallest unit (paise, cents, etc.)

  @IsString()
  @IsISO4217CurrencyCode()
  currency: string; // e.g. 'INR', 'USD', 'EUR'
}
``````

### Never Hardcode Currency Symbols
``````typescript
// ❌ FORBIDDEN
return `₹${amount / 100}`;

// ✅ CORRECT — pass raw integer + currency code to frontend; let frontend format
return { amount, currency };
``````

> **AI AGENT NOTE:** Every monetary field in a DTO or Entity MUST be stored as an `INT` in the smallest currency unit (paise/cents). Every monetary response object MUST include a paired `currency: string` (ISO 4217 code). Never divide by 100 or format amounts on the backend — that is the frontend's responsibility using `Intl.NumberFormat`.


## Rule 119 — Tenant Data Export & Offboarding

### The Problem
When a B2B tenant (e.g., Gym, School) churns and requests their data, a synchronous API call to dump the database will timeout (HTTP 504) for large datasets. Furthermore, non-technical users cannot read raw JSON or SQL dumps.

### Implementation Strategy
All data exports MUST be processed asynchronously via background jobs and delivered as a compressed ZIP of CSV files.
- **Role Constraint:** This functionality belongs strictly to the **Superadmin** (or top-level Gym Admin) role container. Do NOT implement data export routes inside manager, frontdesk, or member modules.

1. **Data Format (Denormalized & Deeply Resolved):** Generate `.csv` files for all core entities. **CRITICAL:** Do NOT export raw database tables with isolated UUID foreign keys. Non-technical business owners cannot perform SQL JOINs. Whether it is a simple Gym or a complex School/Hospital with deep relationships (e.g., Student -> Class -> Transport Route -> Driver), you MUST use TypeORM QueryBuilder to flatten the data completely. All foreign keys MUST be resolved into human-readable reference names (e.g., `Route Name`, `Driver Name`, `Plan Name`) and included explicitly in the CSV row. Compress these CSVs into a single `.zip` file.
2. **Trigger:** `POST /api/v1/admin/export-data` MUST respond immediately with `202 Accepted` and enqueue a job.
3. **Background Job (Message Broker / Task Queue):** A worker processes the job (using BullMQ, Redis Pub/Sub, RabbitMQ, or any standard broker). It executes paginated queries to gather data without blowing up RAM, writes to CSV streams, and zips the files.
4. **Storage:** The worker saves the `.zip` securely to the local server disk (e.g., in a protected volume) OR uploads to a private S3 bucket if configured.
5. **Delivery:** The backend generates a secure, time-limited **download token/URL** (valid for 24-48 hours) and sends an email to the admin. If using local storage, the URL points to a protected backend route (e.g., `GET /api/v1/admin/download-export?token=xyz`) that streams the file.
6. **Real-time Notification:** Upon successful email dispatch, the backend MUST emit a WebSocket event (e.g., `export.completed`) to the Superadmin so the dashboard can reflect the "Email Sent" status.

### Data Retention & Hard Deletion
- When a tenant cancels, their account is **Soft Deleted** (suspended).
- Maintain a **90-day grace period** in case they return.
- A scheduled cron job MUST permanently hard-delete all tenant data (including generated `.zip` files on disk/S3) after 90 days to comply with GDPR Right to Erasure / Data Portability laws.

> **AI AGENT NOTE:** Never implement data export as a synchronous API. Always use a Background Job / Message Broker, stream data to CSV, save to secure local disk or S3, email a time-limited download link, and emit a WebSocket completion event. Raw JSON/SQL dumps are forbidden for tenant exports.


## Rule 120 — Persistent WebSockets (Notifications & Chats)

### The Problem
WebSockets are "fire-and-forget". If the backend emits an event (`socket.emit('notification')` or `socket.emit('chat_message')`) while the user is offline or experiencing a network blip, that message is lost forever.

### The Rule
Never emit a critical WebSocket event (like "Export Ready", "Payment Received", or a "Chat Message") without **first saving it to the database**.

1. **Save First:** Insert a record into the `Notifications` or `Chats` table.
2. **Emit Second:** Only after the DB transaction commits, emit the WebSocket event.
3. **Recovery:** This ensures that if the user is online, they get the live WebSocket blast. If they are offline, they will see the message when they open the app and the frontend fetches historical data via REST (`GET /api/notifications` or `GET /api/chats`).
4. **Soft Delete Mandatory:** All notifications and chat messages MUST use **Soft Deletion** (e.g., `deleted_at: timestamp` or `is_deleted: true`). Never hard-delete chat histories or notifications, as they are crucial for audits, tenant data exports, and dispute resolutions.

## Rule 121 — Complete Isolation for E2E and Selenium Testing

### The Philosophy
The "Extreme Isolation" and "WET over DRY" principles apply just as strictly to E2E (pytest/Playwright/Cypress) and Selenium testing suites as they do to the backend source code. 

### Implementation Constraints

1. **Strict Namespace Prefixing:** All test directories must be explicitly prefixed by domain and testing type.
   - ❌ **BAD:** `e2e/admin/` or `selenium/members/`
   - ✅ **GOOD:** `backend_e2e/backend_admin_e2e/` and `backend_selenium/backend_superadmin_selenium/`

2. **WET Over DRY (No Global Shared Utilities):** Never create a global `shared/`, `utils/`, or `common/` folder for E2E or Selenium tests. If both `backend_admin_e2e` and `backend_manager_e2e` need a "login and get auth token" helper script, you MUST duplicate the script into both directories.
   - ❌ **BAD:** `backend_e2e/shared/auth_helper.py`
   - ✅ **GOOD:** `backend_e2e/backend_admin_e2e/helpers/auth_helper.py` AND `backend_e2e/backend_manager_e2e/helpers/auth_helper.py`

3. **No Cross-Domain Imports:** A test script in `backend_manager_selenium` MUST NOT import a fixture, constant, or helper from `backend_admin_selenium`. If tests span multiple roles, they must be orchestrated at a higher CI pipeline level, not through tightly coupled Python/TS test imports.

4. **Test-Specific Forbidden Patterns (`_test_forbidden.md`):** Every top-level testing domain (e.g., `backend_admin_e2e`) MUST contain a `_test_forbidden.md` file documenting exactly what external dependencies are forbidden, what databases it is NOT allowed to mock directly, and the consequences of violating these boundaries.

5. **Self-Contained Artifacts:** Any mock data (JSON fixtures, mock images, test PDFs) required by Selenium or E2E tests must be stored inside the specific feature's test folder. Do not use a global `tests_data/` folder at the root.

6. **True Test Database (No Database Mocking):** E2E tests MUST be executed against a completely isolated, dedicated `test` database instance. E2E tests must trigger real network requests, hit real controllers, and execute real SQL/ORM queries. Mucking or stubbing the database in E2E tests is strictly forbidden. 

7. **Anti-False-Passing (No "Always-Pass" Dummy Code):** AI agents MUST NOT generate trivial, superficial tests (e.g., `assert True` or just checking if a route returns 200 without inspecting the payload or database side effects) simply to appease test coverage or impress the user. A test is ONLY valid if it asserts the true business logic, validates exact payload shapes, and verifies database state changes. If the test would still pass after the actual business logic is deliberately broken, the test is invalid and will be rejected.

8. **Selenium Backup Locators (Resiliency Rule):** Every Selenium or UI interaction MUST define and utilize **backup locators**. The UI changes frequently, and tests shouldn't crash because a single class name changed.
   - ❌ **BAD:** Hardcoding a single brittle locator: `driver.find_element(By.ID, "submit-btn")`
   - ✅ **GOOD:** Writing robust selector logic that attempts a primary locator (e.g., `data-testid`), and if that fails, gracefully falls back to a secondary locator (e.g., specific CSS class, XPath, or ARIA label). The AI must ensure that if the primary locator fails, the backup locator works to complete the action.

**Why:** E2E and Selenium tests frequently become a tangled, brittle web of shared fixtures and helpers. If an AI agent modifies a shared authentication helper to fix a broken Manager test, it risks silently breaking the entire Admin E2E suite. Complete isolation ensures that test fixes remain highly localized and AI context is minimized. Tests must be real and resilient, not just "green" checkboxes.

## Rule 122 — No AI Runtime Verification Requirement
* **The Rule:** AI agents are NOT required to execute code, run servers, or perform runtime verification to validate their changes, as they often lack the necessary local environment variables, database connections, or API keys.
* **The Expectation:** Instead of failing or complaining about missing environments, the AI MUST rely on its deep knowledge of the framework, TypeScript, and these architectural guidelines to write syntactically and logically correct code. The AI should aim to write code that is "correct by construction" so that when the human developer runs it locally, it works with zero or minimal issues. Do not attempt to spin up local servers or run `npm run start` if the environment is incomplete.

## Rule 123 — Dashboard & UI Data APIs (Avoid "Mega APIs")
* **The Rule:** Never create a single "Mega API" endpoint that fetches an entire dashboard's worth of data (e.g., all KPIs, all charts, and all recent table lists) in one massive response payload. You MUST fragment complex dashboards into **widget-based / feature-sliced APIs** (e.g., `/dashboard/kpis`, `/dashboard/charts`, `/dashboard/recent-members`).
* **Why:**
  1. **Fault Isolation (Debugging):** If the database query for the revenue chart fails, it should not crash the entire dashboard. The user should still see their KPIs and Tables, with only the chart showing an error state. Mega APIs make identifying the failing query extremely difficult.
  2. **Progressive Rendering:** The frontend should be able to render fast data (KPIs) instantly while displaying skeleton loaders for slower data (complex aggregations/charts). A Mega API forces the frontend to wait for the *slowest* query before rendering *anything*.
  3. **Caching & Scalability:** Widget-based APIs allow you to cache heavy/slow queries (like charts) in Redis for 1 hour, while keeping fast queries (like today's attendance) strictly real-time. Mega APIs force an all-or-nothing caching strategy which does not scale for Enterprise apps.
