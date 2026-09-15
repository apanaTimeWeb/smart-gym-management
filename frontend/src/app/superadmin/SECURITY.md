# Superadmin Security Ownership & Review Guidelines

## Core Philosophy
The `superadmin` directory represents the highest privilege level in the Smart Gym 360 platform. A compromise here guarantees a compromise of the entire system. Therefore, the codebase within `src/app/superadmin/` operates under a zero-trust, absolute isolation paradigm.

## Mandatory Rules

### 1. No Feature Code Shall Dictate Superadmin Security Bypasses
- Sub-modules (e.g., `gyms`, `invoices`, `dashboard`) are explicitly forbidden from asserting or bypassing security boundaries.
- All authorization, route guarding, and authentication checks MUST be enforced globally at the `superadmin` layout/middleware level, NOT delegated to individual UI components.
- There are no exceptions for "admin views" or "debugging shortcuts". 

### 2. Zero Cross-Module Imports
- Sub-modules within `superadmin` must never import from each other.
- If a sub-module requires data (e.g., a list of tenants) that overlaps with another domain, it must define its own local API fetcher and strict TypeScript types (e.g., `SuperadminInvoicesTenant`).
- This prevents a vulnerability in one module's dependency chain from instantly compromising another module's security posture.

### 3. Absolute Type Isolation
- The `superadmin` module must not import any types, schemas, or constants from the tenant-facing application (`src/app/dashboard`, etc.). 
- The Superadmin layer must maintain its own strict, Zod-validated `superadmin_types` to guarantee data integrity.

### 4. Code Review Requirements
- Any Pull Request modifying the `superadmin/` directory requires mandatory review and approval by a designated Platform Security Owner.
- Changes to API fetchers (`superadmin_*_api.ts`) must undergo strict scrutiny to ensure they are not leaking sensitive tenant information through over-fetching.

*Failure to comply with these guidelines will result in immediate rejection of changes.*
