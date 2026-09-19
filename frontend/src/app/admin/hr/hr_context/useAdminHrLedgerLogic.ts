// DATA FLOW: HR API ledger response → useAdminHrLedgerLogic → AdminHrLedgerTable.
"use client";
// RESPONSIBILITY: Owns HR staff-ledger selection, server query state, and ledger sorting for the Admin HR ledger view.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import type { AdminHrLedgerSortDirection, AdminHrLedgerSortKey, LedgerEntry, Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';

export function useAdminHrLedgerLogic() {
  const { staff, showToast } = useHrContext();
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [sortKey, setSortKey] = useState<AdminHrLedgerSortKey>('date');
  const [sortDir, setSortDir] = useState<AdminHrLedgerSortDirection>('desc');

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
    queryKey: ['admin', 'hr', 'ledger', selectedStaffId],
    queryFn: () => hrApi.fetchLedger(selectedStaffId),
    enabled: Boolean(selectedStaffId),
  });

  useEffect(() => {
    if (ledgerQuery.error instanceof Error) showToast(ledgerQuery.error.message, 'error', 'hr-ledger-error');
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
