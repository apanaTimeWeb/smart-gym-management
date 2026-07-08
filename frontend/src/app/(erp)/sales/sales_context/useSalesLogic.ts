import { useState } from 'react';
import { type SalesTab, type DateFilter } from '../sales_utils/SalesSharedConstants';
import { SalesContextType } from '../sales_types/sales_types';

export function useSalesLogic(): SalesContextType {
  const [tab, setTab] = useState<SalesTab>('Overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('This Month');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return {
    tab, setTab,
    dateFilter, setDateFilter,
    search, setSearch,
    currentPage, setCurrentPage
  };
}
