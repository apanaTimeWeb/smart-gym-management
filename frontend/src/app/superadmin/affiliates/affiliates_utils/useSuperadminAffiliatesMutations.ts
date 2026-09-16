'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminAffiliatesMutations consumers.
import { useCallback } from 'react';
import { affiliatesApi } from '@/app/superadmin/affiliates/superadmin_affiliates_api/superadmin_affiliates_api';
import { useSuperadminAffiliatesMutation } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesMutation';
import type { Affiliate, AffiliateStatus, AffiliateFormData } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import type { UseFormReturn } from 'react-hook-form';

export function useSuperadminAffiliatesMutations(
  updateCachedAffiliates: (updater: (previous: Affiliate[]) => Affiliate[]) => void,
  setIsModalOpen: (open: boolean) => void,
  setEditingAffiliate: (affiliate: Affiliate | null) => void,
  form: UseFormReturn<AffiliateFormData>,
  editingAffiliate: Affiliate | null
) {
  const { mutate, isMutating } = useSuperadminAffiliatesMutation();

  const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
    await mutate<Affiliate>(
      () => affiliatesApi.createAffiliate(data),
      {
        onSuccess: (res) => {
          updateCachedAffiliates(previous => [res as Affiliate, ...previous]);
          setIsModalOpen(false);
          form.reset();
        },
      }
    );
  }, [form, mutate, updateCachedAffiliates, setIsModalOpen]);

  const handleEditAffiliate = useCallback(async (data: AffiliateFormData) => {
    if (!editingAffiliate) return;
    await mutate<Affiliate>(
      () => affiliatesApi.updateAffiliate(editingAffiliate.id, data),
      {
        onSuccess: (res) => {
          updateCachedAffiliates(previous => previous.map(a => a.id === editingAffiliate.id ? (res as Affiliate) : a));
          setIsModalOpen(false);
          setEditingAffiliate(null);
          form.reset();
        },
      }
    );
  }, [editingAffiliate, form, mutate, updateCachedAffiliates, setIsModalOpen, setEditingAffiliate]);

  const handleToggleAffiliateStatus = useCallback(async (id: string, currentStatus: AffiliateStatus) => {
    const newStatus: AffiliateStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await mutate<Affiliate>(
      () => affiliatesApi.updateStatus(id, newStatus),
      {
        onSuccess: (updatedAffiliate) => {
          updateCachedAffiliates(previous => previous.map(a => a.id === id ? updatedAffiliate as Affiliate : a));
        },
      }
    );
  }, [mutate, updateCachedAffiliates]);

  const handleDeleteAffiliate = useCallback(async (id: string) => {
    await mutate<void>(
      () => affiliatesApi.deleteAffiliate(id),
      {
        onSuccess: () => {
          updateCachedAffiliates(previous => previous.filter(a => a.id !== id));
        },
      }
    );
  }, [mutate, updateCachedAffiliates]);

  const handlePayCommission = async (affiliate: Affiliate) => {
    try {
      await affiliatesApi.payCommission(affiliate.id);
    } catch {
      // handled by error boundary
    }
  };

  return {
    isMutating,
    handleAddAffiliate,
    handleEditAffiliate,
    handleToggleAffiliateStatus,
    handleDeleteAffiliate,
    handlePayCommission,
  };
}
