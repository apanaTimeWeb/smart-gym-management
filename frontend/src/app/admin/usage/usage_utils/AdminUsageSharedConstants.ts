// RESPONSIBILITY: Centralized mock data and constants for the Admin Usage module.
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';

export const MOCK_USAGE_DATA: AdminUsageData = {
  tenantId: 'gym-1234',
  planName: 'Growth Plan',
  planTier: 'Growth',
  billingCycleEnd: '2026-02-15',
  monthlyPrice: 4999,
  smsSent: 9500,
  smsLimit: 10000,
  databaseGb: 8.0,
  mediaGb: 11.5,
  storageLimitGb: 20,
  activeMembers: 1950,
  memberLimit: 2000,
  staffCount: 15,
  staffLimit: 15,
  branchCount: 3,
  branchLimit: 5,
  apiCallsToday: 8420,
  apiCallsLimit: 10000,
  usageHistory: [
    { date: '2025-08-01', membersUsed: 1600, storageUsedGb: 9.2, smsUsed: 6800 },
    { date: '2025-09-01', membersUsed: 1720, storageUsedGb: 10.1, smsUsed: 7400 },
    { date: '2025-10-01', membersUsed: 1800, storageUsedGb: 11.0, smsUsed: 8100 },
    { date: '2025-11-01', membersUsed: 1870, storageUsedGb: 11.5, smsUsed: 8800 },
    { date: '2025-12-01', membersUsed: 1920, storageUsedGb: 12.0, smsUsed: 9200 },
    { date: '2026-01-01', membersUsed: 1950, storageUsedGb: 12.5, smsUsed: 9500 },
  ],
};

export const PLAN_TIERS = [
  {
    name: 'Starter',
    price: 1999,
    features: ['1 Branch', '500 Members', '5 Staff', '2,000 SMS/mo', '5 GB Storage'],
    isCurrent: false,
  },
  {
    name: 'Growth',
    price: 4999,
    features: ['5 Branches', '2,000 Members', '15 Staff', '10,000 SMS/mo', '20 GB Storage'],
    isCurrent: true,
  },
  {
    name: 'Pro',
    price: 9999,
    features: ['15 Branches', '10,000 Members', '50 Staff', '50,000 SMS/mo', '100 GB Storage'],
    isCurrent: false,
  },
  {
    name: 'Enterprise',
    price: 0,
    features: ['Unlimited Branches', 'Unlimited Members', 'Unlimited Staff', 'Custom SMS', 'Custom Storage'],
    isCurrent: false,
  },
] as const;
