// RESPONSIBILITY: Renders one compact Superadmin V1 KPI card from explicit display props.
import type { SuperadminMetricCardProps } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminSharedTypes';
const TONE_CLASSES = {
    primary: "border-primary/30 bg-primary-subtle/30",
    success: "border-success/30 bg-success-bg/30",
    warning: "border-warning/30 bg-warning-bg/30",
    danger: "border-danger/30 bg-danger-bg/30",
    info: "border-info/30 bg-info-bg/30",
} as const;
export default function SuperadminMetricCard(props: SuperadminMetricCardProps) {
    const { label, value, helper } = props;
    const tone = props.tone ?? "primary";
    const toneClass = TONE_CLASSES[tone as keyof typeof TONE_CLASSES];
    return (<div className={`rounded-xl border p-4 motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-1 ${toneClass}`}>
  <p className="text-xs font-medium uppercase tracking-wider text-secondary">
    {label}
  </p>
  <p className="mt-2 text-2xl font-bold text-primary">
    {value}
  </p>
  {helper ? <p className="mt-1 text-xs text-secondary">
    {helper}
  </p> : null}
    </div>);
}
