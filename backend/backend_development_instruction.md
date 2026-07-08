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

### Edge Case C: Shared Utility Bloat
*Scenario:* Developers dump everything into a global `utils/` folder, creating a "junk drawer" that AI struggles to navigate.
*Solution:* **Module-Level Utils.**
If a utility is only used by the Finance module (e.g., calculating compound interest), put it in `modules/finance/utils/`. Only put genuinely universal tools (like Date formatters or Base64 encoders) in the global `utils/` folder.

### Edge Case D: External Service Adapters (Anti-Corruption Layer)
*Scenario:* When your backend talks to the outside world (Stripe, AWS S3, SendGrid), never put the `axios.post()` or SDK calls directly inside your business logic.
*Solution:* **Create an isolated wrapper or "Adapter"** for third-party tools (e.g., `stripe-payment.adapter.ts`). Your core service should only call generic methods like `paymentAdapter.charge()`.
* **Why?** If Stripe changes their API version, you only give the AI the `stripe-payment.adapter.ts` file. The AI fixes the API call without ever seeing (or risking breaking) your internal checkout logic.

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

## Summary Checklist for Developers Providing Context to AI:
1. Identify the exact layer where the bug/feature resides (Validation? DB Query? Business Logic?).
2. Select the **one or two** micro-files associated with that layer.
3. Pass ONLY those files to the AI.
4. Review the AI's isolated changes.
