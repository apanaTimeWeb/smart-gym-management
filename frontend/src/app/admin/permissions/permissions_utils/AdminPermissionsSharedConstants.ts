// RESPONSIBILITY: Centralized constants, feature list, and mock data for the Permissions module.
import type { PermissionFeature, PermissionsData } from '@/app/admin/permissions/permissions_types/AdminPermissionsTypes';

export const PERMISSION_FEATURES: PermissionFeature[] = [
  // Members
  { key: 'members.view', label: 'View Members', group: 'Members', description: 'Can view member list and profiles' },
  { key: 'members.create', label: 'Add Members', group: 'Members', description: 'Can enroll new members' },
  { key: 'members.edit', label: 'Edit Members', group: 'Members', description: 'Can update member details' },
  { key: 'members.delete', label: 'Delete Members', group: 'Members', description: 'Can remove members permanently' },
  // Finance
  { key: 'finance.view', label: 'View Finance', group: 'Finance', description: 'Can view payments and revenue' },
  { key: 'finance.collect', label: 'Collect Payments', group: 'Finance', description: 'Can record fee collections' },
  { key: 'finance.expenses', label: 'Manage Expenses', group: 'Finance', description: 'Can add and edit expenses' },
  { key: 'finance.refunds', label: 'Process Refunds', group: 'Finance', description: 'Can initiate refunds' },
  // HR
  { key: 'hr.view', label: 'View Staff', group: 'HR', description: 'Can view staff list' },
  { key: 'hr.manage', label: 'Manage Staff', group: 'HR', description: 'Can add/edit/remove staff' },
  { key: 'hr.payroll', label: 'Run Payroll', group: 'HR', description: 'Can process staff payroll' },
  // Attendance
  { key: 'attendance.view', label: 'View Attendance', group: 'Attendance', description: 'Can view attendance records' },
  { key: 'attendance.mark', label: 'Mark Attendance', group: 'Attendance', description: 'Can manually mark attendance' },
  // Reports
  { key: 'reports.view', label: 'View Reports', group: 'Reports', description: 'Can access reports and analytics' },
  { key: 'reports.export', label: 'Export Reports', group: 'Reports', description: 'Can export data to CSV/PDF' },
  // Settings
  { key: 'settings.view', label: 'View Settings', group: 'Settings', description: 'Can view gym settings' },
  { key: 'settings.edit', label: 'Edit Settings', group: 'Settings', description: 'Can modify gym configuration' },
  // Store
  { key: 'store.view', label: 'View Store', group: 'Store', description: 'Can view store products and orders' },
  { key: 'store.manage', label: 'Manage Store', group: 'Store', description: 'Can add/edit products and process orders' },
];

export const PERMISSION_GROUPS = [...new Set(PERMISSION_FEATURES.map(f => f.group))];
