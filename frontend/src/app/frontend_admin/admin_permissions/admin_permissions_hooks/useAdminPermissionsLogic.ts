"use client";
// RESPONSIBILITY: Coordinates role-default permissions, per-staff overrides, confirmation, and query invalidation for the Admin Permissions module.
// DATA FLOW: module API / client state → useAdminPermissionsLogic → consuming Admin feature component.
import { ADMIN_PERMISSIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_permissions/admin_permissions_constants/AdminPermissionsQueryKeys';
import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { AdminPermissionsApi } from '@/app/frontend_admin/admin_permissions/admin_permissions_api/AdminPermissionsApi';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_permissions/admin_permissions_store/useAdminPermissionsStore';
import type { RoleType } from '@/app/frontend_admin/admin_permissions/admin_permissions_types/AdminPermissionsTypes';
import { useAdminPermissionsMutations } from '@/app/frontend_admin/admin_permissions/admin_permissions_hooks/useAdminPermissionsMutations';
/**
 * @description useAdminPermissionsLogic: Coordinates role-default permissions, per-staff overrides, confirmation, and query invalidation for the Admin Permissions module.
 * @dependencies Consumes AdminPermissionsQueryKeys, useAdminLayoutConfirm, AdminPermissionsApi, useAdminPermissionsStore, AdminPermissionsTypes, useAdminPermissionsMutations.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminPermissionsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminLayoutConfirm();
  const { activeRole, staffSearch, setEditingStaffId } = useAdminPermissionsStore();

  const permissionsQuery = useQuery({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('permissions'), queryFn: () => AdminPermissionsApi.fetchPermissions(), staleTime: 300000 });
  const overridesQuery = useQuery({ queryKey: ADMIN_PERMISSIONS_QUERY_KEYS.key('overrides'), queryFn: () => AdminPermissionsApi.fetchOverrides(), staleTime: 300000 });
  const roleDefaults = permissionsQuery.data?.data ?? [];
  const overrides = overridesQuery.data?.data ?? [];

  const filteredOverrides = useMemo(() => {
    const search = staffSearch.trim().toLowerCase();
    return overrides.filter((item) => {
      const matchesRole = activeRole === 'all' || item.role === activeRole;
      const matchesSearch = !search || item.staffName.toLowerCase().includes(search) || item.staffId.toLowerCase().includes(search);
      return matchesRole && matchesSearch;
    });
  }, [activeRole, overrides, staffSearch]);

  const { updateStaffMutation, resetMutation, getIntentKey, clearIntentKey } = useAdminPermissionsMutations();

  const toggleStaffPermission = useCallback(async (staffId: string, staffName: string, permission: string, enabled: boolean) => {
    const confirmed = await confirm({ title: t('permissions.AdminPermissionsConfirm.changeTitle'), message: t('permissions.AdminPermissionsConfirm.changeMessage', { permission, staffName }), confirmText: t('permissions.AdminPermissionsConfirm.changeConfirm'), type: 'warning' });
    if (!confirmed) return;
    const intentId = `permission:${staffId}:${permission}`;
    updateStaffMutation.mutate({ staffId, permission, enabled, idempotencyKey: getIntentKey(intentId) });
  }, [confirm, getIntentKey, updateStaffMutation]);

  const resetToDefaults = useCallback(async (staffId: string, staffName: string, role: RoleType) => {
    const confirmed = await confirm({ title: t('permissions.AdminPermissionsConfirm.resetTitle'), message: t('permissions.AdminPermissionsConfirm.resetMessage', { staffName, role }), confirmText: t('permissions.AdminPermissionsConfirm.resetConfirm'), type: 'danger' });
    const intentId = `reset:${staffId}`;
    if (!confirmed) { clearIntentKey(intentId); return; }
    await resetMutation.mutateAsync({ staffId, idempotencyKey: getIntentKey(intentId) });
    setEditingStaffId(null);
  }, [clearIntentKey, confirm, getIntentKey, resetMutation]);

  return {
    status: permissionsQuery.status === 'error' || overridesQuery.status === 'error' ? 'error' : permissionsQuery.status === 'pending' || overridesQuery.status === 'pending' ? 'pending' : 'success',
    roleDefaults,
    overrides: filteredOverrides,
    saving: updateStaffMutation.isPending || resetMutation.isPending,
    activeRole,
    staffSearch,
    toggleStaffPermission,
    resetToDefaults,
  };
}
