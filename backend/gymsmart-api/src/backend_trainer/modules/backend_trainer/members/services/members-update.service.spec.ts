import { IsNull } from 'typeorm';
// RESPONSIBILITY: Proves member update success and fail-fast not-found behavior.
// FLOW: Unit test → MembersUpdateService → repository/audit fakes.

import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { CoreSanitizationService } from '@/backend_trainer/core/security/core-sanitization.service';
import { MembersUpdateService } from '@/backend_trainer/modules/backend_trainer/members/services/members-update.service';

describe('MembersUpdateService', () => {
  it('audits an update and returns mapped data', async () => {
    const before = { id: '1', name: 'Old', status: 'Active', email: 'old@example.com', phone: '9000000000', gender: 'M', address: null, branch: 'Main', planId: 'p1', planName: 'Basic', planTier: 'Basic', billingCycle: 'MONTHLY', joinDate: new Date(), expiryDate: new Date(), photo: null, createdAt: new Date(), updatedAt: new Date(), age: 30, heightCm: 170, weightKg: 70, lastWorkout: null, progressStatus: null, assignedTrainerId: 'u1', assignedTrainerName: 'Trainer', isPT: false, assignedDietId: null, assignedWorkoutId: null, assignedDietSnapshot: null, assignedWorkoutSnapshot: null, fitnessLevel: null, targetWeightKg: null, bmi: null, medicalRestrictions: null, fitnessGoal: null, daysSinceLastCheckIn: 1, membershipNumber: 'M1', assessment: null, deletedAt: IsNull() };
    const after = { ...before, name: 'New' };
    const repo = { findByIdForTrainerOrThrow: jest.fn().mockResolvedValue(before), updateMemberById: jest.fn().mockResolvedValue(after), findNotes: jest.fn().mockResolvedValue([]) };
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const service = new MembersUpdateService(repo as never, audit as never, new CoreSanitizationService());
    const result = await service.update('1', { name: 'New' });
    expect(result.name).toBe('New');
    expect(audit.record).toHaveBeenCalledWith('MEMBER_UPDATED', 'MEMBER', '1', { status: 'Active' }, { status: 'Active' });
  });

  it('rejects a missing member from the repository boundary', async () => {
    const repo = { findByIdForTrainerOrThrow: jest.fn().mockRejectedValue(new CoreNotFoundException('MEMBERS.MEMBER', '1')) };
    const service = new MembersUpdateService(repo as never, { record: jest.fn() } as never, new CoreSanitizationService());
    await expect(service.update('1', {})).rejects.toThrow('DOMAIN.MEMBERS.MEMBER.NOT_FOUND');
  });
});
