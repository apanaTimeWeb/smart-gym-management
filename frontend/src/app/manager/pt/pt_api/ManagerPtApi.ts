// RESPONSIBILITY: API client for the Manager PT module using hardcoded mock data for now.
import type { ApiResponse } from '@/lib/api';
import type { 
  PtPackage, 
  PtAssignment, 
  PtTrainerWorkload, 
  PtDashboardKpis,
  CreatePtAssignmentPayload 
} from '@/app/manager/pt/pt_types/ManagerPtTypes';
import { 
  MOCK_PT_PACKAGES, 
  MOCK_PT_ASSIGNMENTS, 
  MOCK_PT_WORKLOAD, 
  MOCK_PT_KPIS 
} from '@/app/manager/pt/pt_utils/ManagerPtConstants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const managerPtApi = {
  fetchDashboardKpis: async (): Promise<ApiResponse<PtDashboardKpis>> => {
    await delay(600);
    return { success: true, message: 'KPIs fetched', data: MOCK_PT_KPIS };
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    await delay(700);
    return { success: true, message: 'Workload fetched', data: MOCK_PT_WORKLOAD };
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    await delay(500);
    return { success: true, message: 'Packages fetched', data: MOCK_PT_PACKAGES };
  },

  fetchAssignments: async (): Promise<ApiResponse<PtAssignment[]>> => {
    await delay(800);
    return { success: true, message: 'Assignments fetched', data: MOCK_PT_ASSIGNMENTS };
  },

  createAssignment: async (body: CreatePtAssignmentPayload): Promise<ApiResponse<PtAssignment>> => {
    await delay(1000);
    const newAssignment: PtAssignment = {
      id: `asg-new-${Date.now()}`,
      memberId: body.memberId,
      memberName: 'New Member', // Mocked name
      trainerId: body.trainerId,
      trainerName: 'Assigned Trainer', // Mocked name
      packageId: body.packageId,
      packageName: 'Assigned Package', // Mocked name
      totalSessions: 12,
      completedSessions: 0,
      startDate: body.startDate,
      endDate: '2024-01-01',
    };
    return { success: true, message: 'Trainer assigned successfully!', data: newAssignment };
  },

  markSessionComplete: async (assignmentId: string): Promise<ApiResponse<PtAssignment>> => {
    await delay(800);
    const assignment = MOCK_PT_ASSIGNMENTS.find(a => a.id === assignmentId);
    if (!assignment) {
      throw new Error('Assignment not found');
    }
    const updated = { 
      ...assignment, 
      completedSessions: Math.min(assignment.completedSessions + 1, assignment.totalSessions) 
    };
    return { success: true, message: 'Session marked as complete.', data: updated };
  },
};
