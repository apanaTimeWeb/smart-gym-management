// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE = {
    'branches': [
        {
            'name': 'Delhi Central',
            'gym': 'FitNation Group',
            'region': 'Delhi NCR',
            'members': 1820,
            'income': 92000,
            'growth': 18.1,
            'health': 94
        },
        {
            'name': 'Andheri West',
            'gym': 'Prime Fitness Network',
            'region': 'Mumbai',
            'members': 1290,
            'income': 62000,
            'growth': 4.9,
            'health': 85
        },
        {
            'name': 'HSR Layout',
            'gym': 'Urban Fit Collective',
            'region': 'Bengaluru',
            'members': 980,
            'income': 41000,
            'growth': -7.2,
            'health': 61
        },
        {
            'name': 'Baner',
            'gym': 'FitNest Studio',
            'region': 'Pune',
            'members': 860,
            'income': 38000,
            'growth': 12.4,
            'health': 88
        }
    ],
    'filters': [
        'Gym',
        'Franchise',
        'Region',
        'State',
        'Status',
        'Plan'
    ],
    'periods': [
        '30 days',
        '90 days',
        '12 months'
    ]
} as const;
