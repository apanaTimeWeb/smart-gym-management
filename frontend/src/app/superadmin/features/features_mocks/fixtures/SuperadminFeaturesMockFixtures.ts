export const SUPERADMIN_FEATURES_MOCK_TENANTS = [
  { id: 't1', name: 'Iron Paradise', plan: 'Pro' },
  { id: 't2', name: 'Fit Life Studio', plan: 'Basic' },
  { id: 't3', name: 'CrossFit Box', plan: 'Enterprise' },
];

export const SUPERADMIN_FEATURE_HISTORY_MOCK_FIXTURES = {
  f1: [
    { id: 'hist-f1-1', action: 'Created feature flag', user: 'System Admin', timestamp: '2026-06-18T10:00:00Z' },
    { id: 'hist-f1-2', action: 'Enabled for initial canary tenants', user: 'Superadmin User', timestamp: '2026-09-01T09:00:00Z' },
  ],
  f2: [
    { id: 'hist-f2-1', action: 'Created feature flag', user: 'System Admin', timestamp: '2026-05-10T10:00:00Z' },
    { id: 'hist-f2-2', action: 'Enabled globally', user: 'Superadmin User', timestamp: '2026-08-29T14:30:00Z' },
  ],
  f3: [
    { id: 'hist-f3-1', action: 'Created feature flag', user: 'System Admin', timestamp: '2026-07-05T11:00:00Z' },
    { id: 'hist-f3-2', action: 'Enabled for Enterprise canary', user: 'Superadmin User', timestamp: '2026-09-03T15:30:00Z' },
  ],
} as const;
