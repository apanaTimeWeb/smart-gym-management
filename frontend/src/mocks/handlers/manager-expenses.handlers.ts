import { http, HttpResponse } from 'msw';
import { MOCK_EXPENSES_LIST, MOCK_EXPENSES_STATS } from '@/app/manager/expenses/expenses_fixtures/ManagerExpensesMockData';
import type { Expense } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';

let mockExpenses = [...MOCK_EXPENSES_LIST];

export const managerExpensesHandlers = [
  http.get('http://localhost:5000/api/v1/manager/expenses', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search')?.toLowerCase();

    let filtered = [...mockExpenses];
    
    if (status && status !== 'All') {
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

  http.get('http://localhost:5000/api/v1/manager/expenses/stats', () => {
    return HttpResponse.json({
      success: true,
      message: 'Fetched stats',
      data: MOCK_EXPENSES_STATS
    });
  }),

  http.get('http://localhost:5000/api/v1/manager/expenses/:id', ({ params }) => {
    const expense = mockExpenses.find(e => e.id === params.id);
    if (!expense) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return HttpResponse.json({ success: true, message: 'Fetched expense', data: expense });
  }),

  http.post('http://localhost:5000/api/v1/manager/expenses', async ({ request }) => {
    const body = await request.json() as Partial<Expense>;
    const newExpense = { ...body, id: Math.random().toString(), createdAt: new Date().toISOString() } as Expense;
    mockExpenses = [newExpense, ...mockExpenses];
    return HttpResponse.json({ success: true, message: 'Created expense', data: newExpense });
  }),

  http.patch('http://localhost:5000/api/v1/manager/expenses/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Expense>;
    const idx = mockExpenses.findIndex(e => e.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    mockExpenses[idx] = { ...mockExpenses[idx], ...body } as Expense;
    return HttpResponse.json({ success: true, message: 'Updated expense', data: mockExpenses[idx] });
  }),

  http.delete('http://localhost:5000/api/v1/manager/expenses/:id', ({ params }) => {
    mockExpenses = mockExpenses.filter(e => e.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Deleted expense', data: { id: params.id } });
  }),
];
