// DATA FLOW: Manager module state/API data → useManagerInquiriesMutations → owning Manager UI components.
'use client';
/** Manages UseInquiriesMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiriesApi } from '@/app/manager/inquiries/inquiries_api/ManagerInquiriesApi';
import { showManagerErrorToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


interface UseInquiriesMutationsProps {
  showToast: (msg: string, type: ManagerToastType) => void;
  onSuccessCallback?: () => void;
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
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
      showManagerErrorToast(err, 'manager-inquiries-error');
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
      showManagerErrorToast(err, 'manager-inquiries-error');
    }
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => inquiriesApi.deleteInquiry(id, idempotencyKey),
    onSuccess: (res) => {
      showToast(res.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showManagerErrorToast(err, 'manager-inquiries-error');
    }
  });


  const convertLeadMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => inquiriesApi.convertLead(id, data),
    onSuccess: (response) => {
      showToast(response.message, 'success');
      invalidateQueries();
      onSuccessCallback?.();
    },
    onError: (err) => {
      showManagerErrorToast(err, 'manager-inquiries-error');
    } });

  return {
    createInquiry: createInquiryMutation.mutateAsync,
    isCreating: createInquiryMutation.isPending,
    updateInquiry: updateInquiryMutation.mutateAsync,
    isUpdating: updateInquiryMutation.isPending,
    deleteInquiry: deleteInquiryMutation.mutateAsync,
    isDeleting: deleteInquiryMutation.isPending,
    convertLead: convertLeadMutation.mutateAsync,
    isConverting: convertLeadMutation.isPending };
}
