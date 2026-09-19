// RESPONSIBILITY: Owns Team alert-preference mutation and Query reconciliation.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeamAlertPreferences } from '@/app/superadmin/team/team_api/SuperadminTeamApi';
import type { SuperadminTeamAlertPreferenceUpdate } from '@/app/superadmin/team/team_types/SuperadminTeamTypes';
/**
 * Purpose: Keeps alert preference persistence out of the Team panel component.
 * Inputs: feature-owned alert preference values.
 * Output: save action, pending state, error.
 * Side effects: refreshes team Query data after success.
 * Invariant: no direct API calls from JSX.
 */
export function useSuperadminTeamAlertPreferences() {
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: (preferences: SuperadminTeamAlertPreferenceUpdate[]) => updateTeamAlertPreferences(preferences), onSuccess: async (response) => { if (!response.success) throw new Error(response.message); await queryClient.invalidateQueries({ queryKey: ['superadmin', 'team'] }); } });
  return { savePreferences: mutation.mutateAsync, isSaving: mutation.isPending, error: mutation.error };
}
