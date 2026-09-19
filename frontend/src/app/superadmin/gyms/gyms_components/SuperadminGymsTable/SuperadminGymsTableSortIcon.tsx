// RESPONSIBILITY: Renders the semantic sort indicator for a gym table column.
'use client';
import { ArrowUpDown } from 'lucide-react';
import type { SuperadminGymsTableSortIconProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTableSortIconTypes';
export default function SuperadminGymsTableSortIcon({ active }: SuperadminGymsTableSortIconProps) {
  return <ArrowUpDown size={18} className={`ml-1 inline ${active ? 'text-primary' : 'text-disabled'}`} aria-hidden="true" />;
}
