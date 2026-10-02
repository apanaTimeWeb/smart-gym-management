'use client';
import { useRouter } from 'next/navigation';
import { useUrlState } from '@/hooks/useUrlState';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';
import { useQuery } from '@tanstack/react-query';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useMemo } from 'react';
import { useSuperadminGymsGymMutations } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymMutations';

// DATA FLOW: Owning feature API/query/store state → useSuperadminGymsTable → consuming feature component.
'use client';import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type { SuperadminGymsSortOrder } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTableTypes';
import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes';
import type { MouseEvent } from 'react';


/**
 * Purpose: Provides the logic and state for the SuperadminGymsTable component using TanStack Query.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsTable.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsTable → consuming feature component.
export function useSuperadminGymsTable() {
    const router = useRouter();
    const { getParam, setParam } = useUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'All');
    const planFilter = getParam('planFilter', 'All');
    const sortBy = getParam('sortBy', 'createdAt');
    const sortOrder = getParam('sortOrder', 'desc') as SuperadminGymsSortOrder;
    const segmentId = getParam('segmentId', '');
    const currentPage = Number(getParam('page', '1'));
    const pageLimit = Number(getParam('limit', '20'));
    const setCurrentPage = (page: number) => setParam('page', String(page));
    const setSortBy = (col: string) => setParam('sortBy', col);
    const setSortOrder = (order: SuperadminGymsSortOrder) => setParam('sortOrder', order);
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
    const { data: fetchRes, isPending, isError, error, refetch } = useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.list(queryParams),
        queryFn: () => gymsApi.fetchGyms(queryParams),
    });
    const gyms = fetchRes?.data && fetchRes.data.length > 0 ? fetchRes.data : [];
    const total = fetchRes?.meta?.total || gyms.length;
    const filteredGyms = useMemo(() => {
        if (!gyms)
            return [];
        return gyms;
    }, [gyms]);
    const { actionLoadingId, onGhostLoginClick, onSuspendClick, } = useSuperadminGymsGymMutations(gyms);
    const handleRowClick = (gym: Tenant) => { router.push(`${MODULE_URLS.PAGES.MAIN}/${encodeURIComponent(gym.id)}`); };
    const onDeleteClick = (e: MouseEvent, gym: Tenant) => {
        e.stopPropagation();
        openDeleteModal(gym);
    };
    return {
        filteredGyms,
        isPending,
        isError,
        error,
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
        refetch,
    };
}
