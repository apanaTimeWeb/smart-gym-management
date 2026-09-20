import type { MaintenanceTicket } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';

export const MOCK_MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  {
    id: 'mt1',
    title: 'Treadmill wire broken',
    equipment: 'Treadmill 3',
    status: 'OPEN',
    priority: 'HIGH',
    reportedAt: '2026-09-18T10:00:00Z',
  },
  {
    id: 'mt2',
    title: 'AC not cooling',
    equipment: 'AC Unit - Cardio Zone',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    assignedVendor: 'CoolTech Services',
    estimatedCost: 1500,
    reportedAt: '2026-09-15T14:30:00Z',
  },
  {
    id: 'mt3',
    title: 'Dumbbell rack loose',
    equipment: 'Free Weights',
    status: 'RESOLVED',
    priority: 'LOW',
    reportedAt: '2026-09-10T09:00:00Z',
    resolvedAt: '2026-09-12T11:00:00Z',
  }
];
