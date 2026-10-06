// RESPONSIBILITY: Renders ManagerMembersSortIcon's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import type { ManagerMembersSortIconProps } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersSortIconTypes';


/** @description Renders the accessible sort-direction icon for a members-table column. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersSortIcon({ column, activeColumn, direction }: ManagerMembersSortIconProps) {
  if (activeColumn !== column) return <ArrowUpDown size={18} strokeWidth={2} className="ml-1 opacity-50 inline" />;
  return direction === 'asc'
    ? <ArrowUp size={18} strokeWidth={2} className="ml-1 inline text-primary" />
    : <ArrowDown size={18} strokeWidth={2} className="ml-1 inline text-primary" />;
}
