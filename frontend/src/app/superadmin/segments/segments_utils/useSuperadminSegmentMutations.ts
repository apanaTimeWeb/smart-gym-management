// RESPONSIBILITY: Owns create/update segment persistence and feature Query reconciliation.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSegment, updateSegment } from '@/app/superadmin/segments/segments_api/SuperadminSegmentsApi';
import type { SuperadminSegmentCreatePayload, SuperadminSegmentUpdatePayload } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
/**
 * Purpose: Centralizes segment create/update mutations.
 * Inputs: validated feature-owned segment payloads.
 * Output: mutateAsync action and pending state.
 * Side effects: invalidates the segments list after success.
 * Invariant: Segment editor never owns the API client dependency.
 */
export function useSuperadminSegmentMutations() {
  const queryClient = useQueryClient();
  const reconcile = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'segments'] });
  const create = useMutation({ mutationFn: (payload: SuperadminSegmentCreatePayload) => createSegment(payload), onSuccess: async (response) => { if (!response.success || !response.data) throw new Error(response.message); await reconcile(); } });
  const update = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: SuperadminSegmentUpdatePayload }) => updateSegment(id, payload), onSuccess: async (response) => { if (!response.success || !response.data) throw new Error(response.message); await reconcile(); } });
  return { createSegment: create.mutateAsync, updateSegment: update.mutateAsync, isSaving: create.isPending || update.isPending };
}
