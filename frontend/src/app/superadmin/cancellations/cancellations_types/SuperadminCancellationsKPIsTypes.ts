// RESPONSIBILITY: Type contract extracted from SuperadminCancellationsKPIs.tsx; no business behavior.
import type { CancellationsKpiData } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';

export interface SuperadminCancellationsKPIsProps {
    kpis: CancellationsKpiData;
    activeFilter?: string;
    onFilterClick?: (filter: string) => void;
}
