import { useState, useEffect, useMemo, useCallback  } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperadminData } from '../useSuperadminData';
import { SuperadminUrlConfig } from '../../superadmin_url_config';
import { Coupon } from '../../superadmin_types/superadmin_types';
import { CouponSchema, CouponFormData } from '../SuperadminZodSchemas';
import { useSuperadminMutation } from './useSuperadminMutation';
import { superadminApi } from '@/lib/superadmin-api';

export const useCouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { data: fetchedData, loading, error } = useSuperadminData<Coupon[]>(SuperadminUrlConfig.BACKEND_API.COUPONS_BASE);

  useEffect(() => {
    if (fetchedData) {
      setCoupons(fetchedData);
    }
  }, [fetchedData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<CouponFormData>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: '',
      discountPercentage: undefined,
      maxUses: undefined,
      expiryDate: '',
    },
  });

  const { mutate, isMutating } = useSuperadminMutation();

  const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
    await mutate(
      () => superadminApi.coupons.create(data),
      {
        successMessage: 'Coupon created successfully',
        onSuccess: (res) => {
          setCoupons(prev => [res.data, ...prev]);
          setIsModalOpen(false);
          form.reset();
        }
      }
    );
  }, [form, mutate]);

  const activeCoupons = useMemo(() => coupons.filter(c => c.status === 'ACTIVE').length, [coupons]);
  const totalRedeemed = useMemo(() => coupons.reduce((sum, c) => sum + c.currentUses, 0), [coupons]);

  const filteredCoupons = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return coupons.filter(c => c.code.toLowerCase().includes(lowerQuery));
  }, [coupons, searchQuery]);

  return {
    loading,
    error,
    coupons: filteredCoupons,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleCreateCoupon,
    isMutating,
    activeCoupons,
    totalRedeemed,
  };
};
