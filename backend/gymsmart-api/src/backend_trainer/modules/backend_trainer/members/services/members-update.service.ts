// RESPONSIBILITY: Updates one trainer-owned member record with an application input shape and audit trail.
// FLOW: Members command controller → update service → repository → audit/mapper.

import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { CoreSanitizationService } from '@/backend_trainer/core/security/core-sanitization.service';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { MembersRepository } from '@/backend_trainer/modules/backend_trainer/members/repositories/members-repository';
import { MembersUpdateMemberDto } from '@/backend_trainer/modules/backend_trainer/members/dtos/members-update-member.dto';
import { MembersMemberMapper } from '@/backend_trainer/modules/backend_trainer/members/members-member.mapper';
import type { MembersUpdateInput } from '@/backend_trainer/modules/backend_trainer/members/members.interfaces';

@Injectable()
export class MembersUpdateService {
  constructor(private readonly repo: MembersRepository, private readonly audit: CoreAuditService, private readonly sanitizer: CoreSanitizationService) {}

  /** Updates a trainer-owned member and records the changed fields. */
  async update(id: string, dto: MembersUpdateMemberDto): Promise<ReturnType<typeof MembersMemberMapper>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const before = await this.repo.findByIdForTrainerOrThrow(trainerId, id);
    const input: MembersUpdateInput = {
      ...(dto.name !== undefined ? { name: this.sanitizer.text(dto.name) ?? '' } : {}),
      ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
      ...(dto.email !== undefined ? { email: dto.email } : {}),
      ...(dto.address !== undefined ? { address: this.sanitizer.text(dto.address) } : {}),
      ...(dto.planId !== undefined ? { planId: dto.planId } : {}),
      ...(dto.planName !== undefined ? { planName: dto.planName } : {}),
      ...(dto.planTier !== undefined ? { planTier: dto.planTier } : {}),
      ...(dto.billingCycle !== undefined ? { billingCycle: dto.billingCycle } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      ...(dto.joinDate !== undefined ? { joinDate: dto.joinDate } : {}),
      ...(dto.expiryDate !== undefined ? { expiryDate: dto.expiryDate } : {}),
      ...(dto.fitnessLevel !== undefined ? { fitnessLevel: dto.fitnessLevel } : {}),
      ...(dto.targetWeightKg !== undefined ? { targetWeightKg: dto.targetWeightKg } : {}),
      ...(dto.fitnessGoal !== undefined ? { fitnessGoal: dto.fitnessGoal } : {}),
      ...(dto.progressStatus !== undefined ? { progressStatus: dto.progressStatus } : {}),
      ...(dto.assignedDietId !== undefined ? { assignedDietId: dto.assignedDietId } : {}),
      ...(dto.assignedWorkoutId !== undefined ? { assignedWorkoutId: dto.assignedWorkoutId } : {}),
      ...(dto.assignedDiet !== undefined ? { assignedDietSnapshot: dto.assignedDiet } : {}),
      ...(dto.assignedWorkout !== undefined ? { assignedWorkoutSnapshot: dto.assignedWorkout } : {}),
      ...(dto.weightKg !== undefined ? { weightKg: dto.weightKg } : {}),
      ...(dto.heightCm !== undefined ? { heightCm: dto.heightCm } : {}),
      ...(dto.age !== undefined ? { age: dto.age } : {}),
      ...(dto.bmi !== undefined ? { bmi: dto.bmi } : {}),
      ...(dto.isPT !== undefined ? { isPT: dto.isPT } : {}),
      ...(dto.medicalRestrictions !== undefined ? { medicalRestrictions: this.sanitizer.text(dto.medicalRestrictions) } : {}),
      ...(dto.daysSinceLastCheckIn !== undefined ? { daysSinceLastCheckIn: dto.daysSinceLastCheckIn } : {}),
      ...(dto.membershipNumber !== undefined ? { membershipNumber: dto.membershipNumber } : {}),
      ...(dto.assessment !== undefined ? { assessment: dto.assessment } : {}),
    };
    const row = await this.repo.updateMemberById(trainerId, id, input);
    await this.audit.record('MEMBER_UPDATED', 'MEMBER', id, { status: before.status }, { status: row.status });
    return MembersMemberMapper(row);
  }
}
