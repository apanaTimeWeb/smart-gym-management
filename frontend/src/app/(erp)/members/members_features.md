# Members Module Features & Architecture

## Overview
The Members module (`app/(erp)/members`) manages all gym members, memberships, and payments. It includes a comprehensive list view with statistics, and a detailed profile view for each member encompassing their overview, attendance, and payment history.

## AI-Context Architecture
This module has been refactored into a strictly AI-Friendly, micro-modularized structure following the `frontend_development_instruction.md` guidelines.

### 1. `members_components/`
- `MembersKPIs/MembersKPIs.tsx`: Renders the high-level metrics (Total, Active, Pending, Expired).
- `MembersToolbar/MembersToolbar.tsx`: Houses the search input, status filter select, and the button to add a new member.
- `MembersTable/MembersTable.tsx`: Displays the filtered list of members with actions to view profile, edit, delete, and send messages via WhatsApp or Email.
- `MemberModal/MemberModal.tsx`: A self-contained modal form for adding or editing a member.
- `MemberProfile/`: Contains the detailed view for a single member.
  - `MemberProfile.tsx`: The wrapper component handling the tabs and header.
  - `ProfileOverview.tsx`: Displays the member summary and quick actions.
  - `ProfileAttendance.tsx`: Displays attendance statistics and a toggleable calendar view.
  - `ProfilePayments.tsx`: Displays payment history and the ability to print thermal receipts.

### 2. `members_context/`
- `MembersContext.tsx`: The single source of truth for the Members state. Manages API calls via `membersApi`, `plansApi`, and `financeApi`. Handles local search/filter states, controls the visibility of the Add/Edit Modal, manages the global `MessageModal`, and handles the state for `selectedMember` profile viewing.

### 3. `members_utils/`
- `MembersSharedConstants.ts`: Centralizes arrays and mappings such as `MEMBERS_STATUS_COLORS`, `MEMBERS_CYCLE_LABELS`, `EMPTY_MEMBER_FORM`, and utility functions like `formatCurrency` and `getPriceForCycle`.

### 4. Root Files
- `page.tsx`: Initializes the `MembersProvider` and renders the components conditionally based on whether a member is selected.
- `loading.tsx` & `error.tsx`: Built-in Next.js layout features.
- `members.css`: Maps generic global tokens (`var(--bg-card)`) to module-level tokens (`--members-bg-card`) ensuring theme independence.
