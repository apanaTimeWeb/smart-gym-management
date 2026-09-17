// RESPONSIBILITY: Renders the Superadmin onboarding V1 OnboardingActivationSummary summary cards.
'use client';
import { formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1MetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1MetricCard';
import type { SuperadminOnboardingV1SectionProps } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types.ts';
export default function SuperadminOnboardingV1ActivationSummaryCards({ data }: SuperadminOnboardingV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
  <SuperadminV1MetricCard label="Activation score" value={`${formatNumber(data.activation.score)}/100`} helper="Setup completion quality" tone="success"/>
  <SuperadminV1MetricCard label="Average activation time" value={`${data.activation.averageDays} days`} helper="From signup to active"/>
  <SuperadminV1MetricCard label="Gyms stalled" value={formatNumber(data.activation.stalled)} helper="Need help" tone="warning"/>
  <SuperadminV1MetricCard label="Trial to paid" value={formatPercent1dp(data.activation.trialToPaid)} helper="Conversion after trial" tone="success"/>
    </div>;
}
