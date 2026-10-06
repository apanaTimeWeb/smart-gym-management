"use client";
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminDashboardDateRangeSuffix } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_hooks/useAdminDashboardDateRangeSuffix';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('range=last_3_months') }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('useAdminDashboardDateRangeSuffix', () => {
  it('renders the localized suffix for the URL range state', () => {
    const { result } = renderHook(() => useAdminDashboardDateRangeSuffix());
    expect(result.current).toBe(' — last3Months');
  });
});
