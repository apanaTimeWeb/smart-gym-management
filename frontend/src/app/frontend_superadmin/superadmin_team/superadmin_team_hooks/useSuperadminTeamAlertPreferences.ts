'use client';
// DATA FLOW: Inputs enter useSuperadminTeamAlertPreferences, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns Team alert-preference mutation and Query reconciliation.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTeamAlertPreferences } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_api/SuperadminTeamApi';
import { SUPERADMIN_TEAM_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_constants/SuperadminTeamQueryKeys';

import type { SuperadminTeamAlertPreferenceUpdate } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_types/SuperadminTeamTypes';


/**
 * Purpose: Keeps alert preference persistence out of the Team panel component.
 * Inputs: feature-owned alert preference values.
 * Output: save action, pending state, error.
 * Side effects: refreshes team Query data after success.
 * Invariant: no direct API calls from JSX.
 */
/**
 * @description Manages team state, queries, and UI interactions for useSuperadminTeamAlertPreferences.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminTeamAlertPreferences → consuming feature component.
export function useSuperadminTeamAlertPreferences() {
  const idempotencyKeyRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: ({ preferences, idempotencyKey }: { preferences: SuperadminTeamAlertPreferenceUpdate[]; idempotencyKey: string }) => updateTeamAlertPreferences(preferences, idempotencyKey), onSuccess: async (response) => { if (!response.success) throw new Error(response.message); await queryClient.invalidateQueries({ queryKey: SUPERADMIN_TEAM_QUERY_KEYS.all });
      idempotencyKeyRef.current = null; } });
  const savePreferences = (preferences: SuperadminTeamAlertPreferenceUpdate[]) => mutation.mutateAsync({ preferences, idempotencyKey: (idempotencyKeyRef.current ??= crypto.randomUUID()) });
  return { savePreferences, isSaving: mutation.isPending, error: mutation.error };
}
