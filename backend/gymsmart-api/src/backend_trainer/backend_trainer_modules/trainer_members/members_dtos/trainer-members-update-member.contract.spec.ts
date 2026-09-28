// RESPONSIBILITY: Proves the Trainer member update DTO accepts frontend assignment snapshots while preserving typed request validation.
// FLOW: Frontend member mutation payload → TrainerMembersUpdateMemberDto → strict global validation boundary.

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TrainerMembersUpdateMemberDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-update-member.dto';

describe('Trainer member assignment request contract', () => {
  it('accepts assignment snapshots sent by the frontend while validation still protects field types', async () => {
    const dto = plainToInstance(TrainerMembersUpdateMemberDto, {
      assignedDietId: '3b2b6f3a-38c0-4f60-98f0-3d8325de5ea2',
      assignedDiet: { id: '3b2b6f3a-38c0-4f60-98f0-3d8325de5ea2', name: 'Lean Muscle' },
      assignedWorkoutId: 'ae222e83-e9d6-4b44-b6ad-7c3ab8366927',
      assignedWorkout: { id: 'ae222e83-e9d6-4b44-b6ad-7c3ab8366927', name: 'Push Day' },
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
