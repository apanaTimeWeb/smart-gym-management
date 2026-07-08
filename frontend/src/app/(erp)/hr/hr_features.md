# HR Module Features & Architecture

## Overview
The HR module (`app/(erp)/hr`) manages staff profiles, employee payrolls, branch assignments, and related HR analytics.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `hr_components/`
- `HrMain/HrMain.tsx`: The primary Client Component layout wrapper that initiates the `HrProvider` and renders the content.
- `HrKPIs/HrKPIs.tsx`: Renders the high-level metrics for staff count and payroll amounts.
- `HrTabs/HrTabs.tsx`: Controls tab switching between the staff directory and payroll records.
- `StaffTable/StaffTable.tsx`: Displays a detailed table of staff members, including quick actions for editing or deleting profiles.
- `PayrollTable/PayrollTable.tsx`: Displays payroll data and provides the action to mark a month's payroll as Paid.
- `StaffModal/StaffModal.tsx`: A self-contained modal form for adding new staff or editing existing staff.

### 2. `hr_context/`
- `useHrLogic.ts`: An isolated custom hook containing the React logic (`useState`, `useEffect`, `hrApi` calls) to fetch HR data and handle form states.
- `HrContext.tsx`: The single source of truth for the HR state. It consumes `useHrLogic` and provides the state via `useHrContext`. This prevents massive prop drilling between the Tabs, Tables, and the Modal.

### 3. `hr_types/`
- `hr_types.ts`: Contains TypeScript definitions like `HrContextType`.

### 4. `hr_utils/`
- `HrSharedConstants.ts`: Houses the `EMPTY_STAFF` initialization object, select dropdown options (`GENDER_OPTIONS`, `BRANCH_OPTIONS`), and table headers to ensure one single point of modification.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `HrMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features.
- `hr.css`: Removes dependency on inline hardcoded Tailwind colors by mapping to the global design system (e.g. `--hr-bg-card` => `var(--bg-card)`).
