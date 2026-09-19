// RESPONSIBILITY: Renders the Superadmin offboarding policy and safety panel section.
'use client';
import { ArchiveX, ShieldAlert } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import { SUPERADMIN_OFFBOARDING_POLICY_LABELS } from '@/app/superadmin/offboarding/offboarding_utils/SuperadminOffboardingConstants';
import type { SuperadminOffboardingSectionProps } from '@/app/superadmin/offboarding/offboarding_types/SuperadminOffboardingTypes';
export default function SuperadminOffboardingPolicyAndSafetyPanel({ data }: SuperadminOffboardingSectionProps) {
    return (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminPanel title="Offboarding Policy" description="Platform defaults for export and purge timing.">
    <div className="space-y-3">
      {Object.entries(data.policy).map(([key, value]) => (<div key={key} className="flex items-center justify-between rounded-lg border border-border p-3">
          <span className="text-secondary capitalize">
            {SUPERADMIN_OFFBOARDING_POLICY_LABELS[key as keyof typeof SUPERADMIN_OFFBOARDING_POLICY_LABELS]}
          </span>
          <span className="font-medium text-primary">
            {typeof value === 'number' ? `${formatNumber(value)} days` : value ? 'Required' : 'Not required'}
          </span>
        </div>))}
    </div>
  </SuperadminPanel>
  <SuperadminPanel title="Safety Checks" description="Irreversible deletion requires documented guardrails.">
    <div className="space-y-3">
      <div className="flex gap-3 rounded-lg border border-border p-3">
        <ShieldAlert size={18} className="text-warning"/>
        <div>
          <p className="font-medium text-primary">
            Fresh backup required
          </p>
          <p className="text-xs text-secondary">
            Create and verify a current backup before purge.
          </p>
        </div>
      </div>
      <div className="flex gap-3 rounded-lg border border-border p-3">
        <ArchiveX size={18} className="text-danger"/>
        <div>
          <p className="font-medium text-primary">
            Explicit purge confirmation
          </p>
          <p className="text-xs text-secondary">
            Use the type-to-confirm flow for final deletion.
          </p>
        </div>
      </div>
    </div>
  </SuperadminPanel>
    </div>);
}
