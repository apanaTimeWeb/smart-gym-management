// RESPONSIBILITY: Co-located behavioral unit proof for ExpensesUpdateExpenseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ExpensesUpdateExpenseService.updateExpense -> observable return/delegation.
import { ExpensesUpdateExpenseService } from '@/modules/manager/expenses/services/expenses-update-expense.service.ts';

describe('ExpensesUpdateExpenseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'expenses' } as const;
    const dependency = { updateExpense: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ExpensesUpdateExpenseService(dependency as never);
    const result = await service.updateExpense({} as never);
    expect(result).toEqual(expected);
    expect((dependency.updateExpense as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
