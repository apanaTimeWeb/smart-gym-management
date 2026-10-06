"use client";

// DATA FLOW: Permission action → mutation hook → AdminPermissionsApi → TanStack Query invalidation → permission UI and backend feedback.
// RESPONSIBILITY: Owns permission override and reset mutations for Admin Permissions.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_PERMISSIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_permissions/admin_permissions_constants/AdminPermissionsQueryKeys';
import { AdminPermissionsApi } from '@/app/frontend_admin/admin_permissions/admin_permissions_api/AdminPermissionsApi';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
/**
 * @description useAdminPermissionsMutations: Owns permission override and reset mutations for Admin Permissions.
 * @dependencies Consumes AdminPermissionsQueryKeys, AdminPermissionsApi, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminPermissionsMutations() {
  const queryClient = useQueryClient();
  const intentKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(intentKeysRef.current, intentId), []);
  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('overrides') }),
      queryClient.invalidateQueries({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('permissions') }),
    ]);
  };
  const updateStaffMutation = useMutation({
    mutationFn: ({ staffId, permission, enabled, idempotencyKey }: { staffId: string; permission: string; enabled: boolean; idempotencyKey: string }) => AdminPermissionsApi.updateStaffPermission(staffId, { permission, enabled }, idempotencyKey),
    onSuccess: async (response, variables) => { clearIntentKey(`permission:${variables.staffId}:${variables.permission}`); adminToast.success(response.message, `admin_permissions-update-${variables.staffId}-${variables.permission}`); await invalidate(); },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin_permissions-update-error'); },
  });
  const resetMutation = useMutation({
    mutationFn: ({ staffId, idempotencyKey }: { staffId: string; idempotencyKey: string }) => AdminPermissionsApi.resetToDefaults(staffId, idempotencyKey),
    onSuccess: async (response, variables) => { clearIntentKey(`reset:${variables.staffId}`); adminToast.success(response.message, `admin_permissions-reset-${variables.staffId}`); await invalidate(); },
    onError: (error) => { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin_permissions-reset-error'); },
  });
  return { updateStaffMutation, resetMutation, getIntentKey, clearIntentKey };
}
