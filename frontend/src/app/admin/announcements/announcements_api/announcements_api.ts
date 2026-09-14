// RESPONSIBILITY: API client for the Admin Announcements module.
import { AdminAnnouncementsUrlConfig } from '@/app/admin/announcements/admin_announcements_url_config';
import type { Announcement, AnnouncementFormValues, AnnouncementKPIData } from '@/app/admin/announcements/announcements_types/announcements_types';
import { MOCK_ANNOUNCEMENTS, MOCK_ANNOUNCEMENT_KPI, ANNOUNCEMENT_COMPOSE_GYM_OPTIONS } from '@/app/admin/announcements/announcements_utils/AdminAnnouncementsSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";

function resolveGymNames(gymIds: string[]): string[] {
  return gymIds.map(id => ANNOUNCEMENT_COMPOSE_GYM_OPTIONS.find(g => g.value === id)?.label ?? id);
}

function deriveStatus(publishedAt: string, expiresAt: string): Announcement['status'] {
  const now = new Date();
  const pub = new Date(publishedAt);
  const exp = new Date(expiresAt);
  if (now < pub) return 'scheduled';
  if (now > exp) return 'expired';
  return 'active';
}

export const announcementsApi = {
  fetchAnnouncements: async () => {
            return apiFetch<ApiResponse<any>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchAnnouncements`, { method: 'GET', dataSchema: z.any() });
        },
  fetchKPIs: async () => {
            return apiFetch<ApiResponse<any>>(`${AdminAnnouncementsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: z.any() });
        },
  createAnnouncement: async (payload: AnnouncementFormValues) => {
          return apiFetch<ApiResponse<any>>(`${AdminAnnouncementsUrlConfig.api.base}/createAnnouncement`, { method: 'POST', body: JSON.stringify(payload), dataSchema: z.any() });
      },
  updateAnnouncement: async (id: string, payload: AnnouncementFormValues) => {
          return apiFetch<ApiResponse<any>>(`${AdminAnnouncementsUrlConfig.api.base}/updateAnnouncement`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
  deleteAnnouncement: async (id: string) => {
          return apiFetch<ApiResponse<any>>(`${AdminAnnouncementsUrlConfig.api.base}/deleteAnnouncement`, { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.any() });
      },
  togglePin: async (id: string) => {
          return apiFetch<ApiResponse<any>>(`${AdminAnnouncementsUrlConfig.api.base}/togglePin`, { method: 'POST', body: JSON.stringify(id), dataSchema: z.any() });
      },
};
