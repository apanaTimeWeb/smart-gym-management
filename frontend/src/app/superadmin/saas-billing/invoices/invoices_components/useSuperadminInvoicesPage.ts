// DATA FLOW: Superadmin UI → useSuperadminInvoicesPage → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
// DATA FLOW: useSuperadminInvoicesStore -> useSuperadminInvoicesPage -> SuperadminInvoicesClient
import { useState, useMemo } from 'react';
import { useUrlState } from '@/hooks/useUrlState';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/app/superadmin/saas-billing/invoices/invoices_api/SuperadminInvoicesApi';
import toast from 'react-hot-toast';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { calculateSuperadminInvoiceMetrics } from '@/app/superadmin/saas-billing/invoices/invoices_utils/SuperadminInvoicesMetrics';
/**
 * Purpose: Encapsulates local UI state for the Invoices page (filtering, modal state, derived stats).
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminInvoicesPage() {
    const queryClient = useQueryClient();
    const { getParam, setParam } = useUrlState();
    const { confirm } = useConfirm();
    const startDate = getParam('startDate', '');
    const endDate = getParam('endDate', '');
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', '');
    const currentPage = Number(getParam('page', '1'));
    const pageLimit = Number(getParam('limit', '10'));
    const setSearch = (val: string) => {
        setParam('search', val);
        setParam('page', '1');
    };
    const setStatusFilter = (val: string | null) => {
        setParam('statusFilter', val ?? '');
        setParam('page', '1');
    };
    const setPage = (page: number) => setParam('page', String(page));
    const [showAddModal, setShowAddModal] = useState(false);
    const [gymSearchTerm, setGymSearchTerm] = useState('');
    const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
    const [selectedGymId, setSelectedGymId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const queryParams = useMemo(() => {
        const p: Record<string, string> = {};
        if (search)
            p.search = search;
        if (statusFilter)
            p.status = statusFilter;
        if (startDate)
            p.startDate = startDate;
        if (endDate)
            p.endDate = endDate;
        p.page = String(currentPage);
        p.limit = String(pageLimit);
        return p;
    }, [search, statusFilter, startDate, endDate, currentPage, pageLimit]);
    const { data: invoicesRes, isPending, isError, error: queryError } = useQuery({
        queryKey: ['superadmin', 'invoices', queryParams],
        queryFn: () => invoicesApi.fetchInvoices(queryParams),
    });
    const { data: tenantsRes } = useQuery({
        queryKey: ['superadmin', 'invoices', 'tenants'],
        queryFn: () => invoicesApi.fetchTenants(),
    });
    const invoices = invoicesRes?.data || [];
    const filteredInvoices = invoices; // Server-side filtering applied
    const tenants = tenantsRes?.data || [];
    const total = invoicesRes?.meta?.total || invoices.length;
    const error = isError ? (queryError instanceof Error ? queryError.message : '') : null;
    const logManualPaymentMutation = useMutation({
        mutationFn: (data: {
            gymId: string;
            amount: number;
            planName: string;
            idempotencyKey: string;
        }) => invoicesApi.createManualPayment({
            gymId: data.gymId,
            amount: data.amount,
            planName: data.planName,
            currency: 'INR',
        }, data.idempotencyKey),
        onSuccess: (res) => {
            if (res.success && res.data) {
                queryClient.invalidateQueries({ queryKey: ['superadmin', 'invoices'] });
                toast.success(res.message, { id: 'superadmin-toast-bddec4ac4d' });
            }
            else {
                toast.error(res.message, { id: 'superadmin-toast-812ab1a64a' });
            }
        },
        onError: (err: Error) => {
            toast.error(err.message, { id: 'superadmin-toast-a2194697fd' });
        }
    });
    const handleLogManualPayment = async (gymId: string, amount: number, planName: string) => {
        const confirmed = await confirm({ title: 'Record Manual Payment', message: `Record INR ${amount} payment for ${planName} as a tenant invoice payment?`, type: 'warning', confirmText: 'Record Payment', cancelText: 'Cancel' });
        if (!confirmed) return false;
        await logManualPaymentMutation.mutateAsync({ gymId, amount, planName, idempotencyKey: crypto.randomUUID() });
        return true;
    };
    // filtering moved to server
    const filteredTenantsForDropdown = useMemo(() => tenants.filter((t) => (t.name || '').toLowerCase().includes(gymSearchTerm.toLowerCase())), [tenants, gymSearchTerm]);
    const selectedGym = tenants.find((t) => t.id === selectedGymId);
    const { totalRevenue, failedRevenue, pendingRevenue, overdueCount } = useMemo(() => calculateSuperadminInvoiceMetrics(invoices), [invoices]);
    const handleSelectGym = (id: string) => {
        setSelectedGymId(id);
        setIsGymDropdownOpen(false);
        setGymSearchTerm('');
    };
    return {
        isPending,
        isError,
        error,
        invoices,
        filteredInvoices,
        filteredTenantsForDropdown,
        selectedGym,
        totalRevenue,
        failedRevenue,
        search,
        setSearch,
        showAddModal,
        setShowAddModal,
        gymSearchTerm,
        setGymSearchTerm,
        isGymDropdownOpen,
        setIsGymDropdownOpen,
        paymentMethod,
        setPaymentMethod,
        handleSelectGym,
        statusFilter,
        setStatusFilter,
        startDate,
        endDate,
        pendingRevenue,
        overdueCount,
        handleLogManualPayment,
        currentPage,
        pageLimit,
        setPage,
        total,
    };
}
