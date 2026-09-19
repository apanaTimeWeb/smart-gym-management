import { Suspense } from 'react';
// RESPONSIBILITY: Framework route boundary for the Manager notifications module; renders the route-level shell, loading, error, or 404 state.
import ManagerNotificationsLoading from '@/app/manager/notifications/loading';
import ManagerNotificationsMain from '@/app/manager/notifications/notifications_components/ManagerNotificationsMain/ManagerNotificationsMain';

export default function NotificationsPage() {
  return (
    <Suspense fallback={<ManagerNotificationsLoading />}>
      <ManagerNotificationsMain />
    </Suspense>
  );
}
