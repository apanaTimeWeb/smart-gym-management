"use client";
// DATA FLOW: Settings form submission → mutation hook → AdminSettingsApi → TanStack Query invalidation → Settings UI and backend feedback.
// RESPONSIBILITY: Owns one Admin Settings section mutation lifecycle while the caller owns form state.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_admin/admin_settings/admin_settings_constants/AdminSettingsQueryKeys';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import type { FieldValues } from 'react-hook-form';
import type { AdminSettingsMutationSubmit, AdminSettingsMutationVariables } from '@/app/frontend_admin/admin_settings/admin_settings_types/AdminSettingsMutationTypes';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/admin_settings_api/AdminSettingsApi';


/**
 * @description useAdminSettingsMutation: Owns one Admin Settings section mutation lifecycle while the caller owns form state.
 * @dependencies Consumes AdminSettingsQueryKeys, AdminLayoutToastService, AdminLayoutBackendMessage, AdminSettingsApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminSettingsMutation<TFormValues extends FieldValues>(submit: AdminSettingsMutationSubmit<TFormValues>, toastId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, idempotencyKey }: AdminSettingsMutationVariables<TFormValues>) => submit(data, idempotencyKey),
    onSuccess: (res) => { adminToast.success(res.message, toastId); void queryClient.invalidateQueries({ queryKey: ADMIN_SETTINGS_QUERY_KEYS.key() }); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, toastId); },
  });
}
