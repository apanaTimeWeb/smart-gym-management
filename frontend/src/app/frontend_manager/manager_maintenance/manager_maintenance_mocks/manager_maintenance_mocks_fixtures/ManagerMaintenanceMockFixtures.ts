import { MANAGER_MAINTENANCE_STATUS_VALUES, MAINTENANCE_PRIORITIES } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_constants/ManagerMaintenanceConstants';
import type { MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';

/**
 * @description Provides the ManagerMaintenanceMockFixtures implementation for the maintenance module.
 * @dependencies @/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  {
    id: 'mt1',
    title: 'Treadmill wire broken',
    equipment: 'Treadmill 3',
    status: MANAGER_MAINTENANCE_STATUS_VALUES.OPEN,
    priority: MAINTENANCE_PRIORITIES[2].value,
    reportedAt: '2026-09-18T10:00:00Z',
  },
  {
    id: 'mt2',
    title: 'AC not cooling',
    equipment: 'AC Unit - Cardio Zone',
    status: MANAGER_MAINTENANCE_STATUS_VALUES.IN_PROGRESS,
    priority: MAINTENANCE_PRIORITIES[1].value,
    assignedVendor: 'CoolTech Services',
    estimatedCost: 150000,
    reportedAt: '2026-09-15T14:30:00Z',
  },
  {
    id: 'mt3',
    title: 'Dumbbell rack loose',
    equipment: 'Free Weights',
    status: MANAGER_MAINTENANCE_STATUS_VALUES.RESOLVED,
    priority: MAINTENANCE_PRIORITIES[0].value,
    reportedAt: '2026-09-10T09:00:00Z',
    resolvedAt: '2026-09-12T11:00:00Z',
  }
];
