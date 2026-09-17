// DATA FLOW: Manager module state/API data → useManagerInquiriesMutations → owning Manager UI components.
/** Manages UseInquiriesMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiriesApi } from '@/app/manager/inquiries/inquiries_api/ManagerInquiriesApi';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesSharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

interface UseInquiriesMutationsProps {
  showToast: (msg: string, type: ToastType) => void;
  onSuccessCallback?: () => void;
}

export function useManagerInquiriesMutations({ showToast, onSuccessCallback }: UseInquiriesMutationsProps) {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['manager', 'inquiries'] });
  };

  const createInquiryMutation = useMutation({
    mutationFn: (data: Partial<InquiryFormValues>) => inquiriesApi.createInquiry(data),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Request failed', 'error');
    }
  });

  const updateInquiryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InquiryFormValues> }) => inquiriesApi.updateInquiry(id, data),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Request failed', 'error');
    }
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (id: string) => inquiriesApi.deleteInquiry(id),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Request failed', 'error');
    }
  });


  const convertLeadMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => inquiriesApi.convertLead(id, data),
    onSuccess: (response) => {
      showToast(response.message, 'success');
      invalidateQueries();
      queryClient.invalidateQueries({ queryKey: ['manager', 'members'] });
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Request failed', 'error');
    },
  });

  return {
    createInquiry: createInquiryMutation.mutate,
    isCreating: createInquiryMutation.isPending,
    updateInquiry: updateInquiryMutation.mutate,
    isUpdating: updateInquiryMutation.isPending,
    deleteInquiry: deleteInquiryMutation.mutate,
    isDeleting: deleteInquiryMutation.isPending,
    convertLead: convertLeadMutation.mutateAsync,
    isConverting: convertLeadMutation.isPending,
  };
}
