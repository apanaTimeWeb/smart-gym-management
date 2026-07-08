# Inquiries Module Features & Architecture

## Overview
The Inquiries module (`app/(erp)/inquiries`) tracks new leads, handles follow-ups, and manages lead statuses to convert potential clients into members. It includes email and WhatsApp messaging integrations.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `inquiries_components/`
- `InquiriesMain/InquiriesMain.tsx`: The primary Client Component layout wrapper that initiates the `InquiriesProvider` and renders the content.
- `InquiriesKPIs/InquiriesKPIs.tsx`: Renders the high-level metrics for new, follow-up, and converted leads.
- `InquiriesToolbar/InquiriesToolbar.tsx`: Houses the search input, status filter select, and the button to add a new inquiry.
- `InquiriesTable/InquiriesTable.tsx`: Displays the filtered list of inquiries with actions to edit, delete, update status, and send messages via WhatsApp or Email.
- `InquiryModal/InquiryModal.tsx`: A self-contained modal form for adding or editing an inquiry.

### 2. `inquiries_context/`
- `useInquiriesLogic.ts`: An isolated custom hook containing the React logic to fetch data, handle states, and process form submissions.
- `InquiriesContext.tsx`: The single source of truth for the Inquiries state. It consumes `useInquiriesLogic` and provides the state down the tree, eliminating prop drilling.

### 3. `inquiries_types/`
- `inquiries_types.ts`: Contains TypeScript definitions like `InquiriesContextType`.

### 4. `inquiries_utils/`
- `InquiriesSharedConstants.ts`: Centralizes arrays such as `INQUIRY_SOURCES`, `INQUIRIES_TABLE_HEADERS`, `EMPTY_INQUIRY_FORM`, and maps styling colors to statuses (e.g. `NEW`, `FOLLOW_UP`). It also houses the `generateDefaultMessage` utility function.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `InquiriesMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features.
- `inquiries.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--inquiries-bg-card`) ensuring no hardcoded Tailwind colors break the theme.
