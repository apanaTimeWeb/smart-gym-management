import { useState, useEffect, useMemo, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminData } from '../useSuperadminData';
import { SuperadminUrlConfig } from '../../superadmin_url_config';
import { Affiliate } from '../../superadmin_types/superadmin_types';
import { AffiliateSchema, AffiliateFormData } from '../SuperadminZodSchemas';
import { useSuperadminMutation } from './useSuperadminMutation';
import { superadminApi } from '@/lib/superadmin-api';

export const useAffiliatesPage = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const { data: fetchedData, loading, error } = useSuperadminData<Affiliate[]>(SuperadminUrlConfig.BACKEND_API.AFFILIATES_BASE);

  useEffect(() => {
    if (fetchedData) {
      setAffiliates(fetchedData);
    }
  }, [fetchedData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(AffiliateSchema),
    defaultValues: {
      name: '',
      email: '',
      referralCode: '',
    },
  });

  const { mutate, isMutating } = useSuperadminMutation();

  const handleAddAffiliate = useCallback(async (data: AffiliateFormData) => {
    await mutate(
      () => superadminApi.affiliates.create(data),
      {
        successMessage: 'Affiliate added successfully',
        onSuccess: (res) => {
          setAffiliates(prev => [res.data, ...prev]);
          setIsModalOpen(false);
          form.reset();
        }
      }
    );
  }, [form, mutate]);

  const totalAffiliates = affiliates.length;
  const totalCommission = useMemo(() => affiliates.reduce((sum, a) => sum + a.commissionEarned, 0), [affiliates]);

  const filteredAffiliates = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return affiliates.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      a.referralCode.toLowerCase().includes(lowerQuery) ||
      a.email.toLowerCase().includes(lowerQuery)
    );
  }, [affiliates, searchQuery]);

  return {
    loading,
    error,
    affiliates: filteredAffiliates,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddAffiliate,
    isMutating,
    totalAffiliates,
    totalCommission,
  };
};
