// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_GYMS_BUSINESS_CONTROLS_MOCK_FIXTURE = {
    'segments': [
        {
            'name': 'High income + at risk',
            'count': 18,
            'rule': 'Monthly income above ₹50,000 and health below 70.'
        },
        {
            'name': 'Trial ending soon',
            'count': 27,
            'rule': 'Trial ends within 5 days.'
        },
        {
            'name': 'Usage almost full',
            'count': 12,
            'rule': 'Any major limit above 90%.'
        },
        {
            'name': 'Payment recovery',
            'count': 9,
            'rule': 'Payment failed and recovery is still open.'
        }
    ],
    'filters': [
        'Gym status',
        'Plan',
        'Region',
        'Income range',
        'Member range',
        'Usage level',
        'Health level',
        'Last active',
        'Trial end date'
    ],
    'bulk': [
        'Send message',
        'Extend trial',
        'Export selected',
        'Move plan',
        'Suspend selected'
    ],
    'saved': [
        'High income + at risk',
        'Trials ending soon',
        'Payment recovery queue'
    ],
    'rows': [
        {
            'name': 'Iron Core Fitness',
            'status': 'ACTIVE',
            'region': 'Delhi',
            'plan': 'Business',
            'income': 148000,
            'health': 94,
            'usage': 71
        },
        {
            'name': 'Prime Motion',
            'status': 'TRIAL',
            'region': 'Pune',
            'plan': 'Starter',
            'income': 51000,
            'health': 58,
            'usage': 94
        },
        {
            'name': 'FitNest Studio',
            'status': 'ACTIVE',
            'region': 'Mumbai',
            'plan': 'Professional',
            'income': 89000,
            'health': 88,
            'usage': 67
        },
        {
            'name': 'Urban Strength',
            'status': 'ACTIVE',
            'region': 'Bengaluru',
            'plan': 'Professional',
            'income': 76000,
            'health': 63,
            'usage': 91
        }
    ]
} as const;
