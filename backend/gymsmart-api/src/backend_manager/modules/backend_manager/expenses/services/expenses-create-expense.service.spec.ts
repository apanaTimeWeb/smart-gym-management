// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ExpensesCreateExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-create-expense.service';

describe('ExpensesCreateExpenseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createExpenses: jest.fn().mockResolvedValue(expected) };
    const service = new ExpensesCreateExpenseService(dependency as never);
    const result = await service.createExpense({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createExpenses).toHaveBeenCalledTimes(1);
    expect(dependency.createExpenses).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createExpenses: jest.fn().mockRejectedValue(failure) };
    const service = new ExpensesCreateExpenseService(dependency as never);
    await expect(service.createExpense({} as never)).rejects.toBe(failure);
    expect(dependency.createExpenses).toHaveBeenCalledTimes(1);
  });
});
