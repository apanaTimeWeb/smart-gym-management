"use client";

// RESPONSIBILITY: Coordinates Admin Announcements query/mutation state, URL-shareable filters, and pagination.

import { ADMIN_ANNOUNCEMENTS_QUERY_KEYS } from '@/app/frontend_admin/admin_announcements/admin_announcements_constants/AdminAnnouncementsQueryKeys';
import { useTranslations } from 'next-intl';
// DATA FLOW: AdminAnnouncementsApi → TanStack Query → useAdminAnnouncementsLogic → AdminAnnouncementsMain/table/modal
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminAnnouncementsApi } from '@/app/frontend_admin/admin_announcements/admin_announcements_api/AdminAnnouncementsApi';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_announcements/admin_announcements_store/useAdminAnnouncementsStore';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { ANNOUNCEMENTS_ITEMS_PER_PAGE, EMPTY_ANNOUNCEMENT_FORM } from '@/app/frontend_admin/admin_announcements/admin_announcements_constants/AdminAnnouncementsConstants';
import type { Announcement, AnnouncementFormValues } from '@/app/frontend_admin/admin_announcements/admin_announcements_types/AdminAnnouncementsTypes';
import { useAdminAnnouncementsMutations } from '@/app/frontend_admin/admin_announcements/admin_announcements_hooks/useAdminAnnouncementsMutations';
/**
 * @description useAdminAnnouncementsLogic: Coordinates Admin Announcements query/mutation state, URL-shareable filters, and pagination.
 * @dependencies Consumes AdminAnnouncementsQueryKeys, AdminAnnouncementsApi, useAdminAnnouncementsStore, useAdminLayoutConfirm, useAdminLayoutUrlQuerySync, AdminAnnouncementsConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminAnnouncementsLogic() {
  const { confirm } = useAdminLayoutConfirm();
  const store = useAdminAnnouncementsStore();
  const { search, statusFilter, priorityFilter, gymFilter, currentPage } = store;
  useAdminLayoutUrlQuerySync([
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
    queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('list', queryParams),
    queryFn: () => AdminAnnouncementsApi.fetchAnnouncements(queryParams),
    staleTime: 1000 * 60 * 2,
  });
  const { data: kpis } = useQuery({
    queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('kpis'),
    queryFn: () => AdminAnnouncementsApi.fetchKPIs(), staleTime: 1000 * 60 * 5,
  });
  const response = announcementsQuery.data;
  const paginated = response?.data ?? [];
  const totalItems = response?.meta?.total ?? paginated.length;
  const totalPages = Math.max(1, response?.meta?.totalPages ?? Math.ceil(totalItems / ANNOUNCEMENTS_ITEMS_PER_PAGE));

  const { getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, pinMutation } = useAdminAnnouncementsMutations();

  const openCreate = useCallback(() => { store.setEditingAnnouncementId(null); store.setForm(EMPTY_ANNOUNCEMENT_FORM); store.setShowModal(true); }, [store]);
  const openEdit = useCallback((announcement: Announcement) => { store.setEditingAnnouncementId(announcement.id); store.setForm({ title: announcement.title, body: announcement.body, priority: announcement.priority, audience: announcement.audience, gymIds: announcement.gymIds, publishedAt: announcement.publishedAt.slice(0, 16), expiresAt: announcement.expiresAt.slice(0, 16), isPinned: announcement.isPinned }); store.setShowModal(true); }, [store]);
  const saveAnnouncement = useCallback((data: AnnouncementFormValues) => { if (store.editingAnnouncementId) { const intentId = `update-announcement:${store.editingAnnouncementId}`; updateMutation.mutate({ id: store.editingAnnouncementId, payload: data, idempotencyKey: getIntentKey(intentId), intentId }); } else { const intentId = 'create-announcement'; createMutation.mutate({ payload: data, idempotencyKey: getIntentKey(intentId), intentId }); } }, [createMutation, getIntentKey, store.editingAnnouncementId, updateMutation]);
  const t = useTranslations();

  const deleteAnnouncement = useCallback(async (id: string, _title: string) => { const intentId = `delete-announcement:${id}`; const ok = await confirm({ title: t('announcements.AdminAnnouncementsConfirm.deleteTitle'), message: t('announcements.AdminAnnouncementsConfirm.deleteMessage'), confirmText: t('announcements.AdminAnnouncementsConfirm.deleteConfirm'), type: 'danger' }); if (ok) deleteMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) }); else clearIntentKey(intentId); }, [clearIntentKey, confirm, deleteMutation, getIntentKey, t]);

  const togglePin = useCallback((id: string) => { const intentId = `toggle-pin:${id}`; pinMutation.mutate({ id, idempotencyKey: getIntentKey(intentId), intentId }); }, [getIntentKey, pinMutation]);

  return { paginated, filtered: paginated, status: announcementsQuery.status, kpis: kpis?.data ?? null, showModal: store.showModal, setShowModal: store.setShowModal, editingAnnouncementId: store.editingAnnouncementId, openCreate, openEdit, saveAnnouncement, deleteAnnouncement, togglePin, saving: createMutation.isPending || updateMutation.isPending, currentPage, setCurrentPage: store.setCurrentPage, totalPages, totalItems };
}
