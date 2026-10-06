// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AnnouncementFormValues } from '@/app/frontend_admin/admin_announcements/admin_announcements_types/AdminAnnouncementsTypes';
export interface AdminAnnouncementsStore {
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  gymFilter: string;
  setGymFilter: (v: string) => void;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  editingAnnouncementId: string | null;
  setEditingAnnouncementId: (id: string | null) => void;
  form: AnnouncementFormValues;
  setForm: (f: AnnouncementFormValues) => void;
}
