// RESPONSIBILITY: TypeScript types for the Announcements / Notice Board module.

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AnnouncementStatus = 'active' | 'scheduled' | 'expired' | 'draft';
export type AnnouncementPriority = 'high' | 'medium' | 'low';
export type AnnouncementAudience = 'all' | 'members' | 'managers' | 'trainers' | 'staff';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  audience: AnnouncementAudience[];
  gymIds: string[];
  gymNames: string[];
  publishedAt: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  viewCount: number;
  viewsByBranch?: { branchId: string, count: number }[];
  isPinned: boolean;
  deliveryStatus?: string;
  pushNotificationSent?: boolean;
  acknowledgedCount?: number;
}

export interface AnnouncementFormValues {
  title: string;
  body: string;
  priority: AnnouncementPriority;
  audience: AnnouncementAudience[];
  gymIds: string[];
  publishedAt: string;
  expiresAt: string;
  isPinned: boolean;
}

export interface AnnouncementKPIData {
  total: number;
  active: number;
  scheduled: number;
  expired: number;
  totalViews: number;
  pinned: number;
}
