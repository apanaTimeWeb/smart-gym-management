// RESPONSIBILITY: Co-located behavioral unit proof for ExpensesCreateExpenseService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ExpensesCreateExpenseService.createExpense -> observable return/delegation.
import { ExpensesCreateExpenseService } from '@/modules/manager/expenses/services/expenses-create-expense.service.ts';

describe('ExpensesCreateExpenseService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'expenses' } as const;
    const dependency = { createExpense: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ExpensesCreateExpenseService(dependency as never);
    const result = await service.createExpense({} as never);
    expect(result).toEqual(expected);
    expect((dependency.createExpense as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
