// RESPONSIBILITY: Renders the SuperadminSystemOpsInfrastructureUptimeChart.test UI for the system ops feature. Business/data orchestration is delegated to module-owned hooks.
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import SuperadminSystemOpsInfrastructureUptimeChart from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_uptime_chart/SuperadminSystemOpsInfrastructureUptimeChart';
import { useSuperadminSystemOpsInfrastructureUptime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureUptime';

vi.mock('next/dynamic', () => ({ default: () => () => <div data-testid="superadmin_system_ops_infrastructure-uptime-chart-mock" /> }));
vi.mock('next-intl', () => ({
  useLocale: () => 'en-IN',
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureUptime', () => ({
  useSuperadminSystemOpsInfrastructureUptime: vi.fn(),
}));

describe('SuperadminSystemOpsInfrastructureUptimeChart', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders the loading state from the query contract', () => {
    vi.mocked(useSuperadminSystemOpsInfrastructureUptime).mockReturnValue({ isPending: true, isError: false, data: undefined } as never);
    render(<SuperadminSystemOpsInfrastructureUptimeChart />);
    expect(screen.getByTestId('superadmin_system_ops_infrastructure-uptime-loading')).toBeInTheDocument();
  });

  it('renders the empty state when the API returns no points', () => {
    vi.mocked(useSuperadminSystemOpsInfrastructureUptime).mockReturnValue({ isPending: false, isError: false, data: { data: [] } } as never);
    render(<SuperadminSystemOpsInfrastructureUptimeChart />);
    expect(screen.getByTestId('superadmin_system_ops_infrastructure-uptime-empty')).toBeInTheDocument();
  });
});
