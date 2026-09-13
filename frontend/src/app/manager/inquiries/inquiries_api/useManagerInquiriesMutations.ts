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
    mutationFn: (data: Partial<InquiryFormValues>) => inquiriesApi.create(data),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Failed to create inquiry', 'error');
    }
  });

  const updateInquiryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InquiryFormValues> }) => inquiriesApi.update(id, data),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Failed to update inquiry', 'error');
    }
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (id: string) => inquiriesApi.remove(id),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showToast(err instanceof Error ? err.message : 'Failed to delete inquiry', 'error');
    }
  });

  return {
    createInquiry: createInquiryMutation.mutate,
    isCreating: createInquiryMutation.isPending,
    updateInquiry: updateInquiryMutation.mutate,
    isUpdating: updateInquiryMutation.isPending,
    deleteInquiry: deleteInquiryMutation.mutate,
    isDeleting: deleteInquiryMutation.isPending,
  };
}
