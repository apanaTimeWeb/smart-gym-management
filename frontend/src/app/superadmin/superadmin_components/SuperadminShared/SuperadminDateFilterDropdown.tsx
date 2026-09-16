'use client';
// RESPONSIBILITY: A unified Date Filter dropdown used across Superadmin pages (Dashboard, Analytics, Invoices, Coupons, Onboarding, Reports).
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom' | 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year';

const OPTIONS = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'this_year', label: 'This Year' },
  { value: 'monthly', label: 'Monthly (All Time)' }, // Keep compatibility with dashboard
  { value: 'yearly', label: 'Yearly (All Time)' },   // Keep compatibility with dashboard
  { value: 'custom', label: 'Custom Range' },
];

export function SuperadminDateFilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = (searchParams.get('range') as TimeRange) ?? 'this_month';
  const currentStartDate = searchParams.get('startDate') || '';
  const currentEndDate = searchParams.get('endDate') || '';

  const handleCustomDateChange = useCallback((type: 'start' | 'end', val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    
    if (type === 'start') {
      if (val) params.set('startDate', val);
      else params.delete('startDate');
    } else {
      if (val) params.set('endDate', val);
      else params.delete('endDate');
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const handlePresetChange = useCallback((preset: string) => {
    const today = new Date();
    let from = '';
    let to = '';

    switch (preset) {
      case 'this_month':
        from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'last_month':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0] || '';
        break;
      case 'last_3_months':
        from = new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'last_6_months':
        from = new Date(today.getFullYear(), today.getMonth() - 6, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'this_year':
        from = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0] || '';
        break;
      default:
        break;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('range', preset);
    if (preset !== 'custom' && preset !== 'monthly' && preset !== 'yearly') {
      params.set('startDate', from);
      params.set('endDate', to);
    } else if (preset !== 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="w-48 bg-input border border-border rounded-lg shadow-sm shrink-0">
        <SearchableDropdown
          options={OPTIONS}
          value={value}
          onChange={(val) => handlePresetChange(String(val))}
          className="bg-transparent border-transparent"
        />
      </div>

      {value === 'custom' && (
        <div className="flex items-center gap-2 bg-input border border-border rounded-lg shadow-sm px-3 py-2 shrink-0">
          <input 
            type="date" 
            value={currentStartDate}
            onChange={(e) => handleCustomDateChange('start', e.target.value)}
            className="bg-transparent text-sm text-foreground focus:outline-none custom-date-input"
          />
          <span className="text-secondary text-sm font-medium">to</span>
          <input 
            type="date" 
            value={currentEndDate}
            onChange={(e) => handleCustomDateChange('end', e.target.value)}
            className="bg-transparent text-sm text-foreground focus:outline-none custom-date-input"
          />
        </div>
      )}
    </div>
  );
}
