// RESPONSIBILITY: Constants, style maps, and mock data for the Cancellations Alerts module.
// All status-to-style mappings live here — never inline in JSX (Rule 3B).

import type { CancellationsRiskLevel, CancellationsActionStatus, CancellationsAlert, CancellationsKpiData } from '@/app/superadmin/cancellations/cancellations_types/cancellations_types';

export const CANCELLATIONS_RISK_STYLES: Record<CancellationsRiskLevel, string> = {
  CRITICAL: 'bg-danger-bg text-danger',
  HIGH: 'bg-warning-bg text-warning',
  MEDIUM: 'bg-info-bg text-info',
  LOW: 'bg-success-bg text-success',
};

export const CANCELLATIONS_ACTION_STATUS_STYLES: Record<CancellationsActionStatus, string> = {
  PENDING: 'bg-warning-bg text-warning',
  CONTACTED: 'bg-info-bg text-info',
  RESOLVED: 'bg-success-bg text-success',
  CANCELLED: 'bg-danger-bg text-danger',
};

export const KPI_CARD_GRADIENT = 'linear-gradient(180deg, var(--warning-bg), transparent)';
