/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingV1MockFixtures owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { SUPERADMIN_MESSAGING_TEMPLATE_STATUS_CODES, SUPERADMIN_MESSAGING_CHANNEL_CODES, SUPERADMIN_MESSAGING_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';


// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_MESSAGING_TEMPLATE_INSIGHTS_MOCK_FIXTURE = {
    'templates': [
        {
            'name': 'Trial ending',
            'channel': 'Email + WhatsApp',
            'uses': 42,
            'status': SUPERADMIN_MESSAGING_TEMPLATE_STATUS_CODES.APPROVED
        },
        {
            'name': 'Payment failed',
            'channel': 'Email + WhatsApp',
            'uses': 31,
            'status': SUPERADMIN_MESSAGING_TEMPLATE_STATUS_CODES.APPROVED
        },
        {
            'name': 'New feature release',
            'channel': 'In-app + Email',
            'uses': 15,
            'status': SUPERADMIN_MESSAGING_TEMPLATE_STATUS_CODES.APPROVED
        },
        {
            'name': 'Maintenance notice',
            'channel': 'In-app',
            'uses': 9,
            'status': SUPERADMIN_MESSAGING_STATUS_CODES.DRAFT
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
        SUPERADMIN_MESSAGING_CHANNEL_CODES.SMS
    ]
} as const;
