// RESPONSIBILITY: Renders ManagerScheduleMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerScheduleContent } from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_main/manager_schedule_content/ManagerScheduleContent';

/** @description Root client orchestrator for the Schedule module. Owns layout, toolbar, view toggle, and renders sub-components. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerScheduleMain() {
  return <ManagerScheduleContent />;
}
