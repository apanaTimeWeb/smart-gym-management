import { http, HttpResponse } from 'msw';
import { SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_fixtures/SuperadminReportsV1MockFixtures';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminReportsV1MockHandlers owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_fixtures/SuperadminReportsV1MockFixtures
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns MSW handler behavior for period/segment-specific Superadmin report comparison.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config';



export const superadminReportsV1Handlers = [
  http.get('*' + MODULE_URLS.COMPARISON.BACKEND_API.BASE, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const periodKey = params.get('period') ?? 'month';
    const segmentKey = params.get('segment') ?? 'all';
    const selected = SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE.comparisonSets.find((set) => set.periodKey === periodKey && set.segmentKey === segmentKey) ?? SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE.comparisonSets[0];
    return HttpResponse.json({ success: true, message: 'Report comparison data loaded.', data: { ...SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE, metrics: selected.metrics } });
  }),
];
