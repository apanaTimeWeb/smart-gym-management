import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DUMMY_AFFILIATES } from '../SuperadminSharedConstants';
import { Affiliate } from '../../superadmin_types/superadmin_types';
import { AffiliateSchema, AffiliateFormData } from '../SuperadminZodSchemas';

export const useAffiliatesPage = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>(DUMMY_AFFILIATES);
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

  const handleAddAffiliate = useCallback((data: AffiliateFormData) => {
    const newAffiliate: Affiliate = {
      id: `aff-new-${Date.now()}`,
      name: data.name,
      email: data.email,
      referralCode: data.referralCode.toUpperCase(),
      totalReferred: 0,
      commissionEarned: 0,
      status: 'ACTIVE',
      joinedAt: new Date().toISOString(),
    };

    setAffiliates((prev) => [newAffiliate, ...prev]);
    setIsModalOpen(false);
    form.reset();
  }, [form]);

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
    affiliates: filteredAffiliates,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddAffiliate,
    totalAffiliates,
    totalCommission,
  };
};
