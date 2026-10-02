import { SUPERADMIN_FEATURE_FLAG_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_constants/SuperadminFeaturesUiConstants';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminFeaturesV1MockFixtures owned by the superadmin_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_FEATURES_ROLLOUT_INSIGHTS_MOCK_FIXTURE = {
    'rollouts': [
        {
            'feature': 'New Analytics',
            'rollout': 35,
            'target': 'Professional + Business',
            'status': SUPERADMIN_FEATURE_FLAG_STATUS_CODES.ACTIVE,
            'health': 98
        },
        {
            'feature': 'Smart Receipts',
            'rollout': 100,
            'target': 'All gyms',
            'status': SUPERADMIN_FEATURE_FLAG_STATUS_CODES.COMPLETED,
            'health': 99
        },
        {
            'feature': 'New Dashboard',
            'rollout': 10,
            'target': 'Pilot tenants',
            'status': 'SCHEDULED',
            'health': 100
        }
    ],
    'releases': [
        {
            'version': '2026.09.17',
            'date': '2026-09-17',
            'summary': 'Revenue insights and billing recovery updates',
            'impact': 'Superadmin only'
        },
        {
            'version': '2026.09.10',
            'date': '2026-09-10',
            'summary': 'Onboarding activation improvements',
            'impact': 'Superadmin + tenant onboarding'
        }
    ],
    'rollback': [
        {
            'feature': 'New Analytics',
            'lastRollback': 'Never',
            'lastHealthy': '2026-09-17T11:30:00Z'
        },
        {
            'feature': 'Smart Receipts',
            'lastRollback': '2026-08-12',
            'lastHealthy': '2026-09-17T10:15:00Z'
        }
    ]
} as const;
