// RESPONSIBILITY: useCouponsPage.ts encapsulates all state and async logic for the Coupons page.
// DATA FLOW: superadminApi â†’ useCouponsPage â†’ CouponsClient
import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useSuperadminCouponsData } from '@/app/superadmin/coupons/coupons_utils/useSuperadminCouponsData';
import { CouponsUrlConfig } from '@/app/superadmin/coupons/coupons_url_config';
import { couponsApi } from '@/app/superadmin/coupons/superadmin_coupons_api/superadmin_coupons_api';
import { useSuperadminCouponsMutation } from '@/app/superadmin/coupons/coupons_utils/useSuperadminCouponsMutation';
import { CouponSchema, type CouponFormData } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';
import type { Coupon, CouponStatus, CouponKpiFilter } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';

export const useSuperadminCoupons = () => {
  const { data: fetchedData, fetchState, error } = useSuperadminCouponsData<Coupon[]>(
    CouponsUrlConfig.BACKEND_API.BASE
  );
  const queryClient = useQueryClient();
  const coupons = fetchedData ?? [];

  const updateCoupons = useCallback((updater: (previous: Coupon[]) => Coupon[]) => {
    queryClient.setQueryData<Coupon[]>(['superadmin', CouponsUrlConfig.BACKEND_API.BASE], previous => updater(previous ?? []));
  }, [queryClient]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeKpi, setActiveKpi] = useState<CouponKpiFilter>('ALL');

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

  const { mutate, isMutating } = useSuperadminCouponsMutation();

  const handleCreateCoupon = useCallback(async (data: CouponFormData) => {
    await mutate(() => couponsApi.createCoupon(data), {
      onSuccess: (newCoupon) => {
        updateCoupons(prev => [newCoupon as Coupon, ...prev]);
        setIsModalOpen(false);
        form.reset();
      },
    });
  }, [form, updateCoupons, mutate]);

  const handleUpdateCoupon = useCallback(async (id: string, data: Partial<CouponFormData>) => {
    if (!selectedCoupon) return;
    await mutate(() => couponsApi.updateCoupon(id, data), {
      onSuccess: (updatedCoupon) => {
        updateCoupons(prev => prev.map(c => c.id === id ? { ...c, ...(updatedCoupon != null && typeof updatedCoupon === 'object' ? updatedCoupon as Partial<Coupon> : {}) } : c));
        setIsEditModalOpen(false);
        setSelectedCoupon(null);
      },
    });
  }, [selectedCoupon, updateCoupons, mutate]);

  const handleDeleteCoupon = useCallback(async (id: string) => {
    await mutate(() => couponsApi.deleteCoupon(id), {
      onSuccess: () => updateCoupons(prev => prev.filter(c => c.id !== id)),
    });
  }, [updateCoupons, mutate]);

  const handleToggleRestore = useCallback(async (id: string) => {
    await mutate(() => couponsApi.restoreCoupon(id), {
      onSuccess: () => updateCoupons(prev => prev.map(c => c.id === id ? { ...c, isDeleted: false } : c)),
    });
  }, [updateCoupons, mutate]);

  const handleToggleStatus = useCallback(async (id: string, currentStatus: CouponStatus) => {
    if (currentStatus !== 'ACTIVE' && currentStatus !== 'INACTIVE') {
      toast.error(`Cannot toggle status of ${currentStatus.toLowerCase()} coupon`, { id: 'toggle-error' });
      return;
    }
    const newStatus: CouponStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await mutate(() => couponsApi.toggleStatus(id, newStatus), {
      onSuccess: () => updateCoupons(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c)),
    });
  }, [updateCoupons, mutate]);

  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const filteredCoupons = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return [...coupons]
      .filter(c => {
        if (!startDate && !endDate) return true;
        if (!c.expiryDate) return true;
        const expiry = new Date(c.expiryDate);
        if (startDate && expiry < new Date(startDate)) return false;
        if (endDate && expiry > new Date(endDate)) return false;
        return true;
      })
      .filter(c => {
        if (activeKpi === 'ACTIVE') return c.status === 'ACTIVE' && !c.isDeleted;
        if (activeKpi === 'REDEEMED') return c.currentUses > 0;
        return true;
      })
      .filter(c => {
        if (statusFilter === 'ACTIVE') return c.status === 'ACTIVE';
        if (statusFilter === 'INACTIVE') return c.status === 'INACTIVE';
        return true;
      })
      .sort((a, b) => {
        if (a.isDeleted && !b.isDeleted) return 1;
        if (!a.isDeleted && b.isDeleted) return -1;
        return 0;
      })
      .filter(c => c.code?.toLowerCase().includes(lowerQuery));
  }, [coupons, searchQuery, activeKpi, statusFilter, startDate, endDate]);

  const activeCoupons = useMemo(
    () => filteredCoupons.filter(c => c.status === 'ACTIVE' && !c.isDeleted).length,
    [filteredCoupons]
  );
  const totalRedeemed = useMemo(
    () => filteredCoupons.reduce((sum, c) => sum + c.currentUses, 0),
    [filteredCoupons]
  );
  const totalCoupons = useMemo(() => filteredCoupons.length, [filteredCoupons]);

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
    activeKpi,
    setActiveKpi,
    totalCoupons,
    statusFilter,
    setStatusFilter,
  };
};

