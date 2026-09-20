'use client';
// RESPONSIBILITY: Renders the visual sort-direction indicator for the Admin HR payroll table.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AdminHrSortDirection } from '@/app/admin/hr/hr_types/AdminHrSortTypes';

export interface AdminHrPayrollSortIndicatorProps {
  active: boolean;
  direction: AdminHrSortDirection;
}

export default function AdminHrPayrollSortIndicator({ active, direction }: AdminHrPayrollSortIndicatorProps) {
  if (!active) return <ChevronsUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />;
  return direction === 'asc' ? <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" /> : <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />;
}
