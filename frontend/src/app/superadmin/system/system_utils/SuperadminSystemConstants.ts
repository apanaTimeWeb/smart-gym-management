import type { SuperadminSystemSlaStatus, SuperadminTenantSla } from '@/app/superadmin/system/system_types/SuperadminSystemTypes';

export const SUPERADMIN_SYSTEM_MOCK_SLA_DATA: SuperadminTenantSla[] = [
  { id: 'gym-1', name: 'Flex Fitness Central', targetSla: 99.9, actualUptime: 99.95, downtimeIncidents: 1, downtimeMinutes: 21, status: 'MET' },
  { id: 'gym-2', name: 'Iron Temple Barbell Club', targetSla: 99.9, actualUptime: 98.2, downtimeIncidents: 3, downtimeMinutes: 777, status: 'BREACHED' },
  { id: 'gym-3', name: 'Zenith Yoga & Pilates', targetSla: 99.0, actualUptime: 99.1, downtimeIncidents: 2, downtimeMinutes: 388, status: 'WARNING' },
  { id: 'gym-4', name: 'PowerHouse Gym Koramangala', targetSla: 99.9, actualUptime: 100.0, downtimeIncidents: 0, downtimeMinutes: 0, status: 'MET' },
];
