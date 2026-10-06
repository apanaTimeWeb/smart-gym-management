"use client";
// RESPONSIBILITY: Owns HR staff-ledger selection, server query state, and ledger sorting for the Admin HR ledger view.
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
// DATA FLOW: HR API ledger response → useAdminHrLedgerLogic → AdminHrLedgerTable.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrApi';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import type { AdminHrLedgerSortDirection, AdminHrLedgerSortKey, LedgerEntry, Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
/**
 * @description useAdminHrLedgerLogic: Owns HR staff-ledger selection, server query state, and ledger sorting for the Admin HR ledger view.
 * @dependencies Consumes AdminHrQueryKeys, AdminHrApi, useAdminHrViewModel, AdminHrTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrLedgerLogic() {
  const { staff, showToast } = useAdminHrViewModel();
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [sortKey, setSortKey] = useState<AdminHrLedgerSortKey>('date');
  const [sortDir, setSortDir] = useState<AdminHrLedgerSortDirection>('desc');

// EFFECT: Synchronizes ledger filters with URL-backed state so the table remains shareable and recoverable.
  useEffect(() => {
    if (staff.length === 0) {
      setSelectedStaffId('');
      return;
    }
    if (!selectedStaffId || !staff.some((member) => member.id === selectedStaffId)) {
      setSelectedStaffId(staff[0]?.id ?? '');
    }
  }, [staff, selectedStaffId]);

  const ledgerQuery = useQuery({
    queryKey: ADMIN_HR_QUERY_KEYS.key('ledger', selectedStaffId),
    queryFn: () => AdminHrApi.fetchLedger(selectedStaffId),
    enabled: Boolean(selectedStaffId),
  });

// EFFECT: Derives the ledger query parameters from the normalized URL/filter state and refreshes the TanStack Query result.
  useEffect(() => {
    const message = getAdminBackendMessage(ledgerQuery.error); if (message) showToast(message, 'error', 'hr-ledger-error');
  }, [ledgerQuery.error, showToast]);

  const selectedStaff = staff.find((member) => member.id === selectedStaffId) ?? null;
  const ledger = ledgerQuery.data?.data ?? [];
  const sortedLedger = useMemo<LedgerEntry[]>(() => {
    return [...ledger].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      const result = typeof aValue === 'number' && typeof bValue === 'number'
        ? aValue - bValue
        : String(aValue ?? '').localeCompare(String(bValue ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? result : -result;
    });
  }, [ledger, sortKey, sortDir]);

  const handleSort = useCallback((key: AdminHrLedgerSortKey) => {
    if (sortKey === key) {
      setSortDir((current) => current === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortKey(key);
    setSortDir('desc');
  }, [sortKey]);

  const staffOptions = useMemo(() => staff.map((member: Staff) => ({ value: member.id, label: `${member.name} (${member.role})` })), [staff]);

  return {
    selectedStaffId,
    setSelectedStaffId,
    selectedStaff,
    staffOptions,
    sortedLedger,
    loading: ledgerQuery.isPending,
    error: ledgerQuery.error instanceof Error ? ledgerQuery.error.message : '',
    sortKey,
    sortDir,
    handleSort,
  };
}
