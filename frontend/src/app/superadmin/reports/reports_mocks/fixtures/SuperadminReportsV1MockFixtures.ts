// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE = {
    'periods': [
        'This month vs last month',
        'This quarter vs last quarter',
        'This year vs last year'
    ],
    'segments': [
        'All gyms',
        'By plan',
        'By region',
        'By franchise',
        'Trial vs paid'
    ],
    'metrics': [
        {
            'name': 'Monthly income',
            'current': 1395000,
            'previous': 1308000,
            'change': 6.7
        },
        {
            'name': 'Active gyms',
            'current': 842,
            'previous': 811,
            'change': 3.8
        },
        {
            'name': 'Gym retention',
            'current': 94.8,
            'previous': 93.9,
            'change': 1.0
        },
        {
            'name': 'Customer churn',
            'current': 5.2,
            'previous': 6.1,
            'change': -14.8
        }
    ],
    'planComparison': [
        {
            'name': 'Starter',
            'income': 220000,
            'gyms': 92
        },
        {
            'name': 'Professional',
            'income': 610000,
            'gyms': 318
        },
        {
            'name': 'Business',
            'income': 410000,
            'gyms': 154
        },
        {
            'name': 'Enterprise',
            'income': 155000,
            'gyms': 41
        }
    ],
    'regionComparison': [
        {
            'name': 'Delhi NCR',
            'current': 410000,
            'previous': 370000
        },
        {
            'name': 'Mumbai',
            'current': 300000,
            'previous': 281000
        },
        {
            'name': 'Bengaluru',
            'current': 268000,
            'previous': 251000
        },
        {
            'name': 'Pune',
            'current': 154000,
            'previous': 147000
        }
    ]
} as const;
