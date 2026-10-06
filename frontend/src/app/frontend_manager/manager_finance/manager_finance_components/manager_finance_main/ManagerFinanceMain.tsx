// RESPONSIBILITY: Renders ManagerFinanceMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerFinanceContent } from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/manager_finance_content/ManagerFinanceContent';

/** @description Orchestrator for the Finance module — KPIs, tabbed Payments table + Summary chart. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinanceMain() {
  return <ManagerFinanceContent />;
}
