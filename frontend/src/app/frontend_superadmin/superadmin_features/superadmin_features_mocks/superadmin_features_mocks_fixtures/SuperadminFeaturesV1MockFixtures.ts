// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE = {
    'rollouts': [
        {
            'feature': 'New Analytics',
            'rollout': 35,
            'target': 'Professional + Business',
            'status': 'ACTIVE',
            'health': 98
        },
        {
            'feature': 'Smart Receipts',
            'rollout': 100,
            'target': 'All gyms',
            'status': 'COMPLETED',
            'health': 99
        },
        {
            'feature': 'New Dashboard',
            'rollout': 10,
            'target': 'Pilot tenants',
            'status': 'SCHEDULED',
            'health': 100
        }
    ],
    'releases': [
        {
            'version': '2026.09.17',
            'date': '2026-09-17',
            'summary': 'Revenue insights and billing recovery updates',
            'impact': 'Superadmin only'
        },
        {
            'version': '2026.09.10',
            'date': '2026-09-10',
            'summary': 'Onboarding activation improvements',
            'impact': 'Superadmin + tenant onboarding'
        }
    ],
    'rollback': [
        {
            'feature': 'New Analytics',
            'lastRollback': 'Never',
            'lastHealthy': '2026-09-17T11:30:00Z'
        },
        {
            'feature': 'Smart Receipts',
            'lastRollback': '2026-08-12',
            'lastHealthy': '2026-09-17T10:15:00Z'
        }
    ]
} as const;
