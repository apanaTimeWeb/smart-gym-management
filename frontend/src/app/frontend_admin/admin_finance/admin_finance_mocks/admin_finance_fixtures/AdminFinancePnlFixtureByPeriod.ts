// RESPONSIBILITY: Selects the Admin Finance P&L fixture for a requested reporting period with a deterministic fallback.
import type { BranchPnlRecord, PnlPeriod } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';
import { MOCK_ADMIN_BRANCH_PNL, MOCK_ADMIN_BRANCH_PNL_BY_PERIOD } from '@/app/frontend_admin/admin_finance/admin_finance_mocks/admin_finance_fixtures/AdminFinanceMockFixtures';

/**
 * getAdminFinancePnlFixtureByPeriod is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminFinancePnlFixtureByPeriod(period: PnlPeriod): BranchPnlRecord[] {
  return MOCK_ADMIN_BRANCH_PNL_BY_PERIOD[period] ?? MOCK_ADMIN_BRANCH_PNL;
}
