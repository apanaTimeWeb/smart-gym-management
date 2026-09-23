// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ExpensesDeleteExpenseService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-delete-expense.service';

describe('ExpensesDeleteExpenseService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { softDeleteExpensesById: jest.fn().mockResolvedValue(expected) };
    const service = new ExpensesDeleteExpenseService(dependency as never);
    const result = await service.deleteExpense('test-id' as never);
    expect(result).toEqual(expected);
    expect(dependency.softDeleteExpensesById).toHaveBeenCalledTimes(1);
    expect(dependency.softDeleteExpensesById).toHaveBeenCalledWith(expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { softDeleteExpensesById: jest.fn().mockRejectedValue(failure) };
    const service = new ExpensesDeleteExpenseService(dependency as never);
    await expect(service.deleteExpense('test-id' as never)).rejects.toBe(failure);
    expect(dependency.softDeleteExpensesById).toHaveBeenCalledTimes(1);
  });
});
