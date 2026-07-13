// RESPONSIBILITY: PlansContext.tsx handles the logic and UI for its corresponding feature.
// DATA FLOW: API → PlansContext → Plans Components
'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch, ApiResponse } from '@/lib/api';
import toast from 'react-hot-toast';

interface PlansContextType {
  plans: SubscriptionPlan[] | null;
  loading: boolean;
  error: any;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  handleCreatePlan: (data: CreatePlanPayload) => Promise<void>;
  isEditModalOpen: boolean;
  selectedPlan: SubscriptionPlan | null;
  openEditModal: (plan: SubscriptionPlan) => void;
  closeEditModal: () => void;
  handleUpdatePlan: (id: string, data: UpdatePlanPayload) => Promise<void>;
  handleDeletePlan: (id: string) => Promise<void>;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const { data: plans, loading, error, mutate } = useSuperadminData<SubscriptionPlan[]>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  // Memoize modal actions so they don't trigger unnecessary re-renders in consumers
  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  const openEditModal = useCallback((plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setSelectedPlan(null);
    setIsEditModalOpen(false);
  }, []);

  // handleCreatePlan: sends POST request and pessimistically updates the state
  const handleCreatePlan = useCallback(async (data: CreatePlanPayload) => {
    try {
      const response = await apiFetch<ApiResponse<SubscriptionPlan>>(SuperadminUrlConfig.BACKEND_API.PLANS_BASE, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const newPlan = response.data;

      mutate((prevPlans) => {
        if (!prevPlans) return [newPlan];
        return [...prevPlans, newPlan];
      });

      toast.success(response.message || 'Plan created');
      closeCreateModal();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, [mutate, closeCreateModal]);

  // handleUpdatePlan: sends PATCH request and pessimistically updates the state
  const handleUpdatePlan = useCallback(async (id: string, data: UpdatePlanPayload) => {
    try {
      const response = await apiFetch<ApiResponse<SubscriptionPlan>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });

      const updatedPlan = response.data;

      mutate((prevPlans) => {
        if (!prevPlans) return [];
        return prevPlans.map(p => p.id === id ? { ...p, ...updatedPlan } : p);
      });

      toast.success(response.message || 'Plan updated');
      closeEditModal();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, [mutate, closeEditModal]);

  // handleDeletePlan: sends DELETE request and pessimistically updates the state
  const handleDeletePlan = useCallback(async (id: string) => {
    try {
      const response = await apiFetch<ApiResponse<null>>(`${SuperadminUrlConfig.BACKEND_API.PLANS_BASE}/${id}`, {
        method: 'DELETE',
      });

      mutate((prevPlans) => {
        if (!prevPlans) return [];
        return prevPlans.filter(p => p.id !== id);
      });

      toast.success(response.message || 'Plan deleted');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
      throw err;
    }
  }, [mutate]);

  const value = useMemo(() => ({
    plans,
    loading,
    error,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreatePlan,
    isEditModalOpen,
    selectedPlan,
    openEditModal,
    closeEditModal,
    handleUpdatePlan,
    handleDeletePlan
  }), [
    plans, loading, error, isCreateModalOpen, openCreateModal, closeCreateModal, handleCreatePlan,
    isEditModalOpen, selectedPlan, openEditModal, closeEditModal, handleUpdatePlan, handleDeletePlan
  ]);

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
