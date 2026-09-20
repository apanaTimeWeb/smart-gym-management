// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin announcements feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.
import { MOCK_ANNOUNCEMENTS } from '@/app/admin/announcements/announcements_mocks/fixtures/AdminAnnouncementsMockFixtures';
import type { Announcement } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';

function cloneAnnouncements(records: Announcement[]): Announcement[] {
  return records.map((record) => ({
    ...record,
    audience: [...record.audience],
    gymIds: [...record.gymIds],
    gymNames: [...record.gymNames],
  }));
}

let adminAnnouncementsMockState = cloneAnnouncements(MOCK_ANNOUNCEMENTS);

export function getAdminAnnouncementsMockState(): Announcement[] {
  return adminAnnouncementsMockState;
}

export function setAdminAnnouncementsMockState(nextState: Announcement[]): void {
  adminAnnouncementsMockState = nextState;
}

export function resetAdminAnnouncementsMockState(): void {
  adminAnnouncementsMockState = cloneAnnouncements(MOCK_ANNOUNCEMENTS);
}
