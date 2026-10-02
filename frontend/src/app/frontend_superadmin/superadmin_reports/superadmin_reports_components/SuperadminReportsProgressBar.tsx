'use client';
/**
 * RESPONSIBILITY: React component SuperadminReportsProgressBar owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsProgressBar.module.css
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders a theme-safe report progress bar without inline CSS. Width is supplied as bounded numeric data.
import styles from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsProgressBar.module.css';

import type { SuperadminReportsProgressBarProps } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsProgressBarTypes.ts';


export default function SuperadminReportsProgressBar({ value, className }: SuperadminReportsProgressBarProps) {
  const bounded = Math.min(100, Math.max(0, Math.round(value)));
  const widthClass = styles[`width${bounded}`] ?? styles.width0;
  return <div className={`h-full rounded-full ${className} ${widthClass}`} aria-hidden="true" />;
}

