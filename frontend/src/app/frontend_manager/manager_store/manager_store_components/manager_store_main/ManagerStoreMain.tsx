// RESPONSIBILITY: Renders ManagerStoreMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerStoreContent } from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_main/manager_store_content/ManagerStoreContent';

/** @description Entry component for the Store module. Wraps the UI in the hook-based state facade and handles page layout. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerStoreMain() {
  return <ManagerStoreContent />;
}
