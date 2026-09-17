// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_TICKETS_SERVICE_INSIGHTS_MOCK_FIXTURE = {
    'summary': {
        'open': 42,
        'urgent': 7,
        'nearTarget': 9,
        'overTarget': 4,
        'averageFirstResponseMinutes': 31,
        'averageResolutionHours': 9.4,
        'satisfaction': 4.6
    },
    'agents': [
        {
            'name': 'Nisha Kapoor',
            'open': 11,
            'urgent': 2,
            'overTarget': 1,
            'averageHours': 7.2
        },
        {
            'name': 'Kabir Shah',
            'open': 15,
            'urgent': 3,
            'overTarget': 2,
            'averageHours': 10.1
        },
        {
            'name': 'Riya Joshi',
            'open': 9,
            'urgent': 1,
            'overTarget': 1,
            'averageHours': 8.4
        }
    ],
    'aging': [
        {
            'bucket': '0-1 day',
            'count': 17
        },
        {
            'bucket': '2-3 days',
            'count': 11
        },
        {
            'bucket': '4-7 days',
            'count': 8
        },
        {
            'bucket': '8+ days',
            'count': 6
        }
    ],
    'categories': [
        {
            'name': 'Billing',
            'count': 14
        },
        {
            'name': 'Technical',
            'count': 16
        },
        {
            'name': 'Feature request',
            'count': 7
        },
        {
            'name': 'Account',
            'count': 5
        }
    ]
} as const;
