// RESPONSIBILITY: Owns MSW handlers for the Admin sales feature.
// DATA FLOW: sales API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_SALES_REFERRALS } from '@/app/admin/sales/sales_mocks/fixtures/AdminSalesMockFixtures';

type JsonObject = Record<string, unknown>;

async function parseRequestBody(request: Request): Promise<unknown> {
  try { return await request.clone().json(); } catch { return undefined; }
}

function asRecord(value: unknown): JsonObject {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonObject : {};
}

const ok = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data, meta: { total: Array.isArray(data) ? data.length : 1, page: 1, limit: 50, totalPages: 1 } });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)) } });
};

import { MOCK_ADMIN_ALL_MEMBERSHIPS, MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_PENDING_PAYMENTS, MOCK_ADMIN_SALES_OVERVIEW } from '@/app/admin/sales/sales_mocks/fixtures/AdminSalesMockFixtures';

export const adminSalesMockHandlers = [
  http.get('*/admin/sales/referral-sources', () => ok(MOCK_ADMIN_SALES_REFERRALS)),
  http.get('*/admin/sales/fetchOverview', () => ok(MOCK_ADMIN_SALES_OVERVIEW)),
  http.get('*/admin/sales/fetchMembershipReport', () => ok(MOCK_ADMIN_MEMBERSHIP_REPORT)),
  http.get('*/admin/sales/fetchPendingPayments', () => ok(MOCK_ADMIN_PENDING_PAYMENTS)),
  http.get('*/admin/sales/fetchAllMemberships', () => ok(MOCK_ADMIN_ALL_MEMBERSHIPS))
];
