import { Bell } from 'lucide-react';

// RESPONSIBILITY: Presents the feature-owned no-notification terminal state for the Admin Notifications module.
export default function AdminNotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center" role="status">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-input">
        <Bell size={18} className="text-secondary" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-medium text-primary">You&apos;re all caught up!</h3>
      <p className="mt-1 text-sm text-secondary">No new notifications to show right now.</p>
    </div>
  );
}
