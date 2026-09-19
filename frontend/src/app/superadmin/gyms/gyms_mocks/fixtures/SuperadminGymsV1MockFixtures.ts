// RESPONSIBILITY: Owns complete mutable MSW fixture data for Superadmin tenant business controls.
import type { SuperadminGymsV1Data } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types';

export const SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE: SuperadminGymsV1Data = {
  segments: [
    { name: 'High income + at risk', count: 18, rule: 'Monthly income above ₹50,000 and health below 70.' },
    { name: 'Trial ending soon', count: 27, rule: 'Trial ends within 5 days.' },
    { name: 'Usage almost full', count: 12, rule: 'Any major limit above 90%.' },
    { name: 'Payment recovery', count: 9, rule: 'Payment failed and recovery is still open.' },
  ],
  filters: [
    { key: 'all', label: 'All tenants' },
    { key: 'active', label: 'Active tenants' },
    { key: 'trial', label: 'Trial tenants' },
    { key: 'suspended', label: 'Suspended tenants' },
    { key: 'high-income', label: 'High income' },
    { key: 'high-usage', label: 'High usage' },
    { key: 'health-risk', label: 'Health risk' },
    { key: 'payment-recovery', label: 'Payment recovery' },
  ],
  bulk: ['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'],
  saved: [
    { key: 'health-risk', label: 'High income + at risk' },
    { key: 'trial', label: 'Trials ending soon' },
    { key: 'payment-recovery', label: 'Payment recovery queue' },
  ],
  rows: [
    { id: 'tenant-bc-1', name: 'Iron Core Fitness', status: 'ACTIVE', region: 'Delhi', plan: 'Business', income: 148000, health: 94, usage: 71, trialDays: 0, paymentRecoveryOpen: false, lastAction: null },
    { id: 'tenant-bc-2', name: 'Prime Motion', status: 'TRIAL', region: 'Pune', plan: 'Starter', income: 51000, health: 58, usage: 94, trialDays: 3, paymentRecoveryOpen: false, lastAction: null },
    { id: 'tenant-bc-3', name: 'FitNest Studio', status: 'ACTIVE', region: 'Mumbai', plan: 'Professional', income: 89000, health: 88, usage: 67, trialDays: 0, paymentRecoveryOpen: true, lastAction: null },
    { id: 'tenant-bc-4', name: 'Urban Strength', status: 'ACTIVE', region: 'Bengaluru', plan: 'Professional', income: 76000, health: 63, usage: 91, trialDays: 0, paymentRecoveryOpen: false, lastAction: null },
  ],
};
