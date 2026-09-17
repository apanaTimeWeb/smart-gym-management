// DATA FLOW: toolbar controls → URL/query state → Superadmin gyms table query → rendered result
'use client';
/**
 * RESPONSIBILITY: Manages the logic for the Superadmin gyms search/filter/export toolbar.
 * DATA FLOW: UI input → debounced URL state → TanStack Query parameters → Superadmin Gym API.
 */
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
export function useSuperadminGymsToolbar() {
    const { getParam, setParam } = useSuperadminUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'All');
    const planFilter = getParam('planFilter', 'All');
    const debouncedSearchChange = useMemo(() => debounce((value: string) => { setParam('search', value); setParam('page', '1'); }, 300), [setParam]);
    useEffect(() => () => debouncedSearchChange.cancel(), [debouncedSearchChange]);
    const handleSearchChange = (value: string) => debouncedSearchChange(value);
    const setStatusFilter = (value: string) => { setParam('statusFilter', value); setParam('page', '1'); };
    const setPlanFilter = (value: string) => { setParam('planFilter', value); setParam('page', '1'); };
    const viewMode = useSuperadminGymsStore(state => state.viewMode);
    const setViewMode = useSuperadminGymsStore(state => state.setViewMode);
    const handleExportGyms = async () => {
        toast.loading('Exporting gyms...', { id: 'gyms-export' });
        try {
            const res = await gymsApi.exportGymsCSV({ search, ...(statusFilter !== 'All' ? { status: statusFilter } : {}), ...(planFilter !== 'All' ? { plan: planFilter } : {}) });
            if (res.data?.downloadUrl) { window.open(res.data.downloadUrl, '_blank'); toast.success(res.message, { id: 'gyms-export' }); }
            else toast.error(res.message, { id: 'gyms-export' });
        } catch (error: unknown) { toast.error(error instanceof Error ? error.message : 'Unable to export gyms.', { id: 'gyms-export' }); }
    };
    return { search, handleSearchChange, statusFilter, setStatusFilter, planFilter, setPlanFilter, viewMode, setViewMode, handleExportGyms };
}
