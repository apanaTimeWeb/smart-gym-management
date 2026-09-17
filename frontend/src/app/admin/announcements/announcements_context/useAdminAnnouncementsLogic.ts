"use client";

// RESPONSIBILITY: Coordinates Admin Announcements query/mutation state, URL-shareable filters, and pagination.
// DATA FLOW: AdminAnnouncementsApi → TanStack Query → useAdminAnnouncementsLogic → AdminAnnouncementsMain/table/modal
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_components/AdminFeedback/AdminToastService';
import { announcementsApi } from '@/app/admin/announcements/announcements_api/AdminAnnouncementsApi';
import { useAdminAnnouncementsStore } from '@/app/admin/announcements/announcements_store/useAdminAnnouncementsStore';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { ANNOUNCEMENTS_ITEMS_PER_PAGE, EMPTY_ANNOUNCEMENT_FORM } from '@/app/admin/announcements/announcements_utils/AdminAnnouncementsSharedConstants';
import type { Announcement, AnnouncementFormValues } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';

export function useAdminAnnouncementsLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const store = useAdminAnnouncementsStore();
  const { search, statusFilter, priorityFilter, gymFilter, currentPage } = store;
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: store.setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: store.setStatusFilter },
    { key: 'priority', value: priorityFilter, defaultValue: 'all', setValue: store.setPriorityFilter },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: store.setGymFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => store.setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const queryParams = {
    page: currentPage,
    limit: ANNOUNCEMENTS_ITEMS_PER_PAGE,
    ...(search ? { search } : {}),
    ...(statusFilter !== 'all' ? { status: statusFilter as Announcement['status'] } : {}),
    ...(priorityFilter !== 'all' ? { priority: priorityFilter as Announcement['priority'] } : {}),
    ...(gymFilter !== 'all' ? { gymId: gymFilter } : {}),
  };
  const announcementsQuery = useQuery({
    queryKey: ['admin', 'announcements', 'list', queryParams],
    queryFn: () => announcementsApi.fetchAnnouncements(queryParams),
    staleTime: 1000 * 60 * 2,
  });
  const { data: kpis } = useQuery({
    queryKey: ['admin', 'announcements', 'kpis'],
    queryFn: () => announcementsApi.fetchKPIs(), staleTime: 1000 * 60 * 5,
  });
  const response = announcementsQuery.data;
  const paginated = response?.data ?? [];
  const totalItems = response?.meta?.total ?? paginated.length;
  const totalPages = Math.max(1, response?.meta?.totalPages ?? Math.ceil(totalItems / ANNOUNCEMENTS_ITEMS_PER_PAGE));

  const createMutation = useMutation({
    mutationFn: (payload: AnnouncementFormValues) => announcementsApi.createAnnouncement(payload),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-33383590'); store.setShowModal(false); void qc.invalidateQueries({ queryKey: ['admin', 'announcements'] }); },
    onError: (err) => adminToast.error(err instanceof Error ? err.message : 'Announcement creation failed.', 'admin-error-6481815840'),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AnnouncementFormValues }) => announcementsApi.updateAnnouncement(id, payload),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-c151e3e9'); store.setShowModal(false); store.setEditingAnnouncement(null); void qc.invalidateQueries({ queryKey: ['admin', 'announcements'] }); },
    onError: (err) => adminToast.error(err instanceof Error ? err.message : 'Announcement update failed.', 'admin-error-72b190472c'),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => announcementsApi.deleteAnnouncement(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-05945f3e'); void qc.invalidateQueries({ queryKey: ['admin', 'announcements'] }); },
    onError: (err) => adminToast.error(err instanceof Error ? err.message : 'Announcement deletion failed.', 'admin-error-f6f10488f8'),
  });
  const pinMutation = useMutation({
    mutationFn: (id: string) => announcementsApi.togglePin(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-d9cfd2a7'); void qc.invalidateQueries({ queryKey: ['admin', 'announcements', 'list'] }); },
    onError: (err) => adminToast.error(err instanceof Error ? err.message : 'Announcement pin update failed.', 'admin-error-01a0fd9c95'),
  });

  const openCreate = useCallback(() => { store.setEditingAnnouncement(null); store.setForm(EMPTY_ANNOUNCEMENT_FORM); store.setShowModal(true); }, [store]);
  const openEdit = useCallback((announcement: Announcement) => { store.setEditingAnnouncement(announcement); store.setForm({ title: announcement.title, body: announcement.body, priority: announcement.priority, audience: announcement.audience, gymIds: announcement.gymIds, publishedAt: announcement.publishedAt.slice(0, 16), expiresAt: announcement.expiresAt.slice(0, 16), isPinned: announcement.isPinned }); store.setShowModal(true); }, [store]);
  const saveAnnouncement = useCallback((data: AnnouncementFormValues) => { if (store.editingAnnouncement) updateMutation.mutate({ id: store.editingAnnouncement.id, payload: data }); else createMutation.mutate(data); }, [createMutation, store.editingAnnouncement, updateMutation]);
  const deleteAnnouncement = useCallback(async (id: string, _title: string) => { const ok = await confirm({ title: 'Delete Announcement', message: 'Delete this announcement? This cannot be undone.', confirmText: 'Delete', type: 'danger' }); if (ok) deleteMutation.mutate(id); }, [confirm, deleteMutation]);

  return { paginated, filtered: paginated, status: announcementsQuery.status, kpis: kpis?.data ?? null, showModal: store.showModal, setShowModal: store.setShowModal, editingAnnouncement: store.editingAnnouncement, openCreate, openEdit, saveAnnouncement, deleteAnnouncement, togglePin: (id: string) => pinMutation.mutate(id), saving: createMutation.isPending || updateMutation.isPending, currentPage, setCurrentPage: store.setCurrentPage, totalPages, totalItems };
}
