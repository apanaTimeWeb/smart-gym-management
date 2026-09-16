'use client';
// DATA FLOW: URL filters → TanStack Query → ManagerNotificationsContext → notification UI.
// RESPONSIBILITY: Bridges URL-owned filter state with module server state and mutations.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import { notificationsApi } from '@/app/manager/notifications/notifications_api/ManagerNotificationsApi';
import type { Notification, NotificationKPIData } from '@/app/manager/notifications/notifications_types/ManagerNotificationsTypes';

interface NotificationsContextValue {
  notifications: Notification[];
  kpis: NotificationKPIData | null;
  isPending: boolean;
  isError: boolean;
  saving: boolean;
  search: string;
  setSearch: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  handleMarkRead: (id: string) => Promise<unknown>;
  handleMarkAllRead: () => Promise<unknown>;
  handleDelete: (id: string) => Promise<unknown>;
  reload: () => Promise<void>;
}

const ManagerNotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'ALL');
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get('priority') || 'ALL');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'ALL');

  const queryParams = useMemo(() => ({ search, type: typeFilter, priority: priorityFilter, status: statusFilter }), [search, typeFilter, priorityFilter, statusFilter]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set('search', search); else params.delete('search');
    if (typeFilter !== 'ALL') params.set('type', typeFilter); else params.delete('type');
    if (priorityFilter !== 'ALL') params.set('priority', priorityFilter); else params.delete('priority');
    if (statusFilter !== 'ALL') params.set('status', statusFilter); else params.delete('status');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [search, typeFilter, priorityFilter, statusFilter, pathname, router, searchParams]);

  const listQuery = useQuery({ queryKey: ['manager', 'notifications', 'list', queryParams], queryFn: async () => (await notificationsApi.getAll(queryParams)).data ?? { notifications: [], total: 0 } });
  const kpiQuery = useQuery({ queryKey: ['manager', 'notifications', 'kpis'], queryFn: async () => (await notificationsApi.getKPIs()).data ?? null });
  const readMutation = useMutation({ mutationFn: notificationsApi.markRead, onSuccess: (response: any) => { showManagerSuccessToast(response.message, 'manager-notifications-success'); queryClient.invalidateQueries({ queryKey: ['manager', 'notifications'] }); } });
  const readAllMutation = useMutation({ mutationFn: notificationsApi.markAllRead, onSuccess: (response: any) => { showManagerSuccessToast(response.message, 'manager-notifications-success'); queryClient.invalidateQueries({ queryKey: ['manager', 'notifications'] }); } });
  const deleteMutation = useMutation({ mutationFn: notificationsApi.deleteNotification, onSuccess: (response: any) => { showManagerSuccessToast(response.message, 'manager-notifications-success'); queryClient.invalidateQueries({ queryKey: ['manager', 'notifications'] }); } });

  const reload = useCallback(async () => { await Promise.all([listQuery.refetch(), kpiQuery.refetch()]); }, [kpiQuery, listQuery]);
  const saving = readMutation.isPending || readAllMutation.isPending || deleteMutation.isPending;

  return (
    <ManagerNotificationsContext.Provider value={{
      notifications: listQuery.data?.notifications ?? [],
      kpis: kpiQuery.data ?? null,
      isPending: listQuery.isPending || kpiQuery.isPending,
      isError: listQuery.isError || kpiQuery.isError,
      saving,
      search, setSearch, typeFilter, setTypeFilter, priorityFilter, setPriorityFilter, statusFilter, setStatusFilter,
      handleMarkRead: readMutation.mutateAsync,
      handleMarkAllRead: readAllMutation.mutateAsync,
      handleDelete: deleteMutation.mutateAsync,
      reload,
    }}>
      {children}
    </ManagerNotificationsContext.Provider>
  );
}

export function useNotificationsContext() {
  const ctx = useContext(ManagerNotificationsContext);
  if (!ctx) throw new Error('useNotificationsContext must be used within NotificationsProvider');
  return ctx;
}
