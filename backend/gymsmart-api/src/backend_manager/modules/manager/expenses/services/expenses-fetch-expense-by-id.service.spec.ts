// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for ExpensesFetchExpenseByIdService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> ExpensesFetchExpenseByIdService.fetchExpenseById -> observable return/delegation.
import { ExpensesFetchExpenseByIdService } from '@/backend_manager/modules/manager/expenses/services/expenses-fetch-expense-by-id.service';

describe('ExpensesFetchExpenseByIdService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'expenses' } as const;
    const dependency = { fetchExpenseById: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new ExpensesFetchExpenseByIdService(dependency as never);
    const result = await service.fetchExpenseById({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchExpenseById as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
