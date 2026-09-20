import { http, HttpResponse, delay } from 'msw';
import { MaintenanceUrlConfig } from '@/app/manager/maintenance/maintenance_url_config';
import { MOCK_MAINTENANCE_TICKETS } from '@/app/manager/maintenance/maintenance_mocks/fixtures/ManagerMaintenanceMockFixtures';
import { type CreateMaintenanceTicketPayload, type MaintenanceTicket } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';

let tickets = [...MOCK_MAINTENANCE_TICKETS];

export const managerMaintenanceMockHandlers = [
  http.get(MaintenanceUrlConfig.BACKEND_API.BASE, async () => {
    await delay(500);
    return HttpResponse.json({ success: true, message: 'Success', data: tickets, meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1 } });
  }),
  
  http.post(MaintenanceUrlConfig.BACKEND_API.BASE, async ({ request }) => {
    await delay(500);
    const body = await request.json() as CreateMaintenanceTicketPayload;
    const newTicket: MaintenanceTicket = {
      id: `mt${Date.now()}`,
      title: body.title,
      equipment: body.equipment,
      priority: body.priority,
      estimatedCost: body.estimatedCost,
      status: 'OPEN',
      reportedAt: new Date().toISOString(),
    };
    tickets = [newTicket, ...tickets];
    return HttpResponse.json({ success: true, message: 'Ticket created', data: newTicket });
  }),

  http.post(`${MaintenanceUrlConfig.BACKEND_API.BASE}/:id/resolve`, async ({ params }) => {
    await delay(500);
    const { id } = params;
    const ticketIndex = tickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    
    tickets[ticketIndex] = {
      ...tickets[ticketIndex]!,
      status: 'RESOLVED',
      resolvedAt: new Date().toISOString(),
    };
    return HttpResponse.json({ success: true, message: 'Ticket resolved', data: tickets[ticketIndex] });
  })
];
