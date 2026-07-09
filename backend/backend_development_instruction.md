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

## 14. Standardized Logging & Correlation IDs
* **The Rule:** Never use raw print statements (e.g., `console.log()` or `print()`). Always use the framework's official Logger instance or a structured logging library (like Winston/Pino in Node, or `logging` in Python). In enterprise apps, ensure requests carry a trace/correlation ID.
* **Why:** When the AI is asked to "add logging" for debugging, it must use the established pattern so logs can be parsed by tools like Datadog or ELK. Standardized loggers also allow global turning on/off of debug statements.

## 15. Dependency Injection & Inversion of Control
* **The Rule:** Avoid instantiating complex service classes directly using `new MyService()` or `MyService()`. Rely on the framework's Dependency Injection system if it has one (NestJS, Spring Boot), or construct dependencies at the highest possible level (module/route boundaries) and pass them in.
* **Why:** AI might take shortcuts and manually instantiate classes inside business logic, creating tight coupling. Enforcing Dependency Injection ensures that tests can easily mock out databases, external APIs, and child services.

## 16. Module-Specific API Collections (Postman/Insomnia)
* **The Rule:** Whenever a module is created or finalized, generate a `[module-name]_collection.json` file directly inside the module's folder (e.g., `modules/auth/auth_collection.json`). 
* **Why:** This ensures that any developer (or human QA) can instantly import this JSON into Postman and manually test the module's endpoints without having to manually construct the headers, payloads, or figure out the routes. It provides immediate, highly-accessible testing verification.

## 17. Standardized Pagination & Filtering (Enterprise Scale)
* **The Rule:** Never write ad-hoc pagination for list endpoints. Always use a standardized wrapper or query dto (e.g., `limit/offset` or `cursor` based pagination) across all controllers.
* **Why:** If the AI is asked to add pagination to `MemberAnalytics`, it should follow a global standard rather than inventing a new query format just for that feature.

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

## Summary Checklist for Developers Providing Context to AI:
1. Identify the exact layer where the bug/feature resides (Validation? DB Query? Business Logic?).
2. Select the **one or two** micro-files associated with that layer.
3. Pass ONLY those files to the AI.
4. Review the AI's isolated changes.
