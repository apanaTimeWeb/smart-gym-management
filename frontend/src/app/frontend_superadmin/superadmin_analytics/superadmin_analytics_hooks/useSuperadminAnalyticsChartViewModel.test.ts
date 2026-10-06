import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsChartViewModel } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsChartViewModel';



vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutThemeProvider', () => ({ useSuperadminTheme: () => ({ theme: 'dark' }) }));

describe('useSuperadminAnalyticsChartViewModel', () => {
  it('maps each monthly record into chart categories and both series', () => {
    const monthly = [
      { month: 'Jan', mrr: 100, tenantCount: 10, cancelledCount: 2 },
      { month: 'Feb', mrr: 120, tenantCount: 12, cancelledCount: 1 },
    ] as never;
    const { result } = renderHook(() => useSuperadminAnalyticsChartViewModel(monthly));
    expect(result.current.mrrAreaOptions.xaxis.categories).toEqual(['Jan', 'Feb']);
    expect(result.current.mrrAreaSeries[0].data).toEqual([100, 120]);
    expect(result.current.tenantBarSeries[0].data).toEqual([10, 12]);
    expect(result.current.tenantBarSeries[1].data).toEqual([2, 1]);
  });
});
