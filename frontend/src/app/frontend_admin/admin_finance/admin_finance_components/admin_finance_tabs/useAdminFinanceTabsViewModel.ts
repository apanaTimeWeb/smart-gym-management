"use client";
import { useEffect, useState } from 'react';
import { FINANCE_TABS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';

/**
 * @description Owns the Finance tab selection and debounced local search synchronization.
 * @dependencies React state/effect primitives and the module-owned FINANCE_TABS list.
 * @edge-case Mirrors external search changes and cancels pending debounce work on unmount or replacement.
 */
export function useAdminFinanceTabsViewModel(search: string, setSearch: (value: string) => void) {
  const [tab, setTab] = useState<string>(FINANCE_TABS[0]);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localSearch !== search) setSearch(localSearch);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [localSearch, search, setSearch]);

  return { tab, setTab, localSearch, setLocalSearch };
}
