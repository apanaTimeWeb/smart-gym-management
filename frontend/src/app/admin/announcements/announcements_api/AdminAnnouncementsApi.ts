// RESPONSIBILITY: Owns typed HTTP access for Admin announcement queries and mutations.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminAnnouncementsUrlConfig } from '@/app/admin/announcements/admin_announcements_url_config';
import type { AdminAnnouncementsQueryParams, Announcement, AnnouncementFormValues, AnnouncementKPIData } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';
import { announcementKpiDataSchema, announcementSchema } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsSchemas';

function buildQuery(params: AdminAnnouncementsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const announcementsApi = {
  fetchAnnouncements: async (params: AdminAnnouncementsQueryParams) => apiFetch<ApiResponse<Announcement[]>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchAnnouncements${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(announcementSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<AnnouncementKPIData>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: announcementKpiDataSchema }),
  createAnnouncement: async (payload: AnnouncementFormValues) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/createAnnouncement`, { method: 'POST', body: JSON.stringify(payload), dataSchema: announcementSchema }),
  updateAnnouncement: async (id: string, payload: AnnouncementFormValues) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/updateAnnouncement`, { method: 'POST', body: JSON.stringify({ id, ...payload }), dataSchema: announcementSchema }),
  deleteAnnouncement: async (id: string) => apiFetch<ApiResponse<null>>(`${AdminAnnouncementsUrlConfig.api.base}/deleteAnnouncement`, { method: 'DELETE', body: JSON.stringify({ id }), dataSchema: z.null() }),
  togglePin: async (id: string) => apiFetch<ApiResponse<Announcement>>(`${AdminAnnouncementsUrlConfig.api.base}/togglePin`, { method: 'POST', body: JSON.stringify({ id }), dataSchema: announcementSchema }),
};
