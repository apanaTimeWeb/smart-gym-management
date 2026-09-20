// RESPONSIBILITY: Owns mutable MSW handlers for the Admin members feature.
// DATA FLOW: members API client → module-owned MSW handler → mutable fixture state → TanStack Query/UI.
import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { MOCK_ADMIN_MEMBERS_EXPANDED } from '@/app/admin/members/members_mocks/fixtures/AdminMembersMockFixtures';
import type { AdminMember, AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';
import { createAdminMembersExportCsv } from '@/app/admin/members/members_utils/AdminMembersCreateExportCsv';


const membersState = structuredClone(MOCK_ADMIN_MEMBERS_EXPANDED);

function filterMembersForRequest(url: URL): AdminMember[] {
  const search = (url.searchParams.get('search') ?? '').toLowerCase();
  const status = url.searchParams.get('status');
  const branchId = url.searchParams.get('branchId');
  const gender = url.searchParams.get('gender');
  const plan = url.searchParams.get('plan');
  const expiryFilter = url.searchParams.get('expiryFilter');
  return membersState.filter((member) => {
    const expiryDays = Math.ceil((new Date(member.expiryDate).getTime() - Date.now()) / 86400000);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const matchesExpiry = !expiryFilter || expiryFilter === 'all'
      || (expiryFilter === 'this_week' && expiryDays >= 0 && expiryDays <= 7)
      || (expiryFilter === 'this_month' && member.expiryDate.slice(0, 7) === currentMonth);
    return (!search || `${member.name} ${member.email} ${member.phone}`.toLowerCase().includes(search))
      && (!status || status === 'all' || member.status === status)
      && (!branchId || branchId === 'all' || member.branchId === branchId)
      && (!gender || gender === 'all' || member.gender === gender)
      && (!plan || plan === 'all' || member.planName.toLowerCase().includes(plan.toLowerCase().replace('starter', 'basic')))
      && matchesExpiry;
  });
}

function computeSummary(): AdminMembersSummary {
  const nowMonth = new Date().toISOString().slice(0, 7);
  return {
    totalMembers: membersState.length,
    activeMembers: membersState.filter((member) => member.status === 'active').length,
    expiredMembers: membersState.filter((member) => member.status === 'expired').length,
    pendingMembers: membersState.filter((member) => member.status === 'pending').length,
    expiringThisWeek: membersState.filter((member) => {
      const diff = Math.ceil((new Date(member.expiryDate).getTime() - Date.now()) / 86400000);
      return diff >= 0 && diff <= 7;
    }).length,
    expiringThisMonth: membersState.filter((member) => member.expiryDate.slice(0, 7) === nowMonth).length,
    totalOutstanding: membersState.reduce((sum, member) => sum + member.pendingAmount, 0),
    newThisMonth: membersState.filter((member) => member.joinDate.slice(0, 7) === nowMonth).length,
  };
}

const response = <T>(data: T, message = 'Success') =>
  HttpResponse.json({ success: true, message, data });

export const adminMembersMockHandlers = [
  http.get('*/admin/members', ({ request }) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const filtered = filterMembersForRequest(url);
    const start = (page - 1) * limit;
    const pageData = filtered.slice(start, start + limit);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: pageData,
      meta: { total: filtered.length, page, limit, totalPages: Math.max(1, Math.ceil(filtered.length / limit)), hasNextPage: page < Math.max(1, Math.ceil(filtered.length / limit)), hasPrevPage: page > 1 },
    });
  }),
  http.get('*/admin/members/summary', () => response(computeSummary())),
  http.get('*/admin/members/export', ({ request }) => {
    const csv = createAdminMembersExportCsv(filterMembersForRequest(new URL(request.url)));
    return HttpResponse.json({ success: true, message: 'Member export ready', data: csv });
  }),
  http.get('*/admin/members/:id', ({ params }) => {
    const member = membersState.find((item) => item.id === String(params.id));
    return member
      ? response(member)
      : HttpResponse.json({ success: false, message: 'Member not found', data: null }, { status: StatusCodes.NOT_FOUND });
  }),
  http.get('*/admin/members/list', ({ request }) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);
    const start = (page - 1) * limit;
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: membersState.slice(start, start + limit),
      meta: { total: membersState.length, page, limit, totalPages: Math.max(1, Math.ceil(membersState.length / limit)), hasNextPage: page < Math.max(1, Math.ceil(membersState.length / limit)), hasPrevPage: page > 1 },
    });
  }),
];
