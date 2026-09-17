// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE = {
    'metrics': {
        'existingIncomeRetained': 91.8,
        'grossIncomeRetained': 88.9,
        'gymRetention': 94.6,
        'revenueLost': 5.7,
        'customerChurn': 5.4
    },
    'cohort': [
        {
            'month': 'Jan',
            'm1': 100,
            'm2': 97,
            'm3': 94,
            'm6': 91,
            'm12': 86
        },
        {
            'month': 'Feb',
            'm1': 100,
            'm2': 96,
            'm3': 93,
            'm6': 89,
            'm12': 84
        },
        {
            'month': 'Mar',
            'm1': 100,
            'm2': 98,
            'm3': 95,
            'm6': 92,
            'm12': 88
        },
        {
            'month': 'Apr',
            'm1': 100,
            'm2': 97,
            'm3': 94,
            'm6': 90,
            'm12': 85
        }
    ],
    'movement': [
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
    ],
    'adoption': [
        {
            'feature': 'WhatsApp',
            'available': 900,
            'active': 710,
            'used': 620
        },
        {
            'feature': 'Reports',
            'available': 900,
            'active': 820,
            'used': 510
        },
        {
            'feature': 'QR check-in',
            'available': 900,
            'active': 790,
            'used': 690
        },
        {
            'feature': 'Online payments',
            'available': 900,
            'active': 760,
            'used': 600
        }
    ],
    'sources': [
        {
            'source': 'Direct sales',
            'gyms': 42,
            'monthlyIncome': 520000,
            'churn': 4.1
        },
        {
            'source': 'Affiliate',
            'gyms': 28,
            'monthlyIncome': 310000,
            'churn': 3.6
        },
        {
            'source': 'Referral',
            'gyms': 19,
            'monthlyIncome': 198000,
            'churn': 2.9
        },
        {
            'source': 'Organic',
            'gyms': 31,
            'monthlyIncome': 285000,
            'churn': 5.2
        }
    ],
    'concentration': [
        {
            'group': 'Top 10 gyms',
            'share': 31
        },
        {
            'group': 'Top franchise',
            'share': 18
        },
        {
            'group': 'Professional plan',
            'share': 62
        }
    ]
} as const;
