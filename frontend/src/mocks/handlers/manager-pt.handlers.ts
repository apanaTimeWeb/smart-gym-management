import { http, HttpResponse } from 'msw';
import { 
  MOCK_PT_PACKAGES, 
  MOCK_PT_ASSIGNMENTS, 
  MOCK_PT_WORKLOAD, 
  MOCK_PT_KPIS 
} from '@/app/manager/pt/pt_fixtures/ManagerPtMockData';
import type { CreatePtAssignmentPayload, PtAssignment } from '@/app/manager/pt/pt_types/ManagerPtTypes';

let mockAssignments = [...MOCK_PT_ASSIGNMENTS];

export const managerPtHandlers = [
  http.get('http://localhost:5000/api/v1/manager/pt/kpis', () => {
    return HttpResponse.json({ success: true, message: 'KPIs fetched', data: MOCK_PT_KPIS });
  }),

  http.get('http://localhost:5000/api/v1/manager/pt/workload', () => {
    return HttpResponse.json({ success: true, message: 'Workload fetched', data: MOCK_PT_WORKLOAD });
  }),

  http.get('http://localhost:5000/api/v1/manager/pt/packages', () => {
    return HttpResponse.json({ success: true, message: 'Packages fetched', data: MOCK_PT_PACKAGES });
  }),

  http.get('http://localhost:5000/api/v1/manager/pt/assignments', () => {
    return HttpResponse.json({ success: true, message: 'Assignments fetched', data: mockAssignments });
  }),

  http.post('http://localhost:5000/api/v1/manager/pt/assignments', async ({ request }) => {
    const body = await request.json() as CreatePtAssignmentPayload;
    const newAssignment: PtAssignment = {
      id: `asg-new-${Date.now()}`,
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
      totalAmount: 0,
    };
    mockAssignments = [newAssignment, ...mockAssignments];
    return HttpResponse.json({ success: true, message: 'Trainer assigned successfully!', data: newAssignment });
  }),

  http.patch('http://localhost:5000/api/v1/manager/pt/assignments/:id/complete-session', ({ params }) => {
    const idx = mockAssignments.findIndex(a => a.id === params.id);
    if (idx === -1) return HttpResponse.json({ success: false, message: 'Not found' }, { status: 404 });
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
