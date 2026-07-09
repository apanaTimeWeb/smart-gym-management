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
