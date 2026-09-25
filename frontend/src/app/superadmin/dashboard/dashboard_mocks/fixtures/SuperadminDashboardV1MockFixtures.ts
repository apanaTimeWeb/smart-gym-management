// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE = {
    'currency': 'INR',
    'openingIncome': 1200000,
    'newIncome': 185000,
    'growthIncome': 96000,
    'returningIncome': 34000,
    'reducedIncome': -42000,
    'lostIncome': -78000,
    'endingIncome': 1395000,
    'existingIncomeRetained': 91.4,
    'gymRetention': 94.8,
    'revenueLostPercent': 6.5,
    'customerChurn': 5.2,
    'alerts': [
        {
            'id': 'a1',
            'level': 'HIGH',
            'title': 'Payment retries need attention',
            'detail': '9 gyms have failed payments awaiting recovery.',
            'count': 9
        },
        {
            'id': 'a2',
            'level': 'HIGH',
            'title': 'Backup checks failed',
            'detail': '3 tenant backups are older than the allowed window.',
            'count': 3
        },
        {
            'id': 'a3',
            'level': 'MEDIUM',
            'title': 'Trial drop-off rising',
            'detail': 'Trial completion fell 7% versus the previous period.',
            'count': 7
        }
    ],
    'leaderboard': [
        {
            'name': 'Iron Core Fitness',
            'plan': 'Business',
            'income': 148000,
            'growth': 18.4,
            'health': 94
        },
        {
            'name': 'Pulse Arena',
            'plan': 'Enterprise',
            'income': 132000,
            'growth': 12.8,
            'health': 91
        },
        {
            'name': 'FitNest Studio',
            'plan': 'Professional',
            'income': 89000,
            'growth': 26.1,
            'health': 88
        },
        {
            'name': 'Urban Strength',
            'plan': 'Professional',
            'income': 76000,
            'growth': -4.8,
            'health': 63
        },
        {
            'name': 'Prime Motion',
            'plan': 'Starter',
            'income': 51000,
            'growth': -7.4,
            'health': 58
        }
    ],
    'waterfall': [
        {
            'label': 'Opening',
            'value': 1200000
        },
        {
            'label': 'New gyms',
            'value': 185000
        },
        {
            'label': 'Upgrades',
            'value': 96000
        },
        {
            'label': 'Returning',
            'value': 34000
        },
        {
            'label': 'Downgrades',
            'value': -42000
        },
        {
            'label': 'Lost gyms',
            'value': -78000
        },
        {
            'label': 'Closing',
            'value': 1395000
        }
    ]
} as const;
