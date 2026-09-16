// RESPONSIBILITY: Owns MSW handlers for the Admin announcements feature.
// DATA FLOW: announcements API client → module-owned MSW handler → module-owned fixture → TanStack Query/UI.
import { http, HttpResponse } from 'msw';

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

import { MOCK_ANNOUNCEMENTS, MOCK_ANNOUNCEMENT_KPI } from '@/app/admin/announcements/announcements_mocks/fixtures/AdminAnnouncementsMockFixtures';

export const adminAnnouncementsMockHandlers = [
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
  http.post('*/admin/announcements/togglePin', () => ok(MOCK_ANNOUNCEMENTS[0]!, 'Announcement updated'))
];
