// RESPONSIBILITY: Renders the Superadmin onboarding V1 Where gyms stall, Weekly activation and conversion view.
'use client';
import { formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminOnboardingV1SectionProps } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types.ts';
export default function SuperadminOnboardingV1StallAndConversionSection({ data }: SuperadminOnboardingV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminPanel title="Where gyms stall" description="Prioritize the setup steps with the most drop-off.">
    <div className="space-y-3">
      {data.stalls.map((s) => <div key={s.step} className="flex items-center justify-between rounded-lg border border-border p-3">
        <span className="truncate text-sm text-primary">
          {s.step}
        </span>
        <span className="text-sm font-semibold text-warning">
          {s.gyms}
          gyms
        </span>
      </div>)}
    </div>
  </SuperadminPanel>
  <SuperadminPanel title="Weekly activation and conversion" description="Compare recent cohorts by successful setup and paid conversion.">
    <div className="space-y-3">
      {data.cohort.map((c) => <div key={c.cohort} className="rounded-lg border border-border p-3">
        <div className="flex justify-between">
          <span className="font-medium text-primary">
            {c.cohort}
          </span>
          <span className="text-xs text-secondary">
            {formatPercent1dp(c.activation)}
            activation
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-input">
          <div className="h-2 rounded-full bg-primary" style={{ width: `${c.activation}%` }}/>
        </div>
        <p className="mt-2 text-xs text-secondary">
          Paid conversion:
          {formatPercent1dp(c.conversion)}
        </p>
      </div>)}
    </div>
  </SuperadminPanel>
    </div>;
}
