// RESPONSIBILITY: Renders the Superadmin onboarding V1 Activation journey view.
'use client';
import { formatNumber, formatPercent1dp } from '@/lib/formatters';
import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';
import type { SuperadminOnboardingV1SectionProps } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingV1Types.ts';
export default function SuperadminOnboardingV1ActivationJourneyPanel({ data }: SuperadminOnboardingV1SectionProps) {
    return <Panel title="Activation journey" description="Each step narrows the gap between signup and a successful active gym.">
  <div className="h-72">
    <ApexBarChart categories={data.steps.map((x) => x.label)} series={[{ name: 'Gyms completing step', data: data.steps.map((x) => x.count) }]} horizontal valueFormatter={(v) => formatNumber(v)}/>
  </div>
    </Panel>;
}
