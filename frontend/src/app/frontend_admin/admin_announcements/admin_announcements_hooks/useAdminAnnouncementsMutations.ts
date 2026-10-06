"use client";

// DATA FLOW: Announcement form/action → mutation hook → AdminAnnouncementsApi → TanStack Query invalidation → announcement UI and backend feedback.
// RESPONSIBILITY: Owns all TanStack Query mutations and cache updates for Admin Announcements.

import { useCallback, useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ADMIN_ANNOUNCEMENTS_QUERY_KEYS } from '@/app/frontend_admin/admin_announcements/admin_announcements_constants/AdminAnnouncementsQueryKeys';
import { AdminAnnouncementsApi } from '@/app/frontend_admin/admin_announcements/admin_announcements_api/AdminAnnouncementsApi';
import { useAdminAnnouncementsStore } from '@/app/frontend_admin/admin_announcements/admin_announcements_store/useAdminAnnouncementsStore';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { AnnouncementFormValues } from '@/app/frontend_admin/admin_announcements/admin_announcements_types/AdminAnnouncementsTypes';
/**
 * @description useAdminAnnouncementsMutations: Owns all TanStack Query mutations and cache updates for Admin Announcements.
 * @dependencies Consumes AdminAnnouncementsQueryKeys, AdminAnnouncementsApi, useAdminAnnouncementsStore, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminAnnouncementsMutations() {
  const queryClient = useQueryClient();
  const store = useAdminAnnouncementsStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const createMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey, intentId }: { payload: AnnouncementFormValues; idempotencyKey: string; intentId: string }) => AdminAnnouncementsApi.createAnnouncement(payload, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-33383590'); store.setShowModal(false); void queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-6481815840'); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey, intentId }: { id: string; payload: AnnouncementFormValues; idempotencyKey: string; intentId: string }) => AdminAnnouncementsApi.updateAnnouncement(id, payload, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-c151e3e9'); store.setShowModal(false); store.setEditingAnnouncementId(null); void queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-72b190472c'); },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminAnnouncementsApi.deleteAnnouncement(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-05945f3e'); clearIntentKey(`delete-announcement:${variables.id}`); void queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key() }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-f6f10488f8'); },
  });
  const pinMutation = useMutation({
    mutationFn: ({ id, idempotencyKey, intentId }: { id: string; idempotencyKey: string; intentId: string }) => AdminAnnouncementsApi.togglePin(id, idempotencyKey),
    onSuccess: (response, variables) => { clearIntentKey(variables.intentId); adminToast.success(response.message, 'admin-success-d9cfd2a7'); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_ANNOUNCEMENTS_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-01a0fd9c95'); },
  });

  return {
    getIntentKey,
    clearIntentKey,
    createMutation,
    updateMutation,
    deleteMutation,
    pinMutation,
  };
}
