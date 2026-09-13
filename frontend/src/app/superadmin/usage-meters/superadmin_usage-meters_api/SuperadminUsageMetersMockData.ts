import type { UsageMeter } from '@/app/superadmin/usage-meters/superadmin_usage-meters_types/superadmin_usage-meters_types';

export const MOCK_SUPERADMIN_USAGE_METERS: UsageMeter[] = [
  {
    id: 'um1', tenantId: 't1', tenantName: 'Iron Paradise',
    smsSent: 850, smsLimit: 1000, whatsappMessagesSent: 400, whatsappLimit: 500,
    emailsSent: 5000, emailLimit: 10000, apiCallsCount: 15000, apiCallsLimit: 50000,
    databaseGb: 1.2, mediaGb: 5.5, storageLimitGb: 10,
    activeMembers: 200, totalMembers: 250, memberLimit: 500,
    staffCount: 5, staffLimit: 10, billingCycleEnd: '2023-11-30'
  },
  {
    id: 'um2', tenantId: 't2', tenantName: 'Fit Life Studio',
    smsSent: 150, smsLimit: 500, whatsappMessagesSent: 50, whatsappLimit: 100,
    emailsSent: 1000, emailLimit: 5000, apiCallsCount: 2000, apiCallsLimit: 10000,
    databaseGb: 0.5, mediaGb: 1.2, storageLimitGb: 5,
    activeMembers: 50, totalMembers: 60, memberLimit: 100,
    staffCount: 2, staffLimit: 5, billingCycleEnd: '2023-11-25'
  }
];
