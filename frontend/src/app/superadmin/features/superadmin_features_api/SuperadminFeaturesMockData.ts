import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

export const MOCK_SUPERADMIN_FEATURES: FeatureFlag[] = [
  { id: 'f1', name: 'Beta Dashboard', description: 'New analytics layout', isGlobalEnabled: false, enabledTenantIds: ['t1', 't2'] },
  { id: 'f2', name: 'AI Workout Generator', description: 'Generates workouts using AI', isGlobalEnabled: true, enabledTenantIds: [] },
  { id: 'f3', name: 'WhatsApp Integration', description: 'Send automated WhatsApp alerts', isGlobalEnabled: false, enabledTenantIds: ['t3'] },
];

export const MOCK_SUPERADMIN_RELEASE_NOTES: ReleaseNote[] = [
  { id: 'rn1', version: 'v2.1.0', title: 'WhatsApp Alerts Live', content: 'Added WhatsApp integration for all Enterprise users.', date: '2023-10-15', isPublished: true },
  { id: 'rn2', version: 'v2.2.0-beta', title: 'AI Workouts Beta', content: 'Testing AI generated workouts.', date: '2023-11-01', isPublished: false },
];
