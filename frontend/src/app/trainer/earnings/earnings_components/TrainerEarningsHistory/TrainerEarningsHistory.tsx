// RESPONSIBILITY: Renders the browseable Trainer earnings ledger with URL-backed search, date filters, sorting, pagination, and expandable record details.
'use client';
// DATA FLOW: local search input -> 300ms debounce -> URL params -> TanStack Query -> earnings rows; row expansion is UI-only.
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TrainerEarningsEmptyState from '@/app/trainer/earnings/earnings_components/TrainerEarningsEmptyState/TrainerEarningsEmptyState';
import { useTrainerEarningsQuery } from '@/app/trainer/earnings/earnings_queries/useTrainerEarningsQuery';
import { EARNINGS_ITEMS_PER_PAGE, EARNINGS_SORT_OPTIONS, PAYOUT_STATUS_STYLES, type EarningsSortDirection, type EarningsSortField } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';
import { EarningsUrlConfig } from '@/app/trainer/earnings/earnings_url_config';
import { formatCurrencyFromMinorUnits, formatDate, formatNumber } from '@/lib/formatters';
import { useDebounce } from '@/app/trainer/trainer_utils/TrainerUseDebounce';

export default function TrainerEarningsHistory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [draftSearch, setDraftSearch] = useState(searchParams.get('search') ?? '');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(draftSearch, 300);

  const search = searchParams.get('search') ?? '';
  const currentPageValue = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(currentPageValue) && currentPageValue > 0 ? currentPageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? EARNINGS_SORT_OPTIONS[0].value;
  const sortBy: EarningsSortField = EARNINGS_SORT_OPTIONS.some((option) => option.value === sortByValue) ? sortByValue as EarningsSortField : EARNINGS_SORT_OPTIONS[0].value;
  const sortDirection: EarningsSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  /* Synchronizes the debounced search input into URL state; the 300ms debounce is the server-search boundary. */
  useEffect(() => {
    if (debouncedSearch === search) return;
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set('search', debouncedSearch);
    else params.delete('search');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, pathname, router, search, searchParams]);

  /* Keeps draft input synchronized with browser back/forward navigation without overwriting active typing mid-debounce. */
  useEffect(() => {
    if (draftSearch !== search && debouncedSearch === draftSearch) setDraftSearch(search);
  }, [debouncedSearch, draftSearch, search]);

  const updateUrlParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => updateUrlParam('page', String(page));

  const handleSort = (field: EarningsSortField) => {
    const direction = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', field);
    params.set('sortDirection', direction);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDateChange = (key: 'startDate' | 'endDate', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  

  const { data, isPending, isError, refetch } = useTrainerEarningsQuery();
  
  const history = data?.history ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.historyTotal ?? history.length) / EARNINGS_ITEMS_PER_PAGE));

  if (isPending) {
    return <div className="p-4 space-y-3" aria-busy="true" aria-label="Loading earnings ledger">{Array.from({ length: 6 }, (_, index) => <div key={`earnings-row-${index + 1}`} className="h-14 rounded-lg bg-skeleton-base border border-border motion-safe:animate-pulse" />)}</div>;
  }

  if (isError || !data) {
    return <div className="m-4 p-5 bg-danger-bg border border-danger rounded-xl" role="alert"><p className="text-sm text-danger">Unable to load earnings history.</p><button type="button" onClick={() => void refetch()} className="mt-3 min-h-11 px-4 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>;
  }

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border bg-header flex flex-col xl:flex-row gap-3 items-start xl:items-center justify-between">
        <h2 className="text-base font-semibold text-primary">Earnings Ledger</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto xl:items-center">
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" />
            <label htmlFor="trainer-earnings-search" className="sr-only">Search earnings descriptions</label>
            <input id="trainer-earnings-search" type="search" placeholder="Search descriptions…" value={draftSearch} onChange={(event) => setDraftSearch(event.target.value)} className="w-full min-h-11 pl-9 pr-4 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="trainer-earnings-start-date" className="sr-only">Start date</label>
            <input id="trainer-earnings-start-date" type="date" value={startDate} onChange={(event) => handleDateChange('startDate', event.target.value)} className="min-h-11 px-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            <span className="text-secondary text-sm" aria-hidden="true">to</span>
            <label htmlFor="trainer-earnings-end-date" className="sr-only">End date</label>
            <input id="trainer-earnings-end-date" type="date" value={endDate} onChange={(event) => handleDateChange('endDate', event.target.value)} className="min-h-11 px-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar">
        {history.length === 0 ? <TrainerEarningsEmptyState /> : (
          <table className="w-full min-w-[720px] text-left border-collapse">
            <thead>
              <tr className="bg-surface-highlight border-b border-border">
                {EARNINGS_SORT_OPTIONS.map((column) => {
                  const active = sortBy === column.value;
                  const SortIcon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                  return <th key={column.value} scope="col" className={`py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider ${column.value === 'amount' || column.value === 'status' ? 'text-right' : ''}`}><button type="button" onClick={() => handleSort(column.value)} className="inline-flex items-center gap-1 min-h-11 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`${column.label}: sort ${active ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}>{column.label}<SortIcon size={18} aria-hidden="true" className={active ? 'text-primary' : 'text-secondary'} /></button></th>;
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((row) => {
                const style = PAYOUT_STATUS_STYLES[row.status];
                const expanded = expandedRowId === row.id;
                return (
                  <>
                    <tr key={row.id} tabIndex={0} aria-expanded={expanded} aria-controls={`trainer-earnings-row-${row.id}-details`} onClick={() => setExpandedRowId(expanded ? null : row.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedRowId(expanded ? null : row.id); } }} className="cursor-pointer hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                      <td className="py-3 px-4 text-sm text-secondary whitespace-nowrap">{formatDate(row.date)}</td>
                      <td className="py-3 px-4"><p className="text-sm font-medium text-primary truncate max-w-80" title={row.description}>{row.description}</p><p className="text-xs text-secondary mt-0.5">{row.type}</p></td>
                      <td className="py-3 px-4 text-sm font-semibold text-primary text-right whitespace-nowrap">{formatCurrencyFromMinorUnits(row.amount, 'INR')}</td>
                      <td className="py-3 px-4 text-right"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${style?.bg ?? 'bg-input'} ${style?.text ?? 'text-secondary'}`}>{style?.label ?? row.status}</span></td>
                    </tr>
                    {expanded && <tr id={`trainer-earnings-row-${row.id}-details`} key={`${row.id}-details`}><td colSpan={4} className="px-4 py-3 bg-input"><div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-secondary"><span><strong className="text-primary">Session ID:</strong> {row.sessionId ?? '—'}</span><span><strong className="text-primary">Invoice:</strong> {row.invoiceNumber ?? '—'}</span><span><strong className="text-primary">Net Payout:</strong> {row.netPayout == null ? '—' : formatCurrencyFromMinorUnits(row.netPayout, 'INR')}</span></div></td></tr>}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && <div className="p-3 border-t border-border bg-header flex items-center justify-between gap-3 text-sm"><span className="text-secondary">Page {formatNumber(currentPage)} of {formatNumber(totalPages)}</span><div className="flex gap-2"><button type="button" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="min-h-11 min-w-24 px-3 rounded-lg border border-border bg-card text-primary disabled:opacity-50 hover:bg-primary-subtle hover:border-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Previous</button><button type="button" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="min-h-11 min-w-24 px-3 rounded-lg border border-border bg-card text-primary disabled:opacity-50 hover:bg-primary-subtle hover:border-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Next</button></div></div>}
    </div>
  );
}
