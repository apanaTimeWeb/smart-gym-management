# Attendance Module Features & Architecture

## Overview
The Attendance module (`app/(erp)/attendance`) manages and tracks daily check-ins for both gym members and staff. It provides high-level daily statistics and a filterable history log.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `attendance_components/`
- `AttendanceMain/AttendanceMain.tsx`: The primary Client Component layout wrapper that initiates the `AttendanceProvider` and renders the content.
- `AttendanceKPIs/AttendanceKPIs.tsx`: Renders the high-level metrics for today's check-ins (Total, Members, Staff).
- `AttendanceToolbar/AttendanceToolbar.tsx`: Houses the filter tabs (All, Members, Staff) and action buttons (Refresh, Mark Attendance).
- `AttendanceTable/AttendanceTable.tsx`: Displays the filtered list of attendance records, differentiating between members and staff visually.
- `AttendanceModal/AttendanceModal.tsx`: A self-contained modal form for submitting a new attendance check-in for either a member or staff.

### 2. `attendance_context/`
- `useAttendanceLogic.ts`: An isolated custom hook containing the React logic to fetch attendance data and handle form submissions.
- `AttendanceContext.tsx`: The single source of truth for the Attendance state. Consumes `useAttendanceLogic` and provides the state.

### 3. `attendance_types/`
- `attendance_types.ts`: Contains TypeScript definitions like `AttendanceContextType`.

### 4. `attendance_utils/`
- `AttendanceSharedConstants.ts`: Centralizes formatting utility functions (`formatDate`, `formatTime`), table headers, and the empty state shape of the attendance form.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `AttendanceMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features providing a smooth skeleton loading state and error boundary.
- `attendance.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--attendance-bg-card`) ensuring no hardcoded Tailwind colors break the theme.
