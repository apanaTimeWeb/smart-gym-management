import { useState } from 'react';
import { type SalesTab, type DateFilter } from '../sales_utils/SalesSharedConstants';
import { SalesContextType } from '../sales_types/sales_types';

export function useSalesLogic(): SalesContextType {
 const [tab, setTab] = useState<SalesTab>('Overview');
 const [dateFilter, setDateFilter] = useState<DateFilter>('This Month');

 return {
 tab, setTab,
 dateFilter, setDateFilter
 };
}
