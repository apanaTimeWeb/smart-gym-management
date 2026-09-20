import { StatusCodes } from 'http-status-codes';
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
  HttpResponse.json({ success: true, message, data });

const paged = <T>(data: T[], page: number, limit: number, message = 'Success') => {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safeLimit;
  const pageData = data.slice(start, start + safeLimit);
  return HttpResponse.json({ success: true, message, data: pageData, meta: { total: data.length, page: safePage, limit: safeLimit, totalPages: Math.max(1, Math.ceil(data.length / safeLimit)), hasNextPage: safePage < Math.max(1, Math.ceil(data.length / safeLimit)), hasPrevPage: safePage > 1 } });
};

import type { Announcement } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';
import { getAdminAnnouncementsMockState, setAdminAnnouncementsMockState } from '@/app/admin/announcements/announcements_mocks/fixtures/AdminAnnouncementsMockState';

type AnnouncementRecord = Announcement;
const gymNameByGymId: Record<string, string> = { g1: 'Andheri East', g2: 'Bandra West', g3: 'Powai', g4: 'Thane' };

function gymNamesFor(ids: string[]): string[] { return ids.map((id) => gymNameByGymId[id] ?? id); }

function buildAnnouncementRecord(input: JsonObject): AnnouncementRecord {
  const gymIds = Array.isArray(input.gymIds) ? (input.gymIds as string[]) : ['g1'];
  const audience = (Array.isArray(input.audience) ? input.audience : ['all']) as AnnouncementRecord['audience'];
  const now = new Date().toISOString();
  return {
    id: `ann${Date.now()}`,
    title: String(input.title ?? 'Untitled announcement'),
    body: String(input.body ?? ''),
    priority: input.priority === 'high' || input.priority === 'low' ? input.priority : 'medium',
    status: 'active',
    audience,
    gymIds,
    gymNames: gymNamesFor(gymIds),
    publishedAt: String(input.publishedAt ?? now),
    expiresAt: String(input.expiresAt ?? now),
    createdBy: 'Admin',
    createdAt: now,
    viewCount: 0,
    isPinned: Boolean(input.isPinned),
  };
}

function applyAnnouncementUpdate(record: AnnouncementRecord, input: JsonObject): AnnouncementRecord {
  const gymIds = Array.isArray(input.gymIds) ? (input.gymIds as string[]) : record.gymIds;
  return {
    ...record,
    title: input.title !== undefined ? String(input.title) : record.title,
    body: input.body !== undefined ? String(input.body) : record.body,
    priority: input.priority === 'high' || input.priority === 'medium' || input.priority === 'low' ? input.priority : record.priority,
    audience: Array.isArray(input.audience) ? (input.audience as AnnouncementRecord['audience']) : record.audience,
    gymIds,
    gymNames: gymNamesFor(gymIds),
    publishedAt: input.publishedAt !== undefined ? String(input.publishedAt) : record.publishedAt,
    expiresAt: input.expiresAt !== undefined ? String(input.expiresAt) : record.expiresAt,
    isPinned: input.isPinned !== undefined ? Boolean(input.isPinned) : record.isPinned,
  };
}

export const adminAnnouncementsMockHandlers = [
  http.get('*/admin/announcements/fetchAnnouncements', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');
    const gymId = url.searchParams.get('gymId');
    const filtered = getAdminAnnouncementsMockState().filter((item) => {
      const matchSearch = !search || item.title.toLowerCase().includes(search) || item.body.toLowerCase().includes(search);
      const matchStatus = !status || item.status === status;
      const matchPriority = !priority || item.priority === priority;
      const matchGym = !gymId || item.gymIds.includes(gymId) || item.gymIds.includes('all');
      return matchSearch && matchStatus && matchPriority && matchGym;
    });
    return paged(filtered, page, limit);
  }),
  http.get('*/admin/announcements/fetchKPIs', () => ok({
    total: getAdminAnnouncementsMockState().length,
    active: getAdminAnnouncementsMockState().filter((item) => item.status === 'active').length,
    scheduled: getAdminAnnouncementsMockState().filter((item) => item.status === 'scheduled').length,
    expired: getAdminAnnouncementsMockState().filter((item) => item.status === 'expired').length,
    totalViews: getAdminAnnouncementsMockState().reduce((sum, item) => sum + item.viewCount, 0),
    pinned: getAdminAnnouncementsMockState().filter((item) => item.isPinned).length,
  })),
  http.post('*/admin/announcements/createAnnouncement', async ({ request }) => {
    const record = buildAnnouncementRecord(asRecord(await parseRequestBody(request)));
    setAdminAnnouncementsMockState([record, ...getAdminAnnouncementsMockState()]);
    return ok(record, 'Announcement created');
  }),
  http.post('*/admin/announcements/updateAnnouncement', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = getAdminAnnouncementsMockState().findIndex((item) => item.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Announcement not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = applyAnnouncementUpdate(getAdminAnnouncementsMockState()[index]!, body);
    setAdminAnnouncementsMockState(getAdminAnnouncementsMockState().map((item, itemIndex) => itemIndex === index ? updated : item));
    return ok(updated, 'Announcement updated');
  }),
  http.delete('*/admin/announcements/deleteAnnouncement', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const index = getAdminAnnouncementsMockState().findIndex((item) => item.id === String(body.id));
    if (index === -1) return HttpResponse.json({ success: false, message: 'Announcement not found' }, { status: StatusCodes.NOT_FOUND });
    setAdminAnnouncementsMockState(getAdminAnnouncementsMockState().filter((_, itemIndex) => itemIndex !== index));
    return ok(null, 'Announcement deleted');
  }),
  http.post('*/admin/announcements/togglePin', async ({ request }) => {
    const body = asRecord(await parseRequestBody(request));
    const record = getAdminAnnouncementsMockState().find((item) => item.id === String(body.id));
    if (!record) return HttpResponse.json({ success: false, message: 'Announcement not found' }, { status: StatusCodes.NOT_FOUND });
    const updated = { ...record, isPinned: !record.isPinned };
    setAdminAnnouncementsMockState(getAdminAnnouncementsMockState().map((item) => item.id === updated.id ? updated : item));
    return ok(updated, 'Announcement updated');
  })
];
