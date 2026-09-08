// RESPONSIBILITY: Mock data and constants for Manager Referrals module.
import type { ManagerReferral, ManagerReferralsKPIs } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

export const MOCK_REFERRALS_KPIS: ManagerReferralsKPIs = {
  totalReferrals: 124,
  totalConverted: 89,
  pendingRewards: 12,
  claimedRewards: 77,
};

export const MOCK_REFERRALS: ManagerReferral[] = [
  {
    id: 'ref-101',
    referrerName: 'Arjun Sharma',
    referrerId: 'M001',
    refereeName: 'Vikram Singh',
    refereePhone: '9876543210',
    dateReferred: '2025-06-01',
    status: 'JOINED',
    rewardStatus: 'PENDING',
    rewardAmount: 500,
  },
  {
    id: 'ref-102',
    referrerName: 'Priya Mehta',
    referrerId: 'M002',
    refereeName: 'Anjali Verma',
    refereePhone: '9876543211',
    dateReferred: '2025-06-03',
    status: 'JOINED',
    rewardStatus: 'CLAIMED',
    rewardAmount: 500,
  },
  {
    id: 'ref-103',
    referrerName: 'Rahul Verma',
    referrerId: 'M003',
    refereeName: 'Karan Joshi',
    refereePhone: '9876543212',
    dateReferred: '2025-06-05',
    status: 'PENDING',
    rewardStatus: 'N/A',
    rewardAmount: 500,
  },
  {
    id: 'ref-104',
    referrerName: 'Sneha Patil',
    referrerId: 'M004',
    refereeName: 'Ravi Kumar',
    refereePhone: '9876543213',
    dateReferred: '2025-06-07',
    status: 'REJECTED',
    rewardStatus: 'N/A',
    rewardAmount: 500,
  },
  {
    id: 'ref-105',
    referrerName: 'Neha Singh',
    referrerId: 'M007',
    refereeName: 'Pooja Nair',
    refereePhone: '9876543218',
    dateReferred: '2025-06-10',
    status: 'JOINED',
    rewardStatus: 'PENDING',
    rewardAmount: 1000, // Special promo
  }
];
