# Settings Module

## Overview
The Settings module handles global configuration for the gym (e.g., gym name, address, GST number).

## Architecture
Settings logic guarantees there's always at most 1 settings record in the DB.

## Folder Structure
- `controllers/`: Handles HTTP requests.
  - `get-settings.controller.ts`: Fetches settings.
  - `update-settings.controller.ts`: Updates settings.
- `services/`: Business logic.
- `dto/`: Data Transfer Objects for validation.
- `entities/`: TypeORM entities.
- `settings.repository.ts`: Database query layer for Settings features.
- `settings.interfaces.ts`: Typings.
- `settings.constants.ts`: Sort orders, defaults, and messages.
- `settings.exceptions.ts`: Custom exceptions.

## Core Business Logic
- **Singleton Pattern (Upsert):** The settings module enforces a single database record constraint. Instead of standard CRUD `create` and `update` logic, it uses an "upsert" pattern (updating the first record found, or creating one if the table is empty).
- **Configuration Scope:** The fields managed (such as Gym Name, Currency, Timezone, and Contact Email) affect system-wide behaviors and API responses across multiple modules.
