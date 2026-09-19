// DATA FLOW: Superadmin UI → useSuperadminCancellationsAlertsPage → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: feature API/schema → hook/context → useSuperadminCancellationsAlertsPage consumers.
// RESPONSIBILITY: Encapsulates functionality for useSuperadminCancellationsAlertsPage.ts
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cancellationsAlertsApi } from '@/app/superadmin/cancellations/cancellations_api/SuperadminCancellationsApi';
import type { CancellationsAlert, CancellationsFilterStatus, CancellationsActionPayload } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsTypes';
import toast from 'react-hot-toast';
const CANCELLATIONS_PAGE_SIZE = 20;
/**
 * Purpose: Encapsulates functionality for useSuperadminCancellationsAlertsPage.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminCancellationsAlertsPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<CancellationsFilterStatus>('ALL');
    const [actionAlert, setActionAlert] = useState<CancellationsAlert | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: alertsRes, isPending: alertsLoading, isError: alertsError } = useQuery({
        queryKey: ['superadmin', 'cancellations'],
        queryFn: () => cancellationsAlertsApi.fetchAlerts(),
    });
    const { data: kpisRes, isPending: kpisPending } = useQuery({
        queryKey: ['superadmin', 'cancellations-kpis'],
        queryFn: () => cancellationsAlertsApi.fetchCancellationKpis(),
    });
    const isPending = alertsLoading || kpisPending;
    const isError = alertsError;
    const updateActionMutation = useMutation({
        mutationFn: (payload: CancellationsActionPayload) => cancellationsAlertsApi.updateCancellationAction(payload),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['superadmin', 'cancellations'] });
            toast.success(res.message, { id: 'superadmin-toast-50c7cafd4f' });
            setActionAlert(null);
        },
        onError: (error: Error) => {
            toast.error(error.message, { id: 'superadmin-toast-b9237d66cf' });
        }
    });
    const bulkOutreachMutation = useMutation({
        mutationFn: (tenantIds: string[]) => cancellationsAlertsApi.sendCancellationOutreach(tenantIds),
        onSuccess: (res) => {
            toast.success(res.message, { id: 'superadmin-toast-f103a164ed' });
        },
        onError: (error: Error) => {
            toast.error(error.message, { id: 'superadmin-toast-4bfed8c24b' });
        }
    });
    const alerts: CancellationsAlert[] = alertsRes?.data || [];
    const kpis = kpisRes?.data || { totalAtRisk: 0, criticalCount: 0, highCount: 0, estimatedMrrAtRisk: 0 };
    const filtered = useMemo(() => {
        return alerts.filter((a) => {
            const matchesSearch = a.gymName.toLowerCase().includes(search.toLowerCase()) ||
                a.ownerName.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = activeFilter === 'ALL' ||
                a.riskLevel === activeFilter ||
                a.actionStatus === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [alerts, search, activeFilter]);
    const totalPages = Math.ceil(filtered.length / CANCELLATIONS_PAGE_SIZE) || 1;
    const paginatedAlerts = filtered.slice((currentPage - 1) * CANCELLATIONS_PAGE_SIZE, currentPage * CANCELLATIONS_PAGE_SIZE);
    function handleActionConfirm(payload: CancellationsActionPayload) {
        updateActionMutation.mutate(payload);
    }
    function handleBulkOutreach() {
        const atRiskTenants = filtered.filter(a => a.riskLevel === 'CRITICAL' || a.riskLevel === 'HIGH');
        if (atRiskTenants.length === 0) {
            
            return;
        }
        bulkOutreachMutation.mutate(atRiskTenants.map(a => a.tenantId));
    }
    const isFiltered = search !== '' || activeFilter !== 'ALL';
    return {
        search, setSearch,
        activeFilter, setActiveFilter,
        actionAlert, setActionAlert,
        currentPage, setCurrentPage,
        isPending, isError,
        kpis, filtered, paginatedAlerts, totalPages, isFiltered,
        handleActionConfirm, handleBulkOutreach
    };
}
