"use client";

// DATA FLOW: Plan form/action → mutation hook → AdminPlansApi → TanStack Query invalidation → plan UI and backend feedback.
// RESPONSIBILITY: Owns plan create, update, and delete mutations for Admin Plans.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_PLANS_QUERY_KEYS } from '@/app/frontend_admin/admin_plans/admin_plans_constants/AdminPlansQueryKeys';
import { AdminPlansApi } from '@/app/frontend_admin/admin_plans/admin_plans_api/AdminPlansApi';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_plans/admin_plans_store/useAdminPlansStore';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { Plan } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';
/**
 * @description useAdminPlansMutations: Owns plan create, update, and delete mutations for Admin Plans.
 * @dependencies Consumes AdminPlansQueryKeys, AdminPlansApi, useAdminPlansStore, useAdminLayoutToastStore, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminPlansMutations() {
  const queryClient = useQueryClient();
  const store = useAdminPlansStore();
  const { showToast } = useAdminLayoutToastStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ADMIN_PLANS_QUERY_KEYS.key('list') });
  const createMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Plan>; idempotencyKey: string }) => AdminPlansApi.createPlan(payload, idempotencyKey),
    onSuccess: (res) => { showToast(res.message, 'success', 'plans-create-success'); clearIntentKey('create-plan'); store.setShowModal(false); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) showToast(message, 'error', 'plans-create-error'); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Plan>; idempotencyKey: string }) => AdminPlansApi.updatePlan(id, payload, idempotencyKey),
    onSuccess: (res, variables) => { showToast(res.message, 'success', 'plans-update-success'); clearIntentKey(`update-plan:${variables.id}`); store.setShowModal(false); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) showToast(message, 'error', 'plans-update-error'); },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminPlansApi.deletePlan(id, idempotencyKey),
    onSuccess: (res, variables) => { showToast(res.message, 'success', 'plans-delete-success'); clearIntentKey(`delete-plan:${variables.id}`); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) showToast(message, 'error', 'plans-delete-error'); },
  });
  return { createMutation, updateMutation, deleteMutation, getIntentKey, clearIntentKey };
}
