// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_FRANCHISES_360_MOCK_FIXTURE = {
    'franchises': [
        {
            'name': 'FitNation Group',
            'branches': 12,
            'gyms': 12,
            'income': 480000,
            'growth': 14.2,
            'health': 91
        },
        {
            'name': 'Prime Fitness Network',
            'branches': 8,
            'gyms': 8,
            'income': 298000,
            'growth': 8.4,
            'health': 86
        },
        {
            'name': 'Urban Fit Collective',
            'branches': 5,
            'gyms': 5,
            'income': 182000,
            'growth': -1.6,
            'health': 67
        }
    ],
    'branchComparison': [
        {
            'branch': 'FitNation - Connaught',
            'franchise': 'FitNation Group',
            'members': 1820,
            'income': 92000,
            'growth': 18.1,
            'health': 94
        },
        {
            'branch': 'FitNation - Rohini',
            'franchise': 'FitNation Group',
            'members': 1510,
            'income': 74000,
            'growth': 12.2,
            'health': 90
        },
        {
            'branch': 'Prime Fitness - Andheri',
            'franchise': 'Prime Fitness Network',
            'members': 1290,
            'income': 62000,
            'growth': 4.9,
            'health': 85
        },
        {
            'branch': 'Urban Fit - HSR',
            'franchise': 'Urban Fit Collective',
            'members': 980,
            'income': 41000,
            'growth': -7.2,
            'health': 61
        }
    ],
    'financials': [
        {
            'franchise': 'FitNation Group',
            'royalty': 48000,
            'due': 0,
            'contract': '2025-2030'
        },
        {
            'franchise': 'Prime Fitness Network',
            'royalty': 29800,
            'due': 12000,
            'contract': '2026-2031'
        },
        {
            'franchise': 'Urban Fit Collective',
            'royalty': 18200,
            'due': 8500,
            'contract': '2024-2029'
        }
    ]
} as const;
