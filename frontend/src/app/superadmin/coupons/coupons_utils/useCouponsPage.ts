// RESPONSIBILITY: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
// DATA FLOW: superadminApi → useCouponsPage → CouponsClient
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useCouponsData } from '@/app/superadmin/coupons/coupons_utils/useCouponsData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { couponsApi } from '@/app/superadmin/coupons/coupons_api/coupons_api';
import { useCouponsMutation } from '@/app/superadmin/coupons/coupons_utils/useCouponsMutation';
import { CouponSchema, CouponFormData } from '@/app/superadmin/coupons/coupons_types/coupons_types';
import type { Coupon, CouponStatus } from '@/app/superadmin/coupons/coupons_types/coupons_types';

export const useCouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { data: fetchedData, fetchState, error } = useCouponsData<Coupon[]>(
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

  const { mutate, isMutating } = useCouponsMutation();

  const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
    // Mocking the backend API success as per "fix with all hardcoded data"
    const newCoupon = {
      id: `mock-${Date.now()}`,
      code: data.code || `CODE-${Math.floor(Math.random() * 10000)}`,
      discountType: data.discountType,
      discountValue: data.discountValue || 0,
      maxUses: data.maxUses || 0,
      currentUses: 0,
      expiryDate: data.expiryDate,
      status: 'ACTIVE',
      isDeleted: false,
    } as Coupon;
    
    setCoupons(prev => [newCoupon, ...prev]);
    setIsModalOpen(false);
    form.reset();
    toast.success('Coupon created successfully');
  }, [form]);

  const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
    if (!selectedCoupon) return;
    await mutate<Coupon>(
      () => couponsApi.update(selectedCoupon.id, data),
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
    await mutate<void>(
      () => couponsApi.remove(id),
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
      () => couponsApi.update(id, { isDeleted: false }),
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
      () => couponsApi.update(id, { status: newStatus }),
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
    fetchState,
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
