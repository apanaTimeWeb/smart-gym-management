// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ExpensesCreateExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-create-expense.service';

describe('ExpensesCreateExpenseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { createExpense: jest.fn().mockResolvedValue(expected) };
    const service = new ExpensesCreateExpenseService(dependency as never);
    const result = await service.createExpense({} as never);
    expect(result).toEqual(expected);
    expect(dependency.createExpense).toHaveBeenCalledTimes(1);
    expect(dependency.createExpense).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { createExpense: jest.fn().mockRejectedValue(failure) };
    const service = new ExpensesCreateExpenseService(dependency as never);
    await expect(service.createExpense({} as never)).rejects.toBe(failure);
    expect(dependency.createExpense).toHaveBeenCalledTimes(1);
  });
});
