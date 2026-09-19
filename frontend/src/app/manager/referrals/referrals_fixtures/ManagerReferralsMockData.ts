import type { ManagerReferral, ManagerReferralsKPIs } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';
// RESPONSIBILITY: Provides realistic referral records and KPI data for Manager MSW development/tests.
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
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-102',
    referrerName: 'Priya Mehta',
    referrerId: 'M002',
    refereeName: 'Anjali Verma',
    refereePhone: '9876543211',
    dateReferred: '2025-06-03',
    status: 'JOINED',
    rewardStatus: 'CLAIMED',
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-103',
    referrerName: 'Rahul Verma',
    referrerId: 'M003',
    refereeName: 'Karan Joshi',
    refereePhone: '9876543212',
    dateReferred: '2025-06-05',
    status: 'PENDING',
    rewardStatus: 'N/A',
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-104',
    referrerName: 'Sneha Patil',
    referrerId: 'M004',
    refereeName: 'Ravi Kumar',
    refereePhone: '9876543213',
    dateReferred: '2025-06-07',
    status: 'REJECTED',
    rewardStatus: 'N/A',
    rewardAmount: 50000,
    rewardType: 'CASH' },
  {
    id: 'ref-105',
    referrerName: 'Neha Singh',
    referrerId: 'M007',
    refereeName: 'Pooja Nair',
    refereePhone: '9876543218',
    dateReferred: '2025-06-10',
    status: 'JOINED',
    rewardStatus: 'PENDING',
    rewardAmount: 100000, // Special promo
    rewardType: 'DISCOUNT' }
];

export const MOCK_REFERRALS_KPIS: ManagerReferralsKPIs = {
  totalReferrals: MOCK_REFERRALS.length,
  totalConverted: MOCK_REFERRALS.filter((ref) => ref.status === 'JOINED').length,
  pendingRewards: MOCK_REFERRALS.filter((ref) => ref.rewardStatus === 'PENDING').length,
  claimedRewards: MOCK_REFERRALS.filter((ref) => ref.rewardStatus === 'CLAIMED').length,
  conversionRate: MOCK_REFERRALS.length ? (MOCK_REFERRALS.filter((ref) => ref.status === 'JOINED').length / MOCK_REFERRALS.length) * 100 : 0,
  totalRewardsPaidOut: MOCK_REFERRALS.filter((ref) => ref.rewardStatus === 'CLAIMED').reduce((sum, ref) => sum + ref.rewardAmount, 0) };
