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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
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

  const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
    await mutate(
      () => superadminApi.coupons.update(id, data),
      {
        successMessage: 'Coupon updated successfully',
        onSuccess: (res) => {
          setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...res.data } : c));
          setIsEditModalOpen(false);
          setSelectedCoupon(null);
        }
      }
    );
  }, [mutate]);

  const handleDeleteCoupon = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      await mutate(
        () => superadminApi.coupons.delete(id),
        {
          successMessage: 'Coupon deleted successfully',
          onSuccess: () => {
            setCoupons(prev => prev.filter(c => c.id !== id));
          }
        }
      );
    }
  }, [mutate]);

  const handleToggleRestore = useCallback(async (id: string) => {
    await mutate(
      () => superadminApi.coupons.update(id, { isDeleted: false }),
      {
        successMessage: 'Coupon restored successfully',
        onSuccess: (res) => {
          setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...res.data } : c));
        }
      }
    );
  }, [mutate]);

  const activeCoupons = useMemo(() => coupons.filter(c => c.status === 'ACTIVE' && !c.isDeleted).length, [coupons]);
  const totalRedeemed = useMemo(() => coupons.reduce((sum, c) => sum + c.currentUses, 0), [coupons]);

  const filteredCoupons = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const sorted = [...coupons].sort((a, b) => {
      if (a.isDeleted && !b.isDeleted) return 1;
      if (!a.isDeleted && b.isDeleted) return -1;
      return 0;
    });
    return sorted.filter(c => c.code.toLowerCase().includes(lowerQuery));
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
    isEditModalOpen,
    setIsEditModalOpen,
    selectedCoupon,
    setSelectedCoupon,
    handleUpdateCoupon,
    handleDeleteCoupon,
    handleToggleRestore
  };
};
