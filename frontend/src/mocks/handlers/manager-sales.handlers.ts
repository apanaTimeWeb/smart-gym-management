import { http, HttpResponse } from 'msw';
import { 
  MOCK_SALES_OVERVIEW, 
  MOCK_MEMBERSHIP_REPORT, 
  MOCK_PENDING_PAYMENTS, 
  MOCK_ALL_MEMBERSHIPS 
} from '@/app/manager/sales/sales_api/ManagerSalesMockData';
import type { MembershipTotals } from '@/app/manager/sales/sales_types/ManagerSalesTypes';

export const managerSalesHandlers = [
  http.get('http://localhost:5000/api/v1/manager/sales/overview', () => {
    return HttpResponse.json({
      success: true,
      message: 'Overview fetched',
      data: { monthlyRevenue: MOCK_SALES_OVERVIEW }
    });
  }),

  http.get('http://localhost:5000/api/v1/manager/sales/membership-report', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    
    let report = [...MOCK_MEMBERSHIP_REPORT];
    if (search) {
      report = report.filter(m => m.name?.toLowerCase().includes(search));
    }
    
    const totals: MembershipTotals = {
      activeCount: report.length,
      revenue: report.reduce((sum, item) => sum + (item.received || 0), 0),
      totalReceivable: report.reduce((sum, item) => sum + (item.receivable || 0), 0),
      totalReceived: report.reduce((sum, item) => sum + (item.received || 0), 0),
      remaining: report.reduce((sum, item) => sum + (item.remaining || 0), 0),
      refunds: report.reduce((sum, item) => sum + (item.refund || 0), 0),
    };
    
    return HttpResponse.json({
      success: true,
      message: 'Report fetched',
      data: { report, totals }
    });
  }),

  http.get('http://localhost:5000/api/v1/manager/sales/pending-payments', ({ request }) => {
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

  http.get('http://localhost:5000/api/v1/manager/sales/all-memberships', ({ request }) => {
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
