// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { SuperadminTenantSla } from '@/app/superadmin/system/system_types/SuperadminSystemTypes';
export const SUPERADMIN_SYSTEM_MOCK_SLA_DATA: Array<SuperadminTenantSla & { creditIssued?: boolean }> = [
    { id: 'gym-1', name: 'Flex Fitness Central', targetSla: 99.9, actualUptime: 99.95, downtimeIncidents: 1, downtimeMinutes: 21, status: 'MET', creditIssued: false },
    { id: 'gym-2', name: 'Iron Temple Barbell Club', targetSla: 99.9, actualUptime: 98.2, downtimeIncidents: 3, downtimeMinutes: 777, status: 'BREACHED', creditIssued: false },
    { id: 'gym-3', name: 'Zenith Yoga & Pilates', targetSla: 99.0, actualUptime: 99.1, downtimeIncidents: 2, downtimeMinutes: 388, status: 'WARNING', creditIssued: false },
    { id: 'gym-4', name: 'PowerHouse Gym Koramangala', targetSla: 99.9, actualUptime: 100.0, downtimeIncidents: 0, downtimeMinutes: 0, status: 'MET', creditIssued: false },
];
