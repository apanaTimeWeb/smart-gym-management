/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBroadcastsV1MockFixtures owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_BROADCASTS_AUDIENCE_INSIGHTS_MOCK_FIXTURE = {
    'segments': [
        {
            'name': 'Trials ending in 5 days',
            'count': 27,
            'description': 'Trial end date within 5 days.'
        },
        {
            'name': 'Payment recovery',
            'count': 9,
            'description': 'Failed payment with recovery still open.'
        },
        {
            'name': 'Low usage',
            'count': 41,
            'description': 'Usage below 30% for two cycles.'
        },
        {
            'name': 'At risk',
            'count': 18,
            'description': 'Health score below 70.'
        },
        {
            'name': 'Growth ready',
            'count': 33,
            'description': 'High usage and strong recent growth.'
        }
    ],
    'channels': [
        {
            'name': 'In-app',
            'sent': 820,
            'delivered': 816,
            'opened': 620,
            'clicked': 190
        },
        {
            'name': 'Email',
            'sent': 640,
            'delivered': 620,
            'opened': 312,
            'clicked': 84
        },
        {
            'name': 'WhatsApp',
            'sent': 510,
            'delivered': 498,
            'opened': 470,
            'clicked': 116
        }
    ],
    'templates': [
        'Trial ending',
        'Payment failed',
        'Feature release',
        'Maintenance notice',
        'Upgrade opportunity'
    ]
} as const;
