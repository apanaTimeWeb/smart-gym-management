"use client";
// RESPONSIBILITY: Custom hook for fetching and mutating permissions data.
// DATA FLOW: AdminPermissionsMain → useAdminPermissionsLogic → permissionsApi

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { permissionsApi } from '@/app/admin/permissions/permissions_api/AdminPermissionsApi';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { useAdminPermissionsStore } from '@/app/admin/permissions/permissions_store/useAdminPermissionsStore';
import type { RolePermissions, GymPermissionOverride, PermissionsData, RoleType } from '@/app/admin/permissions/permissions_types/AdminPermissionsTypes';

export function useAdminPermissionsLogic() {
  const qc = useQueryClient();
  const { confirm } = useAdminConfirm();
  const { activeRole, selectedGymId } = useAdminPermissionsStore();

  const permissionsQuery = useQuery({
    queryKey: ['admin', 'permissions', 'matrix'],
    queryFn: () => permissionsApi.fetchPermissions().then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const status = permissionsQuery.status;
  const data = permissionsQuery.data ?? null;

  const updateRoleMutation = useMutation({
    mutationFn: ({ role, permissions }: { role: RoleType; permissions: Record<string, boolean> }) =>
      permissionsApi.updateRolePermissions(role, permissions),
    onSuccess: (res) => { adminToast.success(res.message, 'admin-success-87279cf87a'); qc.invalidateQueries({ queryKey: ['admin', 'permissions', 'matrix'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-3f24a2a070'),
  });

  const updateGymMutation = useMutation({
    mutationFn: ({ gymId, role, overrides }: { gymId: string; role: RoleType; overrides: Record<string, boolean> }) =>
      permissionsApi.updateGymOverride(gymId, role, overrides),
    onSuccess: (res) => { adminToast.success(res.message, 'admin-success-b366e427f2'); qc.invalidateQueries({ queryKey: ['admin', 'permissions', 'matrix'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-8ed3db0d3e'),
  });

  const updateRolePermission = useCallback(async (role: RoleType, key: string, value: boolean) => {
    const current = data?.roleDefaults.find((item) => item.role === role);
    if (!current) return;
    if (!value && current.permissions[key]) {
      const confirmed = await confirm({
        title: 'Revoke Permission',
        message: `Remove ${key} access from the ${role} role?`,
        confirmText: 'Revoke',
        type: 'danger',
      });
      if (!confirmed) return;
    }
    const updated = { ...current.permissions, [key]: value };
    updateRoleMutation.mutate({ role, permissions: updated });
  }, [confirm, data, updateRoleMutation]);

  const updateGymOverride = useCallback(async (gymId: string, role: RoleType, key: string, value: boolean) => {
    const current = data?.gymOverrides.find((item) => item.gymId === gymId && item.role === role);
    const currentValue = current?.overrides?.[key] ?? false;
    if (!value && currentValue) {
      const confirmed = await confirm({
        title: 'Revoke Gym Permission Override',
        message: `Revoke ${key} override for the ${role} role in this gym?`,
        confirmText: 'Revoke',
        type: 'danger',
      });
      if (!confirmed) return;
    }
    const updated = { ...(current?.overrides ?? {}), [key]: value };
    updateGymMutation.mutate({ gymId, role, overrides: updated });
  }, [confirm, data, updateGymMutation]);

  const saving = updateRoleMutation.isPending || updateGymMutation.isPending;

  // Effective permissions = role defaults merged with gym overrides
  const getEffectivePermissions = useCallback((gymId: string, role: RoleType) => {
    const roleDefaults = data?.roleDefaults.find((r) => r.role === role)?.permissions ?? {};
    if (gymId === 'default') return roleDefaults;
    const override = data?.gymOverrides.find((o) => o.gymId === gymId && o.role === role)?.overrides ?? {};
    return { ...roleDefaults, ...override };
  }, [data]);

  return { permissionsData: data ?? null, status, saving, activeRole, selectedGymId, updateRolePermission, updateGymOverride, getEffectivePermissions };
}