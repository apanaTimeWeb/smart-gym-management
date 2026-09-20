// RESPONSIBILITY: TypeScript types for the Gym Health Alerts module.

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AdminGymHealthAlertResolution = 'active' | 'resolved';
export type AlertType =
  | 'no_new_members'
  | 'revenue_drop'
  | 'high_cancellations'
  | 'pending_payroll'
  | 'low_attendance'
  | 'expiring_members';

export interface GymHealthAlert {
  id: string;
  gymId: string;
  gymName: string;
  alertType: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  metric: string;
  threshold: string;
  detectedAt: string;
  isResolved: boolean;
  resolvedAt?: string;
  alertAge?: number;
  assignedTo?: string;
  snoozeUntil?: string;
}

export interface GymHealthKPIData {
  totalAlerts: number;
  criticalAlerts: number;
  warningAlerts: number;
  gymsAtRisk: number;
}
export interface AdminGymHealthAlertsQueryParams {
  page: number;
  limit: number;
  severity?: AlertSeverity;
  alertType?: AlertType;
  gymId?: string;
  resolved?: AdminGymHealthAlertResolution;
}
