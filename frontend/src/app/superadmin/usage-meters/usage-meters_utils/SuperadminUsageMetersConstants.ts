// RESPONSIBILITY: Centralized mock data constants for the Usage Meters Module.
import type { UsageMeter } from '@/app/superadmin/usage-meters/superadmin_usage-meters_types/superadmin_usage-meters_types';

export const MOCK_USAGE_METERS: UsageMeter[] = [
  {
    id: 'meter-1',
    tenantId: 'gym-1234',
    tenantName: 'Flex Fitness Central',
    smsSent: 8500,
    smsLimit: 10000,
    databaseGb: 1.2,
    mediaGb: 8.5,
    storageLimitGb: 20,
    activeMembers: 1250,
    memberLimit: 2000,
    billingCycleEnd: 'Oct 15, 2026'
  },
  {
    id: 'meter-2',
    tenantId: 'gym-5678',
    tenantName: 'Iron Temple Barbell Club',
    smsSent: 4950,
    smsLimit: 5000,
    databaseGb: 0.8,
    mediaGb: 2.1,
    storageLimitGb: 10,
    activeMembers: 450,
    memberLimit: 1000,
    billingCycleEnd: 'Oct 20, 2026'
  },
  {
    id: 'meter-3',
    tenantId: 'gym-9012',
    tenantName: 'Zenith Yoga & Pilates',
    smsSent: 150,
    smsLimit: 1000,
    databaseGb: 0.1,
    mediaGb: 0.4,
    storageLimitGb: 2,
    activeMembers: 85,
    memberLimit: 100,
    billingCycleEnd: 'Nov 05, 2026'
  }
];
