// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ExpensesFetchExpenseByIdService } from '@/backend_manager/modules/backend_manager/expenses/services/expenses-fetch-expense-by-id.service';

describe('ExpensesFetchExpenseByIdService', () => {
  it('returns the dependency result and invokes the intended boundary exactly once', async () => {
    const expected = { marker: 'expected-result' };
    const dependency = { findExpensesByIdOrThrow: jest.fn().mockResolvedValue(expected) };
    const service = new ExpensesFetchExpenseByIdService(dependency as never);
    const result = await service.fetchExpenseById('test-id' as never, {} as never);
    expect(result).toEqual(expected);
    expect(dependency.findExpensesByIdOrThrow).toHaveBeenCalledTimes(1);
    expect(dependency.findExpensesByIdOrThrow).toHaveBeenCalledWith(expect.anything(), expect.anything());
  });

  it('propagates a downstream failure instead of converting it to a false success', async () => {
    const failure = new Error('dependency failure');
    const dependency = { findExpensesByIdOrThrow: jest.fn().mockRejectedValue(failure) };
    const service = new ExpensesFetchExpenseByIdService(dependency as never);
    await expect(service.fetchExpenseById('test-id' as never, {} as never)).rejects.toBe(failure);
    expect(dependency.findExpensesByIdOrThrow).toHaveBeenCalledTimes(1);
  });
});
