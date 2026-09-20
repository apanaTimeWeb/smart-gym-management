import { http, HttpResponse, delay } from 'msw';
import { GrievanceUrlConfig } from '@/app/manager/grievance/grievance_url_config';
import { MOCK_GRIEVANCE_TICKETS } from '@/app/manager/grievance/grievance_mocks/fixtures/ManagerGrievanceMockFixtures';
import { type CreateGrievanceTicketPayload, type GrievanceTicket } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';

let tickets = [...MOCK_GRIEVANCE_TICKETS];

export const managerGrievanceMockHandlers = [
  http.get(GrievanceUrlConfig.BACKEND_API.BASE, async () => {
    await delay(500);
    return HttpResponse.json({ success: true, message: 'Success', data: tickets, meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1 } });
  }),
  
  http.post(GrievanceUrlConfig.BACKEND_API.BASE, async ({ request }) => {
    await delay(500);
    const body = await request.json() as CreateGrievanceTicketPayload;
    const newTicket: GrievanceTicket = {
      id: `gt${Date.now()}`,
      memberName: body.memberName,
      category: body.category,
      issue: body.issue,
      status: 'OPEN',
      loggedAt: new Date().toISOString(),
    };
    tickets = [newTicket, ...tickets];
    return HttpResponse.json({ success: true, message: 'Grievance created', data: newTicket });
  }),

  http.post(`${GrievanceUrlConfig.BACKEND_API.BASE}/:id/resolve`, async ({ params, request }) => {
    await delay(500);
    const { id } = params;
    const { resolutionNote } = await request.json() as { resolutionNote: string };
    
    const ticketIndex = tickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    
    tickets[ticketIndex] = {
      ...tickets[ticketIndex]!,
      status: 'CLOSED',
      resolvedAt: new Date().toISOString(),
      resolutionNote,
    };
    return HttpResponse.json({ success: true, message: 'Grievance resolved', data: tickets[ticketIndex] });
  })
];
