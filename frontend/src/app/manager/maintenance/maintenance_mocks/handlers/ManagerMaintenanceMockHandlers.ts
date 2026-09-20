import { http, HttpResponse, delay } from 'msw';
import { MOCK_MAINTENANCE_TICKETS } from '@/app/manager/maintenance/maintenance_mocks/fixtures/ManagerMaintenanceMockFixtures';
import { CreateMaintenanceTicketSchema } from '@/app/manager/maintenance/maintenance_schemas/ManagerMaintenanceSchemas';
import { ManagerMaintenanceUrlConfig } from '@/app/manager/maintenance/maintenance_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import type { MaintenanceTicket } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';


let tickets = [...MOCK_MAINTENANCE_TICKETS];
let ticketIdCounter = 1000;

export function resetManagerMaintenanceMockState(): void {
  tickets = [...MOCK_MAINTENANCE_TICKETS];
  ticketIdCounter = 1000;
}

export const managerMaintenanceMockHandlers = [
  http.get(ManagerMaintenanceUrlConfig.BACKEND_API.BASE, async () => {
    await delay(100);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: tickets,
      meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    });
  }),

  http.post(ManagerMaintenanceUrlConfig.BACKEND_API.BASE, async ({ request }) => {
    await delay(100);
    const body = CreateMaintenanceTicketSchema.parse(await request.json());
    const newTicket: MaintenanceTicket = {
      id: `mt${ticketIdCounter++}`,
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

  http.post(ManagerMaintenanceUrlConfig.BACKEND_API.RESOLVE(':id'), async ({ params }) => {
    await delay(100);
    const id = String(params.id);
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const current = tickets[ticketIndex];
    if (!current) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const updatedTicket: MaintenanceTicket = { ...current, status: 'RESOLVED', resolvedAt: new Date().toISOString() };
    tickets[ticketIndex] = updatedTicket;
    return HttpResponse.json({ success: true, message: 'Ticket resolved', data: updatedTicket });
  }),
];
