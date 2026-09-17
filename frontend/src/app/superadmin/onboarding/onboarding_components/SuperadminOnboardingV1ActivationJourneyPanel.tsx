// RESPONSIBILITY: Renders the Superadmin onboarding V1 Activation journey view.
'use client';
import { formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1ApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1ApexBarChart';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminOnboardingV1SectionProps } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types.ts';
export default function SuperadminOnboardingV1ActivationJourneyPanel({ data }: SuperadminOnboardingV1SectionProps) {
    return <SuperadminV1Panel title="Activation journey" description="Each step narrows the gap between signup and a successful active gym.">
  <div className="h-72">
    <SuperadminV1ApexBarChart categories={data.steps.map((x) => x.label)} series={[{ name: 'Gyms completing step', data: data.steps.map((x) => x.count) }]} horizontal valueFormatter={(v) => formatNumber(v)}/>
  </div>
    </SuperadminV1Panel>;
}
