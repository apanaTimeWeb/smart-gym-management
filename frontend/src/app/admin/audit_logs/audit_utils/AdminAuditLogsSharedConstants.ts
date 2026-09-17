// RESPONSIBILITY: Constants, mock data, and filter options for the Audit Logs module.
import type { AuditLog, AuditKPIData } from '@/app/admin/audit_logs/audit_types/AdminAuditTypes';

export const AUDIT_ITEMS_PER_PAGE = 10;

export const AUDIT_MODULE_OPTIONS = [
  { value: 'all', label: 'All Modules' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Members', label: 'Members' },
  { value: 'HR', label: 'HR' },
  { value: 'Plans', label: 'Plans' },
  { value: 'Auth', label: 'Auth' },
  { value: 'Settings', label: 'Settings' },
  { value: 'Branches', label: 'Branches' },
  { value: 'Store', label: 'Store' },
  { value: 'Attendance', label: 'Attendance' },
];

export const AUDIT_SEVERITY_OPTIONS = [
  { value: 'all', label: 'All Severity' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const AUDIT_GYM_OPTIONS = [
  { value: 'all', label: 'All Branches' },
  { value: 'b1', label: 'Andheri East' },
  { value: 'b2', label: 'Bandra West' },
  { value: 'b3', label: 'Powai' },
  { value: 'b4', label: 'Thane' },
];



export { MOCK_AUDIT_LOGS, MOCK_AUDIT_KPI } from '@/app/admin/audit_logs/audit_logs_mocks/fixtures/AdminAuditLogsMockFixtures';
