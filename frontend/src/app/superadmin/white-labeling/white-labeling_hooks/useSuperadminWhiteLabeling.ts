import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SuperadminWhiteLabelingApi } from '../white-labeling_api/SuperadminWhiteLabelingApi';
import type { UpdateDomainStatusDto } from '../white-labeling_types/SuperadminWhiteLabelingTypes';
import { toast } from 'react-hot-toast';

export const DOMAINS_QUERY_KEY = ['superadmin', 'white-labeling', 'domains'];

export function useSuperadminWhiteLabelingDomains() {
  return useQuery({
    queryKey: DOMAINS_QUERY_KEY,
    queryFn: () => SuperadminWhiteLabelingApi.getDomains(),
  });
}

export function useUpdateSuperadminDomainStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDomainStatusDto }) =>
      SuperadminWhiteLabelingApi.updateDomainStatus(id, dto),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: DOMAINS_QUERY_KEY });
      toast.success(res.message || 'Status updated successfully', { id: 'update-domain-status-success' });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update domain status', { id: 'update-domain-status-error' });
    },
  });
}
