// RESPONSIBILITY: Renders the semantic White-labeling domain and SSL status badge without owning business state.
'use client';

import { BadgeCheck, Clock, XCircle } from 'lucide-react';
import type { SuperadminWhiteLabelingStatusBadgeProps } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingComponentTypes';

export default function SuperadminWhiteLabelingStatusBadge({ status }: SuperadminWhiteLabelingStatusBadgeProps) {
  if (status === 'active' || status === 'issued') {
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success"><BadgeCheck size={18} className="h-3.5" aria-hidden="true"/>{status === 'issued' ? 'Issued' : 'Active'}</span>;
  }
  if (status === 'pending') {
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-2.5 py-1 text-xs font-medium text-warning"><Clock size={18} className="h-3.5" aria-hidden="true"/>Pending</span>;
  }
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-xs font-medium text-danger"><XCircle size={18} className="h-3.5" aria-hidden="true"/>Failed</span>;
}
