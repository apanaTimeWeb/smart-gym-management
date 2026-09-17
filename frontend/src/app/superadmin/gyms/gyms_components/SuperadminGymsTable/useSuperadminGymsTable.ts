// DATA FLOW: Superadmin UI → useSuperadminGymsTable → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Provides the logic and state for the SuperadminGymsTable component using TanStack Query.
// DATA FLOW: gymsApi -> useQuery -> useSuperadminGymsTable -> SuperadminGymsTable
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';
import { useSuperadminGymMutations } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymMutations';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
export function useSuperadminGymsTable() {
    const router = useRouter();
    const { getParam, setParam } = useSuperadminUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'All');
    const planFilter = getParam('planFilter', 'All');
    const sortBy = getParam('sortBy', 'createdAt');
    const sortOrder = getParam('sortOrder', 'desc') as 'asc' | 'desc';
    const segmentId = getParam('segmentId', '');
    const currentPage = Number(getParam('page', '1'));
    const pageLimit = Number(getParam('limit', '20'));
    const setCurrentPage = (page: number) => setParam('page', String(page));
    const setSortBy = (col: string) => setParam('sortBy', col);
    const setSortOrder = (order: 'asc' | 'desc') => setParam('sortOrder', order);
    const openDeleteModal = useSuperadminGymsStore(state => state.openDeleteModal);
    const openWhatsappModal = useSuperadminGymsStore(state => state.openWhatsappModal);
    // Fetch Gyms
    const queryParams = {
        ...(search && { search }),
        ...(statusFilter !== 'All' && { status: statusFilter }),
        ...(planFilter !== 'All' && { plan: planFilter }),
        ...(segmentId && { segmentId }),
        sortBy,
        order: sortOrder,
        page: String(currentPage),
        limit: String(pageLimit),
    };
    const { data: fetchRes, isLoading, isError } = useQuery({
        queryKey: ['superadmin', 'gyms', queryParams],
        queryFn: () => gymsApi.fetchGyms(queryParams),
    });
    const gyms = fetchRes?.data && fetchRes.data.length > 0 ? fetchRes.data : [];
    const total = fetchRes?.meta?.total || gyms.length;
    const filteredGyms = useMemo(() => {
        if (!gyms)
            return [];
        return gyms;
    }, [gyms]);
    const { actionLoadingId, onGhostLoginClick, onSuspendClick, } = useSuperadminGymMutations(gyms);
    const handleRowClick = (gym: Tenant) => { router.push(`${GymsUrlConfig.PAGES.MAIN}/${encodeURIComponent(gym.id)}`); };
    const onDeleteClick = (e: React.MouseEvent, gym: Tenant) => {
        e.stopPropagation();
        openDeleteModal(gym);
    };
    return {
        filteredGyms,
        isLoading,
        isError,
        error: isError ? 'Error loading gyms' : null,
        total,
        actionLoadingId,
        handleRowClick,
        onGhostLoginClick,
        onSuspendClick,
        onDeleteClick,
        openWhatsappModal,
        currentPage,
        pageLimit,
        sortBy,
        sortOrder,
        segmentId,
        setCurrentPage,
        setSortBy,
        setSortOrder,
    };
}
