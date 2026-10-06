// RESPONSIBILITY: Renders ManagerNotificationsMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerNotificationsContent } from '@/app/frontend_manager/manager_notifications/manager_notifications_components/manager_notifications_main/manager_notifications_content/ManagerNotificationsContent';

/** @description Orchestrator for the Notifications module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerNotificationsMain() {
  return <ManagerNotificationsContent />;
}
