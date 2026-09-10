import { http, HttpResponse } from 'msw';

export const managerMembersHandlers = [
  http.get('http://localhost:5000/api/v1/manager/members', () => {
    return HttpResponse.json({
      success: true,
      message: 'Members fetched successfully',
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 1 }
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/members', async ({ request }) => {
    return HttpResponse.json({
      success: true,
      message: 'Member added successfully',
      data: { id: 'm-' + Date.now() }
    });
  }),
  
  http.get('http://localhost:5000/api/v1/manager/members/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      message: 'Member fetched successfully',
      data: {
        id: params.id,
        name: 'Mock Member',
        status: 'ACTIVE'
      }
    });
  }),
];
