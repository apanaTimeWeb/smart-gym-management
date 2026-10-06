// RESPONSIBILITY: Renders ManagerHrMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerHrContent } from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_main/manager_hr_content/ManagerHrContent';
import type { HrInitialData } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes';


/** @description Entry component for the HR module. Wraps the UI in the hook-based state facade and handles page layout. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerHrMain({ initialData }: { initialData?: HrInitialData | null }) {
  return <ManagerHrContent />;
}
