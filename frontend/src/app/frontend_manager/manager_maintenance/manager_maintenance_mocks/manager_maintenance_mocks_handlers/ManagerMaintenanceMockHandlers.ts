import { http, HttpResponse, delay } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_MAINTENANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_constants/ManagerMaintenanceConstants';
import { MOCK_MAINTENANCE_TICKETS } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_fixtures/ManagerMaintenanceMockFixtures';
import { CreateMaintenanceTicketRequestSchema } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_schemas/ManagerMaintenanceSchemas';
import { ManagerMaintenanceUrlConfig } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_url_config';
import type { MaintenanceTicket } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_types/ManagerMaintenanceTypes';


let tickets = [...MOCK_MAINTENANCE_TICKETS];
let ticketIdCounter = 1000;

/**
 * @description Provides the ManagerMaintenanceMockHandlers implementation for the maintenance module.
 * @dependencies @/app/frontend_manager/manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_fixtures/ManagerMaintenanceMockFixtures; @/app/frontend_manager/manager_maintenance/manager_maintenance_schemas/ManagerMaintenanceSchemas; @/app/frontend_manager/manager_maintenance/manager_maintenance_url_config; @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerMaintenanceMockState(): void {
  tickets = [...MOCK_MAINTENANCE_TICKETS];
  ticketIdCounter = 1000;
}

export const managerMaintenanceMockHandlers = [
  http.get(managerMockApiUrl(ManagerMaintenanceUrlConfig.BACKEND_API.BASE), async () => {
    await delay(100);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: tickets,
      meta: { total: tickets.length, page: 1, limit: 50, totalPages: 1, hasNextPage: false, hasPrevPage: false },
    });
  }),

  http.post(managerMockApiUrl(ManagerMaintenanceUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    await delay(100);
    const body = CreateMaintenanceTicketRequestSchema.parse(await request.json());
    const newTicket: MaintenanceTicket = {
      id: `mt${ticketIdCounter++}`,
      title: body.title,
      equipment: body.equipment,
      priority: body.priority,
      estimatedCost: body.estimatedCost,
      status: MANAGER_MAINTENANCE_STATUS_VALUES.OPEN,
      reportedAt: new Date().toISOString(),
    };
    tickets = [newTicket, ...tickets];
    return HttpResponse.json({ success: true, message: 'Ticket created', data: newTicket });
  }),

  http.post(managerMockApiUrl(ManagerMaintenanceUrlConfig.BACKEND_API.RESOLVE(':id')), async ({ params }) => {
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
    const updatedTicket: MaintenanceTicket = { ...current, status: MANAGER_MAINTENANCE_STATUS_VALUES.RESOLVED, resolvedAt: new Date().toISOString() };
    tickets[ticketIndex] = updatedTicket;
    return HttpResponse.json({ success: true, message: 'Ticket resolved', data: updatedTicket });
  }),
];
