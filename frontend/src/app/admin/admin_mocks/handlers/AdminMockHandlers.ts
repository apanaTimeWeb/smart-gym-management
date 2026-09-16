// RESPONSIBILITY: Owns the complete MSW transport contract for the Admin module.
// DATA FLOW: Admin API client → MSW handler → AdminMockFixtures → TanStack Query/UI
import { http, HttpResponse } from 'msw';
import {
  MOCK_ANNOUNCEMENTS,
  MOCK_ANNOUNCEMENT_KPI,
  MOCK_ADMIN_ATTENDANCE_SUMMARY,
  MOCK_ADMIN_ATTENDANCE_RECORDS,
  MOCK_ADMIN_ATTENDANCE_TREND,
  MOCK_ADMIN_DASHBOARD,
  MOCK_ADMIN_FINANCE_SUMMARY,
  MOCK_ADMIN_PAYMENTS,
  MOCK_ADMIN_BRANCH_PNL,
  MOCK_ADMIN_HR_SUMMARY,
  MOCK_ADMIN_STAFF,
  MOCK_ADMIN_PAYROLLS,
  MOCK_ADMIN_STAFF_PERFORMANCE,
  MOCK_ADMIN_LEDGER,
  MOCK_ADMIN_MEMBERS_SUMMARY,
  MOCK_ADMIN_MEMBERS,
  MOCK_ADMIN_PLANS,
  MOCK_ADMIN_PLAN_REVENUE,
  MOCK_ADMIN_PROFILE,
  MOCK_ADMIN_REPORTS,
  MOCK_ADMIN_SALES_OVERVIEW,
  MOCK_ADMIN_MEMBERSHIP_REPORT,
  MOCK_ADMIN_MEMBERSHIP_TOTALS,
  MOCK_ADMIN_PENDING_PAYMENTS,
  MOCK_ADMIN_ALL_MEMBERSHIPS,
  MOCK_ADMIN_SETTINGS,
  MOCK_ADMIN_USAGE_DATA,
  MOCK_ADMIN_NOTIFICATIONS,
  MOCK_ADMIN_EXPENSES,
  MOCK_PAYOUTS,
  MOCK_PNL,
  MOCK_PAYOUTS_KPI,
  MOCK_AUDIT_LOGS,
  MOCK_AUDIT_KPI,
  MOCK_BLACKLIST,
  MOCK_BLACKLIST_KPI,
  MOCK_COUPONS,
  MOCK_EXPORT_JOBS,
  MOCK_DATA_EXPORT_KPI,
  MOCK_GYM_HEALTH_ALERTS,
  MOCK_GYM_HEALTH_KPI,
  MOCK_ADMIN_BRANCHES,
  MOCK_CURRENT_SUBSCRIPTION,
  MOCK_SAAS_PLANS,
  MOCK_INVOICES,
  MOCK_PAYMENT_METHODS,
  MOCK_SUBSCRIPTION_KPI,
  MOCK_PERMISSIONS_DATA,
} from '@/app/admin/admin_mocks/fixtures/AdminMockFixtures';

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

export const adminHandlers = [
  http.get('*/admin/notifications', ({ request }) => {
    const url = new URL(request.url);
    const unreadOnly = url.searchParams.get('read') === 'false';
    const data = MOCK_ADMIN_NOTIFICATIONS.filter((notification) => unreadOnly ? !notification.read : true);
    return ok(data);
  }),
  http.patch('*/admin/notifications/:id/read', ({ params }) => {
    const notification = MOCK_ADMIN_NOTIFICATIONS.find((item) => item.id === String(params.id));
    return ok(notification ? { ...notification, read: true } : null, 'Notification marked as read');
  }),
  http.patch('*/admin/notifications/read-all', () => ok(null, 'Notifications marked as read')),

  http.get('*/admin/branches/fetchBranches', () => ok(MOCK_ADMIN_BRANCHES)),
  http.get('*/admin/usage/fetchMyUsage', () => ok(MOCK_ADMIN_USAGE_DATA)),
  http.get('*/admin/announcements/fetchAnnouncements', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const gymId = url.searchParams.get('gymId');
    const filtered = MOCK_ANNOUNCEMENTS.filter((item) => {
      const matchSearch = !search || item.title.toLowerCase().includes(search) || item.body.toLowerCase().includes(search);
      const matchStatus = !status || item.status === status;
      const matchPriority = !priority || item.priority === priority;
      const matchGym = !gymId || item.gymIds.includes(gymId) || item.gymIds.includes('all');
      return matchSearch && matchStatus && matchPriority && matchGym;
    });
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/announcements/fetchKPIs', () => ok(MOCK_ANNOUNCEMENT_KPI)),
  http.post('*/admin/announcements/createAnnouncement', () => ok(MOCK_ANNOUNCEMENTS[0]!, 'Announcement created')),
  http.post('*/admin/announcements/updateAnnouncement', () => ok(MOCK_ANNOUNCEMENTS[0]!, 'Announcement updated')),
  http.delete('*/admin/announcements/deleteAnnouncement', () => ok(null, 'Announcement deleted')),
  http.post('*/admin/announcements/togglePin', () => ok(MOCK_ANNOUNCEMENTS[0]!, 'Announcement updated')),
  http.get('*/admin/audit_logs/fetchLogs', () => ok(MOCK_AUDIT_LOGS)),
  http.get('*/admin/audit_logs/fetchKPIs', () => ok(MOCK_AUDIT_KPI)),
  http.get('*/admin/blacklist/fetchBlacklist', () => ok(MOCK_BLACKLIST)),
  http.get('*/admin/blacklist/fetchKPIs', () => ok(MOCK_BLACKLIST_KPI)),
  http.post('*/admin/blacklist/addToBlacklist', () => ok(null, 'Member added to blacklist')),
  http.delete('*/admin/blacklist/removeFromBlacklist', () => ok(null, 'Member removed from blacklist')),
  http.post('*/admin/blacklist/toggleBlacklist', () => ok(null, 'Blacklist status updated')),
  http.post('*/admin/blacklist/propagateToAllBranches', () => ok(null, 'Blacklist propagated')),
  http.get('*/admin/coupons/fetchCoupons', () => ok(MOCK_COUPONS)),
  http.post('*/admin/coupons/createCoupon', () => ok(null, 'Coupon created')),
  http.post('*/admin/coupons/updateCoupon', () => ok(null, 'Coupon updated')),
  http.delete('*/admin/coupons/deleteCoupon', () => ok(null, 'Coupon deleted')),
  http.post('*/admin/coupons/toggleCoupon', () => ok(null, 'Coupon status updated')),
  http.get('*/admin/dashboard/fetchDashboardStats', () => ok(MOCK_ADMIN_DASHBOARD)),
  http.get('*/admin/data-export/fetchJobs', () => ok(MOCK_EXPORT_JOBS)),
  http.get('*/admin/data-export/fetchKPIs', () => ok(MOCK_DATA_EXPORT_KPI)),
  http.post('*/admin/data-export/createExport', () => ok({ id: 'exp3', status: 'PROCESSING', fileName: 'new-export.csv' }, 'Export started')),
  http.delete('*/admin/data-export/deleteJob', () => ok(null, 'Export deleted')),
  http.get('*/admin/finance/payments/fetchPayments', () => ok({ payments: MOCK_ADMIN_PAYMENTS, total: MOCK_ADMIN_PAYMENTS.length })),
  http.post('*/admin/finance/payments/createPayment', () => ok(MOCK_ADMIN_PAYMENTS[0]!, 'Payment recorded')),
  http.get('*/admin/finance/summary', () => ok(MOCK_ADMIN_FINANCE_SUMMARY)),
  http.get('*/admin/finance/pnl/comparison', () => ok(MOCK_ADMIN_BRANCH_PNL)),
  http.get('*/admin/finance/payments/fetchExpenses', () => ok(MOCK_ADMIN_EXPENSES)),
  http.get('*/admin/gym-health-alerts/fetchAlerts', () => ok(MOCK_GYM_HEALTH_ALERTS)),
  http.get('*/admin/gym-health-alerts/fetchKPIs', () => ok(MOCK_GYM_HEALTH_KPI)),
  http.post('*/admin/gym-health-alerts/resolveAlert', () => ok(null, 'Alert resolved')),
  http.post('*/admin/gym-health-alerts/dismissAlert', () => ok(null, 'Alert dismissed')),
  http.get('*/admin/payouts/fetchPayouts', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const gymId = url.searchParams.get('gymId');
    const status = url.searchParams.get('status');
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const filtered = MOCK_PAYOUTS.filter(p => (!month || p.month === month) && (!gymId || p.gymId === gymId) && (!status || p.payoutStatus === status));
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return HttpResponse.json({ success: true, message: 'Success', data, meta: { total: filtered.length, page, limit, totalPages: Math.max(1, Math.ceil(filtered.length / limit)) } });
  }),
  http.get('*/admin/payouts/fetchPnL', ({ request }) => { const url = new URL(request.url); const month=url.searchParams.get('month'); const gymId=url.searchParams.get('gymId'); return ok(MOCK_PNL.filter(p => (!month || p.month === month) && (!gymId || p.gymId === gymId))); }),
  http.get('*/admin/payouts/fetchKPIs', ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get('month');
    const gymId = url.searchParams.get('gymId');
    const filtered = MOCK_PAYOUTS.filter(p => (!month || p.month === month) && (!gymId || p.gymId === gymId));
    return ok({
      totalNetProfit: filtered.reduce((sum, item) => sum + item.netProfit, 0),
      totalGrossRevenue: filtered.reduce((sum, item) => sum + item.grossRevenue, 0),
      totalExpenses: filtered.reduce((sum, item) => sum + item.staffPayroll + item.operationalExpenses + item.platformFee, 0),
      pendingPayouts: filtered.filter(item => item.payoutStatus === 'pending').length,
    });
  }),
  http.get('*/admin/permissions/fetchPermissions', () => ok(MOCK_PERMISSIONS_DATA)),
  http.post('*/admin/permissions/updateRolePermissions', () => ok(null, 'Permissions updated')),
  http.post('*/admin/permissions/updateGymOverride', () => ok(null, 'Gym override updated')),
  http.get('*/admin/plans/fetchAllPlans', () => ok(MOCK_ADMIN_PLANS)),
  http.get('*/admin/plans/fetchPlanById', () => ok(MOCK_ADMIN_PLANS[0]!)),
  http.post('*/admin/plans/createPlan', () => ok(MOCK_ADMIN_PLANS[0]!, 'Plan created')),
  http.post('*/admin/plans/updatePlan', () => ok(MOCK_ADMIN_PLANS[0]!, 'Plan updated')),
  http.delete('*/admin/plans/deletePlan', () => ok(null, 'Plan deleted')),
  http.get('*/admin/plans/fetchPlanRevenue', () => ok(MOCK_ADMIN_PLAN_REVENUE)),
  http.get('*/admin/reports/fetchReportData', () => ok(MOCK_ADMIN_REPORTS)),
  http.post('*/admin/reports/exportReport', () => ok({ fileName: 'admin-report.csv', downloadUrl: '*/admin/reports/download/admin-report.csv' }, 'Report export started')),
  http.get('*/admin/sales/fetchOverview', () => ok(MOCK_ADMIN_SALES_OVERVIEW)),
  http.get('*/admin/sales/fetchMembershipReport', () => ok(MOCK_ADMIN_MEMBERSHIP_REPORT)),
  http.get('*/admin/sales/fetchPendingPayments', () => ok(MOCK_ADMIN_PENDING_PAYMENTS)),
  http.get('*/admin/sales/fetchAllMemberships', () => ok(MOCK_ADMIN_ALL_MEMBERSHIPS)),
  http.get('*/admin/settings/fetchSettings', () => ok(MOCK_ADMIN_SETTINGS)),
  http.post('*/admin/settings/updateSettings', () => ok(MOCK_ADMIN_SETTINGS, 'Settings updated')),
  http.get('*/admin/subscriptions/fetchSubscription', () => ok(MOCK_CURRENT_SUBSCRIPTION)),
  http.get('*/admin/subscriptions/fetchPlans', () => ok(MOCK_SAAS_PLANS)),
  http.get('*/admin/subscriptions/fetchInvoices', () => ok(MOCK_INVOICES)),
  http.get('*/admin/subscriptions/fetchPaymentMethods', () => ok(MOCK_PAYMENT_METHODS)),
  http.get('*/admin/subscriptions/fetchKPIs', () => ok(MOCK_SUBSCRIPTION_KPI)),
  http.post('*/admin/subscriptions/upgradePlan', () => ok(null, 'Plan upgrade requested')),
  http.post('*/admin/subscriptions/toggleAutoRenew', () => ok(null, 'Auto-renewal updated')),
  http.post('*/admin/subscriptions/setDefaultPaymentMethod', () => ok(null, 'Default payment method updated')),
  http.delete('*/admin/subscriptions/removePaymentMethod', () => ok(null, 'Payment method removed')),
  http.get('*/admin/adminProfile/fetchProfile', () => ok(MOCK_ADMIN_PROFILE)),
  http.post('*/admin/adminProfile/updateProfile', () => ok(MOCK_ADMIN_PROFILE, 'Profile updated')),
  http.post('*/admin/adminProfile/updatePassword', () => ok(null, 'Password updated')),

  // --- Members ---
  http.get('*/admin/members', () => ok(MOCK_ADMIN_MEMBERS)),
  http.get('*/admin/members/summary', () => ok(MOCK_ADMIN_MEMBERS_SUMMARY)),
  http.get('*/admin/members/list', () => ok(MOCK_ADMIN_MEMBERS)),
  http.post('*/admin/members', () => ok(MOCK_ADMIN_MEMBERS[0])),
  http.patch('*/admin/members/:id', () => ok(MOCK_ADMIN_MEMBERS[0])),
  http.delete('*/admin/members/:id', () => ok(null)),
  http.post('*/admin/members/:id/renew', () => ok(null)),

  // --- Attendance ---
  http.get('*/admin/attendance', () => ok(MOCK_ADMIN_ATTENDANCE_RECORDS)),
  http.get('*/admin/attendance/summary', () => ok(MOCK_ADMIN_ATTENDANCE_SUMMARY)),
  http.get('*/admin/attendance/trend', () => ok(MOCK_ADMIN_ATTENDANCE_TREND)),

  // --- HR ---
  http.get('*/admin/hr/staff', () => ok({ staff: MOCK_ADMIN_STAFF, total: MOCK_ADMIN_STAFF.length })),
  http.get('*/admin/hr/staff/:id', () => ok(MOCK_ADMIN_STAFF[0])),
  http.post('*/admin/hr/staff', () => ok(MOCK_ADMIN_STAFF[0])),
  http.patch('*/admin/hr/staff/:id', () => ok(MOCK_ADMIN_STAFF[0])),
  http.delete('*/admin/hr/staff/:id', () => ok(null)),
  http.post('*/admin/hr/staff/bulk-deactivate', () => ok(null)),
  http.get('*/admin/hr/payrolls', () => ok({ payrolls: MOCK_ADMIN_PAYROLLS, total: MOCK_ADMIN_PAYROLLS.length })),
  http.post('*/admin/hr/payrolls', () => ok(MOCK_ADMIN_PAYROLLS[0])),
  http.patch('*/admin/hr/payrolls/:id', () => ok(MOCK_ADMIN_PAYROLLS[0])),
  http.patch('*/admin/hr/payrolls/:id/status', () => ok(MOCK_ADMIN_PAYROLLS[0])),
  http.get('*/admin/hr/summary', () => ok(MOCK_ADMIN_HR_SUMMARY)),
  http.get('*/admin/hr/staff/:id/ledger', () => ok(MOCK_ADMIN_LEDGER)),
  http.post('*/admin/hr/advances', () => ok(null)),
  http.post('*/admin/hr/dues/pay', () => ok(null)),
  http.get('*/admin/hr/performance', () => ok(MOCK_ADMIN_STAFF_PERFORMANCE)),
];
