"use client";
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminReportsDateRangeSuffix } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsDateRangeSuffix';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('range=this_year') }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('useAdminReportsDateRangeSuffix', () => {
  it('renders the localized suffix for the URL range state', () => {
    const { result } = renderHook(() => useAdminReportsDateRangeSuffix());
    expect(result.current).toBe(' — thisYear');
  });
});
