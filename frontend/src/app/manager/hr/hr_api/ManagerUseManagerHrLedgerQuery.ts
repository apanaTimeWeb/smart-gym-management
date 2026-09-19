'use client';
// DATA FLOW: HR staff selection → ManagerHrLedgerQuery → ManagerHrApi → ManagerHrLedgerTable.
import { useQuery } from '@tanstack/react-query';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';

/** Loads the selected staff ledger through the Manager HR API contract. */
export function useManagerHrLedgerQuery(staffId: string) {
  return useQuery({
    queryKey: ['manager', 'hr', 'ledger', staffId],
    queryFn: () => hrApi.fetchLedger(staffId),
    enabled: Boolean(staffId) });
}
