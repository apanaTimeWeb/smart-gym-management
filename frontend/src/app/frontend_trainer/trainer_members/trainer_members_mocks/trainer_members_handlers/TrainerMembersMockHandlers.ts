import { TrainerMembersAttendanceMockHandlers } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_handlers/TrainerMembersAttendanceMockHandlers';
import { TrainerMembersBrowseMockHandlers } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_handlers/TrainerMembersBrowseMockHandlers';
import { TrainerMembersProfileMockHandlers } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_handlers/TrainerMembersProfileMockHandlers';

/**
 * @description Composes every module-owned MSW handler group for the Trainer Members feature.
 * @dependencies Browse, profile/mutation, and attendance handler groups only.
 */
export const TrainerMembersMockHandlers = [
  ...TrainerMembersBrowseMockHandlers,
  ...TrainerMembersProfileMockHandlers,
  ...TrainerMembersAttendanceMockHandlers,
];
