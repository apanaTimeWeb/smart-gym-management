'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import toast from 'react-hot-toast';
import { apiFetch } from '@/lib/api';

interface GymsContextType {
  gyms: Tenant[] | null;
  loading: boolean;
  error: any;
  search: string;
  setSearch: (val: string) => void;
  filteredGyms: Tenant[];
  handleGhostLogin: (id: string, name: string) => void;
  handleSuspend: (id: string, name: string, status: string) => void;
  handleDelete: (id: string, name: string) => void;
}

const GymsContext = createContext<GymsContextType | undefined>(undefined);

export function GymsProvider({ children }: { children: React.ReactNode }) {
  const { data: gyms, loading, error, mutate } = useSuperadminData<Tenant[]>(SuperadminUrlConfig.BACKEND_API.GYMS_BASE);
  const [search, setSearch] = useState('');

  const filteredGyms = useMemo(() => {
    if (!gyms) return [];
    return gyms.filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.ownerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [gyms, search]);

  const handleGhostLogin = useCallback(async (id: string, name: string) => {
    toast.success(`Ghost login initiated for ${name}.`);
    // Placeholder for actual ghost login API call
    // await apiFetch('/api/v1/auth/ghost-login', { method: 'POST', body: JSON.stringify({ tenantId: id }) });
  }, []);

  const handleSuspend = useCallback(async (id: string, name: string, currentStatus: string) => {
    const newStatus = currentStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    try {
      await apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/status`, { 
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      toast.success(`${name} is now ${newStatus}.`);
      
      // Pessimistic UI Update (Cache Mutation)
      mutate((prevGyms) => {
        if (!prevGyms) return prevGyms;
        return prevGyms.map(gym => gym.id === id ? { ...gym, status: newStatus as any } : gym);
      });
    } catch (e: any) {
      toast.error(`Failed to update status for ${name}`);
    }
  }, [mutate]);

  const handleDelete = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete gym ${name}?`)) return;
    try {
      await apiFetch(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'DELETE' });
      toast.success(`${name} deleted successfully.`);
      
      // Pessimistic UI Update (Cache Mutation)
      mutate((prevGyms) => {
        if (!prevGyms) return prevGyms;
        return prevGyms.filter(gym => gym.id !== id);
      });
    } catch (e: any) {
      toast.error(`Failed to delete gym ${name}`);
    }
  }, [mutate]);

  const value = useMemo(() => ({
    gyms,
    loading,
    error,
    search,
    setSearch,
    filteredGyms,
    handleGhostLogin,
    handleSuspend,
    handleDelete
  }), [gyms, loading, error, search, filteredGyms, handleGhostLogin, handleSuspend, handleDelete]);

  return (
    <GymsContext.Provider value={value}>
      {children}
    </GymsContext.Provider>
  );
}

export function useGymsContext() {
  const context = useContext(GymsContext);
  if (context === undefined) {
    throw new Error('useGymsContext must be used within a GymsProvider');
  }
  return context;
}
