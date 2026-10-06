// RESPONSIBILITY: Renders ManagerExpensesMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerExpensesContent } from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_main/manager_expenses_content/ManagerExpensesContent';

/** @description Main container for the Expenses module. Assembles Header, Toolbar, KPIs, Table, Chart, and Modal while feature hooks own query and UI state orchestration. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerExpensesMain() {
  return <ManagerExpensesContent />;
}
