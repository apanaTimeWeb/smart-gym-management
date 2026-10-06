"use client";

// DATA FLOW: Blacklist confirmation/form → mutation hook → AdminBlacklistApi → TanStack Query invalidation → blacklist UI and feedback.
// RESPONSIBILITY: Owns all TanStack Query mutations and cache updates for Admin Blacklist.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_BLACKLIST_QUERY_KEYS } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_constants/AdminBlacklistQueryKeys';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_api/AdminBlacklistApi';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_store/useAdminBlacklistStore';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { BlacklistFormValues } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
/**
 * @description useAdminBlacklistMutations: Owns all TanStack Query mutations and cache updates for Admin Blacklist.
 * @dependencies Consumes AdminBlacklistQueryKeys, AdminBlacklistApi, useAdminBlacklistStore, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminBlacklistMutations() {
  const queryClient = useQueryClient();
  const store = useAdminBlacklistStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const addMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: BlacklistFormValues; idempotencyKey: string }) => AdminBlacklistApi.addToBlacklist(payload, idempotencyKey),
    onSuccess: (response) => { clearIntentKey('add-blacklist'); adminToast.success(response.message, 'admin-success-05f887bf44'); store.setShowModal(false); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-1f0bf3da16'); },
  });
  const removeMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminBlacklistApi.removeFromBlacklist(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-d13beab19d'); clearIntentKey(`remove-blacklist:${variables.id}`); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-e6e7045880'); },
  });
  const toggleMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminBlacklistApi.toggleBlacklist(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-40f1704ed7'); clearIntentKey(`toggle-blacklist:${variables.id}`); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-547e47fc01'); },
  });
  const propagateMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminBlacklistApi.propagateToAllBranches(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-52cccb7033'); clearIntentKey(`propagate-blacklist:${variables.id}`); void Promise.all([
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym') }),
        queryClient.invalidateQueries({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis') }),
      ]); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-86b564e1d9'); },
  });

  return { getIntentKey, clearIntentKey, addMutation, removeMutation, toggleMutation, propagateMutation };
}
