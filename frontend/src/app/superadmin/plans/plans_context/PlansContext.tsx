'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { SubscriptionPlan } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import toast from 'react-hot-toast';

interface PlansContextType {
  plans: SubscriptionPlan[] | null;
  loading: boolean;
  error: any;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  handleCreatePlan: (data: any) => Promise<void>;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const { data: plans, loading, error, mutate } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  const handleCreatePlan = useCallback(async (data: any) => {
    try {
      const response = await apiFetch(SuperadminUrlConfig.BACKEND_API.PLANS_BASE, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const newPlan = response.data || response;

      mutate((prevPlans) => {
        if (!prevPlans) return [newPlan];
        return [...prevPlans, newPlan];
      });

      toast.success('Subscription plan created successfully!');
      closeCreateModal();
    } catch (err: any) {
      toast.error('Failed to create subscription plan.');
      throw err;
    }
  }, [mutate, closeCreateModal]);

  const value = useMemo(() => ({
    plans,
    loading,
    error,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreatePlan
  }), [plans, loading, error, isCreateModalOpen, openCreateModal, closeCreateModal, handleCreatePlan]);

  return (
    <PlansContext.Provider value={value}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlansContext() {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlansContext must be used within a PlansProvider');
  }
  return context;
}
