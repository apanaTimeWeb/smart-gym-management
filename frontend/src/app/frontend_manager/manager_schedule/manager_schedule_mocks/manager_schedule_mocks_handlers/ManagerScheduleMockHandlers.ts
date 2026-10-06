let mockShiftIdCounter = 1000;import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_SCHEDULE_KPIS, MOCK_TRAINERS } from '@/app/frontend_manager/manager_schedule/manager_schedule_mocks/manager_schedule_mocks_fixtures/ManagerScheduleMockData';
import { ManagerScheduleUrlConfig } from '@/app/frontend_manager/manager_schedule/manager_schedule_url_config';
import type { TrainerShift } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';


let mockTrainers = structuredClone(MOCK_TRAINERS);

/**
 * @description Provides the ManagerScheduleMockHandlers implementation for the schedule module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_schedule/manager_schedule_mocks/manager_schedule_mocks_fixtures/ManagerScheduleMockData; @/app/frontend_manager/manager_schedule/manager_schedule_url_config; @/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerScheduleMockState(): void {
  mockShiftIdCounter = 1000;
  mockTrainers = structuredClone(MOCK_TRAINERS);
}

export const managerScheduleHandlers = [
  http.get(managerMockApiUrl(ManagerScheduleUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const day = url.searchParams.get('day');
    const trainers = mockTrainers.map((trainer) => ({
      ...trainer,
      shifts: day ? trainer.shifts.filter((shift) => shift.day === day) : trainer.shifts })).filter((trainer) => !search || trainer.trainerName.toLowerCase().includes(search) || trainer.trainerRole.toLowerCase().includes(search));
    return HttpResponse.json({ success: true, message: 'Schedule fetched', data: { trainers, kpis: MOCK_SCHEDULE_KPIS } });
  }),
  http.post(managerMockApiUrl(ManagerScheduleUrlConfig.BACKEND_API.SHIFTS), async ({ request }) => {
    const body = await request.json() as Omit<TrainerShift, 'id'>;
    const trainer = mockTrainers.find((item) => item.trainerId === body.trainerId);
    if (!trainer) return HttpResponse.json({ success: false, message: 'Trainer not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const shift: TrainerShift = { ...body, id: `shift-${mockShiftIdCounter++}` };
    trainer.shifts.push(shift);
    trainer.totalShiftsPerWeek += 1;
    return HttpResponse.json({ success: true, message: 'Shift created', data: shift });
  }),
  http.patch(managerMockApiUrl(ManagerScheduleUrlConfig.BACKEND_API.SHIFT(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<TrainerShift>;
    for (const trainer of mockTrainers) {
      const index = trainer.shifts.findIndex((shift) => shift.id === params.id);
      if (index >= 0) {
        const existing = trainer.shifts[index];
        if (!existing) continue;
        const updated: TrainerShift = { ...existing, ...body };
        trainer.shifts[index] = updated;
        return HttpResponse.json({ success: true, message: 'Shift updated', data: updated });
      }
    }
    return HttpResponse.json({ success: false, message: 'Shift not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
  }),
  http.delete(managerMockApiUrl(ManagerScheduleUrlConfig.BACKEND_API.SHIFT(':id')), ({ params }) => {
    for (const trainer of mockTrainers) {
      const before = trainer.shifts.length;
      trainer.shifts = trainer.shifts.filter((shift) => shift.id !== params.id);
      if (trainer.shifts.length !== before) {
        trainer.totalShiftsPerWeek -= 1;
        return HttpResponse.json({ success: true, message: 'Shift deleted', data: { id: String(params.id) } });
      }
    }
    return HttpResponse.json({ success: false, message: 'Shift not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
  }),
];
