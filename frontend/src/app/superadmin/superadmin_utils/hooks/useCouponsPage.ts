// RESPONSIBILITY: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
// DATA FLOW: superadminApi → useCouponsPage → CouponsClient
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { superadminApi } from '@/app/superadmin/superadmin_api/superadmin_api';
import { useSuperadminMutation } from '@/app/superadmin/superadmin_utils/hooks/useSuperadminMutation';
import { CouponSchema, CouponFormData } from '@/app/superadmin/superadmin_utils/SuperadminZodSchemas';
import type { Coupon, CouponStatus } from '@/app/superadmin/superadmin_types/superadmin_types';

export const useCouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { data: fetchedData, loading, error } = useSuperadminData<Coupon[]>(
    SuperadminUrlConfig.BACKEND_API.COUPONS_BASE
  );

  // Sync fetched data into local state for pessimistic mutations
  useEffect(() => {
    if (fetchedData) setCoupons(fetchedData);
  }, [fetchedData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<CouponFormData>({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: '',
      discountType: 'PERCENTAGE',
      discountValue: undefined,
      maxUses: undefined,
      expiryDate: '',
    },
  });

  const { mutate, isMutating } = useSuperadminMutation();

  const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
    await mutate<Coupon>(
      () => superadminApi.coupons.create(data) as Promise<{ success: boolean; data: Coupon; message: string }>,
      {
        successMessage: 'Coupon created successfully',
        onSuccess: (res) => {
          setCoupons(prev => [res as Coupon, ...prev]);
          setIsModalOpen(false);
          form.reset();
        },
      }
    );
  }, [form, mutate]);

  const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
    await mutate<Coupon>(
      () => superadminApi.coupons.update(id, data) as Promise<{ success: boolean; data: Coupon; message: string }>,
      {
        successMessage: 'Coupon updated successfully',
        onSuccess: (res) => {
          setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...(res as Coupon) } : c));
          setIsEditModalOpen(false);
          setSelectedCoupon(null);
        },
      }
    );
  }, [mutate]);

  const handleDeleteCoupon = useCallback(async (id: string) => {
    // Confirmation is handled by the caller via a modal — not window.confirm
    await mutate<null>(
      () => superadminApi.coupons.remove(id) as Promise<{ success: boolean; data: null; message: string }>,
      {
        successMessage: 'Coupon deleted successfully',
        onSuccess: () => {
          setCoupons(prev => prev.filter(c => c.id !== id));
        },
      }
    );
  }, [mutate]);

  const handleToggleRestore = useCallback(async (id: string) => {
    await mutate<Coupon>(
      () => superadminApi.coupons.update(id, { isDeleted: false }) as Promise<{ success: boolean; data: Coupon; message: string }>,
      {
        successMessage: 'Coupon restored successfully',
        onSuccess: (res) => {
          setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...(res as Coupon) } : c));
        },
      }
    );
  }, [mutate]);

  const handleToggleStatus = useCallback(async (id: string, currentStatus: CouponStatus) => {
    if (currentStatus !== 'ACTIVE' && currentStatus !== 'INACTIVE') {
      toast.error(`Cannot toggle status of ${currentStatus.toLowerCase()} coupon`);
      return;
    }
    const newStatus: CouponStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await mutate<Coupon>(
      () => superadminApi.coupons.update(id, { status: newStatus }) as Promise<{ success: boolean; data: Coupon; message: string }>,
      {
        successMessage: `Coupon marked as ${newStatus}`,
        onSuccess: (res) => {
          setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...(res as Coupon) } : c));
        },
      }
    );
  }, [mutate]);

  const activeCoupons = useMemo(
    () => coupons.filter(c => c.status === 'ACTIVE' && !c.isDeleted).length,
    [coupons]
  );
  const totalRedeemed = useMemo(
    () => coupons.reduce((sum, c) => sum + c.currentUses, 0),
    [coupons]
  );

  const filteredCoupons = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return [...coupons]
      .sort((a, b) => {
        if (a.isDeleted && !b.isDeleted) return 1;
        if (!a.isDeleted && b.isDeleted) return -1;
        return 0;
      })
      .filter(c => c.code.toLowerCase().includes(lowerQuery));
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
    handleToggleRestore,
    handleToggleStatus,
  };
};
