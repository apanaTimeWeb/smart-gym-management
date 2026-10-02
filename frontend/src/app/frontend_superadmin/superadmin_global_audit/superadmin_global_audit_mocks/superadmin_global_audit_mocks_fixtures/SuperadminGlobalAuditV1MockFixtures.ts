import { SUPERADMIN_AUDIT_TENANT_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditConstants';
/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGlobalAuditV1MockFixtures owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns complete MSW fixture data for this Superadmin feature.
export const SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE = {
    'changes': [
        {
            'time': '2026-09-17T12:05:00Z',
            'actor': 'Nisha Kapoor',
            'action': 'Plan changed',
            'resource': 'Urban Strength',
            'before': 'Professional',
            'after': 'Business',
            'risk': 'MEDIUM'
        },
        {
            'time': '2026-09-17T11:42:00Z',
            'actor': 'Kabir Shah',
            'action': 'Ticket reassigned',
            'resource': 'T-1802',
            'before': 'Riya Joshi',
            'after': 'Kabir Shah',
            'risk': 'LOW'
        },
        {
            'time': '2026-09-17T10:21:00Z',
            'actor': 'Aarav Mehta',
            'action': 'Tenant suspended',
            'resource': 'Old Town Gym',
            'before': SUPERADMIN_AUDIT_TENANT_STATUS_CODES.ACTIVE,
            'after': SUPERADMIN_AUDIT_TENANT_STATUS_CODES.SUSPENDED,
            'risk': 'HIGH'
        }
    ],
    'anomalies': [
        {
            'title': 'Many changes in a short period',
            'detail': '7 tenant status changes by one operator in 6 minutes.',
            'severity': 'HIGH'
        },
        {
            'title': 'Repeated billing adjustments',
            'detail': '4 manual credits for the same tenant in 24 hours.',
            'severity': 'MEDIUM'
        }
    ],
    'filters': [
        'Actor',
        'Tenant',
        'Action',
        'Risk',
        'IP address',
        'Date range'
    ]
} as const;
