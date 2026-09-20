// RESPONSIBILITY: Renders the status badge pill for a single broadcast. Purely presentational — maps BroadcastStatus to design system colors.
'use client';
import type { SuperadminBroadcastStatusBadgeProps } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
export default function SuperadminBroadcastStatusBadge({ status }: SuperadminBroadcastStatusBadgeProps) {
    switch (status) {
        case 'SENT':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-on-success">SENT</span>;
        case 'SCHEDULED':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-on-primary">SCHEDULED</span>;
        case 'DRAFT':
        default:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">DRAFT</span>;
    }
}
