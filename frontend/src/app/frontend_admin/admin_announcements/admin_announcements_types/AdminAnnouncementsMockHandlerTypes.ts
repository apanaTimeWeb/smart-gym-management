// RESPONSIBILITY: Owns mock-handler input/output types for the Admin announcements feature.
import type { Announcement } from '@/app/frontend_admin/admin_announcements/admin_announcements_types/AdminAnnouncementsTypes';

export type AdminAnnouncementsJsonObject = Record<string, unknown>;
export type AnnouncementRecord = Announcement;
