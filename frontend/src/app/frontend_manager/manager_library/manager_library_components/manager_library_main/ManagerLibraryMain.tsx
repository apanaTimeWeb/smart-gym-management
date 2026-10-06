// RESPONSIBILITY: Renders ManagerLibraryMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerLibraryContent } from '@/app/frontend_manager/manager_library/manager_library_components/manager_library_main/manager_library_content/ManagerLibraryContent';

/** @description Entry component for the Diet Library module. Wraps the UI in the hook-based state facade and handles page layout. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerLibraryMain() {
  return <ManagerLibraryContent />;
}
