// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE = {
    'templates': [
        {
            'name': 'Trial ending',
            'channel': 'Email + WhatsApp',
            'uses': 42,
            'status': 'APPROVED'
        },
        {
            'name': 'Payment failed',
            'channel': 'Email + WhatsApp',
            'uses': 31,
            'status': 'APPROVED'
        },
        {
            'name': 'New feature release',
            'channel': 'In-app + Email',
            'uses': 15,
            'status': 'APPROVED'
        },
        {
            'name': 'Maintenance notice',
            'channel': 'In-app',
            'uses': 9,
            'status': 'DRAFT'
        }
    ],
    'campaigns': [
        {
            'name': 'September payment recovery',
            'sent': 90,
            'delivered': 88,
            'opened': 64,
            'responded': 21
        },
        {
            'name': 'New reports release',
            'sent': 320,
            'delivered': 313,
            'opened': 212,
            'responded': 54
        },
        {
            'name': 'Trial activation reminder',
            'sent': 127,
            'delivered': 122,
            'opened': 91,
            'responded': 37
        }
    ],
    'channels': [
        'In-app',
        'Email',
        'WhatsApp',
        'SMS'
    ]
} as const;
