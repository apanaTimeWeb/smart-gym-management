// RESPONSIBILITY: Renders the empty state for Admin settings tabular configuration data.

import { Bell } from 'lucide-react';

export default function AdminSettingsEmptyState() {
  return <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
    <Bell size={30} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">No notification events configured</h3>
    <p className="text-sm text-secondary">Notification event configuration is currently empty.</p>
  </div>;
}

