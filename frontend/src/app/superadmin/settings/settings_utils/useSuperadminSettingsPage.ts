// DATA FLOW: Inputs enter useSuperadminSettingsPage, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Platform Settings server state and update mutations.
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/app/superadmin/settings/settings_api/SuperadminSettingsApi';
/**
 * Purpose: Centralizes Settings data access and cache reconciliation.
 * Inputs: platform setting identifier/value for mutation.
 * Output: validated Query state and update action.
 * Side effects: invalidates the settings Query after a successful update.
 * Invariant: settings API is never called from JSX.
 */
export function useSuperadminSettingsPage() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['superadmin', 'settings'], queryFn: settingsApi.fetchSettings });
  const update = useMutation({ mutationFn: ({ id, value }: { id: string; value: string }) => settingsApi.updateSetting(id, { value }), onSuccess: async (response) => { if (!response.success || !response.data) throw new Error(response.message); await queryClient.invalidateQueries({ queryKey: ['superadmin', 'settings'] }); } });
  return { query, updateSetting: update.mutateAsync, isUpdating: update.isPending, updateError: update.error, variables: update.variables };
}
