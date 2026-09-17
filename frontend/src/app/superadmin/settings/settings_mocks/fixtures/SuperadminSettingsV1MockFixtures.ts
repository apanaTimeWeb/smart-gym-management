// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_SETTINGS_GOVERNANCE_MOCK_FIXTURE = {
    'billing': [
        {
            'label': 'Trial period',
            'value': '14 days'
        },
        {
            'label': 'Payment grace period',
            'value': '7 days'
        },
        {
            'label': 'Invoice due reminder',
            'value': '3 days before due'
        },
        {
            'label': 'Automatic suspend',
            'value': '10 days overdue'
        }
    ],
    'security': [
        {
            'label': 'MFA for platform team',
            'value': 'Required'
        },
        {
            'label': 'Session timeout',
            'value': '8 hours'
        },
        {
            'label': 'Failed login lockout',
            'value': '5 attempts / 15 minutes'
        },
        {
            'label': 'Operator access review',
            'value': 'Every 90 days'
        }
    ],
    'data': [
        {
            'label': 'Backup retention',
            'value': '30 days'
        },
        {
            'label': 'Deleted tenant hold',
            'value': '30 days'
        },
        {
            'label': 'Audit retention',
            'value': '2 years'
        },
        {
            'label': 'Export expiry',
            'value': '7 days'
        }
    ],
    'communication': [
        {
            'label': 'Default sender',
            'value': 'Smart Gym 360'
        },
        {
            'label': 'Critical alerts',
            'value': 'In-app + Email'
        },
        {
            'label': 'Payment failure alerts',
            'value': 'In-app + Email'
        },
        {
            'label': 'Maintenance alerts',
            'value': 'In-app'
        }
    ]
} as const;
