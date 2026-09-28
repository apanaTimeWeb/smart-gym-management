// RESPONSIBILITY: Proves isolated member-update behavior, including repository-owned assignment input.
// FLOW: Jest → TrainerMembersUpdateService → repository/UoW/audit fakes → observable service result.

import { IsNull } from 'typeorm';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreSanitizationService } from '@/backend_trainer/backend_core/core_security/core-sanitization.service';
import { TrainerMembersUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-update.service';

describe('TrainerMembersUpdateService', () => {
  function buildService(repo: Record<string, jest.Mock>) {
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const uow = { execute: jest.fn(async (callback: (context: unknown) => Promise<unknown>) => callback({})) };
    const service = new TrainerMembersUpdateService(repo as never, audit as never, new CoreSanitizationService(), uow as never);
    return { service, audit, uow };
  }

  it('audits an update and returns mapped data', async () => {
    const before = { id: '1', name: 'Old', email: 'old@example.com', phone: '9000000000', gender: 'M', address: null, branch: 'Main', planId: 'p1', planName: 'Basic', planTier: 'Basic', billingCycle: 'MONTHLY', status: 'ACTIVE', joinDate: new Date(), expiryDate: new Date(), photo: null, createdAt: new Date(), updatedAt: new Date(), age: 30, heightCm: 170, weightKg: 70, lastWorkout: null, progressStatus: 'GOOD', assignedTrainerId: 'u1', assignedTrainerName: 'Trainer', isPT: false, assignedDietId: null, assignedWorkoutId: null, assignedDietSnapshot: null, assignedWorkoutSnapshot: null, fitnessLevel: null, targetWeightKg: null, bmi: null, medicalRestrictions: null, fitnessGoal: null, daysSinceLastCheckIn: 1, membershipNumber: 'M1', assessment: null, deletedAt: IsNull() };
    const after = { ...before, name: 'New' };
    const repo = { findByIdForTrainerOrThrow: jest.fn().mockResolvedValue(before), updateMemberById: jest.fn().mockResolvedValue(after) };
    const { service, audit } = buildService(repo);
    const result = await service.update('1', { name: 'New' });
    expect(result.name).toBe('New');
    expect(repo.updateMemberById.mock.calls[0][2]).not.toHaveProperty('assignedWorkout');
    expect(repo.updateMemberById.mock.calls[0][2]).not.toHaveProperty('assignedDiet');
    expect(audit.record).toHaveBeenCalledWith('MEMBER_UPDATED', 'MEMBER', '1', { status: 'ACTIVE' }, { status: 'ACTIVE' }, expect.anything());
  });

  it('rejects a missing member from the repository boundary', async () => {
    const repo = { findByIdForTrainerOrThrow: jest.fn().mockRejectedValue(new CoreNotFoundException('MEMBERS.MEMBER', '1')) };
    const { service } = buildService(repo);
    await expect(service.update('1', {})).rejects.toThrow('DOMAIN.MEMBERS.MEMBER.NOT_FOUND');
  });
});
