import type { ChurnAlert, ChurnKpiData } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

export const MOCK_SUPERADMIN_CHURN_ALERTS: ChurnAlert[] = [
  {
    id: 'ca1', tenantId: 't1', gymName: 'Iron Paradise', ownerName: 'Alice', adminEmail: 'alice@iron.com',
    phone: '9876543210', plan: 'Pro', riskLevel: 'CRITICAL', actionStatus: 'PENDING',
    riskScore: 90, lastLoginDays: 30, memberDrop: 15, paymentFailures: 2, renewalDaysLeft: 5,
    mrrAtRisk: 5000, notes: '', flaggedAt: '2023-11-20T10:00:00Z'
  },
  {
    id: 'ca2', tenantId: 't2', gymName: 'Fit Life Studio', ownerName: 'Bob', adminEmail: 'bob@fitlife.com',
    phone: '9876543211', plan: 'Basic', riskLevel: 'HIGH', actionStatus: 'CONTACTED',
    riskScore: 75, lastLoginDays: 15, memberDrop: 5, paymentFailures: 1, renewalDaysLeft: 10,
    mrrAtRisk: 2000, notes: 'Called them yesterday.', flaggedAt: '2023-11-18T10:00:00Z'
  }
];

export const MOCK_SUPERADMIN_CHURN_KPIS: ChurnKpiData = {
  totalAtRisk: 2,
  criticalCount: 1,
  highCount: 1,
  estimatedMrrAtRisk: 7000
};
