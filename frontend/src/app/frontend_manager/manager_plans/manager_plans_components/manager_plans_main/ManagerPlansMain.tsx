// RESPONSIBILITY: Renders ManagerPlansMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerPlansContent } from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_main/manager_plans_content/ManagerPlansContent';

/** @description Orchestrator for the Plans module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerPlansMain() {
  return <ManagerPlansContent />;
}
