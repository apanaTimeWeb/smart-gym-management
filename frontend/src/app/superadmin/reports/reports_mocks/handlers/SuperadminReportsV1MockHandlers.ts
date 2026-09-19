// RESPONSIBILITY: Owns MSW handler behavior for period/segment-specific Superadmin report comparison.
import { http, HttpResponse } from 'msw';
import { SuperadminReportsV1UrlConfig } from '@/app/superadmin/reports/superadmin_reports_comparison_url_config';
import { SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE } from '@/app/superadmin/reports/reports_mocks/fixtures/SuperadminReportsV1MockFixtures';

export const superadminReportsV1Handlers = [
  http.get('*' + SuperadminReportsV1UrlConfig.BACKEND_API.BASE, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const periodKey = params.get('period') ?? 'month';
    const segmentKey = params.get('segment') ?? 'all';
    const selected = SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE.comparisonSets.find((set) => set.periodKey === periodKey && set.segmentKey === segmentKey) ?? SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE.comparisonSets[0];
    return HttpResponse.json({ success: true, message: 'Report comparison data loaded.', data: { ...SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE, metrics: selected.metrics } });
  }),
];
