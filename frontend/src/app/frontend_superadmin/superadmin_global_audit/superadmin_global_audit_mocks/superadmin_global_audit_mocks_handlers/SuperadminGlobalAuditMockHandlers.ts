/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGlobalAuditMockHandlers owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_mocks/superadmin_global_audit_mocks_fixtures/SuperadminGlobalAuditMockFixtures, @/lib/api, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { http, HttpResponse, delay } from 'msw';

import { MOCK_SUPERADMIN_GLOBAL_AUDIT } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_mocks/superadmin_global_audit_mocks_fixtures/SuperadminGlobalAuditMockFixtures';

import type { AuditLog, GlobalAuditListMeta } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes';
import type { ApiResponse } from '@/lib/api';


const BASE_URL = '*/superadmin/audit-logs';
export const superadminGlobalAuditHandlers = [
    http.get('*' + BASE_URL, async ({ request }) => {
        await delay(120);
        const url = new URL(request.url);
        const page = Math.max(Number(url.searchParams.get('page')) || 1, 1);
        const limit = Math.max(Number(url.searchParams.get('limit')) || 20, 1);
        const search = (url.searchParams.get('search') || '').toLowerCase();
        const severity = url.searchParams.get('severity');
        const actorType = url.searchParams.get('actorType');
        let rows = MOCK_SUPERADMIN_GLOBAL_AUDIT.filter((log) => {
            const matchesSearch = !search || [log.action, log.actor, log.resource, log.details, log.tenantName || ''].some((value) => value.toLowerCase().includes(search));
            const matchesSeverity = !severity || severity === 'ALL' || log.severity === severity;
            const matchesActor = !actorType || actorType === 'ALL' || log.actorType === actorType;
            return matchesSearch && matchesSeverity && matchesActor;
        });
        const total = rows.length;
        const totalPages = Math.max(Math.ceil(total / limit), 1);
        rows = rows.slice((page - 1) * limit, page * limit);
        const meta: GlobalAuditListMeta = { total, page, limit, totalPages };
        return HttpResponse.json<ApiResponse<AuditLog[]>>({ success: true, message: 'Success', data: rows, meta });
    }),
];
