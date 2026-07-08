# Members Module Features & Architecture

## Overview
The Members module (`app/(erp)/members`) manages all gym members, memberships, and payments. It includes a comprehensive list view with statistics, and a detailed profile view for each member encompassing their overview, attendance, and payment history.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `members_components/`
- `MembersMain/MembersMain.tsx`: The primary Client Component layout wrapper that initiates the `MembersProvider` and renders the content.
- `MembersKPIs/MembersKPIs.tsx`: Renders the high-level metrics (Total, Active, Pending, Expired).
- `MembersToolbar/MembersToolbar.tsx`: Houses the search input, status filter select, and the button to add a new member.
- `MembersTable/MembersTable.tsx`: Displays the filtered list of members with actions to view profile, edit, delete, and send messages via WhatsApp or Email.
- `MemberFormModal/MemberFormModal.tsx`: A self-contained modal form for adding or editing a member.
- `MemberProfileModal/MemberProfileModal.tsx`: Contains the detailed view for a single member (Overview, Attendance, Payments).

### 2. `members_context/`
- `useMembersLogic.ts`: An isolated custom hook containing the React logic to fetch members, plans, manage modals, and handle member-specific profile tabs.
- `MembersContext.tsx`: The single source of truth for the Members state. It consumes `useMembersLogic` and provides the state down the tree, eliminating prop drilling.

### 3. `members_types/`
- `members_types.ts`: Contains TypeScript definitions like `MembersContextType`.

### 4. `members_utils/`
- `MembersSharedConstants.ts`: Centralizes arrays and mappings such as `MEMBERS_STATUS_COLORS`, `MEMBERS_CYCLE_LABELS`, `EMPTY_MEMBER_FORM`, and utility functions like `formatCurrency` and `getPriceForCycle`.

### 5. Root Files
- `page.tsx`: A pure Server Component that acts as the entry point and renders `MembersMain`.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features.
- `members.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--members-bg-card`) ensuring theme independence.
