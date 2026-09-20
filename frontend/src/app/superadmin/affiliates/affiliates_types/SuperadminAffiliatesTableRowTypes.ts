// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesTableRow.tsx; no business behavior.
import type { Affiliate, AffiliateStatus } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';

export interface SuperadminAffiliatesTableRowProps {
    affiliate: Affiliate;
    onToggleStatus: (id: string, currentStatus: AffiliateStatus) => void;
    onEdit: (affiliate: Affiliate) => void;
    onDelete: (id: string) => void;
    onPayCommission?: (affiliate: Affiliate) => void;
}
