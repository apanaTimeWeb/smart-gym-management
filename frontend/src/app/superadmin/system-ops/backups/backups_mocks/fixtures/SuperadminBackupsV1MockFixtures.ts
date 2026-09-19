// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE = {
    'summary': {
        'healthy': 838,
        'warning': 4,
        'failed': 3,
        'lastRestoreTest': '2026-09-10',
        'restoreTestStatus': 'PASSED',
        'recoveryPointTarget': '24 hours',
        'recoveryTimeTarget': '4 hours'
    },
    'tenants': [
        {
            'gym': 'Iron Core Fitness',
            'lastBackup': '2026-09-17T02:00:00Z',
            'size': '18 GB',
            'ageHours': 2,
            'status': 'HEALTHY'
        },
        {
            'gym': 'Prime Motion',
            'lastBackup': '2026-09-15T02:00:00Z',
            'size': '11 GB',
            'ageHours': 50,
            'status': 'WARNING'
        },
        {
            'gym': 'Old Town Gym',
            'lastBackup': '2026-09-13T02:00:00Z',
            'size': '9 GB',
            'ageHours': 98,
            'status': 'FAILED'
        }
    ],
    'restoreHistory': [
        {
            'date': '2026-09-10',
            'scope': '3 sample tenants',
            'durationMinutes': 34,
            'status': 'PASSED'
        },
        {
            'date': '2026-08-25',
            'scope': '1 sample tenant',
            'durationMinutes': 29,
            'status': 'PASSED'
        }
    ]
} as const;
