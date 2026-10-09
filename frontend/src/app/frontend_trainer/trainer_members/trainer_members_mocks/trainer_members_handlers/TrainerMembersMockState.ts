import { TRAINER_MEMBERS_MOCK_MEMBERS } from '@/app/frontend_trainer/trainer_members/trainer_members_mocks/trainer_members_fixtures/TrainerMembersMockData';

let trainerMembersMockMembersDb = [...TRAINER_MEMBERS_MOCK_MEMBERS];

export function getTrainerMembersMockMembers(): typeof trainerMembersMockMembersDb {
  return trainerMembersMockMembersDb;
}

export function replaceTrainerMembersMockMembers(nextMembers: typeof trainerMembersMockMembersDb): void {
  trainerMembersMockMembersDb = nextMembers;
}
