# Inquiries Module Features & Architecture

## Overview
The Inquiries module (`app/(erp)/inquiries`) tracks new leads, handles follow-ups, and manages lead statuses to convert potential clients into members. It includes email and WhatsApp messaging integrations.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `inquiries_components/`
- `InquiriesKPIs/InquiriesKPIs.tsx`: Renders the high-level metrics for new, follow-up, and converted leads.
- `InquiriesToolbar/InquiriesToolbar.tsx`: Houses the search input, status filter select, and the button to add a new inquiry.
- `InquiriesTable/InquiriesTable.tsx`: Displays the filtered list of inquiries with actions to edit, delete, update status, and send messages via WhatsApp or Email.
- `InquiryModal/InquiryModal.tsx`: A self-contained modal form for adding or editing an inquiry.

### 2. `inquiries_context/`
- `InquiriesContext.tsx`: The single source of truth for the Inquiries state. Manages API calls via `inquiriesApi`, handles local search/filter states, and controls the visibility of the Add/Edit Modal and the global `MessageModal`. This entirely eliminates prop drilling from the top level.

### 3. `inquiries_utils/`
- `InquiriesSharedConstants.ts`: Centralizes arrays such as `INQUIRY_SOURCES`, `INQUIRIES_TABLE_HEADERS`, `EMPTY_INQUIRY_FORM`, and maps styling colors to statuses (e.g. `NEW`, `FOLLOW_UP`). It also houses the `generateDefaultMessage` utility function.

### 4. Root Files
- `page.tsx`: Initializes the `InquiriesProvider` and renders the components.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features.
- `inquiries.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--inquiries-bg-card`) ensuring no hardcoded Tailwind colors break the theme.
