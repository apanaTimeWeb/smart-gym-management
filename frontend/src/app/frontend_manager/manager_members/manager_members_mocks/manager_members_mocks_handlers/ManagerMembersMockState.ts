import { MANAGER_MEMBERS_PAYMENT_STATUS_VALUES } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { MOCK_MEMBERS } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_fixtures/ManagerMembersMockData';

export type ManagerMembersMockPayment = {
  id: string;
  amount: number;
  method: string;
  paidAt: string;
  status: (typeof MANAGER_MEMBERS_PAYMENT_STATUS_VALUES)[keyof typeof MANAGER_MEMBERS_PAYMENT_STATUS_VALUES];
  invoiceNumber: string;
};

/** @description Owns the mutable in-memory state shared by Manager Members MSW read and mutation handlers. @dependencies Uses feature-owned fixtures only. @edge-case reset restores deterministic fixture state for every test suite. */
export const managerMembersMockState = {
  memberIdCounter: 1000,
  paymentIdCounter: 1000,
  paymentByMemberId: {} as Record<string, ManagerMembersMockPayment[]>,
  dietPlanIdCounter: 1000,
  workoutPlanIdCounter: 1000,
  members: [...MOCK_MEMBERS],
};

/** @description Resets all Manager Members mock state so tests and manual demo flows start from deterministic fixtures. */
export function resetManagerMembersMockState(): void {
  managerMembersMockState.memberIdCounter = 1000;
  managerMembersMockState.paymentIdCounter = 1000;
  managerMembersMockState.paymentByMemberId = {};
  managerMembersMockState.dietPlanIdCounter = 1000;
  managerMembersMockState.workoutPlanIdCounter = 1000;
  managerMembersMockState.members = [...MOCK_MEMBERS];
}
