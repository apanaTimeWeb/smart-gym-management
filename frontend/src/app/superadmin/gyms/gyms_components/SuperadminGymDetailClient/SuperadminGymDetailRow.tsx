// RESPONSIBILITY: Renders one labeled value row inside a Superadmin gym detail section.
'use client';
import { displayValue } from '@/lib/formatters';
import type { SuperadminGymDetailRowProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymDetailClientTypes';
export default function SuperadminGymDetailRow({ label, value, emphasis = false, emphasisWarning = false }: SuperadminGymDetailRowProps) {
  return <div className="flex items-start justify-between gap-4"><span className="shrink-0 text-secondary">{label}</span><span className={`min-w-0 truncate text-right font-medium ${emphasisWarning ? 'text-warning' : emphasis ? 'text-danger' : 'text-primary'}`}>{displayValue(value)}</span></div>;
}
