import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_SALES_OVERVIEW, MOCK_MEMBERSHIP_REPORT, MOCK_PENDING_PAYMENTS, MOCK_ALL_MEMBERSHIPS } from '@/app/frontend_manager/manager_sales/manager_sales_mocks/manager_sales_mocks_fixtures/ManagerSalesMockData';
import { ManagerSalesUrlConfig } from '@/app/frontend_manager/manager_sales/manager_sales_url_config';
import type { MembershipTotals } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes';


/**
 * @description Provides the ManagerSalesMockHandlers implementation for the sales module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_sales/manager_sales_url_config; @/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerSalesHandlers = [
  http.get(managerMockApiUrl(ManagerSalesUrlConfig.BACKEND_API.OVERVIEW), () => {
    return HttpResponse.json({
      success: true,
      message: 'Overview fetched',
      data: { monthlyRevenue: MOCK_SALES_OVERVIEW }
    });
  }),

  http.get(managerMockApiUrl(ManagerSalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() || '';
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = MOCK_MEMBERSHIP_REPORT.filter((item) => !search || item.plan?.toLowerCase().includes(search));
    const startIndex = (page - 1) * limit;
    const report = filtered.slice(startIndex, startIndex + limit);
    const totals: MembershipTotals = {
      activeCount: filtered.length,
      revenue: filtered.reduce((sum, item) => sum + (item.received || 0), 0),
      totalReceivable: filtered.reduce((sum, item) => sum + (item.receivable || 0), 0),
      totalReceived: filtered.reduce((sum, item) => sum + (item.received || 0), 0),
      remaining: filtered.reduce((sum, item) => sum + (item.remaining || 0), 0),
      refunds: filtered.reduce((sum, item) => sum + (item.refund || 0), 0) };
    return HttpResponse.json({ success: true, message: 'Report fetched', data: { report, totals, total: filtered.length, page, limit } });
  }),

  http.get(managerMockApiUrl(ManagerSalesUrlConfig.BACKEND_API.PENDING_PAYMENTS), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    
    let members = [...MOCK_PENDING_PAYMENTS];
    if (search) {
      members = members.filter(m => m.name?.toLowerCase().includes(search) || m.phone?.includes(search));
    }
    
    const total = members.reduce((sum, item) => sum + (item.pendingAmount || 0), 0);
    
    return HttpResponse.json({
      success: true,
      message: 'Pending payments fetched',
      data: { members, total }
    });
  }),

  http.get(managerMockApiUrl(ManagerSalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    
    let members = [...MOCK_ALL_MEMBERSHIPS];
    if (search) {
      members = members.filter(m => m.name?.toLowerCase().includes(search) || m.phone?.includes(search) || m.email?.toLowerCase().includes(search));
    }
    
    return HttpResponse.json({
      success: true,
      message: 'All memberships fetched',
      data: { members, total: members.length }
    });
  })
];
