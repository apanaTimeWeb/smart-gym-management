import { http, HttpResponse } from 'msw';
import { z } from 'zod';
import { MOCK_ADMIN_USAGE_DATA } from '@/app/admin/usage/usage_api/AdminUsageMockData';
import { MOCK_ADMIN_ATTENDANCE_SUMMARY, MOCK_ADMIN_ATTENDANCE_RECORDS, MOCK_ADMIN_ATTENDANCE_TREND } from '@/app/admin/attendance/attendance_api/AdminAttendanceMockData';
import { MOCK_ADMIN_DASHBOARD } from '@/app/admin/dashboard/dashboard_api/AdminDashboardMockData';
import { MOCK_ADMIN_FINANCE_SUMMARY, MOCK_ADMIN_PAYMENTS, MOCK_ADMIN_BRANCH_PNL } from '@/app/admin/finance/finance_api/AdminFinanceMockData';
import { MOCK_ADMIN_PLANS, MOCK_ADMIN_PLAN_REVENUE } from '@/app/admin/plans/plans_api/AdminPlansMockData';
import { MOCK_ADMIN_REPORTS } from '@/app/admin/reports/reports_api/AdminReportsMockData';
import { MOCK_ADMIN_SALES_OVERVIEW, MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_MEMBERSHIP_TOTALS, MOCK_ADMIN_PENDING_PAYMENTS, MOCK_ADMIN_ALL_MEMBERSHIPS } from '@/app/admin/sales/sales_api/AdminSalesMockData';
import { MOCK_ADMIN_SETTINGS } from '@/app/admin/settings/settings_api/AdminSettingsMockData';
import { MOCK_ADMIN_PROFILE } from '@/app/admin/profile/profile_api/AdminProfileMockData';
export const adminHandlers = [
  http.get('/api/admin/adminBranches/fetchBranches', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/adminUsage/fetchMyUsage', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/announcements/fetchAnnouncements', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/announcements/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/announcements/createAnnouncement', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/announcements/updateAnnouncement', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.delete('/api/admin/announcements/deleteAnnouncement', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/announcements/togglePin', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/auditLogs/fetchLogs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/auditLogs/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/blacklist/fetchBlacklist', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/blacklist/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/blacklist/addToBlacklist', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.delete('/api/admin/blacklist/removeFromBlacklist', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/blacklist/toggleBlacklist', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/blacklist/propagateToAllBranches', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/coupons/fetchCoupons', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/coupons/createCoupon', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/coupons/updateCoupon', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.delete('/api/admin/coupons/deleteCoupon', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/coupons/toggleCoupon', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/dashboard/fetchDashboardStats', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_ADMIN_DASHBOARD });
  }),
  http.get('/api/admin/dataExport/fetchJobs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/dataExport/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/dataExport/createExport', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.delete('/api/admin/dataExport/deleteJob', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/finance/fetchPayments', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: { payments: MOCK_ADMIN_PAYMENTS, total: MOCK_ADMIN_PAYMENTS.length } });
  }),
  http.post('/api/admin/finance/createPayment', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/finance/fetchSummary', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_ADMIN_FINANCE_SUMMARY });
  }),
  http.get('/api/admin/finance/fetchBranchPnl', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/finance/fetchExpenses', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/gymHealthAlerts/fetchAlerts', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/gymHealthAlerts/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/gymHealthAlerts/resolveAlert', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/gymHealthAlerts/dismissAlert', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/payouts/fetchPayouts', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/payouts/fetchPnL', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/payouts/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/payouts/markPaid', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/permissions/fetchPermissions', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/permissions/updateRolePermissions', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/permissions/updateGymOverride', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/plans/fetchAllPlans', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/plans/fetchPlanById', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/plans/createPlan', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/plans/updatePlan', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.delete('/api/admin/plans/deletePlan', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/plans/fetchPlanRevenue', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/reports/fetchReportData', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/reports/exportReport', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/sales/fetchOverview', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/sales/fetchMembershipReport', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/sales/fetchPendingPayments', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/sales/fetchAllMemberships', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/settings/fetchSettings', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/settings/updateSettings', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/subscriptions/fetchSubscription', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/subscriptions/fetchPlans', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/subscriptions/fetchInvoices', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/subscriptions/fetchPaymentMethods', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/subscriptions/fetchKPIs', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/subscriptions/upgradePlan', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/subscriptions/toggleAutoRenew', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.post('/api/admin/subscriptions/setDefaultPaymentMethod', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.delete('/api/admin/subscriptions/removePaymentMethod', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: [] });
  }),
  http.get('/api/admin/adminProfile/fetchProfile', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_ADMIN_PROFILE });
  }),
  http.post('/api/admin/adminProfile/updateProfile', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_ADMIN_PROFILE });
  }),
  http.post('/api/admin/adminProfile/updatePassword', () => {
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_ADMIN_PROFILE });
  }),
];
