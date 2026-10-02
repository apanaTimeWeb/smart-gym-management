'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsTableSortIcon owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTableSortIconTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the semantic sort indicator for a gym table column.
import { ArrowUpDown } from 'lucide-react';

import type { SuperadminGymsTableSortIconProps } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTableSortIconTypes';


export default function SuperadminGymsTableSortIcon({ active }: SuperadminGymsTableSortIconProps) {
  return <ArrowUpDown size={18} className={`ml-1 inline ${active ? 'text-primary' : 'text-disabled'}`} aria-hidden="true"/>;
}

