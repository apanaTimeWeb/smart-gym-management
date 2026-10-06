// RESPONSIBILITY: Renders the manager_notifications route boundary (NotificationsPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerNotificationsLoading from '@/app/frontend_manager/manager_notifications/loading';
import ManagerNotificationsMain from '@/app/frontend_manager/manager_notifications/manager_notifications_components/manager_notifications_main/ManagerNotificationsMain';


/** @description Route-level NotificationsPage for the Manager frontend module. */
export default function NotificationsPage() {
  return (
    <Suspense fallback={<ManagerNotificationsLoading />}>
      <ManagerNotificationsMain />
    </Suspense>
  );
}
