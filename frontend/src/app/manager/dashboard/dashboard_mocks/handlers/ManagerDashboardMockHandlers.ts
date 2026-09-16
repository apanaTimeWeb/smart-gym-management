import { http, HttpResponse } from 'msw';
import { MOCK_DASHBOARD_STATS } from '@/app/manager/dashboard/dashboard_fixtures/ManagerDashboardMockData';

export const managerDashboardHandlers = [
  http.get(`/api/v1/manager/dashboard/stats`, ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('recentMembersSearch') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('recentMembersPage') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('recentMembersLimit') || '5'), 1);
    const filtered = MOCK_DASHBOARD_STATS.recentMembers.filter((member) => {
      const planName = typeof member.plan === 'string' ? member.plan : member.plan.name;
      return !search || member.name.toLowerCase().includes(search) || planName.toLowerCase().includes(search);
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({
      success: true,
      message: 'Stats fetched successfully',
      data: { ...MOCK_DASHBOARD_STATS, recentMembers: filtered.slice(start, start + limit), totalRecentMembers: filtered.length }
    });
  })
];
