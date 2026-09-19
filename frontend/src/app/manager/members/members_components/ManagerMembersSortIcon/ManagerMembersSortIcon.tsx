"use client";
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

import type { ManagerMembersSortIconProps } from '@/app/manager/members/members_types/ManagerMembersSortIconTypes';

export default function ManagerMembersSortIcon({ column, activeColumn, direction }: ManagerMembersSortIconProps) {
  if (activeColumn !== column) return <ArrowUpDown size={18} strokeWidth={2} className="ml-1 opacity-50 inline" />;
  return direction === 'asc'
    ? <ArrowUp size={18} strokeWidth={2} className="ml-1 inline text-primary" />
    : <ArrowDown size={18} strokeWidth={2} className="ml-1 inline text-primary" />;
}
