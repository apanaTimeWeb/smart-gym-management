// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesTable.tsx; no business behavior.
import type { Affiliate, AffiliateStatus } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';

export interface SuperadminAffiliatesTableProps {
    affiliates: Affiliate[];
    onToggleStatus: (id: string, currentStatus: AffiliateStatus) => void;
    onEdit: (affiliate: Affiliate) => void;
    onDelete: (id: string) => void;
    onAddClick: () => void;
    onPayCommission?: (affiliate: Affiliate) => void;
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}
