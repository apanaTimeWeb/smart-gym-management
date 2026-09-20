// RESPONSIBILITY: Renders the healthy empty state for gym health alerts.

import { CheckCircle } from 'lucide-react';

export default function AdminGymHealthAlertsEmptyState() {
  return <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
    <CheckCircle size={32} aria-hidden="true" className="text-success" />
    <h3 className="text-base font-semibold text-primary">All gyms are healthy</h3>
    <p className="text-sm text-secondary">No alerts match the current filters.</p>
  </div>;
}
