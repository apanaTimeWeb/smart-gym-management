// RESPONSIBILITY: Centralized constants and mock data for the Gym Health Alerts module.
import type { GymHealthAlert, GymHealthKPIData } from '@/app/admin/gym-health-alerts/gym_health_alerts_types/AdminGymHealthAlertsTypes';

export const ALERT_SEVERITY_OPTIONS = [
  { value: 'all', label: 'All Severities' },
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
];

export const ALERT_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'no_new_members', label: 'No New Members' },
  { value: 'revenue_drop', label: 'Revenue Drop' },
  { value: 'high_cancellations', label: 'High Member Loss' },
  { value: 'pending_payroll', label: 'Pending Payroll' },
  { value: 'low_attendance', label: 'Low Attendance' },
  { value: 'expiring_members', label: 'Expiring Members' },
];

export const GYM_OPTIONS = [
  { value: 'all', label: 'All Gyms' },
  { value: 'g1', label: 'Andheri East' },
  { value: 'g2', label: 'Bandra West' },
  { value: 'g3', label: 'Powai' },
  { value: 'g4', label: 'Thane' },
];

export const RESOLVED_OPTIONS = [
  { value: 'all', label: 'All Alerts' },
  { value: 'active', label: 'Active Only' },
  { value: 'resolved', label: 'Resolved Only' },
];

export const GYM_HEALTH_ITEMS_PER_PAGE = 10;



export { MOCK_GYM_HEALTH_ALERTS, MOCK_GYM_HEALTH_KPI } from '@/app/admin/gym-health-alerts/gym-health-alerts_mocks/fixtures/AdminGymHealthAlertsMockFixtures';
