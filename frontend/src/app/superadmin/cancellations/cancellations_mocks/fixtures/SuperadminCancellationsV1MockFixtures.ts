// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_CANCELLATIONS_REASON_INSIGHTS_MOCK_FIXTURE = {
    'reasons': [
        {
            'reason': 'Too expensive',
            'gyms': 8,
            'incomeLost': 72000
        },
        {
            'reason': 'Not using enough features',
            'gyms': 6,
            'incomeLost': 41000
        },
        {
            'reason': 'Technical problems',
            'gyms': 3,
            'incomeLost': 29000
        },
        {
            'reason': 'Payment issue',
            'gyms': 4,
            'incomeLost': 18000
        },
        {
            'reason': 'Competitor switch',
            'gyms': 2,
            'incomeLost': 17000
        }
    ],
    'outcomes': {
        'savedGyms': 12,
        'lostGyms': 11,
        'savedIncome': 98000,
        'lostIncome': 177000
    },
    'byPlan': [
        {
            'plan': 'Starter',
            'churn': 8.2
        },
        {
            'plan': 'Professional',
            'churn': 5.4
        },
        {
            'plan': 'Business',
            'churn': 3.1
        },
        {
            'plan': 'Enterprise',
            'churn': 2.4
        }
    ]
} as const;
