export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface GymHealthAlert {
  id: string;
  gymId: string;
  gymName: string;
  alertType: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  metric: string;
  threshold: string;
  detectedAt: string;
  actionKey: string;
}

export interface GymHealthKPIData {
  totalAlerts: number;
  criticalAlerts: number;
  warningAlerts: number;
  infoAlerts: number;
}

export interface AdminGymHealthAlertsQueryParams {
  severity?: AlertSeverity;
  search?: string;
}
