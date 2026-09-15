import { http, HttpResponse, delay } from 'msw';
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/reports';

export const MOCK_SUPERADMIN_REPORTS_REVENUE: RevenueRow[] = [
  { month: 'Jan', mrr: 150000, newRevenue: 10000, cancelledRevenue: 2000, netRevenue: 8000, tenantCount: 50 },
  { month: 'Feb', mrr: 160000, newRevenue: 15000, cancelledRevenue: 5000, netRevenue: 10000, tenantCount: 60 },
  { month: 'Mar', mrr: 180000, newRevenue: 25000, cancelledRevenue: 5000, netRevenue: 20000, tenantCount: 75 },
];

export const MOCK_SUPERADMIN_REPORTS_CANCELLATIONS: CancellationsRecord[] = [
  { id: 'ch1', gymName: 'Power Gym', ownerName: 'Bob Builder', plan: 'Enterprise', cancelledAt: '2023-11-01', reason: 'Too expensive', mrr: 15000, daysActive: 650 },
  { id: 'ch2', gymName: 'Yoga Center', ownerName: 'Alice Yoga', plan: 'Basic', cancelledAt: '2023-11-15', reason: 'Closing business', mrr: 2000, daysActive: 300 },
];

export const MOCK_SUPERADMIN_REPORTS_HEALTH: TenantHealthScore[] = [
  { id: 'th1', gymName: 'Iron Paradise', plan: 'Pro', score: 95, grade: 'A', memberCount: 200, lastLogin: '2023-11-20', paymentHealth: 'GOOD', featureUsage: 85, supportTickets: 1 },
  { id: 'th2', gymName: 'Fit Life Studio', plan: 'Basic', score: 65, grade: 'C', memberCount: 50, lastLogin: '2023-11-01', paymentHealth: 'AT_RISK', featureUsage: 30, supportTickets: 5 },
  { id: 'th3', gymName: 'CrossFit Box', plan: 'Enterprise', score: 45, grade: 'F', memberCount: 10, lastLogin: '2023-10-15', paymentHealth: 'OVERDUE', featureUsage: 10, supportTickets: 12 },
];

export const superadminReportsHandlers = [
  http.get(`${BASE_URL}/revenue`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<RevenueRow[]>>({
      success: true,
      message: 'Success',
      data: MOCK_SUPERADMIN_REPORTS_REVENUE,
    });
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
        if (!c.cancelledAt) return true;
        const cancelled = new Date(c.cancelledAt);
        if (startDate && cancelled < new Date(startDate)) return false;
        if (endDate && cancelled > new Date(endDate)) return false;
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
