# Audit Module Features

## Overview
The Audit module provides a system-wide view of critical actions performed by users, staff, and system processes. It tracks who performed what action on which entity, complete with timestamps and IP addresses, ensuring security, transparency, and accountability.

## File Structure

```
audit/
├── audit_api/
│   └── audit_api.ts         // API calls for fetching audit logs
├── audit_components/
│   ├── AuditMain/           // Main container for the audit page
│   ├── AuditFilters/        // Search and filter inputs for logs
│   └── AuditTable/          // Data table displaying the paginated logs
├── audit_context/
│   ├── AuditContext.tsx     // React context provider for audit state
│   └── useAuditLogic.ts     // Core logic hook managing state and URL sync
├── audit_types/
│   └── audit_types.ts       // Strict TypeScript interfaces (AuditLog, FetchState)
├── audit_utils/
│   └── AuditSharedConstants.ts // Shared constants like table headers and entity types
├── page.tsx                 // Next.js Server Component entry point
├── loading.tsx              // Module loading state
├── error.tsx                // Module error boundary
├── audit_features.md        // This documentation file
└── audit_forbidden.md       // List of prohibited practices
```

## Component Architecture

- **AuditMain**: The parent layout component. It provides the UI wrapper (headers, descriptions) and acts as the integration point for filters and the data table. It wraps its children in the `AuditProvider`.
- **AuditFilters**: Provides inputs to filter logs by `entityType` and `actorId`. State is driven directly from the URL.
- **AuditTable**: Renders the fetched audit logs in a structured table and handles pagination using `AdminPagination`.

## State Management

The Audit module follows the **URL-as-state** paradigm for filters and pagination.

1.  **URL Synchronization**: `useAuditLogic` reads `page`, `entityType`, and `actorId` from `useSearchParams`.
2.  **Debouncing**: The `actorId` input is debounced before triggering a URL update and subsequent API fetch.
3.  **Data Fetching**: When URL parameters change, `useAuditLogic` triggers `fetchLogs()`. It manages the `fetchState` (`idle` | `loading` | `success` | `error`) to provide UI feedback.

## Data Types

Defined in `audit_types.ts`. Key interfaces include:

-   `AuditLog`: Represents a single audit entry (`id`, `actorId`, `actorRole`, `action`, `entityType`, `newValue`, `timestamp`, etc.).
-   `AuditLogResponse`: Represents the paginated API response containing `logs` and `total`.
-   `FetchState`: A union type (`'idle' | 'loading' | 'success' | 'error'`) representing the current state of data fetching.

## API Integration

`auditApi.ts` utilizes the generic `apiFetch` utility.

-   `getLogs(params)`: Fetches paginated and filtered audit logs from the backend endpoint defined in `AuditUrlConfig`. It passes search parameters such as `page`, `limit`, `entityType`, and `actorId`.
