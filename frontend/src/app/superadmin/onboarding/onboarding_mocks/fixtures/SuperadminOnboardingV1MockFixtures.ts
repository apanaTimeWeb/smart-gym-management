// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_ONBOARDING_ACTIVATION_INSIGHTS_MOCK_FIXTURE = {
    'steps': [
        {
            'label': 'Created gym',
            'count': 120
        },
        {
            'label': 'Verified email',
            'count': 112
        },
        {
            'label': 'Added staff',
            'count': 101
        },
        {
            'label': 'Added first members',
            'count': 94
        },
        {
            'label': 'Configured payments',
            'count': 82
        },
        {
            'label': 'First invoice',
            'count': 76
        },
        {
            'label': 'Active customer',
            'count': 69
        }
    ],
    'activation': {
        'score': 84,
        'averageDays': 3.2,
        'stalled': 11,
        'trialToPaid': 57.5
    },
    'stalls': [
        {
            'step': 'Configure payments',
            'gyms': 11
        },
        {
            'step': 'Add first members',
            'gyms': 7
        },
        {
            'step': 'First invoice',
            'gyms': 6
        }
    ],
    'cohort': [
        {
            'cohort': 'Week 1',
            'activation': 86,
            'conversion': 61
        },
        {
            'cohort': 'Week 2',
            'activation': 82,
            'conversion': 55
        },
        {
            'cohort': 'Week 3',
            'activation': 85,
            'conversion': 58
        }
    ]
} as const;
