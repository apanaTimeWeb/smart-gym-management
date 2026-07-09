# Inquiries Module

## Overview
The Inquiries module handles gym leads and prospective members.

## Folder Structure
- `controllers/`: Handles HTTP requests.
  - `create-inquiry.controller.ts`: Create an inquiry.
  - `find-inquiry.controller.ts`: List inquiries.
  - `update-inquiry.controller.ts`: Update/Remove inquiry.
  - `inquiry-stats.controller.ts`: Fetch stats.
- `services/`: Business logic.
- `dto/`: Data Transfer Objects for validation.
- `entities/`: TypeORM entities.
- `inquiries.repository.ts`: Database query layer for Inquiry features.
- `inquiries.interfaces.ts`: Typings.
- `inquiries.constants.ts`: Sort orders and messages.
- `inquiries.exceptions.ts`: Custom exceptions.
