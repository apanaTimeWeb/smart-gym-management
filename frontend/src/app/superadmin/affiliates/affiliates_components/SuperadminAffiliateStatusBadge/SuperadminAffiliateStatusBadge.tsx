// RESPONSIBILITY: Renders the status badge pill for a single affiliate. Purely presentational — maps AffiliateStatus to design system colors.
'use client';
import type { AffiliateStatus } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import type { SuperadminAffiliateStatusBadgeProps } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliateStatusBadgeTypes';

export default function SuperadminAffiliateStatusBadge({ status }: SuperadminAffiliateStatusBadgeProps) {
    switch (status) {
        case 'ACTIVE':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-on-success">ACTIVE</span>;
        case 'INACTIVE':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">INACTIVE</span>;
        default:
            return null;
    }
}
