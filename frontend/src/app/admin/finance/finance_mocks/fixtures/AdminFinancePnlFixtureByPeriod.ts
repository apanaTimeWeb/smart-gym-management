// RESPONSIBILITY: Selects the Admin Finance P&L fixture for a requested reporting period with a deterministic fallback.
import type { BranchPnlRecord, PnlPeriod } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import { MOCK_ADMIN_BRANCH_PNL, MOCK_ADMIN_BRANCH_PNL_BY_PERIOD } from '@/app/admin/finance/finance_mocks/fixtures/AdminFinanceMockFixtures';

export function getAdminFinancePnlFixtureByPeriod(period: PnlPeriod): BranchPnlRecord[] {
  return MOCK_ADMIN_BRANCH_PNL_BY_PERIOD[period] ?? MOCK_ADMIN_BRANCH_PNL;
}
