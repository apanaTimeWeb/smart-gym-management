// RESPONSIBILITY: Renders ManagerSalesMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerSalesContent } from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_main/manager_sales_content/ManagerSalesContent';

/** @description Provides the implementation for ManagerSalesMain.tsx functionality within its module. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesMain({ initialData }: { initialData?: unknown }) {
  return <ManagerSalesContent />;
}
