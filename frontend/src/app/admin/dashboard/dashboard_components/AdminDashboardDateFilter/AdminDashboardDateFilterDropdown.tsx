"use client";
// RESPONSIBILITY: A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import type { AdminDashboardDateFilterRange } from '@/app/admin/dashboard/dashboard_types/AdminDashboardDateFilterTypes';

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

export function AdminDashboardDateFilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = (searchParams.get('range') as AdminDashboardDateFilterRange) ?? 'this_month';

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
    <div className="w-48 bg-input border border-border rounded-lg shadow-card">
      <AdminSearchableDropdown
        options={OPTIONS}
        value={value}
        onChange={(val) => handlePresetChange(String(val))}
        placeholder="Select Range"
      />
    </div>
  );
}