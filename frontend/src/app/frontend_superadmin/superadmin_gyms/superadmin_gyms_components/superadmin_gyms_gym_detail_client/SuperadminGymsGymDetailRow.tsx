'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailRow owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders one labeled value row inside a Superadmin gym detail section.
'use client';import { displayValue } from '@/lib/formatters';

import type { SuperadminGymsGymDetailRowProps } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsGymDetailRowTypes.ts';


/** @description Renders a labeled read-only gym detail row. @dependencies Receives already-formatted label/value presentation props. @edge-case Applies emphasis styling only when explicitly requested by the parent detail section. */
export default function SuperadminGymsGymDetailRow({ label, value, emphasis = false, emphasisWarning = false }: SuperadminGymsGymDetailRowProps) {
  return <div className="flex items-start justify-between gap-4"><span className="shrink-0 text-secondary">{label}</span><span className={`min-w-0 truncate text-right font-medium ${emphasisWarning ? 'text-warning' : emphasis ? 'text-danger' : 'text-primary'}`}>{displayValue(value)}</span></div>;
}
