// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ExpensesFindExpensesService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-find-expenses.service';

describe('ExpensesFindExpensesService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findExpensesList: jest.fn().mockResolvedValue(expected) };
    const service = new ExpensesFindExpensesService(dependency as never);
    const result = await service.findExpenses({} as never);
    expect(result).toEqual(expected);
    expect(dependency.findExpensesList).toHaveBeenCalledTimes(1);
    expect(dependency.findExpensesList).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findExpensesList: jest.fn().mockRejectedValue(failure) };
    const service = new ExpensesFindExpensesService(dependency as never);
    await expect(service.findExpenses({} as never)).rejects.toBe(failure);
    expect(dependency.findExpensesList).toHaveBeenCalledTimes(1);
  });
});
