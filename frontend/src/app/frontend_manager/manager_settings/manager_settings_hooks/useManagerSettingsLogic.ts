'use client';
import { useCallback, useRef } from 'react';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { useManagerSettingsQuery } from '@/app/frontend_manager/manager_settings/manager_settings_hooks/useManagerSettingsQuery';
import { useManagerSettingsMutations } from '@/app/frontend_manager/manager_settings/manager_settings_hooks/useManagerSettingsMutations';
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_settings/manager_settings_types/ManagerSettingsTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates settings feature state and its documented UI/API boundary through useManagerSettingsLogic.
 * @dependencies Uses ManagerIdempotency, useManagerSettingsQuery, ManagerSettingsTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerSettingsLogic owns the settings feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerSettingsLogic() {
  const query = useManagerSettingsQuery();
  const settingsMutation = useManagerSettingsMutations();
  const idempotencyKeyRef = useRef<string | null>(null);
  const saveSettings = useCallback(async (draft: ManagerAllSettings) => {
    const idempotencyKey = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    idempotencyKeyRef.current = idempotencyKey;
    const response = await settingsMutation.mutateAsync({ draft, idempotencyKey });
    idempotencyKeyRef.current = null;
    return response;
  }, [settingsMutation]);
  return {
    settings: query.data?.data ?? null,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error instanceof Error ? query.error.message : '',
    saveSettings,
    retry: query.refetch,
    saving: settingsMutation.isPending,
  };
}
