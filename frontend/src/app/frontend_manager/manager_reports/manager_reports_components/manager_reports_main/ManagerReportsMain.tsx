// RESPONSIBILITY: Renders ManagerReportsMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerReportsContent } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_main/manager_reports_content/ManagerReportsContent';

/** @description Orchestrator for the Reports module — KPIs, tab switcher, charts, table, and refresh-only summary controls. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsMain() {
  return <ManagerReportsContent />;
}
