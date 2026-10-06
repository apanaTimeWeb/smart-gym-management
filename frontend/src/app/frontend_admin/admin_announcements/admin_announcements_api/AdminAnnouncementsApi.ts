// RESPONSIBILITY: Owns typed HTTP access for Admin announcement queries and mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_ANNOUNCEMENTS_API } from '@/app/frontend_admin/admin_announcements/admin_announcements_url_config';
import type { AdminAnnouncementsQueryParams, Announcement, AnnouncementFormValues, AnnouncementKPIData } from '@/app/frontend_admin/admin_announcements/admin_announcements_types/AdminAnnouncementsTypes';
import { announcementKpiDataSchema, announcementSchema } from '@/app/frontend_admin/admin_announcements/admin_announcements_schemas/AdminAnnouncementsSchemas';

/** Builds stable URL query parameters for the announcements list contract. */
function buildQuery(params: AdminAnnouncementsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const AdminAnnouncementsApi = {
  fetchAnnouncements: async (params: AdminAnnouncementsQueryParams) => apiFetch<ApiResponse<Announcement[]>>(`${ADMIN_ANNOUNCEMENTS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(announcementSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<AnnouncementKPIData>>(ADMIN_ANNOUNCEMENTS_API.kpis, { method: 'GET', dataSchema: announcementKpiDataSchema }),
  createAnnouncement: async (payload: AnnouncementFormValues, idempotencyKey: string) => apiFetch<ApiResponse<Announcement>>(ADMIN_ANNOUNCEMENTS_API.base, { method: 'POST', body: JSON.stringify(payload), dataSchema: announcementSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  updateAnnouncement: async (id: string, payload: AnnouncementFormValues, idempotencyKey: string) => apiFetch<ApiResponse<Announcement>>(ADMIN_ANNOUNCEMENTS_API.detail(id), { method: 'PATCH', body: JSON.stringify(payload), dataSchema: announcementSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
  deleteAnnouncement: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(ADMIN_ANNOUNCEMENTS_API.detail(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
  togglePin: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<Announcement>>(ADMIN_ANNOUNCEMENTS_API.pin(id), { method: 'PATCH', dataSchema: announcementSchema, headers: { 'Idempotency-Key': idempotencyKey } }),
};
