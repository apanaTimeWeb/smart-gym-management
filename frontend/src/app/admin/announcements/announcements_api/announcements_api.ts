// RESPONSIBILITY: API client for the Admin Announcements module.
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
            return apiFetch('/api/admin/announcements/fetchAnnouncements', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchKPIs: async () => {
            return apiFetch('/api/admin/announcements/fetchKPIs', { method: 'GET', dataSchema: z.unknown() });
        },
  createAnnouncement: async (payload: AnnouncementFormValues) => {
          return apiFetch('/api/admin/announcements/createAnnouncement', { method: 'POST', body: JSON.stringify(payload), dataSchema: z.unknown() });
      },
  updateAnnouncement: async (id: string, payload: AnnouncementFormValues) => {
          return apiFetch('/api/admin/announcements/updateAnnouncement', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  deleteAnnouncement: async (id: string) => {
          return apiFetch('/api/admin/announcements/deleteAnnouncement', { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
  togglePin: async (id: string) => {
          return apiFetch('/api/admin/announcements/togglePin', { method: 'POST', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
};
