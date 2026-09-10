// RESPONSIBILITY: Renders the empty state when no data is available for notifications.
'use client';

import { FileX } from 'lucide-react';

export default function ManagerNotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border border-border text-center h-full">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        <FileX size={32} />
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">No Notifications Found</h3>
      <p className="text-secondary max-w-sm mx-auto mb-6">
        There are currently no records available in the notifications module.
      </p>
    </div>
  );
}
