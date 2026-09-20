import { http, HttpResponse, delay } from 'msw';
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_REPORTS_REVENUE, MOCK_SUPERADMIN_REPORTS_CANCELLATIONS, MOCK_SUPERADMIN_REPORTS_HEALTH } from '@/app/superadmin/reports/reports_mocks/fixtures/SuperadminReportsMockFixtures';
const BASE_URL = `*${ReportsUrlConfig.BACKEND_API.BASE}`;
export const superadminReportsHandlers = [
    http.get(`${BASE_URL}/revenue`, async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const search = (url.searchParams.get('search') || '').toLowerCase();
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const planFilter = url.searchParams.get('planFilter');
        const filtered = MOCK_SUPERADMIN_REPORTS_REVENUE.filter((row) => {
            const matchesSearch = !search || row.month.toLowerCase().includes(search);
            const matchesPlan = !planFilter || planFilter === 'ALL';
            const monthDate = row.month === 'Jul' ? '2026-07-01' : row.month === 'Aug' ? '2026-08-01' : '2026-09-01';
            const matchesStart = !startDate || monthDate >= startDate;
            const matchesEnd = !endDate || monthDate <= endDate;
            return matchesSearch && matchesPlan && matchesStart && matchesEnd;
        });
        return HttpResponse.json<ApiResponse<RevenueRow[]>>({ success: true, message: 'Success', data: filtered });
    }),
    http.get(`${BASE_URL}/cancellations`, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const planFilter = url.searchParams.get('planFilter');
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        let filtered = [...MOCK_SUPERADMIN_REPORTS_CANCELLATIONS];
        if (search) {
            filtered = filtered.filter(c => c.gymName.toLowerCase().includes(search));
        }
        if (planFilter && planFilter !== 'ALL') {
            filtered = filtered.filter(c => c.plan.toUpperCase() === planFilter.toUpperCase());
        }
        if (startDate || endDate) {
            filtered = filtered.filter(c => {
                if (!c.cancelledAt)
                    return true;
                const cancelled = new Date(c.cancelledAt);
                if (startDate && cancelled < new Date(startDate))
                    return false;
                if (endDate && cancelled > new Date(endDate))
                    return false;
                return true;
            });
        }
        return HttpResponse.json<ApiResponse<CancellationsRecord[]>>({
            success: true,
            message: 'Success',
            data: filtered,
        });
    }),
    http.get(`${BASE_URL}/health`, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const planFilter = url.searchParams.get('planFilter');
        let filtered = [...MOCK_SUPERADMIN_REPORTS_HEALTH];
        if (search) {
            filtered = filtered.filter(h => h.gymName.toLowerCase().includes(search));
        }
        if (planFilter && planFilter !== 'ALL') {
            filtered = filtered.filter(h => h.plan.toUpperCase() === planFilter.toUpperCase());
        }
        return HttpResponse.json<ApiResponse<TenantHealthScore[]>>({
            success: true,
            message: 'Success',
            data: filtered,
        });
    }),
];
