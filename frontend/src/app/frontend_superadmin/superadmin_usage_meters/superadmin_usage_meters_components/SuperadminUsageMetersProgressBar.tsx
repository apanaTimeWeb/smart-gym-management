'use client';
/**
 * RESPONSIBILITY: React component SuperadminUsageMetersProgressBar owned by the superadmin_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_components/SuperadminUsageMetersProgressBar.module.css
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders one bounded Usage Meter progress segment using feature-local CSS classes instead of inline width styles.
'use client';import styles from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_components/SuperadminUsageMetersProgressBar.module.css';

import type { SuperadminUsageMetersProgressBarProps } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersProgressBarTypes.ts';


/** @description Renders a bounded semantic progress indicator for one usage metric. @dependencies Receives derived usage/limit values from the owning module. @edge-case Clamps invalid or over-limit percentages before rendering the bar width. */
export default function SuperadminUsageMetersProgressBar({ value, limit, className, title }: SuperadminUsageMetersProgressBarProps) {
  const percentage = limit > 0 ? Math.min(100, Math.max(0, (value / limit) * 100)) : 0;
  const widthClass = styles[`width${Math.round(percentage)}`] ?? styles.width0;
  return <div className={`h-full ${className} ${widthClass}`} title={title} aria-hidden="true" />;
}
