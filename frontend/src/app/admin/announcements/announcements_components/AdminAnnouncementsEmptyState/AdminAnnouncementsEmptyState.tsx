"use client";
// RESPONSIBILITY: Renders the empty state for the Admin announcements list and starts announcement creation.

import { Megaphone } from 'lucide-react';
import { useAdminAnnouncementsLogic } from '@/app/admin/announcements/announcements_context/useAdminAnnouncementsLogic';

export default function AdminAnnouncementsEmptyState() {
  const { openCreate } = useAdminAnnouncementsLogic();
  return <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
    <Megaphone size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">No announcements found</h3>
    <p className="text-sm text-secondary">Create an announcement to start communicating with gym members.</p>
    <button type="button" onClick={openCreate} className="mt-1 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary rounded-xl text-sm font-semibold">Send First Announcement</button>
  </div>;
}
