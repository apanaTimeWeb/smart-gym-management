import { http, HttpResponse } from 'msw';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { ManagerPtUrlConfig } from '@/app/manager/pt/pt_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import { 
  MOCK_PT_PACKAGES, 
  MOCK_PT_ASSIGNMENTS, 
  MOCK_PT_WORKLOAD, 
  MOCK_PT_KPIS 
} from '@/app/manager/pt/pt_fixtures/ManagerPtMockData';
import type { CreatePtAssignmentPayload, PtAssignment } from '@/app/manager/pt/pt_types/ManagerPtTypes';

let mockAssignments = [...MOCK_PT_ASSIGNMENTS];

export let mockAssignmentIdCounter = 1000;
export const managerPtHandlers = [
  http.get(managerMockApiUrl(ManagerPtUrlConfig.BACKEND_API.KPIS), () => {
    return HttpResponse.json({ success: true, message: 'KPIs fetched', data: MOCK_PT_KPIS });
  }),

  http.get(managerMockApiUrl(ManagerPtUrlConfig.BACKEND_API.WORKLOAD), () => {
    return HttpResponse.json({ success: true, message: 'Workload fetched', data: MOCK_PT_WORKLOAD });
  }),

  http.get(managerMockApiUrl(ManagerPtUrlConfig.BACKEND_API.PACKAGES), () => {
    return HttpResponse.json({ success: true, message: 'Packages fetched', data: MOCK_PT_PACKAGES });
  }),

  http.get(managerMockApiUrl(ManagerPtUrlConfig.BACKEND_API.ASSIGNMENTS), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockAssignments.filter((assignment) => !search || `${assignment.memberName} ${assignment.trainerName} ${assignment.packageName}`.toLowerCase().includes(search));
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Assignments fetched', data: { assignments: filtered.slice(start, start + limit), total: filtered.length, page, limit } });
  }),

  http.post(managerMockApiUrl(ManagerPtUrlConfig.BACKEND_API.ASSIGNMENTS), async ({ request }) => {
    const body = await request.json() as CreatePtAssignmentPayload;
    const newAssignment: PtAssignment = {
      id: `asg-new-${mockAssignmentIdCounter++}`,
      memberId: body.memberId,
      memberName: 'New Member', 
      trainerId: body.trainerId,
      trainerName: 'Assigned Trainer',
      packageId: body.packageId,
      packageName: 'Assigned Package',
      totalSessions: 12,
      completedSessions: 0,
      sessionsRemaining: 12,
      startDate: body.startDate,
      endDate: '2024-01-01',
      paymentStatus: 'PAID',
      amountPaid: 0,
      totalAmount: 0 };
    mockAssignments = [newAssignment, ...mockAssignments];
    return HttpResponse.json({ success: true, message: 'Trainer assigned successfully!', data: newAssignment });
  }),

  http.patch(managerMockApiUrl(ManagerPtUrlConfig.BACKEND_API.COMPLETE_SESSION(':id')), ({ params }) => {
    const idx = mockAssignments.findIndex(a => a.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const assignment = mockAssignments[idx];
    if (assignment) {
      mockAssignments[idx] = { 
        ...assignment, 
        completedSessions: Math.min(assignment.completedSessions + 1, assignment.totalSessions) 
      } as PtAssignment;
    }
    return HttpResponse.json({ success: true, message: 'Session marked as complete.', data: mockAssignments[idx] });
  }),
];
