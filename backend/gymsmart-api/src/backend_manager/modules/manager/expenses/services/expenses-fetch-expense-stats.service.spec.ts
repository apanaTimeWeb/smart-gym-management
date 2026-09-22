// RESPONSIBILITY: Co-located behavioral unit proof for ExpensesFetchExpenseStatsService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ExpensesFetchExpenseStatsService.fetchExpenseStats -> observable return/delegation.
import { ExpensesFetchExpenseStatsService } from '@/modules/manager/expenses/services/expenses-fetch-expense-stats.service.ts';

describe('ExpensesFetchExpenseStatsService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'expenses' } as const;
    const dependency = { fetchExpenseStats: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ExpensesFetchExpenseStatsService(dependency as never);
    const result = await service.fetchExpenseStats({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchExpenseStats as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
