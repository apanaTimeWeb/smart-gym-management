'use client';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { useSuperadminGhostLoginStore } from '@/app/superadmin/superadmin_components/SuperadminLayout/useSuperadminGhostLoginStore';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';

export function useSuperadminGymMutations(gyms: Tenant[]) {
  const { confirm } = useSuperadminConfirm();
  const startGhostLogin = useSuperadminGhostLoginStore(state => state.startGhostLogin);
  const queryClient = useQueryClient();

  const impersonateMutation = useMutation({
    mutationFn: (id: string) => gymsApi.impersonateTenant(id),
    onSuccess: async (res, id) => {
      if (res.success && res.data?.token) {
        toast.success(res.message);

        try {
          await gymsApi.setGhostLoginCookie(res.data.token, id);
        } catch {}

        const gym = gyms.find((g) => g.id === id);
        if (gym) {
          startGhostLogin({ id: gym.id, name: gym.name, plan: gym.plan, adminEmail: gym.adminEmail });
        }

        window.location.href = GymsUrlConfig.GHOST_LOGIN.ADMIN_DASHBOARD;
      } else {
        toast.error(res.message);
      }
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message);
    },
  });

  const suspendMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => gymsApi.changeGymStatus(id, status),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message);
    },
  });

  const onGhostLoginClick = (e: React.MouseEvent, gymId: string, gymName: string) => {
    e.stopPropagation();
    impersonateMutation.mutate(gymId);
  };

  const onSuspendClick = async (e: React.MouseEvent, gymId: string, gymName: string, currentStatus: string) => {
    e.stopPropagation();
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    const action = currentStatus === 'SUSPENDED' ? 'unsuspend' : 'suspend';
    
    const confirmed = await confirm({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Gym`,
      message: currentStatus === 'SUSPENDED' 
        ? `Are you sure you want to unsuspend ${gymName}? This will restore access for the tenant.`
        : `Are you sure you want to suspend ${gymName}? This will immediately block access for all managers, branch staff, and trainers under this tenant, and halt all automated billing and notifications.`,
      type: currentStatus === 'SUSPENDED' ? 'info' : 'danger',
      confirmText: `Yes, ${action}`
    });

    if (confirmed) {
      suspendMutation.mutate({ id: gymId, status: newStatus });
    }
  };

  const actionLoadingId = impersonateMutation.isPending 
    ? impersonateMutation.variables 
    : suspendMutation.isPending 
      ? suspendMutation.variables?.id 
      : null;

  return {
    impersonateMutation,
    suspendMutation,
    actionLoadingId,
    onGhostLoginClick,
    onSuspendClick,
  };
}
