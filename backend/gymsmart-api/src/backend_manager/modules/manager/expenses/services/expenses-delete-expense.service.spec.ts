// RESPONSIBILITY: Co-located behavioral unit proof for ExpensesDeleteExpenseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ExpensesDeleteExpenseService.deleteExpense -> observable return/delegation.
import { ExpensesDeleteExpenseService } from '@/modules/manager/expenses/services/expenses-delete-expense.service.ts';

describe('ExpensesDeleteExpenseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'expenses' } as const;
    const dependency = { deleteExpense: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ExpensesDeleteExpenseService(dependency as never);
    const result = await service.deleteExpense({} as never);
    expect(result).toEqual(expected);
    expect((dependency.deleteExpense as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
