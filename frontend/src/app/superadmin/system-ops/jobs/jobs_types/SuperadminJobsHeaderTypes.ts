// RESPONSIBILITY: Type contract extracted from SuperadminJobsHeader.tsx; no business behavior.


export interface SuperadminJobsHeaderProps {
    selectedCount: number;
    isRetrying: boolean;
    statusFilter: string;
    setStatusFilter: (v: string) => void;
    queueFilter: string;
    setQueueFilter: (v: string) => void;
    onClearCompleted: () => void;
    onRetryAll: () => void;
    onBulkRetry: () => void;
    onBulkDelete: () => void;
    onFilterChange: () => void;
}
