// RESPONSIBILITY: Constants, style maps, and mock data for the Churn Alerts module.
// All status-to-style mappings live here — never inline in JSX (Rule 3B).

import type { ChurnRiskLevel, ChurnActionStatus, ChurnAlert, ChurnKpiData } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

export const CHURN_RISK_STYLES: Record<ChurnRiskLevel, string> = {
  CRITICAL: 'bg-danger-bg text-danger',
  HIGH: 'bg-warning-bg text-warning',
  MEDIUM: 'bg-info-bg text-info',
  LOW: 'bg-success-bg text-success',
};

export const CHURN_ACTION_STATUS_STYLES: Record<ChurnActionStatus, string> = {
  PENDING: 'bg-warning-bg text-warning',
  CONTACTED: 'bg-info-bg text-info',
  RESOLVED: 'bg-success-bg text-success',
  CHURNED: 'bg-danger-bg text-danger',
};

export const KPI_CARD_GRADIENT = 'linear-gradient(180deg, var(--warning-bg), transparent)';
