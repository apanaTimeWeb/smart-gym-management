# Enterprise-Grade, AI-Friendly Backend Architecture Guidelines

## The Core Philosophy
This document outlines the strict architectural rules for building the backend (whether using NestJS, Django, Express, Spring Boot, etc.). The primary goal is **Extreme Isolation**. 

Currently, human developers act as orchestrators, while AI (LLMs) writes the code. Because of this, the architecture must be designed to accommodate the AI's constraints (context limits, hallucination risks) and strengths (laser-focused problem solving).

Tomorrow, if you ask an AI to fix a specific bug in "Payment Processing", you should only need to provide ONE exact file to the AI, completely eliminating the risk of the AI hallucinating and breaking the "User Registration" flow. 

**Rule of Thumb:** If an AI needs more than 3 files to fix a bug or add a minor feature, your files are too tightly coupled or too monolithic.

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

## 2. Highly Descriptive, AI-Contextual Filenames
Rename all controllers, services, and models to be extremely descriptive based on exactly what they do.
When you tag a file for AI context (e.g., `@[Filename]`), the AI should instantly know what the file does just by its name.
- ❌ **BAD:** `auth.py`, `utils.js`, `helpers.ts`
- ✅ **GOOD:** `jwt-token-generator.utils.ts`, `stripe-payment-webhook.controller.ts`, `member-registration-validator.py`

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
* **The Rule:** If the backend is built using a JavaScript/TypeScript framework (NestJS, Express), you MUST use **TypeORM**. For other languages/frameworks (like Django), use the framework's native/standard ORM.
- **Why?** If the dashboard stats are calculating incorrectly, it's a database query issue. You provide the AI the `repository` file, not the `service` file.

---

## 8. Handling Edge Cases & Complex Scenarios

### Edge Case A: Cross-Module Dependencies (Tight Coupling)
*Scenario:* The `MemberRegistrationService` needs to trigger the `FinanceService` to generate an invoice, and the `EmailService` to send a welcome email. If they are tightly coupled, the AI will need all three files to understand the flow.
*Solution:* **Event-Driven Architecture (Pub/Sub).**
The `MemberRegistrationService` should only save the user and emit an event: `EventBus.emit('MEMBER_REGISTERED', user)`. The Finance and Email modules listen to this event independently. Now, the modules are 100% decoupled.

### Edge Case B: Database Transactions (All-or-Nothing Operations)
*Scenario:* You split your logic into `BillingService` and `MembershipService`. But creating a member and charging their card MUST happen in the same database transaction.
*Solution:* **Orchestrator Pattern.** 
Create a higher-level "Facade" or "Orchestrator" whose ONLY job is to open a transaction, call the micro-services passing the transaction object (`tx`), and commit/rollback. The micro-services themselves should remain pure and unaware of transaction boundaries.

### Edge Case C: Shared Utility Bloat (The "No Common Folder" Rule)
*Scenario:* Developers dump code into a global `utils/`, `common/`, or `shared/` folder to adhere to the DRY (Don't Repeat Yourself) principle. 
*Solution:* **WET over DRY for AI (Write Everything Twice).**
Strictly ban global `common/` or `shared/` folders. If a utility, enum, or type is used by the Finance module, put it in `modules/finance/utils/`. If the HR module needs the exact same utility, **duplicate the code** into `modules/hr/utils/`. 
* **Why?** In an AI-driven codebase, code repetition is entirely acceptable because AI writes the code. If we use a global `common/` folder, an AI might modify a shared function to fix a bug in HR, inadvertently breaking the Finance module. Complete module isolation guarantees 0% cross-module side effects.

### Edge Case D: External Service Adapters (Anti-Corruption Layer)
*Scenario:* When your backend talks to the outside world (Stripe, AWS S3, SendGrid), never put the `axios.post()` or SDK calls directly inside your business logic.
*Solution:* **Create an isolated wrapper or "Adapter"** for third-party tools (e.g., `stripe-payment.adapter.ts`). Your core service should only call generic methods like `paymentAdapter.charge()`.
* **Why?** If Stripe changes their API version, you only give the AI the `stripe-payment.adapter.ts` file. The AI fixes the API call without ever seeing (or risking breaking) your internal checkout logic.

## 9. Avoid Hardcoded HTTP Status Codes
Never hardcode HTTP status code numbers (e.g., `200`, `400`, `500`) in controllers, exceptions, or responses. 
* **The Rule:** Always use a framework-provided enum or a status code library (e.g., `HttpStatus` in NestJS, `http-status-codes` in Node, `rest_framework.status` in Django).
* **Why?** It improves readability, prevents magic numbers, and reduces the risk of typos (e.g., typing `401` when you meant `403`).

## 10. Dynamic / Absolute Imports (No Hardcoded Relative Paths)
*(Applicable to JavaScript/TypeScript Frameworks)*
Never use fragile, hardcoded relative imports (e.g., `../../../utils/helpers`). 
* **The Rule:** Configure the backend framework to use absolute path aliases (e.g., mapping `@/` to the `src/` directory). Always use dynamic imports with `@/` (or your configured alias) instead of traversing directories up and down with `../..`.
* **Why?** It prevents import paths from breaking when files are refactored, moved, or copy-pasted, drastically improving the ability for AI to generate drop-in code without path hallucinations.

---

## How to Apply This to Different Frameworks

### In NestJS (TypeScript)
- Break down monolithic `@Injectable()` classes.
- Use `CQRS` (Command Query Responsibility Segregation) or just separate `xxx.service.ts` files.
- Put DTOs in a `dtos/` folder.
- Keep `@Controller()` classes incredibly thin; they should only receive the request and immediately pass it to a micro-service.

### In Django (Python)
- Avoid massive `views.py`. Create a `views/` folder and split class-based views into individual files (e.g., `member_registration_view.py`).
- Avoid "fat models". Move complex business logic from `models.py` into a `services/` directory.
- Keep `serializers.py` strictly for validation and data formatting.

### In Express.js (Node.js)
- Avoid putting logic inside route definitions.
- `routes/` should only map URLs to Controllers.
- `controllers/` handle HTTP (req, res).
- `services/` handle the heavy lifting and should be highly split up (e.g., `paymentService.js`, `refundService.js`).

## 11. Co-located Testing (Unit & E2E - Extreme Isolation)
Never put tests in a global `tests/` or `pytest_tests/` directory separate from the application code. 
* **The Rule:** Both Unit and End-to-End (E2E) tests must live directly inside the module they are testing. Create a `tests/` folder inside the module (e.g., `modules/auth/tests/` or `modules/auth/auth_test/`), or keep `.spec.ts` / `test_*.py` files adjacent to the micro-feature they test.
* **Why?** When an AI is asked to add a feature or fix a bug, providing the corresponding test file in the exact same directory ensures the AI has complete context of the feature's requirements. Running these E2E tests locally proves the AI has written great, working code before the developer even needs to review it manually.


## 12. Strict API Documentation (Swagger/OpenAPI)
* **The Rule:** Every endpoint MUST be documented using the framework's native OpenAPI/Swagger tools (e.g., `@ApiTags` and `@ApiResponse` in NestJS, `drf-spectacular` in Django, or `swagger-jsdoc` in Express).
* **Why:** AI relies heavily on interface contracts. Keeping them mandatory and co-located with the controllers ensures frontend developers (and AI frontend agents) always have a mathematically accurate, up-to-date API contract to work with.

## 13. Environment & Configuration Management
* **The Rule:** Never use raw environment variables (e.g., `process.env.XXX` or `os.environ.get()`) directly inside business logic. Always use a centralized, strongly-typed Config Service or Settings class (e.g., `@nestjs/config` in NestJS, `settings.py` with `django-environ` in Django).
* **Why:** If the AI needs to add a new third-party API key or change a timeout value, it should only modify the central configuration schema, not hunt for raw env calls scattered across 50 different micro-services.

## 14. Standardized Logging & Correlation IDs (Pino & OpenTelemetry)
* **The Rule:** Never use raw print statements (e.g., `console.log()` or `print()`). Always use a structured, high-performance JSON logger (e.g., `nestjs-pino` / `pino` or winston or in django we have other or other as per backend choicee). 
* **The Log Structure:** Every log entry must automatically attach the current execution context. A standard log output must include:
  - `req` and `res` objects (for HTTP request tracking)
  - `trace_id` and `span_id` (injected via OpenTelemetry/AsyncLocalStorage)
  - `context` (e.g., the exact class or service name emitting the log)
  - `responseTime` (for access logs)
* **Why:** When logs are pushed to an aggregator like Datadog, ELK, or CloudWatch, developers can simply search for `trace_id="b8174fe8b671..."` to instantly pull up the exact journey of a request across 15 different micro-files. Standardized loggers also allow global turning on/off of debug statements and eliminate the need for manual ID passing.

## 15. Dependency Injection & Inversion of Control
* **The Rule:** Avoid instantiating complex service classes directly using `new MyService()` or `MyService()`. Rely on the framework's Dependency Injection system if it has one (NestJS, Spring Boot), or construct dependencies at the highest possible level (module/route boundaries) and pass them in.
* **Why:** AI might take shortcuts and manually instantiate classes inside business logic, creating tight coupling. Enforcing Dependency Injection ensures that tests can easily mock out databases, external APIs, and child services.

## 16. Module-Specific API Collections (Postman/Insomnia)
* **The Rule:** Whenever a module is created or finalized, generate a `[module-name]_collection.json` file directly inside the module's folder (e.g., `modules/auth/auth_collection.json`). 
* **Why:** This ensures that any developer (or human QA) can instantly import this JSON into Postman and manually test the module's endpoints without having to manually construct the headers, payloads, or figure out the routes. It provides immediate, highly-accessible testing verification.

## 17. Standardized Pagination, Sorting & Filtering (Enterprise Scale)
* **The Rule:** Any endpoint that returns tabular or list data (e.g., Orders, Members) MUST ALWAYS support pagination, sorting (e.g., `sortOrder=ASC/DESC`), and filtering (e.g., `startDate`, `endDate`, `search`). Never return raw, unpaginated lists if the dataset can grow large.
* **Implementation:** Always use a standardized wrapper or query DTO (e.g., `limit/offset` based pagination extended with filtering/sorting properties) across all controllers.
* **Why:** Returning thousands of unfiltered rows crashes browsers. If the AI is asked to add an endpoint for `MemberAnalytics` or `Orders`, it must proactively build in sorting and date filtering capabilities so the frontend can display robust table controls.

## 18. Strict ES Modules (No `require`)
*(Applicable to JavaScript/TypeScript Frameworks)*
* **The Rule:** Never use the `require()` keyword. It is considered dead/legacy in this architecture. You must exclusively use ES module `import` and `export` statements.
* **Why:** ES Modules are the modern standard, they provide strict typing compatibility out of the box in TypeScript, support better static analysis/tree-shaking, and ensure consistent import syntax across the entire codebase.

## 19. Module-Level Feature Documentation
*(Crucial for AI Context & Onboarding)*
* **The Rule:** Every single module must contain a `[module_name]_backend_feature.md` file at its root (e.g., `modules/auth/auth_backend_feature.md`). 
* **What it must contain:**
  1. A high-level explanation of what the module does.
  2. A breakdown of the folder structure and what exactly each file is responsible for.
  3. Explanations of core business logic or complex workflows within the module.
* **Why:** Before an AI or a new human developer makes any changes to a module, they will read this file first. It acts as the ultimate localized context guide, instantly explaining the routing, file responsibilities, and logic, drastically reducing the risk of hallucination or breaking existing architecture.

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

## 24. Database Migrations (No Auto-Syncing)
* **The Rule:** In development, auto-syncing tools (like TypeORM's `synchronize: true` or Hibernate's `update`) are fine. But in an enterprise environment, database schemas must be strictly version-controlled using **Migrations** (e.g., Django `makemigrations`, Flyway/Liquibase for Java, Alembic for Python). 
* **Why:** If the AI needs to add a new column to a table, it should generate a explicit migration file. This guarantees that production databases can be safely upgraded (or rolled back) without data loss or rogue schema syncing breaking the app.

## 25. Graceful Shutdown & Health Probes (Kubernetes/Docker Ready)
* **The Rule:** Enterprise apps are deployed in containers. You must include a `/health` or `/ping` endpoint for Kubernetes/AWS liveness probes. Furthermore, the application must intercept termination signals (`SIGINT`, `SIGTERM`).
* **Why:** When a server restarts or a container is killed, it shouldn't just die instantly, dropping user requests mid-flight. It must stop accepting new requests, finish processing current ones, safely close the database connection, and *then* shut down.

## 26. API Versioning (URI Based)
* **The Rule:** An enterprise API must never be released without a versioning strategy. Always prefix routes with a version (e.g., `/api/v1/users`). In frameworks like NestJS, enable URI versioning globally.
* **Why:** If the business scales and requires mobile apps or external integrations, releasing a breaking `v2` API should not crash the legacy mobile apps that still rely on `v1`.

## 27. API Testing Strategy (Strictly Pytest)
* **The Rule:** ALL API testing (End-to-End / Black-box) MUST be written in Python using `pytest`. Even if the backend is written in Node.js/NestJS, you must NOT use Supertest or Jest for API testing. (Jest is strictly reserved for internal unit tests only).
* **Why:** Decoupling API tests from the application codebase allows QA engineers, SDETs, and automation pipelines to test the API completely agnostically, simulating true black-box client behavior without being tied to the Node.js runtime.

## Summary Checklist for Developers Providing Context to AI:
1. Identify the exact layer where the bug/feature resides (Validation? DB Query? Business Logic?).
2. Select the **one or two** micro-files associated with that layer.
3. Pass ONLY those files to the AI.
4. Review the AI's isolated changes.

---

## 28. Standardized Response Envelope (The API Contract)
* **The Rule:** Every API endpoint — success or failure — must return a response in a single, predictable JSON "envelope" shape. Never return raw objects, raw arrays, or ad-hoc structures directly from controllers.
* **Recommended shape:**
  ```json
  {
    "success": true,
    "message": "Members fetched successfully",
    "data": { ... },
    "meta": { "page": 1, "total": 250, "limit": 20 }
  }
  ```
  For errors:
  ```json
  {
    "success": false,
    "message": "Member not found",
    "error": "MemberNotFoundException",
    "statusCode": 404
  }
  ```
* **Implement via:** A global `ResponseInterceptor` (NestJS), `APIView` / custom `Renderer` (Django), or a `res.success()` helper (Express). The AI should NEVER shape the raw response manually inside a controller or service.
* **Why:** When an AI frontend agent hits an API, it needs a predictable contract. A raw, inconsistent response from a delete endpoint (`null`, `"ok"`, `{ deleted: true }`) forces the frontend AI to write brittle, guessing-game parsers. A standard envelope eliminates all ambiguity.

---

## 29. Soft Deletes (Never Hard-Delete Production Data)
* **The Rule:** Never use destructive `DELETE` SQL / ORM calls directly on production data. Instead, all entities must have an `is_deleted: boolean` (or `deleted_at: timestamp`) column. A "delete" operation only sets this flag — the data is never physically removed.
* **Why:**
  1. **Audit & Recovery:** If an admin accidentally deletes 1,000 members, the data is instantly recoverable.
  2. **Referential Integrity:** Foreign keys referencing a "deleted" record remain valid, preventing cascade failures.
  3. **AI Safety:** An AI asked to "implement the delete endpoint" will set a flag, not wipe database rows. This prevents catastrophic, irreversible data loss.
* **Implementation:** Add a global query filter (e.g., TypeORM's `@DeleteDateColumn`, Django's `django-softdelete`, or a `WHERE is_deleted = false` scope in a base repository class) so that all standard `find` queries automatically exclude soft-deleted records.

---

## 30. Audit Trail / Activity Log (Who Did What & When)
* **The Rule:** Every meaningful state change to critical entities (Members, Payments, Staff, Settings) MUST be recorded in an `audit_logs` table. At minimum, log: `actor_id`, `actor_role`, `action` (e.g., `MEMBER_UPDATED`), `entity_type`, `entity_id`, `old_value` (JSON), `new_value` (JSON), `ip_address`, `timestamp`.
* **How:** Implement this as a cross-cutting concern using:
  - **NestJS/Express:** An interceptor or middleware that fires an event after mutating requests.
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
  1. **N+1 Prevention:** Always use eager loading / `JOIN` fetching when you know you'll need related data (e.g., `prefetch_related` in Django, `relations` in TypeORM, `@EntityGraph` in JPA). Never fetch a list of 100 members and then loop to fetch each one's plan separately.
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
* **Why:** Silent failures are the hardest bugs to find and the most dangerous in production. An AI writing a service method that receives a `null` user and calls `user.email` will produce a `NullPointerException` / `AttributeError` that crashes the request. The Fail-Fast principle ensures errors surface immediately at their origin, with a clear, actionable error message, not silently 10 layers later.


---

## 37. Strict Edge Payload Validation (No Mass Assignment)
* **The Rule:** It is not enough to just validate that `email` and `password` exist in a DTO. Your payload validator MUST strictly strip or reject any unrecognized properties sent by the client. (e.g., in NestJS: `whitelist: true, forbidNonWhitelisted: true`). Additionally, enforce strict JSON payload size limits globally (e.g., `1mb`).
* **Why:** If a malicious user sends `{ "email": "test@test.com", "role": "admin" }` to the registration endpoint, and you blindly pass the `req.body` to the ORM's save method, you have a Mass Assignment vulnerability. Stripping unknown keys guarantees this is mathematically impossible.

---

## 38. Domain-Driven Module Grouping (The "Route Group" Equivalent)
* **The Rule:** Just like modern frontend frameworks (e.g., Next.js) use `(group)` folders to isolate UI domains like `(erp)` or `(superadmin)`, the backend MUST group its modules into top-level domain folders before splitting them into specific features.
  - ❌ **BAD:** `src/modules/billing/`, `src/modules/superadmin-stats/`, `src/modules/attendance/` (All dumped into a flat `modules/` directory).
  - ✅ **GOOD:** `src/modules/erp/billing/`, `src/modules/superadmin/stats/`, `src/modules/members-app/attendance/`.
* **API Route Grouping:** The API endpoint URLs must strictly mirror this domain grouping (e.g., `/api/erp/billing`, `/api/superadmin/stats`). Use the framework's native router grouping feature (e.g., `RouterModule` in NestJS, `include()` in Django `urls.py`, or `express.Router().use('/erp', ...)` in Node) to enforce this prefix globally for the entire domain.
* **1:1 Mirror Mapping:** The backend folder structure MUST strictly mirror the frontend route structure. If the frontend `(superadmin)` domain has 5 feature folders (e.g., `broadcasts`, `coupons`, `affiliates`), the backend `superadmin` domain MUST have exactly 5 matching modules. 
* **Why:** This creates a perfect 1:1 mapped architecture. If a bug occurs in the "Coupons" feature, you provide the AI with exactly two things: `frontend/.../superadmin/coupons/` and `backend/.../superadmin/coupons/`. The AI gets the complete vertical slice (Frontend UI + Backend Logic) for that specific feature without seeing the rest of the application. This guarantees zero hallucination, massive token savings, and perfect separation of concerns.

---

## 39. True Multi-Tenancy (Database-per-Tenant Architecture)
* **The Rule:** The application MUST be built using a strict **Database-per-Tenant** architecture to guarantee absolute data isolation, high performance, and security. It is unacceptable to dump all gyms or whatever the project is ' data into a single database with a `tenant_id` column (row-level multi-tenancy).
* **Architecture Strategy:**
  1. **Master Database:** A central database (e.g., `gymsmart_master`) must exist solely to manage global resources: Users, Authentication, Tenants (Gyms), Subscriptions, and Feature Flags.
  2. **Tenant Databases:** Every time a new gym registers, the backend must programmatically create a brand-new database (e.g., `tenant_db_101`) and run all schema migrations on it automatically. *(Note: All these logical databases reside within the same single MySQL/PostgreSQL server instance; do not spin up new physical servers/VPS per tenant).*
  3. **Dynamic Connection Routing (Request Scoped):** The backend must intercept every incoming API request. Using a global middleware or interceptor, it must extract the `x-tenant-id` (from HTTP headers or JWT payload) and dynamically construct or switch the database connection to point to that specific tenant's database for the lifecycle of that request.
* **How to Apply to Different Frameworks:**
  - **NestJS (Node/TypeScript):** Do not use a static `TypeOrmModule.forRoot`. Use request-scoped providers or custom connection factories that cache and resolve `DataSource` instances based on the request's tenant header.
  - **Django (Python):** Use database routers (`db_for_read`, `db_for_write`) paired with thread-local storage or middleware to dynamically route queries to the correct database alias based on the request.
  - **Spring Boot (Java):** Implement `AbstractRoutingDataSource` and use a `ThreadLocal` context holder populated via a HandlerInterceptor to route database connections dynamically.
* **Why:** If Gym A and Gym B share the same database tables, a single missing `WHERE tenant_id = X` clause in a business query results in a catastrophic cross-tenant data breach. Database-per-tenant completely eliminates this risk at the infrastructure level. Furthermore, queries are infinitely faster because a table only contains the data of one specific gym, avoiding massive billion-row bottlenecks.

---

## 40. Multi-Medium Sending Architecture (Proof of Delivery)
* **The Rule:** Whenever the system needs to send something to a user as a proof of transaction (e.g., a bill, a receipt, a report, or an alert), the backend MUST architect the payload and services to support at least **two different mediums** (e.g., WhatsApp and Email, or SMS and Email).
* **Mandatory Fallback:** One of the two mediums must always be configured as the mandatory fallback or default. The backend API should accept an explicit `deliveryMedium` parameter (e.g., `WHATSAPP` or `EMAIL`) from the frontend payload and route the message via the chosen service.
* **Why:** This ensures that if one provider fails or a user doesn't have WhatsApp, they can still receive critical proofs via Email or another backup medium.

---

---

## 41. Transaction Locks & Race Condition Prevention
* **The Rule:** For highly concurrent mutations (e.g., deducting wallet balances, booking limited seats, processing inventory), standard database transactions are not enough to prevent race conditions. You MUST implement **Pessimistic Locking** (e.g., `SELECT ... FOR UPDATE` via `QueryBuilder.setLock('pessimistic_write')` in TypeORM or `select_for_update()` in Django) or **Optimistic Locking** (using a `@VersionColumn`).
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

## 49. Explicit Module Dependency Graph
* **The Rule:** Every module must have a `[module]_dependencies.md` detailing which other modules it depends on, and which modules depend on it. This maps downstream impact instantly.

## 50. Standardized Event Naming Convention
* **The Rule:** Event names MUST follow `DOMAIN.ENTITY.ACTION` in SCREAMING_SNAKE_CASE (e.g., `BILLING.PAYMENT.FAILED`) and be registered in a centralized `event-registry.constants.ts`.

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

## 58. Standardized Database Entity Base Class
* **The Rule:** All database entities MUST extend a common `BaseEntity` class that explicitly defines `id` (UUID), `createdAt` (timestamp with timezone), `updatedAt` (timestamp with timezone), and `deletedAt` (nullable timestamp for soft deletes). AI must never manually define these fields per entity.

## 59. API Response Time SLA Categories
* **The Rule:** Every endpoint must declare its SLA category in a comment (`// SLA: FAST`). FAST (< 200ms), STANDARD (< 500ms), HEAVY (> 500ms). Heavy tasks must be moved to background jobs (Rule 23). Enforce via monitoring middleware.

## 60. Strict Foreign Key Naming Convention
* **The Rule:** Database columns must use `snake_case` (e.g., `member_id`). TypeScript entity properties must use `camelCase` (e.g., `memberId`). Explicitly map them using `@Column({ name: 'member_id' })`. Foreign key constraints must follow `FK_[table]_[referenced_table]`.

## 61. Dead Letter Queue (DLQ) for Failed Background Jobs
* **The Rule:** Every background job queue (BullMQ/Celery) MUST have a configured Dead Letter Queue. If a job fails all retries, it must be moved to the DLQ (not discarded) so admins can manually inspect and retry it.

## 62. Explicit Return Types on ALL Service Methods
* **The Rule:** Relying on TypeScript implicit `any` or inferred returns is forbidden for async operations. Every service method and repository method MUST have an explicitly declared return type (e.g., `Promise<MemberEntity>`).

## 63. Database Connection Pool Configuration
* **The Rule:** Default ORM connection pools are forbidden. The `database.config.ts` must explicitly define `max` connections (e.g., 20), `acquireTimeout` (30000ms), and `idleTimeoutMillis` (10000ms) to prevent hanging requests and DB exhaustion in production.

## 64. Structured Machine-Readable Error Codes
* **The Rule:** Error responses must include a machine-readable `errorCode` string following `DOMAIN.ENTITY.REASON` (e.g., `BILLING.SUBSCRIPTION.EXPIRED`). The frontend relies on this code to trigger specific UI logic (e.g., redirecting to a payment page).

## 65. File Upload Security & Validation
* **The Rule:** All file uploads must undergo MIME type validation (not just extension checking) and enforce strict size limits. Files must never be saved directly to the server disk; upload to cloud storage (e.g., S3). Original filenames must be discarded and replaced with a UUID.

## 66. Strict Database Table Naming Convention
* **The Rule:** All table names must be `plural_snake_case` (e.g., `payment_transactions`). Junction tables must combine the two table names alphabetically (e.g., `member_plans`). Never use legacy prefixes like `tbl_`. Enforce explicitly via `@Entity('table_name')`.

## 67. API Contract Freeze Before Frontend Development
* **The Rule:** The backend developer/AI must first write the DTOs and Swagger spec. This contract must be "frozen" and approved by the frontend layer before any backend implementation code is written. This prevents data shape mismatches.

## 68. Health Check Depth Levels
* **The Rule:** Implement 3 levels of health checks: `/health/live` (Process alive? 200 OK), `/health/ready` (DB/Redis reachable? Traffic ready), and `/health/deep` (Full dependency chain check, not exposed publicly).

---

## Updated Summary Checklist (v2):
1. Identify the exact layer (Validation? Query? Business Logic? External Adapter?).
2. Select the **one or two** micro-files associated with that layer.
3. Check the module's `_backend_feature.md` for context before giving the AI any files.
4. Pass ONLY those files to the AI along with the feature doc.
5. After the AI writes code, verify: Is there N+1? Is there a missing null check? Is a secret hardcoded? Is the response wrapped in the standard envelope?
6. Run `pytest` against the live API to confirm contract compliance.
7. Review the AI's isolated changes.
