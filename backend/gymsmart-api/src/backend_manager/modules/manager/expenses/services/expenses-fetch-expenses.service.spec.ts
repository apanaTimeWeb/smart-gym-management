// RESPONSIBILITY: Co-located behavioral unit proof for ExpensesFetchExpensesService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ExpensesFetchExpensesService.fetchExpenses -> observable return/delegation.
import { ExpensesFetchExpensesService } from '@/modules/manager/expenses/services/expenses-fetch-expenses.service.ts';

describe('ExpensesFetchExpensesService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'expenses' } as const;
    const dependency = { fetchExpenses: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ExpensesFetchExpensesService(dependency as never);
    const result = await service.fetchExpenses({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchExpenses as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
