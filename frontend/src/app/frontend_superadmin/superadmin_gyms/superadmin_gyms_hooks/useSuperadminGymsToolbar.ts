'use client';// DATA FLOW: toolbar controls → URL/query state → Superadmin gyms table query → rendered result
/**
 * RESPONSIBILITY: Manages the logic for the Superadmin gyms search/filter/export toolbar.
 * DATA FLOW: UI input → debounced URL state → TanStack Query parameters → Superadmin Gym API.
 */
import { useEffect, useMemo } from 'react';

import debounce from 'lodash.debounce';
import { toast } from 'sonner';

import { useUrlState } from '@/hooks/useUrlState';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';


/** Owns URL-synchronized toolbar state and delegates export execution to the Gyms API client. */
/** Purpose: Owns the useSuperadminGymsToolbar data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsToolbar.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsToolbar → consuming feature component.
export function useSuperadminGymsToolbar() {
    const { getParam, setParam } = useUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'All');
    const planFilter = getParam('planFilter', 'All');
    const debouncedSearchChange = useMemo(() => debounce((value: string) => { setParam('search', value); setParam('page', '1'); }, 300), [setParam]);
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => () => debouncedSearchChange.cancel(), [debouncedSearchChange]);
    const handleSearchChange = (value: string) => debouncedSearchChange(value);
    const setStatusFilter = (value: string) => { setParam('statusFilter', value); setParam('page', '1'); };
    const setPlanFilter = (value: string) => { setParam('planFilter', value); setParam('page', '1'); };
    const viewMode = useSuperadminGymsStore(state => state.viewMode);
    const setViewMode = useSuperadminGymsStore(state => state.setViewMode);
    const handleExportGyms = async () => {
        try {
            const res = await gymsApi.exportGymsReport({ search, ...(statusFilter !== 'All' ? { status: statusFilter } : {}), ...(planFilter !== 'All' ? { plan: planFilter } : {}) });
            if (res.data?.downloadUrl) { window.open(res.data.downloadUrl, '_blank'); toast.success(res.message, { id: 'gyms-export' }); }
            else toast.error(res.message, { id: 'gyms-export' });
        } catch (error: unknown) { toast.error(error instanceof Error ? error.message : String(error), { id: 'gyms-export' }); }
    };
    return { search, handleSearchChange, statusFilter, setStatusFilter, planFilter, setPlanFilter, viewMode, setViewMode, handleExportGyms };
}
