import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsKpiViewModel } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsKpiViewModel';



vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsDateRangeSuffix', () => ({ useSuperadminAnalyticsDateRangeSuffix: () => '(Jan–Mar)' }));

describe('useSuperadminAnalyticsKpiViewModel', () => {
  it('builds five KPI cards and preserves missing currency as an en-dash', () => {
    const metrics = { mrr: 100000, arr: 1200000, cancellationRate: 1.5, activeTenants: 8, arpu: 12500, mrrDeltaPercent: 4, arrDeltaPercent: 5 } as never;
    const { result } = renderHook(() => useSuperadminAnalyticsKpiViewModel(metrics));
    expect(result.current).toHaveLength(5);
    expect(result.current[0].value).toBe('—');
    expect(result.current[2].value).toBe('1.5%');
    expect(result.current[3].value).toBe('8');
  });
});
