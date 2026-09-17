// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE = {
    'changes': [
        {
            'time': '2026-09-17T12:05:00Z',
            'actor': 'Nisha Kapoor',
            'action': 'Plan changed',
            'resource': 'Urban Strength',
            'before': 'Professional',
            'after': 'Business',
            'risk': 'MEDIUM'
        },
        {
            'time': '2026-09-17T11:42:00Z',
            'actor': 'Kabir Shah',
            'action': 'Ticket reassigned',
            'resource': 'T-1802',
            'before': 'Riya Joshi',
            'after': 'Kabir Shah',
            'risk': 'LOW'
        },
        {
            'time': '2026-09-17T10:21:00Z',
            'actor': 'Aarav Mehta',
            'action': 'Tenant suspended',
            'resource': 'Old Town Gym',
            'before': 'ACTIVE',
            'after': 'SUSPENDED',
            'risk': 'HIGH'
        }
    ],
    'anomalies': [
        {
            'title': 'Many changes in a short period',
            'detail': '7 tenant status changes by one operator in 6 minutes.',
            'severity': 'HIGH'
        },
        {
            'title': 'Repeated billing adjustments',
            'detail': '4 manual credits for the same tenant in 24 hours.',
            'severity': 'MEDIUM'
        }
    ],
    'filters': [
        'Actor',
        'Tenant',
        'Action',
        'Risk',
        'IP address',
        'Date range'
    ]
} as const;
