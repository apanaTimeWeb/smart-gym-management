import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DUMMY_COUPONS } from '../SuperadminSharedConstants';
import { Coupon } from '../../superadmin_types/superadmin_types';
import { CouponSchema, CouponFormData } from '../SuperadminZodSchemas';

export const useCouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(DUMMY_COUPONS);
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

  const handleCreateCoupon = useCallback((data: CouponFormData) => {
    const newCoupon: Coupon = {
      id: `cpn-new-${Date.now()}`,
      code: data.code.toUpperCase(),
      discountPercentage: data.discountPercentage,
      maxUses: data.maxUses,
      currentUses: 0,
      status: 'ACTIVE',
      expiryDate: data.expiryDate,
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    setIsModalOpen(false);
    form.reset();
  }, [form]);

  const activeCoupons = useMemo(() => coupons.filter(c => c.status === 'ACTIVE').length, [coupons]);
  const totalRedeemed = useMemo(() => coupons.reduce((sum, c) => sum + c.currentUses, 0), [coupons]);

  const filteredCoupons = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return coupons.filter(c => c.code.toLowerCase().includes(lowerQuery));
  }, [coupons, searchQuery]);

  return {
    coupons: filteredCoupons,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleCreateCoupon,
    activeCoupons,
    totalRedeemed,
  };
};
