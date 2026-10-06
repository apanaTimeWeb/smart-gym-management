import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';
import { MANAGER_GRIEVANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_grievance/manager_grievance_constants/ManagerGrievanceConstants';
import { MOCK_GRIEVANCE_TICKETS } from '@/app/frontend_manager/manager_grievance/manager_grievance_mocks/manager_grievance_mocks_fixtures/ManagerGrievanceMockFixtures';
import { CreateGrievanceTicketSchema } from '@/app/frontend_manager/manager_grievance/manager_grievance_schemas/ManagerGrievanceSchemas';
import { ManagerGrievanceUrlConfig } from '@/app/frontend_manager/manager_grievance/manager_grievance_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import type { GrievanceTicket } from '@/app/frontend_manager/manager_grievance/manager_grievance_types/ManagerGrievanceTypes';


let tickets = [...MOCK_GRIEVANCE_TICKETS];
let ticketIdCounter = 1000;

/**
 * @description Provides the ManagerGrievanceMockHandlers implementation for the grievance module.
 * @dependencies @/app/frontend_manager/manager_grievance/manager_grievance_mocks/manager_grievance_mocks_fixtures/ManagerGrievanceMockFixtures; @/app/frontend_manager/manager_grievance/manager_grievance_schemas/ManagerGrievanceSchemas; @/app/frontend_manager/manager_grievance/manager_grievance_url_config; @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerGrievanceMockState(): void {
  tickets = [...MOCK_GRIEVANCE_TICKETS];
  ticketIdCounter = 1000;
}

export const managerGrievanceMockHandlers = [
  http.get(managerMockApiUrl(ManagerGrievanceUrlConfig.BACKEND_API.BASE), async () => {
    await delay(100);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: tickets,
      meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    });
  }),

  http.post(managerMockApiUrl(ManagerGrievanceUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    await delay(100);
    const body = CreateGrievanceTicketSchema.parse(await request.json());
    const newTicket: GrievanceTicket = {
      id: `gt${ticketIdCounter++}`,
      memberName: body.memberName,
      category: body.category,
      issue: body.issue,
      status: MANAGER_GRIEVANCE_STATUS_VALUES.OPEN,
      loggedAt: new Date().toISOString(),
    };
    tickets = [newTicket, ...tickets];
    return HttpResponse.json({ success: true, message: 'Grievance created', data: newTicket });
  }),

  http.post(managerMockApiUrl(ManagerGrievanceUrlConfig.BACKEND_API.RESOLVE(':id')), async ({ params, request }) => {
    await delay(100);
    const id = String(params.id);
    const body = z.object({ resolutionNote: z.string().min(1) }).parse(await request.json());
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const current = tickets[ticketIndex];
    if (!current) {
      return HttpResponse.json({ success: false, message: 'Not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    const updatedTicket: GrievanceTicket = {
      ...current,
      status: MANAGER_GRIEVANCE_STATUS_VALUES.CLOSED,
      resolvedAt: new Date().toISOString(),
      resolutionNote: body.resolutionNote,
    };
    tickets[ticketIndex] = updatedTicket;
    return HttpResponse.json({ success: true, message: 'Grievance resolved', data: updatedTicket });
  }),
];
