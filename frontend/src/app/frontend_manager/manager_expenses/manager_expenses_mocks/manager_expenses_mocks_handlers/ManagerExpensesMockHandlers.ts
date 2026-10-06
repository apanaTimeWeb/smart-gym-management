import { http, HttpResponse } from 'msw';
import { MANAGER_EXPENSES_STATUS_VALUES } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesConstants';
import { MOCK_EXPENSES_LIST, MOCK_EXPENSES_STATS } from '@/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_fixtures/ManagerExpensesMockData';
import { ManagerExpensesUrlConfig } from '@/app/frontend_manager/manager_expenses/manager_expenses_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import type { Expense } from '@/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes';


let mockExpenses = [...MOCK_EXPENSES_LIST];

let mockExpenseIdCounter = 1000;
/**
 * @description Provides the ManagerExpensesMockHandlers implementation for the expenses module.
 * @dependencies @/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_fixtures/ManagerExpensesMockData; @/app/frontend_manager/manager_expenses/manager_expenses_url_config; @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_expenses/manager_expenses_types/ManagerExpensesTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerExpensesMockState(): void {
  mockExpenses = [...MOCK_EXPENSES_LIST];
  mockExpenseIdCounter = 1000;
}

export const managerExpensesHandlers = [
  http.get(managerMockApiUrl(ManagerExpensesUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search')?.toLowerCase();

    let filtered = [...mockExpenses];
    
    if (status && status !== MANAGER_EXPENSES_STATUS_VALUES.ALL) {
      filtered = filtered.filter(e => e.status === status);
    }
    if (search) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(search) || e.category.toLowerCase().includes(search)
      );
    }
    
    return HttpResponse.json({
      success: true,
      message: 'Fetched expenses',
      data: {
        expenses: filtered,
        total: filtered.length,
        page: 1,
        limit: 10
      }
    });
  }),

  http.get(managerMockApiUrl(ManagerExpensesUrlConfig.BACKEND_API.STATS), () => {
    return HttpResponse.json({
      success: true,
      message: 'Fetched stats',
      data: MOCK_EXPENSES_STATS
    });
  }),

  http.get(managerMockApiUrl(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    const expense = mockExpenses.find(e => e.id === params.id);
    if (!expense) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    return HttpResponse.json({ success: true, message: 'Fetched expense', data: expense });
  }),

  http.post(managerMockApiUrl(ManagerExpensesUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const body = await request.json() as Partial<Expense>;
    const newExpense = { ...body, id: `expense-mock-${mockExpenseIdCounter++}`, createdAt: new Date().toISOString() } as Expense;
    mockExpenses = [newExpense, ...mockExpenses];
    return HttpResponse.json({ success: true, message: 'Created expense', data: newExpense });
  }),

  http.patch(managerMockApiUrl(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Expense>;
    const idx = mockExpenses.findIndex(e => e.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockExpenses[idx] = { ...mockExpenses[idx], ...body } as Expense;
    return HttpResponse.json({ success: true, message: 'Updated expense', data: mockExpenses[idx] });
  }),

  http.delete(managerMockApiUrl(ManagerExpensesUrlConfig.BACKEND_API.GET_ONE(':id')), ({ params }) => {
    mockExpenses = mockExpenses.filter(e => e.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted expense', data: { id: params.id } });
  }),
];
