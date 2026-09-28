// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ExpensesUpdateExpenseService } from '@/backend_manager/manager_modules/expenses/expenses_services/manager-expenses-update-expense.service';

describe('ExpensesUpdateExpenseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { updateExpense: jest.fn().mockResolvedValue(expected) };
    const service = new ExpensesUpdateExpenseService(dependency as never);
    const result = await service.updateExpense({} as never, 'test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.updateExpense).toHaveBeenCalledTimes(1);
    expect(dependency.updateExpense).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { updateExpense: jest.fn().mockRejectedValue(failure) };
    const service = new ExpensesUpdateExpenseService(dependency as never);
    await expect(service.updateExpense({} as never, 'test-id' as never)).rejects.toBe(failure);
    expect(dependency.updateExpense).toHaveBeenCalledTimes(1);
  });
});
