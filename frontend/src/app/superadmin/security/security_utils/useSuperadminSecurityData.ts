import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { securityApi } from '@/app/superadmin/security/security_api/superadmin_security_api';
import type { WafConfig, BlockedIp } from '@/app/superadmin/security/security_types/superadmin_security_types';

export function useSuperadminSecurityData() {
  const queryClient = useQueryClient();
  const queryKey = ['superadmin', 'security'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await securityApi.fetchSecurityData();
      return res.data;
    }
  });

  const updateWafMutation = useMutation({
    mutationFn: (body: Partial<WafConfig>) => securityApi.updateWafConfig(body),
    onSuccess: (res) => {
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          wafConfig: { ...old.wafConfig, ...res.data }
        };
      });
    }
  });

  const addBlockedIpMutation = useMutation({
    mutationFn: (body: Partial<BlockedIp>) => securityApi.addBlockedIp(body),
    onSuccess: (res) => {
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          blockedIps: [res.data, ...old.blockedIps]
        };
      });
    }
  });

  const removeBlockedIpMutation = useMutation({
    mutationFn: (id: string) => securityApi.removeBlockedIp(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          blockedIps: old.blockedIps.filter((ip: BlockedIp) => ip.id !== id)
        };
      });
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    updateWafConfig: updateWafMutation.mutateAsync,
    addBlockedIp: addBlockedIpMutation.mutateAsync,
    removeBlockedIp: removeBlockedIpMutation.mutateAsync
  };
}
