// RESPONSIBILITY: Type contract extracted from SuperadminCancellationsFilters.tsx; no business behavior.
import type { CancellationsFilterStatus } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';

export interface SuperadminCancellationsFiltersProps {
    search: string;
    onSearchChange: (v: string) => void;
    activeFilter: CancellationsFilterStatus;
    onFilterChange: (v: CancellationsFilterStatus) => void;
}
