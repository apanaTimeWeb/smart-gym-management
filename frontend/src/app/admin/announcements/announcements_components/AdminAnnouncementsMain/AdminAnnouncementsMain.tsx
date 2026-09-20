"use client";
// RESPONSIBILITY: Main orchestrator for the Admin Announcements module.
// Renders the compose CTA banner, KPIs, and the announcement table with full CRUD.

import { Megaphone, Send } from 'lucide-react';
import AdminAnnouncementsKPIs from '@/app/admin/announcements/announcements_components/AdminAnnouncementsKPIs/AdminAnnouncementsKPIs';
import AdminAnnouncementsTable from '@/app/admin/announcements/announcements_components/AdminAnnouncementsTable/AdminAnnouncementsTable';
import AdminAnnouncementsModal from '@/app/admin/announcements/announcements_components/AdminAnnouncementsModal/AdminAnnouncementsModal';
import { useAdminAnnouncementsLogic } from '@/app/admin/announcements/announcements_context/useAdminAnnouncementsLogic';

export default function AdminAnnouncementsMain() {
  const { openCreate } = useAdminAnnouncementsLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">

        {/* Branch Broadcast CTA — the primary send capability for admin role */}
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary-subtle flex items-center justify-center shrink-0">
              <Megaphone size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-primary text-sm">Send a Branch Announcement</p>
              <p className="text-xs text-secondary mt-0.5">
                Broadcast a notice to members, trainers, or staff at your gym branches. Supports scheduling and pinning.
              </p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-xl text-sm motion-safe:transition-colors shrink-0 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <Send size={15} />
            Send Announcement
          </button>
        </div>

        <AdminAnnouncementsKPIs />
        <AdminAnnouncementsTable />
      </div>
      <AdminAnnouncementsModal />
    </div>
  );
}