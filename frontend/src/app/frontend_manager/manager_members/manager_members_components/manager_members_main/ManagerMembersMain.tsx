// RESPONSIBILITY: Renders ManagerMembersMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerMembersContent } from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_main/manager_members_content/ManagerMembersContent';
import type { MembersInitialData } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/** @description Entry point component for the members module that sets up hook-based state facades and layout. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersMain({ initialData }: { initialData?: MembersInitialData | null }) {
  return <ManagerMembersContent />;
}
