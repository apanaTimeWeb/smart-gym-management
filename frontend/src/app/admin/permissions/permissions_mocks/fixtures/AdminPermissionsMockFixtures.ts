// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin permissions feature.
import type { PermissionsData } from '@/app/admin/permissions/permissions_types/AdminPermissionsTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin permissions feature.

export const MOCK_PERMISSIONS_DATA: PermissionsData = {
  roleDefaults: [
    {
      role: 'manager',
      permissions: {
        'members.view': true, 'members.create': true, 'members.edit': true, 'members.delete': false,
        'finance.view': true, 'finance.collect': true, 'finance.expenses': true, 'finance.refunds': false,
        'hr.view': true, 'hr.manage': true, 'hr.payroll': false,
        'attendance.view': true, 'attendance.mark': true,
        'reports.view': true, 'reports.export': true,
        'settings.view': true, 'settings.edit': true,
        'store.view': true, 'store.manage': true,
      },
    },
    {
      role: 'trainer',
      permissions: {
        'members.view': true, 'members.create': false, 'members.edit': false, 'members.delete': false,
        'finance.view': false, 'finance.collect': false, 'finance.expenses': false, 'finance.refunds': false,
        'hr.view': false, 'hr.manage': false, 'hr.payroll': false,
        'attendance.view': true, 'attendance.mark': true,
        'reports.view': false, 'reports.export': false,
        'settings.view': false, 'settings.edit': false,
        'store.view': true, 'store.manage': false,
      },
    },
  ],
  gymOverrides: [
    {
      gymId: 'b4', gymName: 'Thane', role: 'manager',
      overrides: { 'finance.expenses': false, 'hr.payroll': false, 'reports.export': false },
    },
  ],
};

export const MOCK_ROLES = [
  { id: 'r1', name: 'Super Admin', description: 'Full access to all modules and branches', permissions: ['all'], color: 'text-danger', bg: 'bg-danger', memberCount: 1 },
  { id: 'r2', name: 'Branch Manager', description: 'Manage single branch operations, members, and staff', permissions: ['members', 'finance', 'hr', 'attendance'], color: 'text-warning', bg: 'bg-warning', memberCount: 3 },
  { id: 'r3', name: 'Trainer', description: 'View assigned members, mark attendance, update workouts', permissions: ['attendance', 'members_view'], color: 'text-success', bg: 'bg-success', memberCount: 8 },
  { id: 'r4', name: 'Receptionist', description: 'Handle walk-ins, collect fees, manage enquiries', permissions: ['members', 'finance_collect', 'enquiries'], color: 'text-info', bg: 'bg-info', memberCount: 5 },
  { id: 'r5', name: 'Accountant', description: 'View and manage financial reports and expenses', permissions: ['finance', 'reports'], color: 'text-purple', bg: 'bg-purple-bg', memberCount: 2 },
];
