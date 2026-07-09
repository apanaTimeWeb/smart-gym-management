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

## Core Business Logic
- **Inquiry Lifecycle:** Inquiries follow a strict status progression: `New` → `Contacted` → `Converted` or `Closed`.
- **Creation:** When a new inquiry is submitted (e.g., from the landing page), it is saved with a `New` status.
- **Follow-up:** Staff update the inquiry status to `Contacted` after reaching out, and optionally set a follow-up date.
- **Conversion:** If the prospect becomes a member, the inquiry is updated to `Converted`. If they are no longer interested, it is marked as `Closed`.
