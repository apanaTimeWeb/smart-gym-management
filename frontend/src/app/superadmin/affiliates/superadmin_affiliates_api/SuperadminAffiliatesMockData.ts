import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';

export const MOCK_SUPERADMIN_AFFILIATES: Affiliate[] = [
  {
    id: 'a1', name: 'John Doe', email: 'john@influencer.com', phone: '9876543210',
    referralCode: 'JOHN50', totalReferred: 25, commissionEarned: 15000,
    commissionRate: 15, pendingPayout: 5000, bankDetails: 'HDFC Bank - 1234',
    status: 'ACTIVE', joinedAt: '2023-01-15', referralCount: 120, conversionRate: 20.8
  },
  {
    id: 'a2', name: 'Fit Channel', email: 'hello@fitchannel.com', phone: '9876543211',
    referralCode: 'FIT100', totalReferred: 150, commissionEarned: 120000,
    commissionRate: 20, pendingPayout: 0, bankDetails: 'SBI - 5678',
    status: 'ACTIVE', joinedAt: '2023-04-10', referralCount: 500, conversionRate: 30.0
  },
  {
    id: 'a3', name: 'Jane Smith', email: 'jane@blogger.com', phone: '9876543212',
    referralCode: 'JANE25', totalReferred: 0, commissionEarned: 0,
    commissionRate: 10, pendingPayout: 0, bankDetails: 'ICICI - 9012',
    status: 'INACTIVE', joinedAt: '2023-09-01', referralCount: 10, conversionRate: 0.0
  }
];
